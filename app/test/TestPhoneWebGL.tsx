"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const screens = [1, 2, 3];

function roundedShape(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function flatRoundedGeometry(width: number, height: number, radius: number) {
  const geometry = new THREE.ShapeGeometry(roundedShape(width, height, radius), 32);
  const positions = geometry.attributes.position;
  const uvs = geometry.attributes.uv;
  for (let index = 0; index < positions.count; index += 1) {
    uvs.setXY(index, (positions.getX(index) + width / 2) / width, (positions.getY(index) + height / 2) / height);
  }
  uvs.needsUpdate = true;
  return geometry;
}

export default function TestPhoneWebGL() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const targetRotation = useRef({ x: -0.025, y: -0.07 });

  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".test-experiment-page .phone-stage");
    if (!stage) return;
    const desktop = window.matchMedia("(min-width: 1000px)");
    const syncToViewport = () => {
      stage.classList.toggle("is-test-3d-ready", desktop.matches);
      setHost(desktop.matches ? stage : null);
    };
    const animationFrame = window.requestAnimationFrame(syncToViewport);
    desktop.addEventListener("change", syncToViewport);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      desktop.removeEventListener("change", syncToViewport);
      stage.classList.remove("is-test-3d-ready");
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % screens.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!host || !mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 11.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const phone = new THREE.Group();
    phone.rotation.set(-0.025, -0.07, 0);
    scene.add(phone);

    const metal = new THREE.MeshPhysicalMaterial({
      color: 0x241d25,
      metalness: 0.9,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const bodyGeometry = new THREE.ExtrudeGeometry(roundedShape(2.76, 5.72, 0.36), {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.055,
      bevelThickness: 0.055,
      curveSegments: 24,
    });
    bodyGeometry.center();
    const body = new THREE.Mesh(bodyGeometry, metal);
    body.castShadow = true;
    body.receiveShadow = true;
    phone.add(body);

    const bezelGeometry = flatRoundedGeometry(2.61, 5.52, 0.34);
    const bezelMaterial = new THREE.MeshPhysicalMaterial({ color: 0x050506, metalness: 0.35, roughness: 0.24, clearcoat: 1 });
    const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
    bezel.position.z = 0.205;
    phone.add(bezel);

    const screenGeometry = flatRoundedGeometry(2.43, 5.09, 0.25);
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const loader = new THREE.TextureLoader();
    const textures = screens.map((number) => {
      const texture = loader.load(asset(`/media/test/shop-screen-hq-${number}.jpg`));
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = maxAnisotropy;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    });
    const screenMaterials = textures.map((texture, index) => new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: index === 0 ? 1 : 0,
      depthWrite: false,
      toneMapped: false,
    }));
    screenMaterials.forEach((material, index) => {
      const screen = new THREE.Mesh(screenGeometry, material);
      screen.position.z = 0.226 + index * 0.001;
      screen.renderOrder = index + 1;
      phone.add(screen);
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.05,
      roughness: 0.02,
      clearcoat: 1,
      clearcoatRoughness: 0,
      depthWrite: false,
    });
    const glass = new THREE.Mesh(screenGeometry, glassMaterial);
    glass.position.z = 0.238;
    glass.renderOrder = 8;
    phone.add(glass);

    const pill = new THREE.Mesh(
      flatRoundedGeometry(0.72, 0.19, 0.095),
      new THREE.MeshPhysicalMaterial({ color: 0x020203, roughness: 0.3, clearcoat: 0.8 }),
    );
    pill.position.set(0, 2.29, 0.255);
    pill.renderOrder = 10;
    phone.add(pill);

    const lens = new THREE.Mesh(
      new THREE.CircleGeometry(0.036, 32),
      new THREE.MeshPhysicalMaterial({ color: 0x071522, metalness: 0.35, roughness: 0.16, clearcoat: 1 }),
    );
    lens.position.set(0.245, 2.29, 0.262);
    lens.renderOrder = 11;
    phone.add(lens);

    const buttonMaterial = new THREE.MeshPhysicalMaterial({ color: 0x6f5d6d, metalness: 0.92, roughness: 0.22 });
    const addButton = (x: number, y: number, height: number) => {
      const button = new THREE.Mesh(new THREE.BoxGeometry(0.065, height, 0.12), buttonMaterial);
      button.position.set(x, y, -0.01);
      button.castShadow = true;
      phone.add(button);
    };
    addButton(-1.43, 1.18, 0.36);
    addButton(-1.43, 0.55, 0.72);
    addButton(1.43, 0.62, 0.82);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x332633, 2.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.8);
    keyLight.position.set(-3.5, 4.5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xff6a33, 3.2);
    rimLight.position.set(4, 1.5, 2);
    scene.add(rimLight);

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const clock = new THREE.Clock();
    let frame = 0;
    const render = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      const damping = 1 - Math.pow(0.001, delta);
      phone.rotation.x += (targetRotation.current.x - phone.rotation.x) * damping;
      phone.rotation.y += (targetRotation.current.y - phone.rotation.y) * damping;
      phone.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.025;
      screenMaterials.forEach((material, index) => {
        const targetOpacity = activeRef.current === index ? 1 : 0;
        material.opacity += (targetOpacity - material.opacity) * Math.min(1, delta * 5.5);
      });
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      textures.forEach((texture) => texture.dispose());
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [host]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    targetRotation.current = { x: -0.025 - y * 0.12, y: -0.07 + x * 0.25 };
  };

  if (!host) return null;

  return createPortal(
    <div
      className="test-phone-3d test-phone-3d--webgl"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { targetRotation.current = { x: -0.025, y: -0.07 }; }}
      aria-label="Vista tridimensional interactiva de una tienda online"
    >
      <div className="test-phone-webgl" ref={mountRef} />
      <span className="test-phone-accessible-screen">Pantalla {active + 1} de la tienda online</span>
      <div className="test-phone-controls" aria-label="Elegir pantalla de la tienda">
        {screens.map((number, index) => (
          <button
            key={number}
            type="button"
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Ver pantalla ${number}`}
            aria-pressed={active === index}
          />
        ))}
      </div>
    </div>,
    host,
  );
}

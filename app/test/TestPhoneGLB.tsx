"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

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
  const geometry = new THREE.ShapeGeometry(roundedShape(width, height, radius), 48);
  const positions = geometry.attributes.position;
  const uvs = geometry.attributes.uv;
  for (let index = 0; index < positions.count; index += 1) {
    uvs.setXY(index, (positions.getX(index) + width / 2) / width, (positions.getY(index) + height / 2) / height);
  }
  uvs.needsUpdate = true;
  return geometry;
}

function disposeScene(root: THREE.Object3D) {
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry?.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value instanceof THREE.Texture) value.dispose();
      });
      material.dispose();
    });
  });
}

export default function TestPhoneGLB() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const targetRotation = useRef({ x: -0.035, y: -0.07, z: 0.012 });
  const targetOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".test-experiment-page .phone-stage");
    if (!stage) return;
    const desktop = window.matchMedia("(min-width: 1000px)");
    const syncToViewport = () => {
      setHost(desktop.matches ? stage : null);
      if (!desktop.matches) stage.classList.remove("is-test-3d-ready");
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
    const timer = window.setInterval(() => setActive((value) => (value + 1) % screens.length), 3600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!host || !mount) return;

    let cancelled = false;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(27, 1, 0.1, 100);
    camera.position.set(0, 0.05, 10.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;
    scene.environment = environment;

    const phoneRig = new THREE.Group();
    phoneRig.rotation.set(-0.035, -0.07, 0.012);
    scene.add(phoneRig);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x33222b, 1.3));
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(-3.5, 5.5, 6);
    scene.add(keyLight);
    const edgeLight = new THREE.DirectionalLight(0xff6a2b, 3.4);
    edgeLight.position.set(5, 1.5, 2.5);
    scene.add(edgeLight);
    const coolFill = new THREE.DirectionalLight(0xbccfff, 2.1);
    coolFill.position.set(-4, -2, 1);
    scene.add(coolFill);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const textureLoader = new THREE.TextureLoader();
    const textures = screens.map((number) => {
      const texture = textureLoader.load(asset(`/media/test/shop-screen-hq-${number}.jpg`));
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
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
    }));

    const loader = new GLTFLoader();
    loader.load(
      asset("/media/test/iphone-15-pro-max.glb"),
      (gltf) => {
        if (cancelled) {
          disposeScene(gltf.scene);
          return;
        }

        const modelRoot = new THREE.Group();
        const originalBounds = new THREE.Box3().setFromObject(gltf.scene);
        const center = originalBounds.getCenter(new THREE.Vector3());
        const size = originalBounds.getSize(new THREE.Vector3());
        let screenBounds: THREE.Box3 | null = null;

        gltf.scene.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.castShadow = true;
          object.receiveShadow = true;
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            const key = material.name.toLowerCase();
            if (key === "material.001" || key.includes("screen") || key.includes("display")) {
              const bounds = new THREE.Box3().setFromObject(object);
              screenBounds = screenBounds ? screenBounds.union(bounds) : bounds;
              const standard = material as THREE.MeshStandardMaterial;
              standard.color?.set(0x000000);
              standard.emissive?.set(0x000000);
              standard.needsUpdate = true;
            }
            if (material instanceof THREE.MeshStandardMaterial) {
              if (key.includes("metalframe")) {
                material.color.set(0x4d4744);
                material.metalness = 0.92;
                material.roughness = 0.2;
              } else if (key.includes("backpanel")) {
                material.color.set(0x746b62);
                material.metalness = 0.25;
                material.roughness = 0.32;
              }
              material.envMapIntensity = 1.35;
            }
          });
        });

        gltf.scene.position.sub(center);
        modelRoot.add(gltf.scene);

        const surface = screenBounds ?? new THREE.Box3(
          new THREE.Vector3(0.125, -1.765, -0.82),
          new THREE.Vector3(0.125, 1.765, 0.82),
        );
        const surfaceCenter = surface.getCenter(new THREE.Vector3()).sub(center);
        const surfaceSize = surface.getSize(new THREE.Vector3());
        const screenWidth = surfaceSize.x || 1.64;
        const screenHeight = surfaceSize.y || 3.53;

        screenMaterials.forEach((material, index) => {
          const screen = new THREE.Mesh(flatRoundedGeometry(screenWidth * 1.002, screenHeight * 1.002, 0.19), material);
          screen.position.set(surfaceCenter.x, surfaceCenter.y, surfaceCenter.z + 0.029 + index * 0.0007);
          screen.renderOrder = 20 + index;
          modelRoot.add(screen);
        });

        const island = new THREE.Mesh(
          flatRoundedGeometry(screenWidth * 0.31, screenWidth * 0.092, screenWidth * 0.046),
          new THREE.MeshPhysicalMaterial({
            color: 0x020203,
            roughness: 0.22,
            clearcoat: 1,
            depthTest: false,
            depthWrite: false,
            side: THREE.DoubleSide,
          }),
        );
        island.position.set(surfaceCenter.x, surfaceCenter.y + screenHeight * 0.424, surfaceCenter.z + 0.034);
        island.renderOrder = 40;
        modelRoot.add(island);

        modelRoot.scale.setScalar(4.65 / size.y);
        phoneRig.add(modelRoot);
        host.classList.add("is-test-3d-ready");
      },
      undefined,
      (error) => console.error("No se pudo cargar el modelo 3D del teléfono", error),
    );

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

    let lastTime = performance.now();
    let elapsedTime = 0;
    let frame = 0;
    const render = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsedTime += delta;
      const damping = 1 - Math.pow(0.0005, delta);
      phoneRig.rotation.x += (targetRotation.current.x - phoneRig.rotation.x) * damping;
      phoneRig.rotation.y += (targetRotation.current.y - phoneRig.rotation.y) * damping;
      phoneRig.rotation.z += (targetRotation.current.z - phoneRig.rotation.z) * damping;
      phoneRig.position.x += (targetOffset.current.x - phoneRig.position.x) * damping;
      const targetY = Math.sin(elapsedTime * 0.62) * 0.035 + targetOffset.current.y;
      phoneRig.position.y += (targetY - phoneRig.position.y) * damping;
      screenMaterials.forEach((material, index) => {
        const targetOpacity = activeRef.current === index ? 1 : 0;
        material.opacity += (targetOpacity - material.opacity) * Math.min(1, delta * 5.2);
      });
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    frame = window.requestAnimationFrame(render);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      host.classList.remove("is-test-3d-ready");
      textures.forEach((texture) => texture.dispose());
      disposeScene(scene);
      environment.dispose();
      pmrem.dispose();
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
    targetRotation.current = {
      x: -0.035 - y * 0.24,
      y: -0.07 + x * 0.48,
      z: 0.012 - x * 0.055,
    };
    targetOffset.current = { x: x * 0.11, y: -y * 0.07 };
  };

  if (!host) return null;

  return createPortal(
    <div
      className="test-phone-3d test-phone-3d--webgl"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        targetRotation.current = { x: -0.035, y: -0.07, z: 0.012 };
        targetOffset.current = { x: 0, y: 0 };
      }}
      aria-label="Vista tridimensional interactiva de una tienda online"
    >
      <div className="test-phone-webgl" ref={mountRef} />
      <span className="test-phone-accessible-screen">Pantalla {active + 1} de la tienda online</span>
    </div>,
    host,
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

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
    materials.forEach((material) => material.dispose());
  });
}

export default function TestTabletGLB() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const pointerTarget = useRef({ x: 0, y: 0, z: 0 });
  const scrollTarget = useRef({ x: 0, y: 0, z: 0, offsetY: 0 });

  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".test-experiment-page .statement .screen-swap");
    if (!stage) return;
    const desktop = window.matchMedia("(min-width: 1000px)");
    const sync = () => {
      setHost(desktop.matches ? stage : null);
      if (!desktop.matches) stage.classList.remove("is-test-tablet-ready");
    };
    const frame = window.requestAnimationFrame(sync);
    desktop.addEventListener("change", sync);
    return () => {
      window.cancelAnimationFrame(frame);
      desktop.removeEventListener("change", sync);
      stage.classList.remove("is-test-tablet-ready");
    };
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!host || !mount) return;

    let cancelled = false;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 9.3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
    scene.environment = environment;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x24130b, 1.4));
    const key = new THREE.DirectionalLight(0xffffff, 4.6);
    key.position.set(-4, 5, 7);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff5a00, 4.1);
    rim.position.set(5, 1.5, 3);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xadc7ff, 1.8);
    fill.position.set(-5, -3, 2);
    scene.add(fill);

    const tabletRig = new THREE.Group();
    tabletRig.rotation.set(-0.06, -0.16, 0.015);
    scene.add(tabletRig);
    const tabletBody = new THREE.Group();
    tabletBody.scale.y = 0.78;
    tabletRig.add(tabletBody);

    const video = document.createElement("video");
    video.src = asset("/media/test/tablet-demo.mp4");
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("aria-hidden", "true");
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    const screenMaterial = new THREE.ShaderMaterial({
      uniforms: {
        videoMap: { value: videoTexture },
        planeAspect: { value: 4.48 / (3.52 * 0.78) },
        videoAspect: { value: 1280 / 588 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D videoMap;
        uniform float planeAspect;
        uniform float videoAspect;
        varying vec2 vUv;
        void main() {
          float visibleHeight = planeAspect / videoAspect;
          float bottom = (1.0 - visibleHeight) * 0.5;
          if (vUv.y < bottom || vUv.y > 1.0 - bottom) {
            gl_FragColor = vec4(0.008, 0.008, 0.008, 1.0);
          } else {
            vec2 videoUv = vec2(vUv.x, (vUv.y - bottom) / visibleHeight);
            gl_FragColor = texture2D(videoMap, videoUv);
          }
        }
      `,
      toneMapped: false,
      side: THREE.DoubleSide,
    });
    const screen = new THREE.Mesh(flatRoundedGeometry(4.48, 3.52, 0.17), screenMaterial);
    screen.position.z = 0.165;
    screen.renderOrder = 20;
    tabletBody.add(screen);

    const glass = new THREE.Mesh(
      flatRoundedGeometry(4.5, 3.54, 0.18),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.055,
        roughness: 0.02,
        clearcoat: 1,
        clearcoatRoughness: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    glass.position.z = 0.176;
    glass.renderOrder = 30;
    tabletBody.add(glass);

    const cameraDot = new THREE.Mesh(
      new THREE.CircleGeometry(0.035, 32),
      new THREE.MeshPhysicalMaterial({ color: 0x06101b, metalness: 0.35, roughness: 0.12, clearcoat: 1 }),
    );
    cameraDot.position.set(0, 1.845, 0.19);
    cameraDot.renderOrder = 40;
    tabletBody.add(cameraDot);

    const loader = new GLTFLoader();
    loader.load(
      asset("/media/test/tablet.glb"),
      (gltf) => {
        if (cancelled) {
          disposeScene(gltf.scene);
          return;
        }
        const bounds = new THREE.Box3().setFromObject(gltf.scene);
        const center = bounds.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);
        gltf.scene.rotation.y = Math.PI / 2;
        gltf.scene.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.castShadow = true;
          object.receiveShadow = true;
          object.material = new THREE.MeshPhysicalMaterial({
            color: 0x3b3938,
            metalness: 0.88,
            roughness: 0.24,
            clearcoat: 0.72,
            clearcoatRoughness: 0.14,
            envMapIntensity: 1.45,
          });
        });
        const upright = new THREE.Group();
        upright.rotation.x = Math.PI / 2;
        upright.scale.setScalar(20);
        upright.add(gltf.scene);
        tabletBody.add(upright);
        host.classList.add("is-test-tablet-ready");
        void video.play().catch(() => undefined);
      },
      undefined,
      (error) => console.error("No se pudo cargar el modelo 3D de la tablet", error),
    );

    const updateScroll = () => {
      const section = host.closest<HTMLElement>(".statement");
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      const progress = THREE.MathUtils.clamp((window.innerHeight * 0.5 - bounds.top) / Math.max(bounds.height, 1), 0, 1);
      const centered = progress - 0.5;
      scrollTarget.current = {
        x: centered * 0.22,
        y: centered * 0.58,
        z: centered * 0.07,
        offsetY: centered * 0.32,
      };
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    const visibility = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.05 });
    visibility.observe(host);

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
    let elapsed = 0;
    let frame = 0;
    const render = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += delta;
      const damping = 1 - Math.pow(0.0008, delta);
      const targetX = -0.06 + pointerTarget.current.x + scrollTarget.current.x;
      const targetY = -0.16 + pointerTarget.current.y + scrollTarget.current.y;
      const targetZ = 0.015 + pointerTarget.current.z + scrollTarget.current.z;
      tabletRig.rotation.x += (targetX - tabletRig.rotation.x) * damping;
      tabletRig.rotation.y += (targetY - tabletRig.rotation.y) * damping;
      tabletRig.rotation.z += (targetZ - tabletRig.rotation.z) * damping;
      const targetPositionY = scrollTarget.current.offsetY + Math.sin(elapsed * 0.7) * 0.035;
      tabletRig.position.y += (targetPositionY - tabletRig.position.y) * damping;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    frame = window.requestAnimationFrame(render);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
      visibility.disconnect();
      resizeObserver.disconnect();
      host.classList.remove("is-test-tablet-ready");
      video.pause();
      video.removeAttribute("src");
      video.load();
      videoTexture.dispose();
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
    pointerTarget.current = { x: -y * 0.13, y: x * 0.23, z: -x * 0.035 };
  };

  if (!host) return null;

  return createPortal(
    <div
      className="test-tablet-3d"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { pointerTarget.current = { x: 0, y: 0, z: 0 }; }}
      aria-label="Tablet tridimensional con una demostración de sitio web en video"
    >
      <div className="test-tablet-webgl" ref={mountRef} />
      <span className="test-phone-accessible-screen">Demostración en video dentro de una tablet 3D</span>
    </div>,
    host,
  );
}

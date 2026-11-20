import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

interface HeroGeometryProps {
  className?: string;
}

export function HeroGeometry({ className = "" }: HeroGeometryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme, reducedMotion } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const systemReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || systemReduced) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      return;
    }

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const accentHex = resolvedTheme === "light" ? 0x8f670e : 0xd4af37;
    const highlightHex = resolvedTheme === "light" ? 0x334155 : 0xe9ca6b;

    const ambient = new THREE.AmbientLight(0xffffff, resolvedTheme === "light" ? 1.1 : 0.75);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(accentHex, 2.8, 30);
    keyLight.position.set(4, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(highlightHex, 2.0, 30);
    rimLight.position.set(-4, -3, 4);
    scene.add(rimLight);

    const group = new THREE.Group();
    scene.add(group);

    const outerGeo = new THREE.IcosahedronGeometry(1.55, 0);
    const outerMat = new THREE.MeshStandardMaterial({
      color: accentHex,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: true,
      transparent: true,
      opacity: resolvedTheme === "light" ? 0.55 : 0.72
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    const coreGeo = new THREE.OctahedronGeometry(0.74, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: accentHex,
      emissive: accentHex,
      emissiveIntensity: resolvedTheme === "light" ? 0.2 : 0.45,
      metalness: 0.9,
      roughness: 0.2
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    const ringGeo = new THREE.TorusGeometry(2.25, 0.022, 14, 72);
    const ringMat = new THREE.MeshBasicMaterial({
      color: highlightHex,
      transparent: true,
      opacity: 0.48
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let frameId = 0;
    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      outerMesh.rotation.y += 0.004;
      outerMesh.rotation.x += 0.002;
      coreMesh.rotation.y -= 0.008;
      ring.rotation.z += 0.005;
      group.rotation.y += (pointerX - group.rotation.y) * 0.04;
      group.rotation.x += (pointerY - group.rotation.x) * 0.04;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      outerGeo.dispose();
      outerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [resolvedTheme, reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    />
  );
}

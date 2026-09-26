'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { useInView } from 'framer-motion';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { useTheme, type Theme } from '@/components/layout/ThemeProvider';
import { techStack } from '@/data/techstack';
import { useIsMobile } from '@/hooks/useIsMobile';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import type { TechItem } from '@/types';
import { createTileTexture, readRgbVar } from './createTileTexture';
import { TechFallback } from './TechFallback';

const TILE = 1.3;

/** Spreads points evenly over a squashed sphere so tiles float in a loose cluster. */
function clusterLayout(count: number, radius: number): THREE.Vector3[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return new THREE.Vector3(
      Math.cos(theta) * ring * radius * 1.15,
      y * radius * 0.85,
      Math.sin(theta) * ring * radius * 0.6,
    );
  });
}

interface TileSet {
  textures: THREE.Texture[];
  rim: string;
}

/** Rebuilds the tile faces whenever the theme changes so they match the page colors. */
function useTileSet(theme: Theme): TileSet | null {
  const [set, setSet] = useState<TileSet | null>(null);

  useEffect(() => {
    const palette = { surface: readRgbVar('--tile-surface'), ink: readRgbVar('--ink') };
    const textures = techStack.map((item) => createTileTexture(item, palette));
    setSet({ textures, rim: readRgbVar('--line') });
    return () => textures.forEach((texture) => texture.dispose());
  }, [theme]);

  return set;
}

interface TileProps {
  index: number;
  target: THREE.Vector3;
  texture: THREE.Texture;
  rim: string;
  animate: boolean;
}

function Tile({ index, target, texture, rim, animate }: TileProps) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Each tile starts scattered and toward the camera, then settles into place.
  const start = useMemo(
    () =>
      target
        .clone()
        .multiplyScalar(2.2)
        .add(new THREE.Vector3(Math.sin(index * 12.9) * 3, Math.cos(index * 7.3) * 3, 6)),
    [target, index],
  );

  useLayoutEffect(() => {
    const g = group.current;
    if (!g) return;
    if (animate) {
      g.position.copy(start);
      g.scale.setScalar(0.001);
    } else {
      g.position.copy(target);
      g.scale.setScalar(1);
    }
  }, [animate, start, target]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (!animate) {
      g.scale.setScalar(hovered ? 1.08 : 1);
      return;
    }

    if (state.clock.elapsedTime < 0.2 + index * 0.08) return;
    g.position.x = THREE.MathUtils.damp(g.position.x, target.x, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, target.y, 3, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, target.z, 3, delta);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, hovered ? 1.12 : 1, 4, delta));
  });

  return (
    <Float
      speed={1.4}
      rotationIntensity={animate ? 0.35 : 0}
      floatIntensity={animate ? 0.8 : 0}
      floatingRange={[-0.1, 0.1]}
    >
      <group
        ref={group}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <RoundedBox args={[TILE, TILE, 0.16]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color={rim} roughness={0.45} metalness={0.05} />
        </RoundedBox>
        <mesh position={[0, 0, 0.085]}>
          <planeGeometry args={[TILE - 0.1, TILE - 0.1]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

/** Tilts the whole cluster toward the pointer, with a slow idle sway. */
function Rig({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g || !enabled) return;
    const targetY = state.pointer.x * 0.45 + Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    const targetX = -state.pointer.y * 0.25;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);
  });

  return <group ref={ref}>{children}</group>;
}

export function TechScene() {
  const { theme } = useTheme();
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const webgl = useWebGLSupport();
  const wrapper = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapper, { margin: '100px' });
  const tiles = useTileSet(theme);
  const targets = useMemo(
    () => clusterLayout(techStack.length, isMobile ? 1.9 : 2.2),
    [isMobile],
  );

  if (webgl === false) return <TechFallback />;

  return (
    <div ref={wrapper} className="h-full w-full">
      {webgl && tiles ? (
        <Canvas
          camera={{ position: [0, 0, isMobile ? 11 : 10.5], fov: isMobile ? 40 : 42 }}
          dpr={[1, isMobile ? 1.5 : 2]}
          frameloop={reduced ? 'demand' : inView ? 'always' : 'never'}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[4, 5, 6]} intensity={1.8} />
          <Rig enabled={!reduced}>
            {techStack.map((item: TechItem, index) => (
              <Tile
                key={item.name}
                index={index}
                target={targets[index]}
                texture={tiles.textures[index]}
                rim={tiles.rim}
                animate={!reduced}
              />
            ))}
          </Rig>
        </Canvas>
      ) : null}
    </div>
  );
}

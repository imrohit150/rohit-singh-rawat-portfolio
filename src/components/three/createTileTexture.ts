import * as THREE from 'three';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  SiFigma,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si';
import type { TechItem } from '@/types';

/** Reads a "r g b" CSS variable (see globals.css) and returns a canvas-safe color string. */
export function readRgbVar(name: string): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [r, g, b] = raw.split(/\s+/).map(Number);
  return `rgb(${r}, ${g}, ${b})`;
}

const FONT_FAMILY = '"Instrument Sans", system-ui, -apple-system, "Segoe UI", sans-serif';

const ICONS = {
  figma: SiFigma,
  javascript: SiJavascript,
  jest: SiJest,
  next: SiNextdotjs,
  react: SiReact,
  reactquery: SiReactquery,
  redux: SiRedux,
  tailwind: SiTailwindcss,
  typescript: SiTypescript,
  vite: SiVite,
};

function drawIcon(
  ctx: CanvasRenderingContext2D,
  item: TechItem,
  color: string,
  onDraw: () => void,
) {
  const Icon = ICONS[item.icon as keyof typeof ICONS];
  if (!Icon) {
    ctx.fillStyle = color;
    ctx.font = `700 150px ${FONT_FAMILY}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(item.name.slice(0, 1), 256, 190);
    ctx.textAlign = 'start';
    return;
  }

  const svg = renderToStaticMarkup(createElement(Icon, { color, size: 150, title: item.name }));
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 181, 108, 150, 150);
    onDraw();
  };
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Draws one tile face: a centered technology icon and name. */
export function createTileTexture(
  item: TechItem,
  palette: { surface: string; ink: string },
): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const texture = new THREE.CanvasTexture(canvas);
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = palette.surface;
    ctx.fillRect(0, 0, size, size);

    drawIcon(ctx, item, item.color === 'ink' ? palette.ink : item.color, () => {
      texture.needsUpdate = true;
    });

    ctx.fillStyle = palette.ink;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'center';
    let fontSize = 88;
    do {
      ctx.font = `600 ${fontSize}px ${FONT_FAMILY}`;
      fontSize -= 4;
    } while (ctx.measureText(item.name).width > size - 96 && fontSize > 28);
    ctx.fillText(item.name, size / 2, size - 64);
  }

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

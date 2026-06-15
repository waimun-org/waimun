import globalCss from "@/styles/global.css?raw";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const LOGO_PATH = resolve(process.cwd(), "public/favicon.svg");

function getCssToken(name: string) {
  const root = globalCss.match(/:root\s*{([\s\S]*?)}/)?.[1];
  const value = root?.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1].trim();

  if (!value) throw new Error(`Missing --${name} in src/styles/global.css`);
  return value;
}

function oklchToRgb(value: string) {
  const match = value.match(
    /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/,
  );
  if (!match) return value;

  const lightness = Number(match[1]);
  const chroma = Number(match[2]);
  const hue = (Number(match[3]) * Math.PI) / 180;
  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);
  const l = lightness + 0.3963377774 * a + 0.2158037573 * b;
  const m = lightness - 0.1055613458 * a - 0.0638541728 * b;
  const s = lightness - 0.0894841775 * a - 1.291485548 * b;
  const linear = [
    4.0767416621 * l ** 3 - 3.3077115913 * m ** 3 + 0.2309699292 * s ** 3,
    -1.2684380046 * l ** 3 + 2.6097574011 * m ** 3 - 0.3413193965 * s ** 3,
    -0.0041960863 * l ** 3 - 0.7034186147 * m ** 3 + 1.707614701 * s ** 3,
  ];
  const channels = linear.map((channel) => {
    const rgb =
      channel <= 0.0031308
        ? 12.92 * channel
        : 1.055 * channel ** (1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, rgb)) * 255);
  });
  const alpha = match[4]
    ? match[4].endsWith("%")
      ? Number(match[4].slice(0, -1)) / 100
      : Number(match[4])
    : 1;

  return alpha === 1
    ? `rgb(${channels.join(", ")})`
    : `rgba(${channels.join(", ")}, ${alpha})`;
}

export const ogColors = {
  background: oklchToRgb(getCssToken("background")),
  foreground: oklchToRgb(getCssToken("foreground")),
  muted: oklchToRgb(getCssToken("muted-foreground")),
};

let logoDataUrl: Promise<string> | undefined;

export function getLogoDataUrl() {
  logoDataUrl ??= readFile(LOGO_PATH, "utf8").then((svg) => {
    const png = new Resvg(svg, { fitTo: { mode: "width", value: 500 } })
      .render()
      .asPng();
    return `data:image/png;base64,${png.toString("base64")}`;
  });

  return logoDataUrl;
}

import { PortableText } from "next-sanity";
import { Button } from "@/components/button";
import type { HeroProps } from ".";
import { Image } from "@/components/image";
import { cn } from "@/lib/utils";

function getRelativeLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "");

  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

function shouldUseLightText(backgroundColor: string): boolean {
  const luminance = getRelativeLuminance(backgroundColor);
  return luminance < 0.5;
}

export function HighImpactHero({ block }: HeroProps) {
  const useLightText = block.backgroundColor?.hex
    ? shouldUseLightText(block.backgroundColor.hex)
    : true;

  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden">
      {block.backgroundImage && (
        <Image
          image={block.backgroundImage}
          className="pointer-events-none absolute inset-0 -z-10 object-cover"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          alt=""
        />
      )}

      {block.backgroundColor && (
        <div
          className="absolute inset-0 -z-20"
          style={{ backgroundColor: block.backgroundColor.hex }}
        />
      )}

      <div
        className={cn(
          "container flex flex-col items-center justify-center gap-8",
          useLightText && "text-primary-foreground",
        )}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold text-balance md:text-4xl lg:text-6xl">
            {block.title}
          </h1>

          {block.text && (
            <div
              className={cn(
                "prose prose-base md:prose-lg text-balance",
                useLightText && "prose-invert",
              )}
            >
              <PortableText value={block.text} />
            </div>
          )}
        </div>

        {block.buttons && (
          <div className="flex flex-wrap gap-4">
            {block.buttons.map((button) => (
              <Button key={button._key} button={button} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

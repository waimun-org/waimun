import { Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import { downloadUrlFor, getSanityImageAssetInfo } from "@/lib/image";
import type { Gallery as GalleryType } from "@/sanity/types";
import { formatDate } from "@/utils/date";
import * as Dialog from "@radix-ui/react-dialog";
import { DownloadIcon, XIcon } from "lucide-react";
import type { CSSProperties } from "react";

type GalleryImage = GalleryType["images"][number];

type GalleryImageViewerProps = {
  readonly image: GalleryImage;
};

function getGalleryViewerImageStyle(image: GalleryImage): CSSProperties {
  const assetInfo = getSanityImageAssetInfo(image);

  if (!assetInfo) {
    return {};
  }

  const heightToWidthRatio = assetInfo.height / assetInfo.width;
  const widthConstrainedHeight = `calc(${heightToWidthRatio * 100}vw - ${heightToWidthRatio * 2}rem)`;

  return {
    aspectRatio: `${assetInfo.width} / ${assetInfo.height}`,
    height: `min(calc(100dvh - 10rem), ${widthConstrainedHeight}, ${assetInfo.height}px)`,
  };
}

export function GalleryImageViewer({ image }: GalleryImageViewerProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-foreground/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 duration-200" />

      <Dialog.Content asChild>
        <figure className="bg-popover text-popover-foreground ring-foreground/10 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-fit max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl shadow-lg ring-1 duration-200 outline-none">
          <Dialog.Title className="sr-only">
            Image viewer: {image.alt}
          </Dialog.Title>

          <Dialog.Close asChild>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute top-3 right-3 z-10"
              aria-label="Close image viewer"
            >
              <XIcon aria-hidden="true" />
            </Button>
          </Dialog.Close>

          <Image
            image={image}
            alt={image.alt}
            priority
            className="h-auto max-h-[calc(100dvh-10rem)] w-auto max-w-[calc(100vw-2rem)] object-contain"
            style={getGalleryViewerImageStyle(image)}
            sizes="(min-width: 1024px) 80vw, 100vw"
            widths={[640, 960, 1280, 1600, 1920]}
          />

          <figcaption className="flex flex-col items-start gap-3 p-4">
            <Dialog.Description asChild>
              <time
                className="text-muted-foreground text-sm"
                dateTime={image.date}
              >
                {formatDate(image.date)}
              </time>
            </Dialog.Description>

            {image.asset && (
              <Button variant="secondary" size="sm" asChild>
                <a
                  href={downloadUrlFor(image.asset._ref)}
                  download
                  aria-label={`Download original image: ${image.alt}`}
                >
                  <DownloadIcon aria-hidden="true" />
                  Download
                </a>
              </Button>
            )}
          </figcaption>
        </figure>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

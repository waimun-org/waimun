import { Image } from "@/components/image";
import { GalleryImageViewer } from "@/components/blocks/gallery-image-viewer";
import type { Gallery as GalleryType } from "@/sanity/types";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

type GalleryProps = {
  readonly block: GalleryType;
};

type GalleryImage = GalleryType["images"][number];

/** Displays gallery images and opens the selected image in a modal viewer. */
export function Gallery({ block }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <Dialog.Root
      open={selectedImage !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedImage(null);
        }
      }}
    >
      <section className="container py-8 md:py-16">
        <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
          {block.images.map((image) => (
            <Dialog.Trigger asChild key={image._key}>
              <button
                type="button"
                className="mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg border"
                aria-label={`View image: ${image.alt}`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  image={image}
                  alt={image.alt}
                  priority={image.priority}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  widths={[320, 640, 960]}
                />
              </button>
            </Dialog.Trigger>
          ))}
        </div>

        {selectedImage && <GalleryImageViewer image={selectedImage} />}
      </section>
    </Dialog.Root>
  );
}

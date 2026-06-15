import {
  set,
  unset,
  type ArrayOfObjectsInputProps,
  type ArrayOfPrimitivesInputProps,
} from "sanity";
import {
  trimPortableTextBlocks,
  type PortableTextBlock,
} from "../lib/normalizers";

type ArrayInputProps = ArrayOfObjectsInputProps | ArrayOfPrimitivesInputProps;

export function TrimmingPortableTextInput(props: ArrayInputProps) {
  const { onChange, renderDefault, value } = props;

  return renderDefault({
    ...props,
    elementProps: {
      ...props.elementProps,
      onBlur: (event) => {
        props.elementProps.onBlur(event);

        if (!Array.isArray(value)) {
          return;
        }

        const normalized = trimPortableTextBlocks(value as PortableTextBlock[]);

        if (!normalized || normalized.length === value.length) {
          return;
        }

        onChange(normalized.length > 0 ? set(normalized) : unset());
      },
    },
  });
}

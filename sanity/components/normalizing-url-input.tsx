import { set, unset, type StringInputProps } from "sanity";
import { normalizeUrl } from "../lib/normalizers";

export function NormalizingUrlInput(props: StringInputProps) {
  const { onChange, renderDefault, value } = props;

  return renderDefault({
    ...props,
    elementProps: {
      ...props.elementProps,
      onBlur: (event) => {
        props.elementProps.onBlur(event);

        if (typeof value !== "string") {
          return;
        }

        const normalized = normalizeUrl(value);

        if (normalized !== value) {
          onChange(normalized ? set(normalized) : unset());
        }
      },
    },
  });
}

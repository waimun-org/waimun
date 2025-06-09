import { forwardRef } from "react";
import { Button, type buttonVariants } from "./ui/button";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Spinner } from "./spinner";
import type { SubmitState } from "@/hooks/use-form-submission";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

interface SubmitButtonProps extends Omit<ButtonProps, "variant" | "disabled"> {
  submitState: SubmitState;
  idleText?: string;
  submittingText?: string;
  successText?: string;
  errorText?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
}

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    {
      submitState,
      idleText = "Submit",
      submittingText = "Submitting",
      successText = "Success",
      errorText = "Try Again",
      disabled = false,
      variant,
      children,
      ...props
    },
    ref,
  ) => {
    const getButtonText = (): React.ReactNode => {
      if (children) return children;

      switch (submitState) {
        case "submitting":
          return submittingText;
        case "success":
          return successText;
        case "error":
          return errorText;
        case "idle":
        default:
          return idleText;
      }
    };

    const getButtonVariant = (): ButtonVariant => {
      switch (submitState) {
        case "success":
          return "success";
        case "error":
          return "destructive";
        case "submitting":
        case "idle":
        default:
          return variant ?? "default";
      }
    };

    const getIcon = (): React.ReactNode => {
      switch (submitState) {
        case "submitting":
          return <Spinner />;
        case "success":
          return <CheckCircleIcon />;
        case "error":
          return <XCircleIcon />;
        case "idle":
        default:
          return null;
      }
    };

    const isDisabled = disabled ?? submitState === "submitting";

    return (
      <Button
        ref={ref}
        type="submit"
        disabled={isDisabled}
        variant={getButtonVariant()}
        {...props}
      >
        {getIcon()}
        {getButtonText()}
      </Button>
    );
  },
);

SubmitButton.displayName = "SubmitButton";

import { useState, useCallback, useEffect } from "react";

export type SubmitState = "idle" | "submitting" | "success" | "error";

interface UseFormSubmissionOptions {
  autoClearDelay?: number;
}

interface FormSubmissionActions {
  submitState: SubmitState;
  setSubmitting: () => void;
  setSuccess: () => void;
  setError: () => void;
  setIdle: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  isIdle: boolean;
}

export function useFormSubmission(
  options: UseFormSubmissionOptions = {},
): FormSubmissionActions {
  const { autoClearDelay = 3000 } = options;
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const setSubmitting = useCallback(() => setSubmitState("submitting"), []);
  const setSuccess = useCallback(() => setSubmitState("success"), []);
  const setError = useCallback(() => setSubmitState("error"), []);
  const setIdle = useCallback(() => setSubmitState("idle"), []);

  useEffect(() => {
    if (submitState === "success" || submitState === "error") {
      const timeout = setTimeout(() => setSubmitState("idle"), autoClearDelay);
      return () => clearTimeout(timeout);
    }
  }, [submitState, autoClearDelay]);

  return {
    submitState,
    setSubmitting,
    setSuccess,
    setError,
    setIdle,
    isSubmitting: submitState === "submitting",
    isSuccess: submitState === "success",
    isError: submitState === "error",
    isIdle: submitState === "idle",
  };
}

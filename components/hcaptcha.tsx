"use client";

import HCaptchaComponent from "@hcaptcha/react-hcaptcha";
import { type UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "./ui/form";
import { useRef, useEffect } from "react";

export type HCaptchaFieldProps = {
  form: UseFormReturn<Record<string, unknown>>;
};

export function HCaptcha({ form }: HCaptchaFieldProps) {
  const hcaptchaRef = useRef<HCaptchaComponent>(null);
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!;

  useEffect(() => {
    if (form.formState.isSubmitted && hcaptchaRef.current) {
      hcaptchaRef.current.resetCaptcha();
    }
  }, [form.formState.isSubmitted]);

  return (
    <FormField
      control={form.control}
      name="hcaptchaToken"
      render={({ field }) => (
        <FormItem>
          <HCaptchaComponent
            ref={hcaptchaRef}
            sitekey={siteKey}
            onVerify={(token) => {
              field.onChange(token);
            }}
            onExpire={() => {
              field.onChange("");
            }}
            onError={() => {
              field.onChange("");
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

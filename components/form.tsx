"use client";

import type {
  Form as FormType,
  FormBuilder as FormBuilderType,
} from "@/sanity/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFormDefaultValues, getFormSchema } from "@/lib/form";
import { FormBuilder } from "./form-builder";
import { HCaptcha } from "./hcaptcha";
import { PortableText } from "next-sanity";
import { toast } from "sonner";
import { ChevronDownIcon, CheckCircleIcon } from "lucide-react";
import { Form as UIForm } from "./ui/form";
import { SubmitButton } from "./submit-button";
import { submitForm } from "@/app/(app)/forms/actions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { PaymentMethodDialog } from "./payment-method-dialog";
import { BankDetailsDialog } from "./bank-details-dialog";
import type { Price } from "@/utils/price";
import { useFormSubmission } from "@/hooks/use-form-submission";
import {
  usePaymentMethods,
  type PaymentMethod,
} from "@/hooks/use-payment-methods";

export type FormProps = {
  form: FormType & {
    content: FormBuilderType;
  };
  price?: Price | null;
};

export function Form({ form: formConfig, price }: FormProps) {
  const defaultValues = getFormDefaultValues(formConfig.content);
  const schema = getFormSchema(formConfig.content);
  const resolver = zodResolver(schema);
  const form = useForm({ defaultValues, resolver });

  const submission = useFormSubmission({ autoClearDelay: 3000 });
  const payment = usePaymentMethods(formConfig);

  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showBankDetailsDialog, setShowBankDetailsDialog] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const handleSubmit = async (
    data: Record<string, unknown>,
    selectedPaymentMethod?: PaymentMethod,
  ) => {
    submission.setSubmitting();

    const result = await submitForm({
      slug: formConfig.slug.current,
      formValues: data,
      paymentMethod: selectedPaymentMethod,
    });

    if (result.error) {
      payment.setPaymentMethod(null);
      submission.setError();
      toast.error(result.error);
      return;
    }

    if (result.redirect) {
      form.reset();
      payment.setPaymentMethod(null);
      submission.setSuccess();
      window.location.href = result.redirect;
      return;
    }

    if (result.reference) {
      setReference(result.reference);
      setShowBankDetailsDialog(true);
    }

    form.reset();
    payment.setPaymentMethod(null);
    submission.setSuccess();
  };

  const handlePaymentMethodSelect = async (selectedMethod: PaymentMethod) => {
    payment.setPaymentMethod(selectedMethod);
    setShowPaymentDialog(false);

    const formData = form.getValues() as Record<string, unknown>;
    await handleSubmit(formData, selectedMethod);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    const selectedMethod = payment.getSelectedPaymentMethod();

    if (payment.paymentConfig.hasMultiplePaymentMethods && !selectedMethod) {
      setShowPaymentDialog(true);
      return;
    }

    await handleSubmit(data, selectedMethod);
  };

  return (
    <>
      <section className="border-b">
        <div className="container flex flex-col gap-4 py-8">
          <h1 className="text-2xl font-bold text-balance md:text-4xl">
            {formConfig.title}
          </h1>
          <div className="prose max-w-none">
            <PortableText value={formConfig.description} />
          </div>
        </div>
      </section>

      <section className="container flex max-w-2xl flex-col gap-8 py-8">
        <Suspense fallback={null}>
          <PaymentStatus />
        </Suspense>

        <UIForm {...form}>
          <form
            className="flex flex-col gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormBuilder content={formConfig.content} form={form} />
            <HCaptcha form={form} />
            <SubmitButton
              id="submit"
              submitState={submission.submitState}
              idleText={payment.getSubmitButtonText()}
              disabled={form.formState.isSubmitting}
            />
          </form>
        </UIForm>

        <PaymentInformation price={price ?? formConfig.bankTransfer?.price} />
      </section>

      <PaymentMethodDialog
        isOpen={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
        onCreditCard={() => handlePaymentMethodSelect("stripe")}
        onBankTransfer={() => handlePaymentMethodSelect("bankTransfer")}
      />

      <BankDetailsDialog
        isOpen={showBankDetailsDialog}
        onClose={() => setShowBankDetailsDialog(false)}
        bankDetails={{
          accountName: formConfig.bankTransfer.accountName ?? "Not configured",
          accountNumber:
            formConfig.bankTransfer.accountNumber ?? "Not configured",
          reference: reference ?? "Pending",
          price: formConfig.bankTransfer.price ?? {
            _type: "price",
            unitAmount: 0,
            currency: "NZD",
          },
          instructions: formConfig.bankTransfer.instructions,
        }}
      />
    </>
  );
}

export function PaymentStatus() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("paymentStatus");

  if (paymentStatus === "success") {
    return (
      <Alert>
        <CheckCircleIcon className="h-4 w-4" />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>Your payment has been successful.</AlertDescription>
      </Alert>
    );
  }

  return null;
}

export function PaymentInformation({ price }: { price?: Price | null }) {
  if (!price) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: price.currency.toUpperCase(),
  }).format(price.unitAmount / 100);

  return (
    <Link
      href="#submit"
      className="bg-background/80 hover:bg-accent/80 hover:text-accent-foreground fixed bottom-8 left-1/2 flex h-8 -translate-x-1/2 items-center gap-1.5 rounded-md border px-2.5 text-sm shadow-xs backdrop-blur"
    >
      <p>{formattedPrice}</p>
      <ChevronDownIcon className="size-4" />
    </Link>
  );
}

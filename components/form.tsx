"use client";

import type {
  Form as FormType,
  FormBuilder as FormBuilderType
} from "@/sanity/types";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFormDefaultValues, getFormSchema } from "@/utils/form";
import { FormBuilder } from "./form-builder";
import { HCaptcha } from "./hcaptcha";
import { PortableText } from "next-sanity";
import { toast } from "sonner";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  LoaderCircleIcon
} from "lucide-react";
import { Form as UIForm } from "./ui/form";
import { submitForm } from "@/app/(app)/forms/actions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { PaymentMethodDialog } from "./payment-method-dialog";
import { BankDetailsDialog } from "./bank-details-dialog";

export type FormProps = {
  form: FormType & {
    content: FormBuilderType;
  };
  price?: Price | null;
};

export type Price = {
  unitAmount: number;
  currency: string;
};

type PaymentMethod = "stripe" | "bankTransfer";

export function Form({ form: formConfig, price }: FormProps) {
  const defaultValues = getFormDefaultValues(formConfig.content);
  const schema = getFormSchema(formConfig.content);
  const resolver = zodResolver(schema);
  const form = useForm({ defaultValues, resolver });
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showBankDetailsDialog, setShowBankDetailsDialog] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );

  const hasStripe = formConfig.stripe?.enabled && !!formConfig.stripe.priceId;
  const hasBankTransfer = formConfig.bankTransfer?.enabled;
  const hasPayment = hasStripe || hasBankTransfer;
  const hasMultiplePaymentMethods = hasStripe && hasBankTransfer;

  const handleSubmit = async (
    data: Record<string, unknown>,
    selectedPaymentMethod?: PaymentMethod
  ) => {
    const result = await submitForm({
      slug: formConfig.slug.current,
      formValues: data,
      paymentMethod: selectedPaymentMethod
    });

    if (result.error) {
      toast.error(result.error);
      return;
    }

    if (result.redirect) {
      window.location.href = result.redirect;
      return;
    }

    if (result.reference) {
      setReference(result.reference);
      setShowBankDetailsDialog(true);
    }

    form.reset();
    setPaymentMethod(null);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(null);
    }, 5000);
  };

  const handlePaymentMethodSelect = async (selectedMethod: PaymentMethod) => {
    setPaymentMethod(selectedMethod);
    setShowPaymentDialog(false);

    const formData = form.getValues() as Record<string, unknown>;
    await handleSubmit(formData, selectedMethod);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    const selectedMethod = getSelectedPaymentMethod();

    if (hasMultiplePaymentMethods && !selectedMethod) {
      setShowPaymentDialog(true);
      return;
    }

    await handleSubmit(data, selectedMethod);
  };

  const getSelectedPaymentMethod = (): PaymentMethod | undefined => {
    if (paymentMethod) return paymentMethod;
    if (hasStripe && !hasBankTransfer) return "stripe";
    if (hasBankTransfer && !hasStripe) return "bankTransfer";
    return undefined;
  };

  const getSubmitButtonText = () => {
    if (isSuccess) return "Success";
    if (!hasPayment) return "Submit";
    if (hasMultiplePaymentMethods) return "Continue to Payment";
    if (hasStripe) return "Pay with Card";
    if (hasBankTransfer) return "Pay via Bank Transfer";
    return "Submit";
  };

  return (
    <div>
      <section className="border-b">
        <div className="container flex flex-col gap-4 py-8">
          <h1 className="text-2xl font-bold md:text-4xl">{formConfig.title}</h1>
          <div className="prose">
            <PortableText value={formConfig.description} />
          </div>
        </div>
      </section>

      <section className="container flex max-w-2xl flex-col gap-8 py-8 md:py-16">
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
            <Button
              id="submit"
              type="submit"
              disabled={form.formState.isSubmitting}
              variant={isSuccess === true ? "success" : undefined}
            >
              {form.formState.isSubmitting && (
                <LoaderCircleIcon className="animate-spin" />
              )}
              {isSuccess === true && <CheckCircleIcon />}
              {getSubmitButtonText()}
            </Button>
          </form>
        </UIForm>

        <PaymentInformation price={price} />
      </section>

      {hasMultiplePaymentMethods && (
        <PaymentMethodDialog
          isOpen={showPaymentDialog}
          onClose={() => setShowPaymentDialog(false)}
          onCreditCard={() => handlePaymentMethodSelect("stripe")}
          onBankTransfer={() => handlePaymentMethodSelect("bankTransfer")}
        />
      )}

      {formConfig.bankTransfer?.enabled && (
        <BankDetailsDialog
          isOpen={showBankDetailsDialog}
          onClose={() => setShowBankDetailsDialog(false)}
          bankDetails={{
            accountName:
              formConfig.bankTransfer.accountName ?? "Not configured",
            accountNumber:
              formConfig.bankTransfer.accountNumber ?? "Not configured",
            reference: reference ?? "Pending",
            instructions: formConfig.bankTransfer.instructions
          }}
        />
      )}
    </div>
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

  if (!price.unitAmount || !price.currency) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: price.currency.toUpperCase()
  }).format(price.unitAmount / 100);

  return (
    <Link
      href="#submit"
      className="bg-background/80 hover:bg-accent/80 hover:text-accent-foreground fixed bottom-8 left-1/2 flex h-8 -translate-x-1/2 items-center gap-1.5 rounded-full border px-2.5 text-sm shadow-xs backdrop-blur"
    >
      <p>{formattedPrice}</p>
      <ChevronDownIcon className="size-4" />
    </Link>
  );
}

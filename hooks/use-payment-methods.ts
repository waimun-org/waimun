import { useState, useMemo } from "react";
import type { Form as FormType } from "@/sanity/types";

export type PaymentMethod = "stripe" | "bankTransfer";

interface PaymentConfig {
  hasStripe: boolean;
  hasBankTransfer: boolean;
  hasPayment: boolean;
  hasMultiplePaymentMethods: boolean;
}

interface UsePaymentMethodsReturn {
  paymentConfig: PaymentConfig;
  selectedPaymentMethod: PaymentMethod | null;
  setPaymentMethod: (method: PaymentMethod | null) => void;
  getSelectedPaymentMethod: () => PaymentMethod | undefined;
  getSubmitButtonText: () => string;
}

export function usePaymentMethods(
  formConfig: FormType,
): UsePaymentMethodsReturn {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const paymentConfig = useMemo((): PaymentConfig => {
    const hasStripe = formConfig.stripe?.enabled ?? false;
    const hasBankTransfer = formConfig.bankTransfer?.enabled ?? false;
    const hasPayment = hasStripe || hasBankTransfer;
    const hasMultiplePaymentMethods = hasStripe && hasBankTransfer;

    return {
      hasStripe,
      hasBankTransfer,
      hasPayment,
      hasMultiplePaymentMethods,
    };
  }, [formConfig.stripe?.enabled, formConfig.bankTransfer?.enabled]);

  const getSelectedPaymentMethod = (): PaymentMethod | undefined => {
    if (selectedPaymentMethod) return selectedPaymentMethod;
    if (paymentConfig.hasStripe && !paymentConfig.hasBankTransfer)
      return "stripe";
    if (paymentConfig.hasBankTransfer && !paymentConfig.hasStripe)
      return "bankTransfer";
    return undefined;
  };

  const getSubmitButtonText = (): string => {
    if (!paymentConfig.hasPayment) return "Submit";
    if (paymentConfig.hasMultiplePaymentMethods) return "Continue to Payment";
    if (paymentConfig.hasStripe) return "Pay with Card";
    if (paymentConfig.hasBankTransfer) return "Pay via Bank Transfer";
    return "Submit";
  };

  return {
    paymentConfig,
    selectedPaymentMethod,
    setPaymentMethod: setSelectedPaymentMethod,
    getSelectedPaymentMethod,
    getSubmitButtonText,
  };
}

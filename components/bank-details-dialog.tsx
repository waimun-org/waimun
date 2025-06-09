import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircleIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/price";
import type { Price } from "@/sanity/types";

export type BankDetails = {
  accountName: string;
  accountNumber: string;
  reference: string;
  price: Price;
  instructions?: string;
};

type BankDetailsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  bankDetails: BankDetails;
};

export function BankDetailsDialog({
  isOpen,
  onClose,
  bankDetails,
}: BankDetailsDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success(`${fieldName} copied to clipboard`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const fields = [
    {
      label: "Account Name",
      value: bankDetails.accountName,
      key: "accountName",
    },
    {
      label: "Account Number",
      value: bankDetails.accountNumber,
      key: "accountNumber",
      mono: true,
    },
    {
      label: "Reference",
      value: bankDetails.reference,
      key: "reference",
      mono: true,
    },
    {
      label: "Price",
      value: formatPrice(bankDetails.price),
      key: "price",
      mono: true,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Bank Transfer Details</DialogTitle>
          <DialogDescription>
            Use the following details to complete your bank transfer payment.
            Please include the reference number to ensure your payment is
            processed correctly.
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <CheckCircleIcon className="h-4 w-4" />
          <AlertDescription>
            Your form submission has been received. Please complete the payment
            using the bank details below.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {fields.map(({ label, value, key, mono }) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium">{label}</label>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "bg-muted/50 flex-1 rounded-md border px-3 py-2 text-sm",
                    mono && "font-mono",
                  )}
                >
                  {value}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  aria-label={`Copy ${label} to clipboard`}
                  onClick={() => copyToClipboard(value, label)}
                >
                  {copiedField === label ? (
                    <CheckCircleIcon className="h-4 w-4" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}

          {bankDetails.instructions && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Additional Instructions
              </label>
              <div className="bg-muted/50 rounded-md border px-3 py-2 text-sm">
                {bankDetails.instructions}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCardIcon, BuildingIcon } from "lucide-react";

type PaymentMethodDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreditCard: () => void;
  onBankTransfer: () => void;
};

export function PaymentMethodDialog({
  isOpen,
  onClose,
  onCreditCard,
  onBankTransfer
}: PaymentMethodDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
          <DialogDescription>
            Select how you would like to complete your payment.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={onCreditCard}
            variant="outline"
            className="flex h-auto flex-col items-center gap-3 p-6"
          >
            <CreditCardIcon className="h-8 w-8" />
            <div className="text-center">
              <div className="font-semibold">Credit Card</div>
              <div className="text-muted-foreground text-sm">
                Pay securely with your credit or debit card
              </div>
            </div>
          </Button>

          <Button
            onClick={onBankTransfer}
            variant="outline"
            className="flex h-auto flex-col items-center gap-3 p-6"
          >
            <BuildingIcon className="h-8 w-8" />
            <div className="text-center">
              <div className="font-semibold">Bank Transfer</div>
              <div className="text-muted-foreground text-sm">
                Transfer directly from your bank account
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

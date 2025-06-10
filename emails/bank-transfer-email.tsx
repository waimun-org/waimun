import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
  Img,
} from "@react-email/components";
import * as React from "react";

export interface BankTransferEmailProps {
  fullName?: string;
  accountName: string;
  accountNumber: string;
  reference: string;
  price: string;
  instructions?: string;
}

export const BankTransferEmail = ({
  fullName,
  accountName,
  accountNumber,
  reference,
  price,
  instructions,
}: BankTransferEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Payment is required to complete your submission</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto w-full max-w-[600px] p-8">
            <Img
              src="https://cdn.sanity.io/images/qs4butxl/production/0deb901f492621309f640cb22dca833424998c20-8380x2134.svg?h=80&q=75&fit=clip&auto=format&fm=png"
              alt="Waimun"
              className="mx-auto mb-8 h-[40px]"
            />

            <Text className="mb-8 text-base leading-relaxed text-neutral-700">
              Kia ora{fullName ? ` ${fullName}` : ""},
            </Text>

            <Text className="text-base leading-relaxed text-neutral-700">
              Thank you for your form submission! We appreciate your interest.
            </Text>

            <Text className="mb-8 text-base leading-relaxed text-neutral-700">
              To complete your submission, please make a bank transfer using the
              details provided below. Your submission will be processed once
              payment is received.
            </Text>

            <Heading className="mt-16 mb-8 text-center text-base leading-relaxed text-neutral-700">
              Bank Transfer Details 💳
            </Heading>

            <Text className="mb-8 text-base leading-relaxed text-neutral-700">
              Please use the following details to complete your payment:
            </Text>

            <div className="mb-8 rounded-lg bg-neutral-50 p-6">
              <Text className="my-2 text-base leading-relaxed text-neutral-700">
                <span className="font-bold">Account Name:</span>{" "}
                <span className="font-mono">{accountName}</span>
              </Text>

              <Text className="my-2 text-base leading-relaxed text-neutral-700">
                <span className="font-bold">Account Number:</span>{" "}
                <span className="font-mono">{accountNumber}</span>
              </Text>

              <Text className="my-2 text-base leading-relaxed text-neutral-700">
                <span className="font-bold">Reference:</span>{" "}
                <span className="font-mono">{reference}</span>
              </Text>

              <Text className="my-2 text-base leading-relaxed text-neutral-700">
                <span className="font-bold">Amount:</span>{" "}
                <span className="font-mono">{price}</span>
              </Text>
            </div>

            {instructions && (
              <>
                <Heading className="mt-16 mb-8 text-center text-base leading-relaxed text-neutral-700">
                  Additional Instructions 📝
                </Heading>

                <Text className="mb-8 text-base leading-relaxed text-neutral-700">
                  {instructions}
                </Text>
              </>
            )}

            <Heading className="mt-16 mb-8 text-center text-base leading-relaxed text-neutral-700">
              Important Information ⚠️
            </Heading>

            <Text className="text-base leading-relaxed text-neutral-700">
              Please ensure you include the reference number{" "}
              <span className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm font-medium">
                {reference}
              </span>{" "}
              with your payment. This helps us match your payment to your
              submission quickly and accurately.
            </Text>

            <Text className="mb-8 text-base leading-relaxed text-neutral-700">
              Once your payment is received, your submission will be confirmed
              and you&apos;ll receive further information via email if
              applicable.
            </Text>

            <Heading className="mt-16 mb-8 text-center text-base leading-relaxed text-neutral-700">
              Need Help? 🤝
            </Heading>

            <Text className="text-base leading-relaxed text-neutral-700">
              If you have any questions about the payment process or need
              assistance, please don&apos;t hesitate to contact us by replying
              to this email.
            </Text>

            <Text className="mb-8 text-base leading-relaxed text-neutral-700">
              We&apos;re here to make your payment process as smooth as
              possible!
            </Text>

            <Text className="mt-8 text-base leading-relaxed text-neutral-700">
              Ngā mihi nui,
              <br />
              Waimun Team
            </Text>

            <Hr />

            <Text className="text-sm leading-relaxed text-neutral-500">
              This is an automated message from Waimun. Please do not reply to
              this email unless you need assistance.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

BankTransferEmail.PreviewProps = {
  fullName: "James Blair",
  accountName: "Waimun",
  accountNumber: "12-3456-7890123-00",
  reference: "REF123456",
  price: "$50.00",
  instructions: "Please complete payment soon to secure your submission.",
} as BankTransferEmailProps;

export default BankTransferEmail;

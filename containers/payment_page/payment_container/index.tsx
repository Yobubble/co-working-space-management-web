"use client";
import { usePaymentStore } from "@/utils/stores/use_payment_store";
import PaymentForm from "./payment_form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function PaymentContainer() {
  const { service, data } = usePaymentStore();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (service === null || data === null) {
      router.replace("/reservation");
    }
  }, []);

  if (service === null || data === null) {
    toast({
      variant: "destructive",
      title: "Please select a service and fill in the required fields.",
    });
    return null;
  }

  return (
    <main className="w-full h-full">
      <PaymentForm service={service} data={data} />
    </main>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PayByBankTransfer } from "@/utils/actions/pay_by_bank_transfer";
import { PayByCreditCard } from "@/utils/actions/pay_by_credit_card";
import { PayByTrueWallet } from "@/utils/actions/pay_by_true_wallet";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { PaymentFormProps } from "@/utils/types/payment";
import { SERVICES } from "@/utils/enums/services";
import { MEMBERSHIP } from "@/utils/enums/membership";
import { RoomModel } from "@/utils/types/room";
import { useRoomsStore } from "@/utils/stores/use_rooms_store";

export default function PaymentForm(props: PaymentFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { updateRooms } = useRoomsStore();

  async function handlePayByBankTransfer(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await PayByBankTransfer(
      formData,
      props.service,
      props.data,
    );

    if (response.errorMsg !== "") {
      toast({
        variant: "destructive",
        title: response.errorMsg,
      });
    } else if (response.errorMsg === "") {
      toast({
        title: "Payment Success",
      });
      router.back();
    }
    updateRooms([]);
  }
  return (
    <main className="flex flex-col justify-center w-full h-full items-center gap-3">
      {props.service === SERVICES.membership ? (
        <h1 className="text-2xl font-bold">{props.data as MEMBERSHIP}</h1>
      ) : (
        <h1 className="text-2xl font-bold">
          Room ID: {(props.data as RoomModel).room_id.toString()}
        </h1>
      )}
      <Tabs defaultValue="bank_transfer" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="bank_transfer">Bank Transfer</TabsTrigger>
          <TabsTrigger value="credit_card">Credit Card</TabsTrigger>
          <TabsTrigger value="true_wallet">True Wallet</TabsTrigger>
        </TabsList>
        <TabsContent value="bank_transfer">
          <form onSubmit={handlePayByBankTransfer}>
            <Input
              type="number"
              name="account_number"
              placeholder="Account Number"
            />
            <Input type="text" name="account_name" placeholder="Account Name" />
            <Button type="submit">Pay</Button>
            {/* TODO: bank transfer */}
          </form>
        </TabsContent>
        <TabsContent value="credit_card">
          <form action={PayByCreditCard}>
            <Input
              type="number"
              name="credit_card_number"
              placeholder="Credit Card Number"
            />
            <Button type="submit">Pay</Button>
            {/* TODO: credit card */}
          </form>
        </TabsContent>
        <TabsContent value="true_wallet">
          <form action={PayByTrueWallet}>
            <Input
              type="number"
              name="truewallet_number"
              placeholder="True Wallet Number"
            />
            <Button type="submit">Pay</Button>
            {/* TODO: true wallet*/}
          </form>
        </TabsContent>
      </Tabs>
    </main>
  );
}

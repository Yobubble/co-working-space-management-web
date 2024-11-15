import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PayByBankTransfer } from "@/utils/actions/pay_by_bank_transfer";

export default function RoomReservationPaymentForm() {
  return (
    <main className="flex flex-col justify-center w-full h-full items-center gap-3">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="bank_transfer">Bank Transfer</TabsTrigger>
          <TabsTrigger value="credit_card">Credit Card</TabsTrigger>
          <TabsTrigger value="true_wallet">True Wallet</TabsTrigger>
        </TabsList>
        <TabsContent value="bank_transfer">
          <form action={PayByBankTransfer}>
            <Input
              type="number"
              name="account_number"
              placeholder="Account Number"
            />
            {/* TODO: bank transfer */}
          </form>
        </TabsContent>
        <TabsContent value="credit_card">
          <form action={PayByBankTransfer}>
            <Input
              type="number"
              name="account_number"
              placeholder="Account Number"
            />
            {/* TODO: credit card*/}
          </form>
        </TabsContent>
        <TabsContent value="true_wallet">
          <form action={PayByBankTransfer}>
            <Input
              type="number"
              name="account_number"
              placeholder="Account Number"
            />
            {/* TODO: true wallet*/}
          </form>
        </TabsContent>
      </Tabs>

      <form>
        <Input type="number" name="credit-card" />
        <h1>RoomReservationPayment</h1>
      </form>
    </main>
  );
}

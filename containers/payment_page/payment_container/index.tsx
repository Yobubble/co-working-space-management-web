"use client";
import { usePaymentStore } from "@/utils/stores/use_payment_store";
import MembershipPayment from "./membership_payment_form";
import RoomReservationPayment from "./room_reservation_payment_form";
import { SERVICES } from "@/utils/enums/services";

export default function PaymentContainer() {
  const { service } = usePaymentStore();

  if (service === SERVICES.membership) {
    return <MembershipPayment />;
  } else {
    return <RoomReservationPayment />;
  }
}

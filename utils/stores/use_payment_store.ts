import { create } from "zustand";
import { UsePaymentStoreProps } from "../types/payment";
import { SERVICES } from "../enums/services";
import { MEMBERSHIP } from "../enums/membership";
import { RoomModel } from "../types/room";
import { PAYMENT_TYPES } from "../enums/payment_types";

export const usePaymentStore = create<UsePaymentStoreProps>((set) => ({
  service: null,
  data: null,
  paymentType: PAYMENT_TYPES.bankTransfer,
  updateService: (service: SERVICES) => set(() => ({ service: service })),
  updateData: (data: MEMBERSHIP | RoomModel) => set(() => ({ data: data })),
  updatePaymentType: (paymentType: PAYMENT_TYPES) =>
    set(() => ({
      paymentType: paymentType,
    })),
}));

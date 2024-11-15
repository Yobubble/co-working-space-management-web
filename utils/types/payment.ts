import { MEMBERSHIP } from "../enums/membership";
import { PAYMENT_TYPES } from "../enums/payment_types";
import { SERVICES } from "../enums/services";
import { RoomModel } from "./room";

export interface UsePaymentStoreProps {
  service: SERVICES | null;
  data: MEMBERSHIP | RoomModel | null;
  paymentType: PAYMENT_TYPES;
  updateService: (service: SERVICES) => void;
  updateData: (data: MEMBERSHIP | RoomModel) => void;
  updatePaymentType: (paymentType: PAYMENT_TYPES) => void;
}

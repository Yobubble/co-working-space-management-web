import { MEMBERSHIP } from "../enums/membership";
import { PackageCardProps } from "../types/package_card";
import { IconStar, IconComet, IconMeteor } from "@tabler/icons-react";
export const packages: PackageCardProps[] = [
  {
    title: MEMBERSHIP.daily,
    icon: IconStar,
    privileges: ["Daily Reservation", "Custom Equipments"],
    price: "200฿/m",
  },
  {
    title: MEMBERSHIP.monthly,
    icon: IconComet,
    privileges: [
      "Monthly Reservation",
      "Custom Equipments",
      "Free Snacks and Drinks",
    ],
    price: "350฿/m",
  },
  {
    title: MEMBERSHIP.yearly,
    icon: IconMeteor,
    privileges: [
      "Yearly Reservation",
      "Customer Equipments",
      "Free Snacks and Drinks",
      "Access to VIP Lounge",
    ],
    price: "700฿/m",
  },
];

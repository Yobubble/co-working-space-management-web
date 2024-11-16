import { FC } from "react";
import { MEMBERSHIP } from "../enums/membership";

export interface PackageCardProps {
  title: MEMBERSHIP;
  icon: FC;
  privileges: string[];
  price: string;
}

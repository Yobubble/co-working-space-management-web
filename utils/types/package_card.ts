import { FC } from "react";

export interface PackageCardProps {
  title: string;
  icon: FC;
  privileges: string[];
  price: string;
}

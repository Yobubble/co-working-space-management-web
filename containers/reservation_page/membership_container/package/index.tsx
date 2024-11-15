"use client";
import PackageCard from "./package_card";
import { packages } from "@/utils/constants/packages";

export default function Packages() {
  return (
    <main className="flex gap-2 justify-center items-start">
      {packages.map((item, index) => (
        <PackageCard
          key={index}
          title={item.title}
          icon={item.icon}
          privileges={item.privileges}
          price={item.price}
        />
      ))}
    </main>
  );
}

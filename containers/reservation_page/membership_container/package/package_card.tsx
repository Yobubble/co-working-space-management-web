"use client";
import { PackageCardProps } from "@/utils/types/package_card";
import { usePaymentStore } from "@/utils/stores/use_payment_store";
import { SERVICES } from "@/utils/enums/services";
import { useRouter } from "next/navigation";

export default function PackageCard(props: PackageCardProps) {
  const { updateService, updateData } = usePaymentStore();
  const router = useRouter();

  function handleClick() {
    updateService(SERVICES.membership);
    updateData(props.title);
    router.push("/payment");
  }

  return (
    <main
      onClick={() => handleClick()}
      className="w-full h-full border-2 border-c1 rounded-xl flex flex-col justify-center items-start gap-6 cursor-pointer"
    >
      <props.icon />
      <h1 className="text-3xl font-semibold">{props.title}</h1>
      {props.privileges.map((privilege, index) => (
        <div key={index} className="flex gap-2 items-center">
          <div className="w-4 h-4 bg-c1 rounded-full"></div>
          <p>{privilege}</p>
        </div>
      ))}
      <h1 className="text-2xl font-semibold">{props.price}</h1>
    </main>
  );
}

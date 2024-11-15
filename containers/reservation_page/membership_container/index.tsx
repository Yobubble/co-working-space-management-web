import Packages from "./package";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function MembershipContainer() {
  return (
    <main className="w-full h-full">
      <Drawer>
        <DrawerTrigger>Apply Membership</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Together Stronger!</DrawerTitle>
          </DrawerHeader>
          <Packages />
        </DrawerContent>
      </Drawer>
    </main>
  );
}

import MembershipContainer from "@/containers/reservation_page/membership_container";
import ReserveContainer from "@/containers/reservation_page/reserve_container";

export default function ReservationPage() {
  return (
    <main className="w-full h-full">
      <MembershipContainer />
      <ReserveContainer />
    </main>
  );
}

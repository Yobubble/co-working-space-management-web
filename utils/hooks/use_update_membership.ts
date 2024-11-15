import { useMutation } from "@tanstack/react-query";
import { UpdateMembership } from "../actions/update_membership";

export function UseUpdateMembership(membership: string) {
  return useMutation({
    mutationFn: () => UpdateMembership(membership),
  });
}

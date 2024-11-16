import { useMutation } from "@tanstack/react-query";
import { UpdateMembership } from "../actions/update_membership";
import { MEMBERSHIP } from "../enums/membership";

export function UseUpdateMembership(membership: MEMBERSHIP) {
  return useMutation({
    mutationFn: () => UpdateMembership(membership),
  });
}

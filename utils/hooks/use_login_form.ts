import { useMutation } from "@tanstack/react-query";
import { LoginForm } from "../actions/login_form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function UseLoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await LoginForm(formData);
      return result;
    },
    onSuccess: (data) => {
      if (data.errorMsg) {
        toast({
          variant: "destructive",
          title: "Login Failed",
        });
        return;
      } else {
        toast({
          title: "Login Successful",
        });
        router.push("/reservation");
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    },
  });
}

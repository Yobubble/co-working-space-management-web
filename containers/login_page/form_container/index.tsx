"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseLoginForm } from "@/utils/hooks/use_login_form";

export default function FormContainer() {
  const { mutate } = UseLoginForm();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutate(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-1/4 w-1/4 flex flex-col justify-center items-center gap-6 border-[1px] border-c2 rounded-xl p-6"
    >
      <h1 className="text-4xl font-semibold text-c2">Login</h1>
      <section className="flex flex-col gap-3 h-full w-full">
        <Input type="text" name="username" placeholder="Username" />
        <Input type="password" name="password" placeholder="Password" />
      </section>
      <Button type="submit" className="bg-c2 hover:bg-c1">
        Submit
      </Button>
    </form>
  );
}

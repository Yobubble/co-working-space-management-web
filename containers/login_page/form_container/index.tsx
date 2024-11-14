import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginForm } from "@/utils/actions/login_form";

export default function FormContainer() {
  return (
    <form
      action={LoginForm}
      className="h-1/4 w-1/4 flex flex-col justify-center items-center gap-6 border-[1px] border-c2 rounded-xl p-6"
    >
      <h1 className="text-4xl font-semibold text-c2">Login</h1>
      <section className="flex flex-col gap-3 h-full w-full">
        <Input
          type="text"
          name="username"
          placeholder="Username"
          className="stro"
        />
        <Input type="password" name="password" placeholder="Password" />
      </section>
      <Button type="submit" className="bg-c2 hover:bg-c1">
        Submit
      </Button>
    </form>
  );
}

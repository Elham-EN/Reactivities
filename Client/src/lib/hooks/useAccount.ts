import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { LoginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";

export function useAccount() {
  const loginUser = useMutation({
    mutationFn: async (cred: LoginSchema) => {
      await agent.post("/login?useCookies=true", cred);
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  return {
    loginUser,
  };
}

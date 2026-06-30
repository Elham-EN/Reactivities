import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { LoginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";
import { type User } from "../types/index.type";

export function useAccount() {
  const queryClient = useQueryClient();

  const loginUser = useMutation({
    mutationFn: async (cred: LoginSchema): Promise<void> => {
      await agent.post("/login?useCookies=true", cred);
    },
    onError: (): void => {
      toast.error("Invalid email or password");
    },
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<User> => {
      const response = await agent.get<User>("/account/user-info");
      return response.data;
    },
  });

  return {
    loginUser,
    currentUser,
  };
}

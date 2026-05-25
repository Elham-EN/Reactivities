import { useQuery } from "@tanstack/react-query";
import type { Activitiy } from "../types/index.type";
import agent from "../api/agent";

export function useActivities() {
  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activitiy[]>("/Activities");
      return response.data;
    },
  });

  return { activities, isPending };
}

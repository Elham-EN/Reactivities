import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Activitiy } from "../types/index.type";
import agent from "../api/agent";

export function useActivities() {
  const queryClient = useQueryClient();

  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activitiy[]>("/Activities");
      return response.data;
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activitiy) => {
      await agent.put("/Activities", activity);
    },
    onSuccess: async () => {
      // This ensures the UI automatically shows the latest data
      // after any change.
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  return { activities, isPending, updateActivity };
}

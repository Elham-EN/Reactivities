import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { Activitiy } from "../types/index.type";
import agent from "../api/agent";

export function useActivity(id: string) {
  const { data: activity } = useSuspenseQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<Activitiy>(`/Activities/${id}`);
      return response.data;
    },
  });
  return { activity };
}

export function useActivities() {
  const queryClient = useQueryClient();

  const { data: activities, isPending } = useSuspenseQuery({
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

  const createActivity = useMutation({
    mutationFn: async (activity: Activitiy) => {
      const response = await agent.post("/Activities", activity);
      return response.data;
    },
    onSuccess: async () => {
      // This ensures the UI automatically shows the latest data
      // after any change.
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/Activities/${id}`);
    },
    onSuccess: async () => {
      // This ensures the UI automatically shows the latest data
      // after any change.
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  return {
    activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity,
  };
}

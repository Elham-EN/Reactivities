import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Activitiy } from "../types/index.type";

export function useActivities() {
  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await axios.get<Activitiy[]>(
        "https://localhost:5001/api/Activities",
      );
      return response.data;
    },
  });

  return { activities, isPending };
}

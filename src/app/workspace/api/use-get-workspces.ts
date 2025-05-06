import { useQuery } from "@tanstack/react-query";
import { Workspace } from "@/types/Workspace";

export const useGetWorkspaces = () => {
  return useQuery<Workspace[]>({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await fetch("/api/workspaces");
      if (!response.ok) {
        throw new Error("Failed to fetch workspaces");
      }
      return response.json();
    }
  });
};

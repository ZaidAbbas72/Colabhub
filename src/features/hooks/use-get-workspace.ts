import { useQuery } from "@tanstack/react-query";

interface Workspace {
  _id: string;
  name: string;
  workspaceId: string;
  ownerId: string;
  joinCode: string;
}

export const useGetWorkspace = (id: string | undefined) => {
  return useQuery({
    queryKey: ["workspace", id],
    queryFn: async () => {
      if (!id) return null;

      const response = await fetch(`/api/workspaces/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch workspace");
      }
      const data: Workspace = await response.json();
      return data;
    },
    enabled: !!id,
  });
}; 
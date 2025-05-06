import { useQuery } from "@tanstack/react-query";

export const useWorkspaceMember = (workspaceId: string | undefined) => {
  return useQuery({
    queryKey: ["workspace-member", workspaceId],
    queryFn: async () => {
      if (!workspaceId) return null;

      const response = await fetch(`/api/workspaces/${workspaceId}/member`);
      if (!response.ok) {
        throw new Error("Failed to fetch workspace membership");
      }
      return response.json();
    },
    enabled: !!workspaceId, // Only run query if workspaceId is provided
  });
}; 
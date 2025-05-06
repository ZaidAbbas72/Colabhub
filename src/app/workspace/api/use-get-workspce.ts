import { useEffect, useState } from "react";
import { Workspace } from "@/types/Workspace";
import { useWorkspaceId } from "@/features/hooks/use-workspace-id"; // Import the hook



export const useGetWorkspaceById = () => {
  const workspaceId = useWorkspaceId(); 
  const [data, setData] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("Fetching workspace with ID:", workspaceId);
    if (!workspaceId) {
      setIsLoading(false);
      return;
    }

    const fetchWorkspace = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(`/api/workspaces/${workspaceId}`); 
        if (!response.ok) {
          throw new Error(`Failed to fetch workspace: ${response.statusText}`);
        }

        const result: Workspace = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching workspace:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspace();
  }, [workspaceId]); // Dependency updated to workspaceId

  return { data, isLoading, isError };
};

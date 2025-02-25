import { useEffect, useState } from "react";
import { Workspace } from "@/types/Workspace";

export const useGetWorkspaceById = (id: string | null) => {
  const [data, setData] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return; // Prevent fetching if ID is null

    const fetchWorkspace = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(`/api/workspaces/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch workspace");
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
  }, [id]);

  return { data, isLoading, isError };
};

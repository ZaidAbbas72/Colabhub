import { useEffect, useState } from "react";
import { Workspace } from "@/types/Workspace";

export const useGetWorkspaces = () => {
  const [data, setData] = useState<Workspace[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const usegetWorkspaces = async () => {
      try {
        const response = await fetch("/api/workspaces"); // Call the API
        const result: Workspace[] = await response.json();
        setData(result);
        console.log("Workspaces:", result);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      } finally {
        setIsLoading(false);
      }
    };

    usegetWorkspaces();
  }, []);

  return { data, isLoading };
};

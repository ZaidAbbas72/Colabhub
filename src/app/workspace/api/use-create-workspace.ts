import { useMutation } from "@tanstack/react-query";
import { Workspace } from "@/types/Workspace";

interface RequestType {
  name: string;
  Emp_id: string;
}

export const useCreateWorkspace = () => {
  const mutation = useMutation<Workspace, Error, RequestType>({
    mutationFn: async (values) => {
      const response = await fetch("/api/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create workspace");
      }

      return response.json();
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

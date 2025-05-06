import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "@/app/workspace/store/use-create-workspace-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreateWorkspace } from "@/app/workspace/api/use-create-workspace";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Workspace } from "@/types/Workspace";
import { useCurrentUser } from "@/features/hooks/use-current-user";

export const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const [workspaceName, setWorkspaceName] = useState("");
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();
  const { mutate, isPending, isSuccess, isError, error } = useCreateWorkspace();

  const handleClose = () => {
    if (!isPending) {
      setOpen(false);
      setWorkspaceName("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;
    if (!user?.Emp_id) {
      toast("User data not available!");
      return;
    }

    mutate(
      {
        name: workspaceName,
        Emp_id: user.Emp_id,
      },
      {
        onSuccess: () => {
          toast("Workspace created successfully!");
          queryClient.invalidateQueries({ queryKey: ["workspaces"] });
          handleClose();
        },
        onError: () => {
          toast("Failed to create workspace!");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            disabled={isPending}
            required
            placeholder="Workspace name"
          />
          {isError && (
            <p className="text-red-500 text-sm">
              {error?.message || "An error occurred."}
            </p>
          )}
          {isSuccess && (
            <p className="text-green-500 text-sm">Workspace created!</p>
          )}{" "}
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

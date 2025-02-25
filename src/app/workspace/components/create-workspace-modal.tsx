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
  import { useCreateWorkspace } from "@/app/workspace/use-create-workspace";
  import { toast } from "sonner"
  import { Workspace } from "@/types/Workspace";
  
  export const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const [workspaceName, setWorkspaceName] = useState("");
    const { mutate, data, isPending, isSuccess, isError, error } = useCreateWorkspace(); // ✅ Kept `data` & `isSuccess`
    
  
    const handleClose = () => {
      if (!isPending) {
        setOpen(false);
        setWorkspaceName("");
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!workspaceName.trim()) return;
  
      mutate(
        { name: workspaceName, ownerId: "12345" }, // Replace with actual user ID
        {
          onSuccess: (data: Workspace) => {
            toast("Workspace created successfully!"); // ✅ Corrected
            handleClose();
          },
          onError: () => {
            toast("Failed to create workspace!", ); // ✅ Corrected
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
            {isError && <p className="text-red-500 text-sm">{error?.message || "An error occurred."}</p>}
            {isSuccess && <p className="text-green-500 text-sm">Workspace created!</p>} {/* ✅ Displays success message */}
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
  
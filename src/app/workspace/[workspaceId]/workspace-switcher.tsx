import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useGetWorkspaceById } from "@/app/workspace/api/use-get-workspce";
import { useGetWorkspaces } from "@/app/workspace/api/use-get-workspces";
import { Workspace } from "@/types/Workspace";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const WorkspaceSwitcher = () => {
  const Router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data: currentWorkspace } = useGetWorkspaceById();
  const {
    data: workspaces,
    isLoading: workspaceloading,
    refetch,
  } = useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter(
    (workspace: Workspace) => workspace._id !== currentWorkspace?._id
  );

  useEffect(() => {
    if (!open) {
      refetch();
    }
  }, [open, refetch]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
          {workspaceloading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            currentWorkspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() =>
            Router.push(`/workspace/${currentWorkspace?.workspaceId}`)
          }
          className="cursor-pointer flex-col justify-start items-start capitalize"
        >
          {currentWorkspace?.name}
          <span className="text-xs text-muted-foreground">
            Current Workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace: Workspace) => (
          <DropdownMenuItem
            key={workspace.workspaceId}
            className="cursor-pointer capitalize overflow-hidden"
            onClick={() => Router.push(`/workspace/${workspace.workspaceId}`)}
          >
            <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md items-center justify-center">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate"> {workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="size-9 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-lg rounded-md items-center justify-center">
            <Plus />
          </div>
          Create a new Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

"use client";

import { useWorkspaceId } from "@/features/hooks/use-workspace-id";
import { useWorkspaceMember } from "@/features/hooks/use-workspace-member";
import { useGetWorkspace } from "@/features/hooks/use-get-workspace";
import { cn } from "@/lib/utils";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  // If no workspaceId, show appropriate message
  if (!workspaceId) {
    return (
      <div className="h-full p-4 bg-background">
        <div>No workspace selected</div>
      </div>
    );
  }

  const { data: member, isLoading: memberLoading } =
    useWorkspaceMember(workspaceId);
  const { data: workspace, isLoading: workspaceLoading } =
    useGetWorkspace(workspaceId);

  if (memberLoading || workspaceLoading) {
    return (
      <div className="h-full p-4 bg-background">
        <div>Loading...</div>
      </div>
    );
  }

  if (!member || !workspace) {
    return (
      <div className="h-full p-4 bg-background">
        <div>Not a member of this workspace</div>
      </div>
    );
  }

  return (
    <div className="h-full bg-background">
      <div className="p-4">
        <h2 className="text-lg font-semibold">{workspace.name}</h2>
        <div className="mt-2 text-sm text-gray-500">
          Your Role: {member.role}
        </div>

        <nav className="mt-6 space-y-1">
          <div
            className={cn(
              "px-2 py-1.5 rounded-md transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "cursor-pointer text-sm font-medium"
            )}
          >
            Dashboard
          </div>
          <div
            className={cn(
              "px-2 py-1.5 rounded-md transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "cursor-pointer text-sm font-medium"
            )}
          >
            Members
          </div>
          <div
            className={cn(
              "px-2 py-1.5 rounded-md transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "cursor-pointer text-sm font-medium"
            )}
          >
            Settings
          </div>
        </nav>
      </div>
    </div>
  );
};

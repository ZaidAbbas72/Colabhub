"use client";
import Member from "@/models/members";
import { useWorkspaceId } from "@/features/hooks/use-workspace-id";
import { useWorkspaceMember } from "@/features/hooks/use-workspace-member";
import { useGetWorkspace } from "@/features/hooks/use-get-workspace";
import {
  Home,
  MessageSquare,
  Bell,
  MoreHorizontal,
  Settings,
  Users,
} from "lucide-react";
import { WorkspaceHeader } from "./components/workspace-header";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: memberLoading } =
    useWorkspaceMember(workspaceId);
  const { data: workspace, isLoading: workspaceLoading } =
    useGetWorkspace(workspaceId);

  if (!workspaceId) {
    return (
      <div className="h-full bg-[#A1BF83]">
        <div className="p-4">No workspace selected</div>
      </div>
    );
  }

  if (memberLoading || workspaceLoading) {
    return (
      <div className="h-full bg-[#A1BF83]">
        <div className="p-4">Loading...</div>
      </div>
    );
  }

  if (!member || !workspace) {
    return (
      <div className="h-full bg-[#A1BF83]">
        <div className="p-4">Not a member of this workspace</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#A1BF83] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
    </div>
  );
};

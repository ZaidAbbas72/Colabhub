"use client";
import { useEffect, useMemo } from "react";
import { useGetWorkspaces } from "@/app/workspace/use-get-workspces";
import { HomePage } from "@/app/home/home-page";
import { useCreateWorkspace } from "@/app/workspace/use-create-workspace";
import { useCreateWorkspaceModal } from "@/app/workspace/store/use-create-workspace-modal";
import { Workspace } from "@/types/Workspace";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkspaceModal();

  // Get the ID of the first workspace if available
  const workspaceId = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return undefined;
    return data[0]._id;
  }, [data]);

  console.log("data:", data);
  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
     router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      console.log("open creation model");
      setOpen(true);
    }
  }, [isLoading, workspaceId, open, setOpen]);

  return <HomePage />;
}

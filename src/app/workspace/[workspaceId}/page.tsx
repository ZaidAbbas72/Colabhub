"use client";

import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
  const params = useParams();

  console.log("🔍 Debug - Params Object:", params);

  if (!params || Object.keys(params).length === 0) {
    console.error("🚨 Params are empty! Check your route structure.");
  }

  const workspaceId = Array.isArray(params._id)
    ? params._id[0]
    : params._id;

  console.log("✅ Extracted Workspace ID:", workspaceId);

  return workspaceId || null;
};

const WorkspacePage = () => {
  const workspaceId = useWorkspaceId();
  return <div>ID: {workspaceId ? workspaceId.toString() : "null"}</div>;
};

export default WorkspacePage;

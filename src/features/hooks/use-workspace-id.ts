"use client";

import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
    const params = useParams();
    
    // Handle different types and ensure we return string | undefined
    if (!params?.workspaceId) {
        return undefined;
    }

    // Handle case where workspaceId might be an array
    const workspaceId = Array.isArray(params.workspaceId) 
        ? params.workspaceId[0] 
        : params.workspaceId;

    return workspaceId;
};

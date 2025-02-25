"use client";

import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
    const params = useParams();

    // Ensure workspaceId is always a string
    const workspaceId = Array.isArray(params._id) ? params._id[0] : params._id;

    return workspaceId || null; // Return null if undefined
};

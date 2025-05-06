"use client";
import { useWorkspaceId } from "@/features/hooks/use-workspace-id";
import { useGetWorkspaceById } from "@/app/workspace/api/use-get-workspce";
const WorkspacePage = () => {
  const workspaceId = useWorkspaceId();
  const {data} = useGetWorkspaceById();
  return <div> id : {workspaceId}; 
  <pre>{JSON.stringify(data, null, 2)}</pre>  
             
          </div>;
};

export default WorkspacePage;

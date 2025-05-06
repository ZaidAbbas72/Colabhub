import { Button } from "@/components/ui/button";
import { Info, Search } from "lucide-react";
import { use } from "react";
import { useWorkspaceId } from "@/features/hooks/use-workspace-id";
import { useGetWorkspaceById } from "@/app/workspace/api/use-get-workspce";
export const Toolbar = () => { 
    const workspaceId = useWorkspaceId();
    const {data, isLoading} = useGetWorkspaceById();
    return(
        <nav className="bg-[#88AA6B] flex items-center justify-center w-full px-4 py-2">
            <div className="flex-1"/>
            <div className="min-w-[200px] max-[624px] grow-[2] shrink">
                <Button size="sm" className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2">
                    <Search className="size-4 mr-2 text-white" />
                    <span className="text-white text-xs">
                    {isLoading ? "Loading..." : `Search ${data?.name || "Workspace"}`}
                    </span>
                </Button>
            </div>
            <div className="ml-auto flex-1 items-center justify-end">
                <Button variant="transparent" size = "iconSm">
                    <Info className="size-5 text-white" />
                </Button>

            </div>
        </nav>
    ); 

};
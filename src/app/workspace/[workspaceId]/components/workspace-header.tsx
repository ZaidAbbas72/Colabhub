import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Workspace } from "@/types/Workspace";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";

interface WorkspaceHeaderProps {
  workspace: Workspace;
  isAdmin?: boolean;
}

export const WorkspaceHeader = ({
  workspace,
  isAdmin,
}: WorkspaceHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"transparent"}
            className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
            size="sm"
            aria-label="Workspace menu"
            aria-expanded="false"
          >
            <span className="truncate">
              {workspace.name || "Untitled Workspace"}
            </span>
            <ChevronDown className="size-4 ml-1 shrink-0"></ChevronDown>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="start"
          className="w-64 bg-gray-100 rounded-md shadow-md p-2"
        >
          <DropdownMenuItem className="cursor-pointer capitalize flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md">
            <div className="size-9 relative overflow-hidden bg-gray-700 text-white font-semibold text-xl rounded-md flex items-center justify-center">
              {workspace.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex flex-col items-start">
              <p className="font-bold text-black">
                {workspace.name || "Untitled Workspace"}
              </p>
              <p className="text-xs text-gray-500">Active Workspace</p>
            </div>
          </DropdownMenuItem>
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer py-2">
                Invite people to {workspace.name}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer py-2">
                Preferences
              </DropdownMenuItem>
            </>
          )}

        </DropdownMenuContent>
      </DropdownMenu>
      <div className=" flex items-center gap-0.5">
        <Button variant={"transparent"} size="iconSm">
            <SquarePen className="size-4" />
        </Button>
        <Button variant={"transparent"} size="iconSm">
            <ListFilter className="size-4" />
        </Button>
      </div>
    </div>
  );
};

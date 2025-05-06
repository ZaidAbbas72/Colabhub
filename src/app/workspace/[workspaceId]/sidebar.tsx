import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";
import { UserButton } from "@/app/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { SidebarButton } from "./sidebar-button"


export const Sidebar = () => { 
    return (
        <aside className="w-[70px] h-full bg-[#88AA6B]  flex flex-col gap-y-4 items-center">
            <WorkspaceSwitcher/>
            <SidebarButton icon={Home} label="Home" isActive />
            <SidebarButton icon={MessageSquare} label="Dms"/>
            <SidebarButton icon={Bell} label="Activity"/>
            <SidebarButton icon={MoreHorizontal} label="more"/>
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                <UserButton/>
            </div>
        </aside>
    );
};
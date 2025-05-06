"use client";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { Children } from "react";
import { Toolbar } from "./toolbar";
import { Sidebar } from "./sidebar";
import { ResizableHandle,
        ResizablePanel,
        ResizablePanelGroup
 } from "@/components/ui/resizable";

interface workSpaceIdLayoutProps {
    children: React.ReactNode;
};

const workSpaceIdLayout = ({children}: workSpaceIdLayoutProps) => {
    return(<div className="h-full">
        <Toolbar/>
        <div className="flex h-[calc(100vh-40px)]">
        <Sidebar/>
        <ResizablePanelGroup direction="horizontal"
            autoSaveId="za-workspace-layout"
        >
            <ResizablePanel 
                defaultSize={20}
                minSize={11}
                className="bg-[#A1BF83]"
            >
                <WorkspaceSidebar/>
                <div>
                    Channel Sidebar
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>
          {children}
            </ResizablePanel>
            </ResizablePanelGroup>  
        
        </div>
        </div>)   
}

export default workSpaceIdLayout;
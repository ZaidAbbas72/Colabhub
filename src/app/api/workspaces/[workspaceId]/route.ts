import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Workspace from "@/models/workspace";

export async function GET(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  await dbConnect(); 
  console.log( "params:", params.workspaceId)

  try {
    const {workspaceId } = params; 
    console.log("Fetching workspace with workspaceId:", workspaceId);

    if (!workspaceId) {
      return NextResponse.json({ message: "Workspace ID is required" }, { status: 400 });
    }

    
    const workspace = await Workspace.findOne({ workspaceId: workspaceId});

    if (!workspace) {
      return NextResponse.json({ message: "Workspace not found" }, { status: 404 });
    }

    return NextResponse.json(workspace, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching workspace:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

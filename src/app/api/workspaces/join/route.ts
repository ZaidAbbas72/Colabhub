import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Workspace from "@/models/workspace";
import Member from "@/models/members";
import { getDataFromUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const userData = getDataFromUser(req);
    if (!userData?.emp_id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { joinCode } = await req.json();
    if (!joinCode) {
      return NextResponse.json({ message: "Join code is required" }, { status: 400 });
    }

    // Find workspace by join code
    const workspace = await Workspace.findOne({ joinCode });
    if (!workspace) {
      return NextResponse.json({ message: "Invalid join code" }, { status: 404 });
    }

    // Check if user is already a member
    const existingMember = await Member.findOne({
      Emp_id: userData.emp_id,
      workspaceId: workspace.workspaceId
    });

    if (existingMember) {
      return NextResponse.json({ message: "Already a member of this workspace" }, { status: 400 });
    }

    // Add user as a member
    await Member.create({
      Emp_id: userData.emp_id,
      workspaceId: workspace.workspaceId,
      workspaceName: workspace.name,
      role: "member"
    });

    return NextResponse.json({ 
      message: "Successfully joined workspace",
      workspace: {
        name: workspace.name,
        workspaceId: workspace.workspaceId
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Error joining workspace:", error);
    return NextResponse.json(
      { message: "Error joining workspace", error: error.message },
      { status: 500 }
    );
  }
} 
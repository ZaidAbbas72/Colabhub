import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Workspace from "@/models/workspace";
import Member from "@/models/members";
import { nanoid } from "nanoid";
import mongoose from 'mongoose';
import { getDataFromUser } from "@/lib/auth";
import { generateJoinCode } from "@/lib/utils";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    // Get the authenticated user's data
    const userData = getDataFromUser(req);
    
    if (!userData?.emp_id) {
      return NextResponse.json([], { status: 200 });
    }

    // Only return workspaces owned by this user
    const workspaces = await Workspace.find({ ownerId: userData.emp_id });

    return NextResponse.json(workspaces, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching workspaces:", error);
    return NextResponse.json(
      { message: "Error fetching workspaces", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const bodyText = await req.text();
    if (!bodyText) {
      return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
    }

    const { name, Emp_id } = JSON.parse(bodyText);
    console.log("Received workspace name:", name);

    if (!name || !Emp_id) {
      return NextResponse.json({ message: "Workspace name and Employee ID are required" }, { status: 400 });
    }

    const workspaceId = nanoid(8);
    const joinCode = await generateJoinCode();
    
    // Create workspace
    const newWorkspace = await Workspace.create({
      name,
      workspaceId,
      ownerId: Emp_id,
      joinCode
    });

    // Make the creator an admin with workspace name
    await Member.create({
      Emp_id,
      workspaceId,
      workspaceName: name,
      role: "admin" // Workspace creator is automatically an admin
    });

    console.log("Created workspace:", newWorkspace);
    return NextResponse.json(newWorkspace, { status: 201 });

  } catch (error: any) {
    console.error("Error creating workspace:", error);
    return NextResponse.json(
      { message: "Error creating workspace", error: error.message },
      { status: 500 }
    );
  }
}

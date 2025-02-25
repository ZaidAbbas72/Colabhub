import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Workspace from "@/models/workspace";
import { nanoid } from "nanoid";


export async function GET() {
  await dbConnect(); // Ensure MongoDB connection

  try {
    const workspaces = await Workspace.find({});
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
  await dbConnect(); // Ensure MongoDB connection

  try {
    const bodyText = await req.text(); // Read raw request body
    if (!bodyText) {
      return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
    }

    const { name } = JSON.parse(bodyText); // Manually parse JSON
    console.log("Received workspace name:", name);

    if (!name) {
      return NextResponse.json({ message: "Workspace name is required" }, { status: 400 });
    }

    const workspaceId = nanoid(8);
    const newWorkspace = await Workspace.create({
      name,
      workspaceId // Use workspaceId instead of id
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

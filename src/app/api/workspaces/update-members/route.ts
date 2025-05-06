import { NextResponse } from "next/server";
import { updateMemberWorkspaceNames } from "../update-members";

export async function POST() {
  try {
    await updateMemberWorkspaceNames();
    return NextResponse.json({ message: "Member records updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating members:", error);
    return NextResponse.json(
      { message: "Error updating members", error: error.message },
      { status: 500 }
    );
  }
} 
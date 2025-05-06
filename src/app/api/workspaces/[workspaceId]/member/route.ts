import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Member from "@/models/members";
import { getDataFromUser } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  await dbConnect();

  try {
    const userData = getDataFromUser(req);
    
    if (!userData?.emp_id) {
      return NextResponse.json(null, { status: 200 });
    }

    // Check if user is a member of this workspace
    const member = await Member.findOne({
      workspaceId: params.workspaceId,
      Emp_id: userData.emp_id
    }).lean();

    if (!member) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(member, { status: 200 });
  } catch (error: any) {
    console.error("Error checking membership:", error);
    return NextResponse.json(
      { message: "Error checking membership", error: error.message },
      { status: 500 }
    );
  }
} 
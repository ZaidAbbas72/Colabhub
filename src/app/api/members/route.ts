import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Member from "@/models/members";
import { getDataFromUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Get user data from JWT token
    const userData = getDataFromUser(req);
    
    // If no user data, return empty array
    if (!userData?.Emp_id) {
      return NextResponse.json([], { status: 200 });
    }

    await dbConnect();

    // Query members collection using the Emp_id
    const members = await Member.find({ Emp_id: userData.Emp_id });

    return NextResponse.json(members, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { message: "Error fetching members", error: error.message },
      { status: 500 }
    );
  }
} 
import { getDataFromUser } from "@/app/helpers/getuserdata";
import dbconnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await dbconnect(); // Ensure DB is connected

        const {name, email} = getDataFromUser(request);
        if (!email) {
            return NextResponse.json({ error: "Unauthorizzed" }, { status: 401 });
        }

        const user = await User.findOne({ email }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User data fetched successfully",
            user,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

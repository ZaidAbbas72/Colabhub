import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import User from "@/models/User"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect()

export async function POST(req: Request) {
  try {
    await dbConnect(); 

    const userdata = await req.json();
    const {email, password } = userdata;
    const user = await User.findOne({ email, password }); 

    if (user) {
      const tokendata = {
        id: user._id,
        name: user.First_name,
        email: user.email,
        emp_id: user.Emp_id 
      }
      const token =  await jwt.sign(tokendata, process.env.JWT_SECRET as string,
         { expiresIn: "1h" });
         const Response = NextResponse.json({
          message: "Login successful",
          success: true,
         });
         Response.cookies.set("token", token, {
          httpOnly: true,
         });
         return Response;


      return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }

  
}

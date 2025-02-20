import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User"; 
import bcrypt from "bcryptjs";
import { hash } from "crypto";
import { hashPassword } from "@/lib/utils";


export async function POST(req: Request) {
  try {
    await dbConnect();
    const reqbody = await req.json();
    const { First_name, Last_name, Emp_id, email, password } = reqbody;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    

    const newUser = new User({ First_name, Last_name, Emp_id, email, password:password,hashpassword:hashedPassword  });
    await newUser.save();
    console.log(newUser);

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

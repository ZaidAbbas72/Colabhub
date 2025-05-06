import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import dbConnect from "./dbConnect";
import { verifyPassword } from "./utils";

export const getDataFromUser = (request: NextRequest) => {
  try {
    // Retrieve token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    // Verify and decode token
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decodedToken) {
      throw new Error("Unauthorized: Invalid token");
    }

    return decodedToken; // Return full user data (id, name, email, emp_id)
  } catch (error: any) {
    console.error("Token Verification Error:", error.message);
    throw new Error("Unauthorized: Invalid or expired token");
  }
};

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await verifyPassword(credentials.password, user.hashpassword);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          Emp_id: user.Emp_id,
          name: `${user.First_name} ${user.Last_name}`
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.Emp_id = user.Emp_id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.Emp_id = token.Emp_id;
        session.user.name = token.name;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

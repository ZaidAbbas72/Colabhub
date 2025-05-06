import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    Emp_id: string;
    name: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      Emp_id: string;
      name: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    Emp_id: string;
    name: string;
  }
} 
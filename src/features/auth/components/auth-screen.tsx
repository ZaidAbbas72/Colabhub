"use client";
import { useState } from "react";
import { SignInFlow } from "../types";

export const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn");

    return (
        <div className="h-screen bg-[#5C3858] flex items-center justify-center">
        <p className="text-white text-lg">Auth Screen: signIn</p>
      </div>
    

    );
};

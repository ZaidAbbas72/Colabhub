"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Import the Button component
import { useRouter } from "next/navigation";
import { UserButton } from "../components/user-button"; // Import useRouter for navigation

export const HomePage = () => {
  const router = useRouter();


  return (
    <div className="relative flex items-center justify-center h-screen">
      <div className="absolute top-0 left-0 m-4">
        <UserButton/>
      </div>
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-green-600">
            Successfully Logged In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-700">Welcome to CollabHub</p>
        </CardContent>
      </Card>
    </div>
  );
};

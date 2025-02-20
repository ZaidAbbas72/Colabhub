"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrentUser } from "@/features/hooks/use-current-user";
import { Loader } from "lucide-react";

export const UserButton = () => {
  const { result, isLoading } = useCurrentUser();
  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }
  if (!result) {
    return null;
  }

  const { name, email } = result as { name?: string; email?: string };

  console.log("User name:", name);
  console.log("User email:", email);


  if (!name || !email) {
    return null;
  }
  const avatarFallback = name.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-25 transition">
          <AvatarImage />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem>
          <div className="flex flex-col">
            <span className="font-bold">{name}</span>
            <span className="text-sm text-muted-foreground">{email}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/features/hooks/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { handleLogout } from "@/app/helpers/logout"; // Import handleLogout
import { useRouter } from "next/navigation";
export const UserButton = () => {
  const { user, isLoading } = useCurrentUser();
  const router = useRouter();

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!user) {
    return null;
  }

  console.log("User Data:");

  const { First_name, email } = user;
  console.log("name:", First_name);
  console.log("email:", email);

  if (!First_name || !email) {
    console.warn("⚠️ User data is incomplete:");
    return null;
  }

  const avatarFallback = First_name.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-25 transition">
          <AvatarImage />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem onClick={() => handleLogout(router)}>
          <LogOut className="size-4 mr-2" />
          logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

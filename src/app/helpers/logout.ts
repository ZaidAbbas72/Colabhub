import { useRouter } from "next/navigation";

export const handleLogout = async (router: ReturnType<typeof useRouter>) => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      router.push("/"); // Redirect to the login page after successful logout
    } else {
      // Handle error
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("An error occurred during logout", error);
  }
};
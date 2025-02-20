import { useState, useEffect } from "react";
import { User } from "@/types/user";

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      console.log(" Fetching user data...");

      try {
        const res = await fetch("/api/auth/current-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("❌ API Error:", errorData.error || "Unknown error");
          setUser(null);
          return;
        }

        const data: User = await res.json();

        if (data && data.email) {
          console.log("✅ User data fetched successfully:");
          setUser(data);
        } else {
          console.warn("⚠️ User data is incomplete or missing:");
          setUser(null);
        }
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading };
};

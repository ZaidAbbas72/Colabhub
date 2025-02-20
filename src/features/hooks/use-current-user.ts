import { useState, useEffect } from "react";

export const useCurrentUser = () => {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            console.log("Fetching user data...");
            try {
                const res = await fetch("/api/auth/current-user", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }); // Call API route
                const result = await res.json();

                console.log("API Response:", result);

                if (res.ok) {
                    setResult(result); // Directly store the result
                } else {
                    console.error(result.error);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { result, isLoading };
};

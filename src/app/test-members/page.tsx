"use client";

import { useState, useEffect } from "react";

export default function TestMembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch("/api/members", {
          credentials: "include", // Important: This sends cookies with the request
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMembers(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  if (loading) {
    return <div className="p-4">Loading members...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
        <p className="mt-2 text-sm">
          Make sure you are logged in and have a valid JWT token in your
          cookies.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Memberships</h1>

      {members.length === 0 ? (
        <p>
          No memberships found. You might not be logged in or have no
          memberships.
        </p>
      ) : (
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member._id} className="border p-4 rounded-lg">
              <p>
                <strong>Workspace ID:</strong> {member.workspaceId}
              </p>
              <p>
                <strong>Role:</strong> {member.role}
              </p>
              <p>
                <strong>Employee ID:</strong> {member.Emp_id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

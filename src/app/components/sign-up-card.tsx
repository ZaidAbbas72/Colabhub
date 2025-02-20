import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { SignInFlow } from "@/features/types";
import { useState } from "react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [First_name, setFirst_name] = useState("");
  const [Last_name, setLast_name] = useState("");
  const [Emp_id, setEmp_id] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ For success message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ First_name, Last_name,Emp_id,email, password }),
      });

      if (res.ok) {
        setSuccess("Account created successfully! Now you can log in."); 
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        const data = await res.json();
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Use Your Email to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handleSubmit}>
        <input
            value={First_name}
            onChange={(e) => setFirst_name(e.target.value)}
            placeholder="First Name"
            type="First_name"
            required
            className="border p-2 w-full"
          />
         <input
            value={Last_name}
            onChange={(e) => setLast_name(e.target.value)}
            placeholder="Last name"
            type="Last_name"
            required
            className="border p-2 w-full"
          />
           <input
            value={Emp_id}
            onChange={(e) => setEmp_id(e.target.value)}
            placeholder="employee Id"
            type="emp_id"
            required
            className="border p-2 w-full"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            className="border p-2 w-full"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            className="border p-2 w-full"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            required
            className="border p-2 w-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>} 
          <Button type="submit" className="w-full bg-[#171717] text-white rounded-full" size="lg">
            Create
          </Button>
        </form>
        <Separator />
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign-in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

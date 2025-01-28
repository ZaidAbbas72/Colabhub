import { Card,  CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "postcss";
import { Separator } from "@radix-ui/react-separator";
import { SignInFlow } from "@/features/types";
import { useState } from "react";

interface SignInCardprops {
    setState: (state: SignInFlow) => void;
};


export const SignInCard = ({setState}: SignInCardprops) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");


    return  (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                Login to Continue
                </CardTitle>
            <CardDescription className="space-y-9">
                Use Your Email or Other Options To continue
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <input disabled ={false}
                    value={email}
                    onChange={(e)  => setEmail (e.target.value)}
                    placeholder="Email"
                    type="email"
                    required/>
                    <input disabled ={false}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="Password"
                    required/>
                    <Button  type="submit" className="w-full bg-[#171717] text-white rounded-full"  disabled={false} size="lg" variant= "outline"> Continue</Button>
                    
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    {<Button disabled={false} onClick={()=>{}} size="lg"  variant="outline" >
                        Continue with Google
                    </Button>}
                </div>
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account ? <span onClick={() => setState("signUp")} className="text-sky-700 hover:underline cursor-pointer "> Sign-up</span>
                </p>
            </CardContent>
        </Card>
    );
};
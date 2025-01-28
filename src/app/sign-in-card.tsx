// import  {FcGoogle}  from "./react-ic";
// import {FaGithub }  from "react-icon/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "postcss";
import { Separator } from "@radix-ui/react-separator";
export const SignInCard = () => {
    return  (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                Login to Continue
                </CardTitle>
            <CardDescription className="space-y-9">
                Use Your Email Or other Options To continue
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <input disabled ={false}
                    value=""
                    onChange={() => {}}
                    placeholder="Email"
                    type="email"
                    required/>
                    <input disabled ={false}
                    value=""
                    onChange={() => {}}
                    placeholder="Password"
                    type="Password"
                    required/>
                    <button  type="submit" className="w-full bg-[#171717] text-white rounded-full"  disabled={false} size="lg" variant= "outline" > Continue</button>
                    
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    {/* <button disabled={false} onClick={()=>{}} size="lg"  variant="outline" size= "lg" >
                        Continue with Google
                    </button> */}
                     <button disabled={false} onClick={()=>{}}   variant= "outline" className="w-full relative" >
                        {/* <FcGoogle className= "size-5 absolute top-3 left 2.5/> */}
                         Continue with Google</button>
                     <button disabled={false} onClick={()=>{}}  variant= "outline" className="w-full relative" >
                        {/* <FcGoogle className= "size-5 absolute top-3 left 2.5/> */}
                         Continue with Github</button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account ? <span className="text-sky-700 hover:underline cursor-pointer "> Sign-up</span>
                </p>
            </CardContent>
        </Card>
    );
};
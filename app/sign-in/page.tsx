"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react";
import { signIn } from "@/lib/auth/auth.client"
import { useRouter } from "next/navigation"

export default function SignIn(){
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")

    const router = useRouter();
   async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        setLoading(true)
        try{
            const result = await signIn.email({
                email,
                password
            })
            if (result.error){
                setError(result.error.message ?? "Failed to Log In")
            }else{
                router.push("/dashboard")
            }
        }catch(err){
            setError("Failed to login :" + err)
        }finally{
            setLoading(false)
        }
    }
    return(
        <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] shadow-2xl ">
            <Card className="w-lg text-center p-5">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Log In </CardTitle>
                    <CardDescription>Log-In and start tracking your job applications</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    {error?<p className="bg-red-300 text-red-500 rounded-sm py-1">{error}</p>:null}
                 
                    <div className="mt-5">
                        <Label className="mb-1 ml-0.5" htmlFor="email">Email</Label>
                        <Input value={email} onChange={(e)=>setEmail(e.target.value)} id="email" type="email" placeholder="mel@gmail.com" required></Input>
                    </div>
                    <div className="mt-5">
                        <Label className="mb-1 ml-0.5" htmlFor="password">Password</Label>
                        <Input value={password} onChange={(e)=>setPassword(e.target.value)} id="password" type="password" placeholder="raimelS" required></Input>
                    </div>

           
                    <CardFooter className="bg-white flex justify-center gap-1 flex-col border-0">
                        <Button type="submit" size={"sm"} className="py-1 px-4">{loading?"Logging In":"Log In"}</Button>
                        <p className="text-gray-500 text-xs">doesn't have an account ? <Link className="text-[#FFCD54] hover:underline" href={"/sign-up"}>Sign in</Link></p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
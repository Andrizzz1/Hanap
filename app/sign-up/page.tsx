"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { signUp } from "@/lib/auth/auth.client"
import { useRouter } from "next/navigation"
export default function SignUp() {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    

    const router = useRouter();
    async function handleSubmit(e:React.FormEvent){
        e.preventDefault() 
        setLoading(true)
        try{
            const result = await signUp.email({
                name: `${firstname} ${lastname}`.trim(),
                fname: firstname,
                lname: lastname,
                email,
                password
            });

            if (result.error){
                setError(result.error.message ?? "Failed to Sign UP")
            }else{
                router.push('/dashboard')
            }
        }catch(err){
            setError("Something went wrong")
        }finally{
            setLoading(false)
        }
    }
    return(
        <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] shadow-2xl ">
            <Card className="w-lg text-center p-5">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Sign Up </CardTitle>
                    <CardDescription>Create an account to start tracking your job applications</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    {/*Full name */}
                    <div>
                        <div className="grid grid-cols-2 gap-1">

                            <div>
                                <Label htmlFor="fname">First Name</Label>
                                <Input id="fname" 
                                       type="text"
                                        value={firstname}
                                        onChange={(e)=>setFirstName(e.target.value)}
                                        placeholder="raimel" required></Input>
                            </div>
                            <div>
                                <Label htmlFor="lname">Last Name</Label>
                                <Input id="lname" 
                                        type="text" 
                                         value={lastname}
                                        onChange={(e)=>setLastName(e.target.value)}                                       
                                        placeholder="santiago" required></Input>
                            </div>
                        </div>
                        <div className="mt-5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" 
                                    type="email" 
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}                                    
                                    placeholder="mel@gmail.com" required></Input>
                        </div>
                        <div className="mt-5">
                            {error? <p className="bg-red-500 text-xs text-white rounded p-0.5 mb-1">{error}</p>:null}
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" 
                            type="password" 
                            value={password}
                            maxLength={8}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="raimelS" required></Input>
                        </div>

                    </div>
                    <CardFooter className="bg-white flex justify-center gap-1 flex-col">
                        <Button type="submit" size={"sm"} className="py-1 px-4" disabled={loading}>Sign Up</Button>
                        <p className="text-gray-500 text-xs">Already have an account ? <Link className="text-[#FFCD54] hover:underline" href={"/sign-in"}>Sign in</Link></p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
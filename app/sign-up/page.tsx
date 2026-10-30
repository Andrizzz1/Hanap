import { Card, CardHeader, CardTitle, CardDescription, CardFooter} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function signUp() {
    return(
        <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] shadow-2xl ">
            <Card className="w-lg text-center p-5">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Sign Up </CardTitle>
                    <CardDescription>Create an account to start tracking your job applications</CardDescription>
                </CardHeader>
                <form action="">
                    {/*Full name */}
                    <div>
                        <div className="grid grid-cols-2 gap-1">

                            <div>
                                <Label htmlFor="fname">First Name</Label>
                                <Input id="fname" type="text" placeholder="raimel" required></Input>
                            </div>
                            <div>
                                <Label htmlFor="lname">Last Name</Label>
                                <Input id="lname" type="text" placeholder="santiago" required></Input>
                            </div>
                        </div>
                        <div className="mt-5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="mel@gmail.com" required></Input>
                        </div>
                        <div className="mt-5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="raimelS" required></Input>
                        </div>

                    </div>
                    <CardFooter className="bg-white flex justify-center gap-1">
                        <Button type="submit" size={"sm"} className="py-1 px-4">Sign Up</Button>
                        <p className="text-gray-500 text-xs">Already have an account ? <Link className="text-[#FFCD54] hover:underline" href={"/sign-in"}>Sign in</Link></p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
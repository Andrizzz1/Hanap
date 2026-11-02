import {Button} from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "@/lib/auth/auth";
import { Ghost } from "lucide-react";
export default async function Navbar() {
    const session = await getSession();
    return(
        <>

        <div className="px-20 flex items-center justify-between">
            <Link href="/">
                <img className="w-25" src="/logo.png" alt="logo" />
            </Link>
        <div className="flex gap-4 ">
    {session ?<>
        <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
        </Link>
        

    </>: <>
            <Link href="/sign-in">
                <Button variant="ghost" className="text-lg">
                    Log In
                </Button>
            </Link>
            <Link href="/sign-up">
                <Button className="text-lg">Sign Up</Button>
            </Link>
            </>}
        </div>
        </div>
        </>
    )
}
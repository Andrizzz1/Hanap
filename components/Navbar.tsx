import {Button} from "@/components/ui/button";
import Link from "next/link";
export default function Navbar() {
    return(
        <div className="px-20 flex items-center justify-between">
            <Link href="/">
                <img className="w-25" src="/logo.png" alt="logo" />
            </Link>
            <div className="flex gap-4 ">
                <Link href="/sign-in">
                    <Button variant="ghost" className="text-lg">
                        Log In
                    </Button>
                </Link>
                <Link href="/sign-up">
                    <Button className="text-lg">Sign Up</Button>
                </Link>
            </div>
        </div>
    )
}
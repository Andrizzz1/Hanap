"use client"

import {Button} from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "@/lib/auth/auth.client";
import { signOut } from "@/lib/auth/auth.client";
import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "./ui/avatar";
export default function Navbar() {
    const {data: session}=useSession()
    const router = useRouter()
    return (
      <>
        <div className="px-20 flex items-center justify-between">
          <Link href="/">
            <img className="w-25" src="/logo.png" alt="logo" />
          </Link>
          <div className="flex gap-4">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost">
                            <Avatar>
                                <AvatarFallback className="bg-black text-white">
                                    {session.user.fname[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className=" w-40">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel >
                                <div>
                                    <p>{session.user.name}</p>
                                    <p>{session.user.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuItem onClick={async ()=> {await signOut();
                                                  router.push("/sign-in")}}>Log Out</DropdownMenuItem>
                    
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-lg">
                    Log In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="text-lg">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </>
    );
}
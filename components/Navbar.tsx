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
import { Avatar, AvatarFallback, AvatarImage  } from "./ui/avatar";
import ChangeProfile from "./ChangeProfile-Popup";
import { useState } from "react";
import { Mascot } from "page-mascot";
import { mascots } from "./MascotWidget";

export default function Navbar() {
    const {data: session}=useSession()
    const [changeProfile,setChangeProfile] = useState(false)
    const router = useRouter()

    const profileImage = session?.user.image;
    console.log(profileImage)
    const isMascot = mascots.some(
      (mascot) => mascot.name === profileImage
    );

    return (
      <>
        <div className="px-20 flex items-center justify-between">
          <Link href="/">
            <img className="w-25" src="/logo.png" alt="logo" />
          </Link>
          <div>
            {session ? (
              <>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost">
                            <Avatar>
                              {isMascot && profileImage ?
                             ( <AvatarFallback>
                          
                                <Mascot
                                  directions={`/mascots/${session.user.image}-directions.webp`}
                                  reactions={`/mascots/${session.user.image}-reactions.webp`}
                                  size={30}
                                  label={profileImage}
                                />
                              </AvatarFallback>
                              ):(
                                <>
                                {profileImage &&(
                                  <AvatarImage
                                    src={profileImage}
                                    alt="Profile picture"
                                  />
                                )}
                                <AvatarFallback className="bg-black text-white">
                                    {session.user.fname[0].toUpperCase()}
                                </AvatarFallback>
                                
                                </>)
                
                              }
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
                            <DropdownMenuItem onClick={()=>setChangeProfile(true)}>Change profile</DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={async ()=> {await signOut();
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
        {changeProfile?(<ChangeProfile onClose={()=> setChangeProfile(false)}/>):null}
      </>
    );
}
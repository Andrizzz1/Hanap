"use client"


import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "./ui/avatar";
import { useSession } from "@/lib/auth/auth.client";
import { X } from "lucide-react";
import MascotWidget from "@/components/MascotWidget";
type ChangeProfileProps = {
  onClose: () => void;
};
export default function ChangeProfile({onClose}:ChangeProfileProps){
    const{ data:session} = useSession()

    return <div className="min-h-screen min-w-screen  absolute bg-black/25">
        <div className="flex justify-center items-center min-h-screen">
            <div className="relative bg-white shadow-2xl w-2xl p-2.5 rounded-2xl">
                <div className="flex gap-1 text-xs text-gray-500">
                    <Avatar>
                        <AvatarFallback>{session?.user.fname[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1>Change Profile Picture</h1>
                        <p>Choose a profile picture from our collection or upload your own.</p>

                    </div>
                </div>
                <hr className="my-1.5"/>

                <p className="font-bold">Select Profiles:</p>
                <MascotWidget />
                <div  onClick={onClose} className="absolute top-0 right-1.5 p-3 rounded-full hover:bg-black/10">
                    <X />
                </div>
            </div>
        </div>

        
    </div>
}
"use client"


import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "./ui/avatar";
import { useSession, authClient } from "@/lib/auth/auth.client";
import { X } from "lucide-react";
import MascotWidget from "@/components/MascotWidget";
import { CircleFadingArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
type ChangeProfileProps = {
  onClose: () => void;
};

export default function ChangeProfile({onClose}:ChangeProfileProps){
    const{ data:session} = useSession()
     const fileInputRef = useRef<HTMLInputElement>(null);
     const [selectedFile, setSelectedFile] = useState<File | null>(null);

    async function uploadProfileImage() {
        if (!selectedFile) return;

        try {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
            throw new Error(result.error || "Upload failed");
            }

            const { error } = await authClient.updateUser({
            image: result.url,
            });

            if (error) throw new Error(error.message);
        } catch (error) {
            console.error(error);
        }
        }

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
                <div className="flex justify-between">
                <p className="font-bold">Select Profiles:</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (file) {
                        setSelectedFile(file);
                    }
                    }}
                />
                <Button onClick={uploadProfileImage} variant="outline" size="lg">
                    <CircleFadingArrowUpIcon />
                    <p>Upload Profile</p>
                </Button>
                </div>

                <MascotWidget  />
                <div  onClick={onClose} className="absolute top-0 right-1.5 p-3 rounded-full hover:bg-black/10">
                    <X />
                </div>
            </div>
        </div>

        
    </div>
}
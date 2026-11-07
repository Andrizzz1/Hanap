
"use client";

import { Mascot } from "page-mascot";
import {authClient, useSession } from "@/lib/auth/auth.client";

export const mascots=[
  {name:'fox'},
  {name:'glasses'},
  {name:'cap'},
  {name:'pug'},
  {name:'cat'},
  {name:'ballerina'},
]

export default function MascotWidget() {
  const {data: session}=useSession()
  
  async function handleChangeProfile(mascotName: string){
    if (!session) return;

      try{
        const {error} = await authClient.updateUser({
          image:mascotName,
        })

        if (error) {
          console.error(error.message);
          return;
        }
      }catch(err){
        console.log(err)
      }
    }
  return (
    <div className="flex flex-wrap items-center">

      {mascots.map((mascot)=>(
        <div key={mascot.name} onClick={()=>handleChangeProfile(mascot.name)}>
          <Mascot
            directions={`/mascots/${mascot.name}-directions.webp`}
            reactions={`/mascots/${mascot.name}-reactions.webp`}
            size={120}
            label={mascot.name}
          />
        </div>
      ))}  
    </div>

  );
}

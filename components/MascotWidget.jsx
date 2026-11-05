
"use client";

import { Mascot } from "page-mascot";
import { useState } from "react";
import { useSession } from "@/lib/auth/auth.client";

const mascots=[
  {name:'fox'},
  {name:'glasses'},
  {name:'cap'},
  {name:'pug'},
  {name:'cat'},
  {name:'ballerina'},
]

export default function MascotWidget() {
  const [profile,setProfile] = useState()
  
    function handleChangeProfile(){
      const {data: session}=useSession()
      try{
        session.user.image == profile
      }catch(err){
        console.log(err)
      }
    }
  return (
    <div className="flex flex-wrap">
      {mascots.map((mascot,i)=>(
        <div key={i} onMouseEnter={()=>{setProfile(mascot.name)}} onClick={handleChangeProfile}>
          <Mascot
            directions={`/mascots/${mascot.name}-directions.webp`}
            reactions={`/mascots/${mascot.name}-reactions.webp`}
            size={120}
            label={mascot.name}
          />
        </div>
      ))}  
      <p>{profile}</p>
    </div>

  );
}

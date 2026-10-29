import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

import Link from "next/link";
export default function Home() {
  return (
    <div>
      <main>
        {/*Hero Section */}
        <section className="flex flex-col items-center justify-center px-10 py-40 w-screen md:w-3xl mx-auto text-center gap-3">
          <h1 className="text-6xl font-bold">Your Job <span className="text-[#FFCD54]">Search</span> ,  <span className="text-[#FFCD54]">Organized</span>  in One Place</h1>
          <p className="text-gray-500">Discover the right opportunities, track your applications, and take control of your career journey. hanap helps you stay organized and move closer to your dream job.</p>
          <Link href="/sign-up">
            <Button size="lg" className="text-lg px-8 py-5">
              Start for Free
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <div className="flex gap-4 ">
            <p className="flex items-center gap-1 "> 
              <CircleCheck size={15} className="text-indigo-600"/> Track applications</p>
            <p className="flex items-center gap-1">  
               <CircleCheck size={15} className="text-indigo-600"/> Stay organized</p>
            <p className="flex items-center gap-1">   
              <CircleCheck size={15} className="text-indigo-600"/> Discover jobs</p>
          </div>
        </section>
      </main>
    </div>
  );
}

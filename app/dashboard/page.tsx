import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import MarkDashboardVisited from "@/components/MarkDashboardVisited";
import { Card, CardHeader,CardTitle, CardContent } from "@/components/ui/card";
import { Award, Calendar, CheckCircle2 ,Mic, XCircle ,MoreVertical, Trash2} from "lucide-react";
import { DropdownMenu ,DropdownMenuTrigger, DropdownMenuContent,DropdownMenuItem} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const COLUMN_CONFIG: Array<{color: string; icon: React.ReactNode; name:string}> =[
  {
    color:"bg-cyan-500",
    icon: <Calendar className="h-4 w-4"/>,
    name:"Wish List"
  },
  {
    color:"bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4"/>,
    name:"Applied"
  },
  {
    color:"bg-green-500",
    icon: <Mic className="h-4 w-4"/>,
    name:"Interviewing"
  },
  {
    color:"bg-yellow-500",
    icon: <Award className="h-4 w-4"/>,
    name:"Offer"
  },
  {
    color:"bg-red-500",
    icon: <XCircle className="h-4 w-4"/>,
    name:"Rejected"
  },
]
export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const hasVisited = session.user.hasVisitedDashboard === true;

  return (
    <main className="w-full max-w-7xl mx-auto">
        <div className=" p-4 rounded-lg">
            <h1 className="text-4xl font-semibold">
                {hasVisited
                ? `Welcome back, ${session.user.fname}!`
                : `Hello, ${session.user.fname}!`}
            </h1>
            <MarkDashboardVisited hasVisited={hasVisited} />
            
            <p className="text-gray-500 text-sm my-3">Find Jobs and Organize</p>
          <hr />
        </div>

        <div className="flex flex-wrap gap-4 px-4">
       {COLUMN_CONFIG.map((column,key)=>(
           <Card key={key} className="min-w-0 flex-[1_1_220px] p-0 shadow-xl">
                  <CardHeader className={`${column.color} py-1 text-white`}>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-0.5">
                          {column.icon}
                          <CardTitle>{column.name}</CardTitle>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button variant="ghost">
                              <MoreVertical />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent>
                            <DropdownMenuItem><Trash2 /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="min-h-100"></CardContent>
            </Card>       

        ))}             
        </div>
 

    </main>
  );
}
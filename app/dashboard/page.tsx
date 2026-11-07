import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import MarkDashboardVisited from "@/components/MarkDashboardVisited";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const hasVisited = session.user.hasVisitedDashboard === true;

  return (
    <main>
        <div className="bg-yellow-200 w-7xl mx-auto p-4 rounded-lg">
            <h1 className="text-4xl font-semibold">
                {hasVisited
                ? `Welcome back, ${session.user.fname}!`
                : `Hello, ${session.user.fname}!`}
            </h1>
            <MarkDashboardVisited hasVisited={hasVisited} />
        </div>
    </main>
  );
}
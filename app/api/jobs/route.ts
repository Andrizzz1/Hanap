  const jobs = [
  { id: 1, title: "Frontend Developer" },
  { id: 2, title: "Backend Developer" },
  { id: 3, title: "Software Engineer" },
  { id: 4, title: "IT Intern" },+
  { id: 5, title: "UI/UX Designer" },
  { id: 6, title: "Data Analyst" },
];

//tp enable ai suggestion again (ctrl + , ) and search chat.disableAIFeatures
export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const search = searchParams.get("search")?.trim();
    const location = searchParams.get("location")?.trim();
    
    // const filteredJobs = jobs.filter((job) => job.title.toLowerCase().includes(search?.toLowerCase() || "") && job.location.toLowerCase().includes(location?.toLowerCase() || ""));
  return Response.json({ jobs: filteredJobs });
}

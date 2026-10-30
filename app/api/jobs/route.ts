const jobs = [
  { id: 1, title: "Frontend Developer" },
  { id: 2, title: "Backend Developer" },
  { id: 3, title: "Software Engineer" },
  { id: 4, title: "IT Intern" },
  { id: 5, title: "UI/UX Designer" },
  { id: 6, title: "Data Analyst" },
];



//tp enable ai suggestion again (ctrl + , ) and search chat.disableAIFeatures
export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    // const search = searchParams.get("search")?.trim();
    // const location = searchParams.get("location")?.trim();
    
    // const filteredJobs = jobs.filter((job) => job.title.toLowerCase().includes(search?.toLowerCase() || "") && job.location.toLowerCase().includes(location?.toLowerCase() || ""));
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const startIndex = (page - 1 ) * limit;
    const endIndex = startIndex + limit
    const pagination = jobs.slice(startIndex,endIndex)
  return Response.json({ jobs: pagination , pagination: {
    "currentPage":page,
    "limit":limit,
    "totalJobs":jobs.length,
    "totalPages":Math.ceil(jobs.length / limit)
  }});
}

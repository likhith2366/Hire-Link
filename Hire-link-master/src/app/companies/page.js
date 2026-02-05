import { fetchJobsForCandidateAction, fetchProfileAction } from "@/actions";
import Companies from "@/components/companies";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CompaniesPage() {
  const { userId } = await auth();
  const profileInfo = await fetchProfileAction(userId);

  if (!profileInfo) redirect("/onboard");
  const jobsList = await fetchJobsForCandidateAction({});

  return <Companies jobsList={jobsList} />;
}

export default CompaniesPage;

import {
  fetchJobApplicationsForCandidate,
  fetchJobsForCandidateAction,
} from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { auth } from "@clerk/nextjs/server";

export default async function Activity() {
  const { userId } = await auth();
  const jobList = await fetchJobsForCandidateAction();
  const jobApplicants = await fetchJobApplicationsForCandidate(userId);

  return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants} />;
}

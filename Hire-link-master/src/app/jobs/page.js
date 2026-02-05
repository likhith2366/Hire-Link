import {
  createFilterCategoryAction,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { auth } from "@clerk/nextjs/server";

async function JobsPage({ searchParams }) {
  console.log(searchParams, "searchParams");
  const { userId } = await auth();
  const profileInfo = await fetchProfileAction(userId);

  const jobList =
    profileInfo?.role === "candidate"
      ? await fetchJobsForCandidateAction(searchParams)
      : await fetchJobsForRecruiterAction(userId);

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationsForCandidate(userId)
      : await fetchJobApplicationsForRecruiter(userId);

  const fetchFilterCategories = await createFilterCategoryAction();

  return (
    <JobListing
      user={{ id: userId }}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={getJobApplicationList}
      filterCategories={fetchFilterCategories}
    />
  );
}

export default JobsPage;

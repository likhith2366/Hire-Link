import { fetchProfileAction } from "@/actions";
import OnBoard from "@/components/on-board";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function OnBoardPage() {
  //get the auth user from clerk
  const { userId } = await auth();

  //fetch the profile info -> either user is candidate / user is recruiter
  const profileInfo = await fetchProfileAction(userId);

  if (profileInfo?._id) {
    if (profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser)
      redirect("/membership");
    else redirect("/");
  } else return <OnBoard />;
}

export default OnBoardPage;

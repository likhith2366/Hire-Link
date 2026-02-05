import { fetchProfileAction } from "@/actions";
import Membership from "@/components/membership";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function MembershipPage() {
  const { userId } = await auth();
  const profileInfo = await fetchProfileAction(userId);
  if (!profileInfo) redirect("/onboard");

  return <Membership profileInfo={profileInfo} />;
}

export default MembershipPage;

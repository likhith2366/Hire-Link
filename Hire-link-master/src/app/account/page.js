import { fetchProfileAction } from "@/actions";
import AccountInfo from "@/components/account-info";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function AccountPage() {
  const { userId } = await auth();
  const profileInfo = await fetchProfileAction(userId);
  if (!profileInfo) redirect("/onboard");
  return <AccountInfo profileInfo={profileInfo} />;
}

export default AccountPage;

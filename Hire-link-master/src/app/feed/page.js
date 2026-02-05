import { fetchAllFeedPostsAction, fetchProfileAction } from "@/actions";
import Feed from "@/components/feed";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function FeedPage() {
  const { userId } = await auth();
  const profileInfo = await fetchProfileAction(userId);
  if (!profileInfo) redirect("/onboard");

  const allFeedPosts = await fetchAllFeedPostsAction();

  return (
    <Feed
      allFeedPosts={allFeedPosts}
      user={{ id: userId }}
      profileInfo={profileInfo}
    />
  );
}

export default FeedPage;

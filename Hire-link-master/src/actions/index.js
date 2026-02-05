"use server";

import connectToDB from "@/database";
import Application from "@/models/application";
import Feed from "@/models/feed";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//create profile action
export async function createProfileAction(formData, pathToRevalidate) {
  await connectToDB();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
}

export async function fetchProfileAction(id) {
  await connectToDB();
  const result = await Profile.findOne({ userId: id });

  return JSON.parse(JSON.stringify(result));
}

//create job action

export async function postNewJobAction(formData, pathToRevalidate) {
  await connectToDB();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
}

//fetch job action
//recruiter
export async function fetchJobsForRecruiterAction(id) {
  await connectToDB();
  const result = await Job.find({ recruiterId: id });

  return JSON.parse(JSON.stringify(result));
}
//candidate
export async function fetchJobsForCandidateAction(filterParams = {}) {
  await connectToDB();
  let updatedParams = {};
  Object.keys(filterParams).forEach((filterKey) => {
    updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
  });
  console.log(updatedParams, "updatedParams");
  const result = await Job.find(
    filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
  );

  return JSON.parse(JSON.stringify(result));
}

//create job application

export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}

//fetch job applications - candidate
export async function fetchJobApplicationsForCandidate(candidateID) {
  await connectToDB();
  const result = await Application.find({ candidateUserID: candidateID });

  return JSON.parse(JSON.stringify(result));
}

//fetch job applications - recruiter

export async function fetchJobApplicationsForRecruiter(recruiterID) {
  await connectToDB();
  const result = await Application.find({ recruiterUserID: recruiterID });

  return JSON.parse(JSON.stringify(result));
}

//update job application
export async function updateJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();

  // Get authenticated user
  const { userId: authUserId } = await auth();
  if (!authUserId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    _id,
    jobAppliedDate,
  } = data;

  // Verify the application exists and get current data
  const existingApplication = await Application.findById(_id);
  if (!existingApplication) {
    throw new Error("Application not found");
  }

  // Authorization check: Only the recruiter who posted the job can update the application
  if (existingApplication.recruiterUserID !== authUserId) {
    throw new Error("Unauthorized: You can only update applications for your own job posts");
  }

  await Application.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

//get candidate detAils by candidate ID
export async function getCandidateDetailsByIDAction(currentCandidateID) {
  await connectToDB();
  const result = await Profile.findOne({ userId: currentCandidateID });

  return JSON.parse(JSON.stringify(result));
}

//create filter categories
export async function createFilterCategoryAction() {
  await connectToDB();
  const result = await Job.find({});

  return JSON.parse(JSON.stringify(result));
}

//update profile action
export async function updateProfileAction(data, pathToRevalidate) {
  await connectToDB();

  // Get authenticated user
  const { userId: authUserId } = await auth();
  if (!authUserId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  const {
    userId,
    role,
    email,
    isPremiumUser,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,
    _id,
  } = data;

  // Verify the profile exists and belongs to the current user
  const existingProfile = await Profile.findById(_id);
  if (!existingProfile) {
    throw new Error("Profile not found");
  }

  // Authorization check: Users can only update their own profile
  if (existingProfile.userId !== authUserId) {
    throw new Error("Unauthorized: You can only update your own profile");
  }

  await Profile.findOneAndUpdate(
    {
      _id: _id,
      userId: userId, // Double-check userId in the query
    },
    {
      userId,
      role,
      email,
      isPremiumUser,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiterInfo,
      candidateInfo,
    },
    { new: true }
  );

  revalidatePath(pathToRevalidate);
}

//create stripe price id based on tier selection
export async function createPriceIdAction(data) {
  const session = await stripe.prices.create({
    currency: "inr",
    unit_amount: data?.amount * 100,
    recurring: {
      interval: "year",
    },
    product_data: {
      name: "Premium Plan",
    },
  });

  return {
    success: true,
    id: session?.id,
  };
}

//create payment logic
export async function createStripePaymentAction(data) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: `${process.env.URL}/membership` + "?status=success",
    cancel_url: `${process.env.URL}/membership` + "?status=cancel",
  });

  return {
    success: true,
    id: session?.id,
  };
}

//create post action
export async function createFeedPostAction(data, pathToRevalidate) {
  await connectToDB();
  await Feed.create(data);
  revalidatePath(pathToRevalidate);
}

//fetch all posts action
export async function fetchAllFeedPostsAction() {
  await connectToDB();
  const result = await Feed.find({});

  return JSON.parse(JSON.stringify(result));
}

//update post action
export async function updateFeedPostAction(data, pathToRevalidate) {
  await connectToDB();

  // Get authenticated user
  const { userId: authUserId } = await auth();
  if (!authUserId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  const { userId, userName, message, image, likes, _id } = data;

  // Verify the post exists
  const existingPost = await Feed.findById(_id);
  if (!existingPost) {
    throw new Error("Post not found");
  }

  // Authorization check: Users can only edit their own posts OR update likes
  // If the post owner is updating: allow all changes
  // If someone else is updating: only allow likes array changes
  if (existingPost.userId !== authUserId) {
    // Non-owner can only update likes, not the post content
    if (
      userId !== existingPost.userId ||
      userName !== existingPost.userName ||
      message !== existingPost.message ||
      image !== existingPost.image
    ) {
      throw new Error("Unauthorized: You can only like/unlike posts, not edit other users' content");
    }
  }

  await Feed.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      userId,
      userName,
      image,
      message,
      likes,
    },
    { new: true }
  );

  revalidatePath(pathToRevalidate);
}

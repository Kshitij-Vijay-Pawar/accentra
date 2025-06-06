import { auth } from "@clerk/nextjs/server";

const adminIds = process.env.CLERK_ADMIN_IDS
  ? process.env.CLERK_ADMIN_IDS.split(";").map(id => id.trim())
  : [];

export const getIsAdmin = async () => {
  const { userId } = await auth();

  if (!userId) return false;

  return adminIds.includes(userId);
};






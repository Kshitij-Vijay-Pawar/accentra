import { auth } from "@clerk/nextjs/server";

const adminIds = [
    "user_2ugEIPmf4xeq3sAr0Wa47TQXiC7", //Kshitij Pawar
]
export const getIsAdmin = async() => {
    const { userId } = await auth();
  
    if (!userId) return false;
  
    return adminIds?.indexOf(userId) !== -1;
};
  





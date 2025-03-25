"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { getCourseById, getUserProgress} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { redirect } from "next/navigation";

export const updateUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
        throw new Error ("Unauthorized");
    }

    const course = await getCourseById(courseId);
    
    if (!course) {
        throw new Error ("Course not found");
    }
    

    // TODO: Enable once units and lessons are implemented
    // if(!course.units || course.units[0]) {
    //     throw new Error ("Course is empty");
    // }

    const existingUserProgress = await getUserProgress();
    
    if(existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.fullName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",

        });
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.fullName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
    });
    
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
};  

import { StickyWrapper } from "@/components/sticky-wrapper";
import {FeedWrapper} from "@/components/feed-wrapper";
import {Header} from "@/app/(main)/learn/header";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";





const LearnPage = async () => {
    const userProgress = await getUserProgress();
    const [userProgressData ] = await Promise.all([
        userProgress,
    ]);

    if (!userProgressData || !userProgressData.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6 ">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={userProgressData.activeCourse}
                    hearts = {userProgressData.hearts}
                    points={userProgressData.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgressData.activeCourse.title} />
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;
import { getLesson, getLessonPercentage, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";


const LessonPage = async () => {
    const userSubcriptionData = getUserSubscription();
    const lessonData =  getLesson();
    const userProgressData = getUserProgress();

    const [lesson, userProgress, userSubcription] = await Promise.all([
        lessonData,
        userProgressData,
        userSubcriptionData,
    ]);

    if(!lesson || !userProgress) {
        redirect("/learn");
    }

    const initialPercentage = lesson.challenges.filter((challenge) => challenge.completed).length/ lesson.challenges.length * 100; 

    return (
        <Quiz 
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={userSubcription}
        />
    );
};

export default LessonPage;

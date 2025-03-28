"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: (typeof challengeOptions.$inferSelect)[];
    })[];
    userSubscription: any;
}

export const Quiz = ({
    initialPercentage, 
    initialHearts, 
    initialLessonId, 
    initialLessonChallenges, 
    userSubscription}: Props) => {

    const [percentage, setPercentage] = useState(initialPercentage);
    const [hearts, setHearts] = useState(initialHearts);


    return (
        <>
            <Header 
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            /> 
        </>
    );
};





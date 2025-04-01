import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import Image from "next/image";
import { Items } from "./items";



const ShopPage = async() => {

    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [
        userProgress, 
        userSubscription, 
    ] = await Promise.all([
        userProgressData, 
        userSubscriptionData, // Fix: Use getUserSubscription() here
    ]);
    if(!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }
    const isPro = !!userSubscription?.isActive;


  return (
    <div>
        <StickyWrapper>
            <UserProgress 
                activeCourse={userProgress.activeCourse}
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={isPro}
            />
        </StickyWrapper>
        <FeedWrapper>
            <div className="w-full flex flex-col items-center">
                <Image 
                    src="/shop.svg"
                    alt="Shop"
                    height={90}
                    width={90}
                />
                <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                    Shop
                </h1>
                <p className="text-muted-foreground text-center text-lg mb-6">
                    Speed your points on cool stuff.
                </p>
                <Items 
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
            </div>
        </FeedWrapper>
    </div>
  );
}; 

export default ShopPage
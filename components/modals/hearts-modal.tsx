"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, 
    DialogContent, 
    DialogDescription,
    DialogFooter,
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button"
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {

    const onclicks = () => {
        close();
        router.push("/store");
    };

    const router = useRouter();
    const [isClient, setIsclient] = useState(false);
    const { isOpen, close } = useHeartsModal();

    useEffect(() => {setIsclient(true)}, []);

    if (!isClient) return null;
    
    

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/mascot_bad.svg" 
                        alt="Sad Panda" 
                        width={80} 
                        height={80} />
                    </div>

                    <DialogTitle className="text-center font-bold text-2xl">
                        You ran out of hearts!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Get Pro for unlimited hearts, or purchase them in the store.
                    </DialogDescription>
                    <DialogFooter className="mb-4">
                        <div className="flex flex-col gap-y-4 w-full">
                            <Button 
                                variant="primary" 
                                className="w-full" 
                                size="lg"
                                onClick={onclicks} 
                            >
                                Get unlimited hearts
                            </Button>
                            <Button 
                                variant="primaryOutline" 
                                className="w-full" 
                                size="lg"
                                onClick={() => {
                                    close();
                                }} 
                            >
                                No thanks
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

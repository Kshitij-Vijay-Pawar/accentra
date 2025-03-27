"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, 
    DialogContent, 
    DialogDescription,
    DialogFooter,
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button"
import { useExitModal } from "@/store/use-exit-modal";

export const ExitModal = () => {
    const router = useRouter();
    const [isClient, setIsclient] = useState(false);
    const { isOpen, close } = useExitModal();

    useEffect(() => {setIsclient(true)}, []);

    if (!isClient) return null;
    
    

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/mascot_sad.svg" 
                        alt="Sad Panda" 
                        width={80} 
                        height={80} />
                    </div>

                    <DialogTitle className="text-center font-bold text-2xl">
                        Are you sure you want to leave?
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        you&apos;re about to leave the lesson. Are you sure?
                    </DialogDescription>
                    <DialogFooter className="mb-4">
                        <div className="flex flex-col gap-y-4 w-full">
                            <Button 
                                variant="primary" 
                                className="w-full" 
                                size="lg"
                                onClick={close} 
                            >
                                Keep Learning
                            </Button>
                            <Button 
                                variant="dangerOutline" 
                                className="w-full" 
                                size="lg"
                                onClick={() => {
                                    router.push("/learn");
                                    close();
                                }} 
                            >
                                End Session
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

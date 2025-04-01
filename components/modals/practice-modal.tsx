"use client";

import Image from "next/image";
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
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {


    const [isClient, setIsclient] = useState(false);
    const { isOpen, close } = usePracticeModal();

    useEffect(() => {setIsclient(true)}, []);

    if (!isClient) return null;
    
    

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/heart.svg" 
                        alt="Heart" 
                        width={100} 
                        height={100} />
                    </div>

                    <DialogTitle className="text-center font-bold text-2xl">
                        Practice lesson!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Use practice lessons to regain hearts and points. You cannot loose harts or points in practice lessons.
                    </DialogDescription>
                    <DialogFooter className="mb-4">
                        <div className="flex flex-col gap-y-4 w-full">
                            
                            <Button 
                                variant="primary" 
                                className="w-full" 
                                size="lg"
                                onClick={() => {
                                    close();
                                }} 
                            >
                                i understand
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

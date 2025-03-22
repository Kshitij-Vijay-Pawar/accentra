import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <Button size="lg" variant="ghost" className="flex-grow mx-2">
                    <Image src="/ES.svg" alt="Spanish" height={32} width={40} className="mr-4 rounded-md" />Spanish
                </Button>
                <Button size="lg" variant="ghost" className="flex-grow mx-2">
                    <Image src="/FR.svg" alt="French" height={32} width={40} className="mr-4 rounded-md" />French
                </Button>
                <Button size="lg" variant="ghost" className="flex-grow mx-2">
                    <Image src="/IN.svg" alt="India" height={32} width={40} className="mr-4 rounded-md" />India
                </Button>
                <Button size="lg" variant="ghost" className="flex-grow mx-2">
                    <Image src="/IT.svg" alt="Italian" height={32} width={40} className="mr-4 rounded-md" />Italian
                </Button>
                <Button size="lg" variant="ghost" className="flex-grow mx-2">
                    <Image src="/JP.svg" alt="Japanese" height={32} width={40} className="mr-4 rounded-md" />Japanese
                </Button>
            </div>
        </footer>
    );
};
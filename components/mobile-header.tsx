
import {MobileSidebar} from "@/components/mobile-sidebar";


export const MobileHeader = () => {   
    return(
        <nav className="lg:hidden px-6 h-[50px] flex item-center bg-green-500 border-b fixed top-0 w-full z-50">
            <MobileSidebar/>
        </nav>
    );
}; 
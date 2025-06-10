
import { Button } from "@/components/ui/button";
import SpeakerButton from "@/components/SpeakerButton";

const ButtonsPage = () => {

    const options = ["Hello", "How are you?", "I am fine"];

    return (
        <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="primaryOutline">Primary Outline</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="secondaryOutline">secondary Outline</Button>
            <Button variant="danger">danger</Button>
            <Button variant="dangerOutline">danger Outline</Button>
            <Button variant="super">super</Button>
            <Button variant="superOutline">super Outline</Button>
            <Button variant="ghost">ghost</Button>
            <Button variant="sidebar">sidebar</Button>
            <Button variant="sidebarOutline">sidebar Outline</Button>

            <div className="space-y-3">
                {options.map((opt, i) => (
                    <SpeakerButton key={i} text={opt} lang="en-US" />
                ))}
            </div>
        </div>
    );
};

export default ButtonsPage;
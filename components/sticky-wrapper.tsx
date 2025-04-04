type Props = {
    children: React.ReactNode;
};

export const StickyWrapper = ({ children }: Props) => {
    return (
        <div className="hidden lg:block w-[368px] sticky self-start top-6 h-fit l-60">
            <div className="min-h-[60px] sticky top-6 flex flex-col gap-y-4 w-full ">
                {children}
            </div>
        </div>
    );
}   
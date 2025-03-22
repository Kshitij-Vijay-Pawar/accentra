export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
        <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            <p>Follow us on social media: Facebook | Twitter | LinkedIn</p>
        </div>
        </footer>
    );
};
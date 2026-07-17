import Button from "../Button/Button.jsx";
import Badge from "../Badge/Badge.jsx";

const Hero = () => {
    return (
        <section className="relative overflow-hidden min-h-[80vh] bg-slate-50 flex flex-col justify-center items-center px-6">
            <div className="max-w-4xl mx-auto text-center">
                <Badge text="Trusted by 10,000+ Professionals" />
                <h1 className="text-5xl font-bold mt-4">Find Your Dream Job</h1>
                <p className="text-lg mt-6">Discover thousands of Oppurtunity from Trusted Companies.</p>
                <div className="flex justify-center gap-4 mt-8">
                    <Button text="Browse Jobs" />
                    <Button text="Hire Talent" />
                </div>
            </div>
        </section>
    );
}

export default Hero;
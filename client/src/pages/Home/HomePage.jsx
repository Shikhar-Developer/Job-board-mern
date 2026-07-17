import Hero from "../../components/Hero/Hero";
import TrustedCompanies from "../../components/TrustedCompanies/TrustedCompanies.jsx";
import FeaturedJobs from "../../features/jobs/FeaturedJobs.jsx";

const HomePage = () => {
    return (
        <>
            <Hero />
            <TrustedCompanies />
            <FeaturedJobs />
        </>
    )
}

export default HomePage;
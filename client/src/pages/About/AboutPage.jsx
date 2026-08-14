const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">

            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-6">
                        Find Opportunities. Build Your Future.
                    </h1>

                    <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                        Our Job Board connects talented candidates with employers
                        looking for the right people. Discover opportunities,
                        apply with ease, and take the next step in your career.
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            About Our Platform
                        </h2>

                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We built this platform to make the job search and
                            recruitment process simpler, faster, and more
                            accessible for both candidates and employers.
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white p-8 rounded-xl shadow-md text-center">
                            <div className="text-4xl mb-4">🔎</div>

                            <h3 className="text-xl font-semibold mb-3">
                                Discover Jobs
                            </h3>

                            <p className="text-gray-600">
                                Search and filter job opportunities based on
                                your skills, location, and preferred employment
                                type.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md text-center">
                            <div className="text-4xl mb-4">📄</div>

                            <h3 className="text-xl font-semibold mb-3">
                                Easy Applications
                            </h3>

                            <p className="text-gray-600">
                                Submit your profile and resume to apply for
                                relevant opportunities quickly and easily.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md text-center">
                            <div className="text-4xl mb-4">💼</div>

                            <h3 className="text-xl font-semibold mb-3">
                                For Employers
                            </h3>

                            <p className="text-gray-600">
                                Employers can create job listings and connect
                                with candidates who match their requirements.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto">

                    <h2 className="text-4xl font-bold text-center mb-12">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                                1
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                Create Your Account
                            </h3>

                            <p className="text-gray-600">
                                Register as a candidate or employer and create
                                your profile.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                                2
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                Explore Opportunities
                            </h3>

                            <p className="text-gray-600">
                                Browse available jobs and use filters to find
                                opportunities that match your interests.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                                3
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                Apply & Connect
                            </h3>

                            <p className="text-gray-600">
                                Submit your application and take the next step
                                toward your career goals.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-blue-50 py-16 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Ready to Find Your Next Opportunity?
                </h2>

                <p className="text-gray-600 mb-6">
                    Explore available jobs and start building your career today.
                </p>

                <a
                    href="/jobs"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Explore Jobs
                </a>
            </section>

        </div>
    );
};

export default AboutPage;
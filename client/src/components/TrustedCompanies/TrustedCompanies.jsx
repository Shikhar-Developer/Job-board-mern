const TrustedCompanies = () => {
    const companies = [
        "Google",
        "Apple",
        "Microsoft",
        "Amazon",
        "Netflix",
        "Meta",
        "Adobe"
    ]

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-center text-gray-500 font-semibold uppercase tracking-widest">
                    Trusted by Leading Companies
                </h2>
                <div className="flex justify-center gap-12 mt-10 flex-wrap">
                    {companies.map((company) => (
                        <div key={company} className="text-2xl font-bold text-gray-700">
                            {company}
                        </div>
                    ))
                    }
                </div>
            </div>
        </section>
    )
}

export default TrustedCompanies;
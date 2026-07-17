import Button from "../Button/Button";

const JobCard = ({ company, title, location, salary, type, skills }) => {
    return (
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className=" flex justify-between items-center">
                <h3 className="text-lg font-bold">{company}</h3>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{type}</span>
            </div>
            <h2 className="text-2xl font-semibold mt-5">{title}</h2>
            <p className="text-gray-600 mt-4">{location}</p>
            <p className="text-blue-600 font-semibold mt-2">
                {
                    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(salary)
                }
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
                {skills?.map((skill) => {
                    <span key={skill} className="bg-slate-100 text-gray-700 px-3 py-1 rounded-full text-sm">{skill}</span>
                })}
            </div>
            <div className="mt-8">
                <Button text="Apply Now" />
            </div>

        </div>
    )
};

export default JobCard;

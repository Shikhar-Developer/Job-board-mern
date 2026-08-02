import { useState } from "react";

const JobSearchBar = ({ onSearch }) => {
    const [filters, setFilters] = useState({ search: "", location: "", employmentType: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters((previousFilters) => ({
            ...previousFilters,
            [name]: value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(filters);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm">
            <input type="text" name="search" value={filters.search} onChange={handleChange} placeholder="Search by title or company" className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name="location" value={filters.location} onChange={handleChange} placeholder="Location" className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <select name="employmentType" value={filters.employmentType} onChange={handleChange} className="rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
            </select>
            <button type="submit" className="rounded-lg bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 font-medium transition">Search</button>
        </form>
    );
}

export default JobSearchBar;
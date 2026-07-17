const Loader = ({ message = "Loading... " }) => {
    return (
        <section className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin">
            </div>
            <p className="mt-6 text-gray-600 text-lg">
                {message}
            </p>
        </section>
    )
}

export default Loader;
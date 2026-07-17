const Badge = ({ text }) => {
    return (
        <span className="inline-block bg-blue-500 px-4 py-2 rounded-full font-medium">
            {text}
        </span>
    );
}

export default Badge;
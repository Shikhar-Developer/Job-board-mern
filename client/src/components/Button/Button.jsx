const Button = ({ text }) => {
    return (
        <button className="rounded-lg text-white px-6 py-2 bg-blue-500 cursor-pointer">
            {text}
        </button>
    );
}

export default Button;
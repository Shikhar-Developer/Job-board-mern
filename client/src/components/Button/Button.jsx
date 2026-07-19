const Button = ({ children, ...props }) => {
    return (
        <button {...props} className="rounded-lg text-white px-6 py-2 bg-blue-500 hover:bg-blue-700 font-medium transition disabled:cursor-not-allowed disabled:bg-blue-300 ">
            {children}
        </button>
    );
}

export default Button;

// 

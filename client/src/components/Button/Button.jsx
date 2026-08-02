const Button = ({ children, variant = "primary", className = "", ...props }) => {

    const variants = {
        primary:
            "bg-blue-500 hover:bg-blue-700 text-white",
        secondary:
            "bg-gray-200 hover:bg-gray-300 text-gray-800",
        danger:
            "bg-red-500 hover:bg-red-700 text-white"
    };

    const buttonClasses = `rounded-lg text-white px-6 py-2 font-medium transition disabled:cursor-not-allowed disabled:bg-blue-300 ${variants[variant]} ${className}`;
    return (
        <button {...props} className={buttonClasses}>
            {children}
        </button>
    );
}

export default Button;

// 

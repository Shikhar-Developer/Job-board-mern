// client/src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { login as loginService } from "../services/auth.service.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const login = async (credentials) => {
        const response = await loginService(credentials);
        setUser(response.data);
        setToken(response.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.token);
        return response;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
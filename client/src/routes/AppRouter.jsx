import { BrowserRouter, Routes, Route } from "react-router-dom";


import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/Home/HomePage.jsx";
import AboutPage from "../pages/About/AboutPage.jsx"
import RegisterPage from "../pages/Register/RegistrationPage.jsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes >
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
// client/src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/Home/HomePage.jsx";
import AboutPage from "../pages/About/AboutPage.jsx"
import RegisterPage from "../pages/Register/RegistrationPage.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import JobsPage from "../pages/Jobs/JobsPage.jsx";
import JobDetailPage from "../pages/JobDetail/JobDetailPage.jsx";
import ApplyPage from "../pages/Apply/ApplyPage.jsx";
import EmployerDashboardPage from "../pages/Dashboard/EmployerDashboardPage.jsx";
import PostJobPage from "../pages/PostJob/PostJobPage.jsx";
import EditJobPage from "../pages/EditJob/EditJobPage.jsx";
import MyJobsPage from "../pages/MyJobs/MyJobsPage.jsx";
import JobApplicantsPage from "../pages/JobApplicants/JobApplicantsPage.jsx";
import MyApplicationsPage from "../pages/MyApplications/MyApplicationsPage.jsx";
import CandidateProfilePage from "../pages/CandidateProfile/CandidateProfilePage.jsx";
import EmployerProfilePage from "../pages/EmployerProfile/EmployerProfilePage.jsx";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.jsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes >
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/jobs" element={<JobsPage />} />
                    <Route path="/jobs/:id" element={<JobDetailPage />} />

                    <Route
                        path="/jobs/:id/apply"
                        element={
                            <ProtectedRoute allowedRoles={["CANDIDATE"]}>
                                <ApplyPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-applications"
                        element={
                            <ProtectedRoute allowedRoles={["CANDIDATE"]}>
                                <MyApplicationsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute allowedRoles={["CANDIDATE"]}>
                                <CandidateProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employer/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                                <EmployerDashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/employer/jobs"
                        element={
                            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                                <MyJobsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/employer/jobs/new"
                        element={
                            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                                <PostJobPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/employer/jobs/:id/edit"
                        element={
                            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                                <EditJobPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/employer/jobs/:id/applicants"
                        element={
                            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                                <JobApplicantsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/employer/profile"
                        element={
                            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                                <EmployerProfilePage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
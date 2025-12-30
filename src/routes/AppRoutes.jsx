import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/auth/Login"
import Dashboard from "../pages/dashboard/Dashboard"
import AuthLayout from "../components/layout/AuthLayout"
import MainLayout from "../components/layout/MainLayout"
import ProtectedRoute from "./ProtectedRoute"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
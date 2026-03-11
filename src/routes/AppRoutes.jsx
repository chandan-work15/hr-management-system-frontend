import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/auth/Login"
// import AdminDashboard from "../pages/dashboard/AdminDashboard"
import AuthLayout from "../components/layout/AuthLayout"
import MainLayout from "../components/layout/MainLayout"
import ProtectedRoute from "./ProtectedRoute"
// import EmployeeDashboard from "../pages/dashboard/EmployeeDashboard"
import Unauthorized from "../pages/Unauthorized"
import { lazy, Suspense } from "react"
import EmployeeList from "../features/admin/employee-management/EmployeeList"

const AdminDashboard = lazy(() =>
    import("../features/admin/dashboard/AdminDashboard")
);
const EmployeeDashboard = lazy(() =>
    import("../features/employee/dashboard/EmployeeDashboard")
);

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<AuthLayout />}>
                <Route index path="/login" element={<Login />} />
            </Route>
            <Route

                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/admin/dashboard" element={
                    <Suspense fallback={<div className="loader">Loading...</div>}>
                        <AdminDashboard />
                    </Suspense>
                } />
                <Route path="/admin/employee-list" element={
                    <Suspense fallback={<div className="loader">Loading...</div>}>
                        <EmployeeList />
                    </Suspense>
                } />
            </Route>

            {/* EMPLOYEE */}
            <Route
                element={
                    <ProtectedRoute allowedRoles={["employee"]}>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/employee/dashboard" element={
                    <Suspense fallback={<div className="loader">Loading...</div>}>
                        <EmployeeDashboard />
                    </Suspense>
                } />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    )
}

export default AppRoutes
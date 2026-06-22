import Logo from '../../assets/images/logo.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getNavLinkClass = ({ isActive }) =>
        isActive ? "nav-link me-1 active fw-bold text-light bg-dark rounded-5 px-3" : "nav-link me-1";

    const { role, isAuthenticated } = useSelector(
        (state) => state.auth
    )

    const handleLogout = () => {
        clearToken();
        dispatch(logout());
        navigate("/login", { replace: true });
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <div className="header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-danger me-auto" to="/">
                            <img src={Logo} alt="" className="logo" />
                        </Link>
                        {/* Hamburger Button for Small Screens */}
                        <button
                            className="btn d-lg-none me-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasWithBothOptions"
                            aria-controls="offcanvasWithBothOptions"
                        >
                            <i className="fa-solid fa-bars fs-4"></i>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 bg-white rounded-5 p-1 me-1">
                                {/* Admin Menu */}
                                {role === "admin" && (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className={getNavLinkClass} to="/admin/dashboard">Dashboard</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className={getNavLinkClass} to="/admin/employee-list">Employees</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className={getNavLinkClass} to="/admin/attendance">Attendance</NavLink>
                                        </li>
                                        {/* <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle me-1" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Attendance
                                            </Link>
                                            <ul className="dropdown-menu mt-2">
                                                <li><NavLink className="dropdown-item" to="/admin/attendance">Take Attendance</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="/admin/monthly-attendance">Monthly Attendance</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="/admin/edit-attendance">Edit Attendance</NavLink></li>
                                            </ul>
                                        </li> */}
                                        <li className="nav-item">
                                            <NavLink className={getNavLinkClass} to="/admin/leave-request">Requests</NavLink>
                                        </li>
                                        {/* <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="#">Hiring</NavLink>
                                </li> */}
                                        <li className="nav-item">
                                            <NavLink className={getNavLinkClass} to="/admin/salary">Salary</NavLink>
                                        </li>
                                        {/* <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="#">Calendar</NavLink>
                                </li> */}
                                        <li className="nav-item">
                                            <NavLink className={getNavLinkClass} to="/admin/archives">Archives</NavLink>
                                        </li>
                                    </>
                                )}

                                {/* EMPLOYEE MENU */}
                                {role === "employee" && (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/employee/dashboard">
                                                My Dashboard
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/employee/profile">
                                                Profile
                                            </NavLink>
                                        </li>
                                    </>
                                )}

                            </ul>

                            <ul className="navbar-nav navbar-nav-white mb-2 mb-lg-0">
                                <li className="nav-item me-1">
                                    <Link className="nav-link" to="#"><i className="fa-solid fa-gear "></i></Link>
                                </li>
                                <li className="nav-item me-1">
                                    <Link className="nav-link" to="#"><i className="fa-solid fa-bell"></i></Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-user"></i>
                                    </Link>
                                    <ul className="dropdown-menu end-0 mt-2" style={{ left: "auto" }}>
                                        <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button onClick={handleLogout} className="dropdown-item bg-danger text-white" >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            {/* Offcanvas Sidebar for Small Screens */}
            <div className="offcanvas offcanvas-start w-75" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel"> <div className="container-fluid">
                        <Link className="navbar-brand text-danger me-auto" to="">
                            <img src={Logo} alt="" className="logo" />
                        </Link></div></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 bg-white rounded-5 p-1 me-1">
                        <li className="nav-item">
                            <NavLink className={getNavLinkClass} to="admin/dashboard"><i className="fa-solid fa-gauge me-2"></i>Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={getNavLinkClass} to="admin/employee-list"><i className="fa-solid fa-users me-2"></i>Employee</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle me-1" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-clipboard-user me-2"></i>Attendance
                            </Link>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="admin/attendance">Take Attendance</NavLink></li>
                                <li><NavLink className="dropdown-item" to="admin/monthly-attendance">Monthly Attendance</NavLink></li>
                                <li><NavLink className="dropdown-item" to="admin/edit-attendance">Edit Attendance</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className={getNavLinkClass} to="admin/leave-request"><i className="fa-solid fa-hand me-2"></i>Requests</NavLink>
                        </li>
                        {/* <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="#">Hiring</NavLink>
                                </li> */}
                        <li className="nav-item">
                            <NavLink className={getNavLinkClass} to="admin/salary"><i className="fa-solid fa-wallet me-2"></i>Salary</NavLink>
                        </li>
                        {/* <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="#">Calendar</NavLink>
                                </li> */}
                        <li className="nav-item">
                            <NavLink className={getNavLinkClass} to="admin/archives"><i className="fa-solid fa-box-archive me-2"></i>Archives</NavLink>
                        </li>
                        <li className="nav-item me-1">
                            <Link className="nav-link" to="#"><i className="fa-solid fa-gear me-2"></i>Settings</Link>
                        </li>
                        <li className="nav-item me-1">
                            <Link className="nav-link" to="#"><i className="fa-solid fa-bell me-2"></i>Notifications</Link>
                        </li>
                        <li className="nav-item me-1 mt-2 w-25">
                            <Link to="/" className="dropdown-item  text-dark text-center">
                                <i className="fa-solid fa-right-from-bracket me-1"></i> Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
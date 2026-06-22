import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import { useLoginMutation } from '../../features/auth/authApi'
import { setCredentials } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { setToken } from '../../utils/auth'

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(form).unwrap();
      console.log("login response:", data);

      const token = data.data.accessToken;
      const user = data.data.user;

      if (!token || !user) {
        setError('Login failed: Invalid response');
        return;
      }

      // Save token in localStorage or sessionStorage based on rememberMe
      setToken(token, rememberMe);

      // Update Redux store 
      dispatch(
        setCredentials({
          token: token,
          role: user.role,
          id: user.id
        })
      );


      // Navigate based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/employee/dashboard", { replace: true });
      }

    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
    }
  };


  return (
    <>
      <div className="login-page">
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border-0 rounded-5 shadow bg-ffffff94">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="text-center mb-3">
                    <Link to="/hr-management-user/login">
                      <img src={Logo} alt="Logo" width="280" className='' />
                    </Link>
                  </div>
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            placeholder="name@123"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            required />
                          <label
                            htmlFor="text"
                            className="form-label">User Name</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                          />
                          <label htmlFor="password" className="form-label">Password</label>
                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              userSelect: "none"
                            }}
                          >
                            <i
                              class={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-muted`}
                              title={showPassword ? "Hide password" : "Show password"}
                            ></i>
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex gap-2 justify-content-between">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="rememberMe"
                              id="rememberMe"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label className="form-check-label text-secondary" htmlFor="rememberMe">
                              Keep me logged in
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button type="submit" className="btn btn-danger btn-lg">
                            {/* {isLoading ? "Loggin in..." : "Login"} */}
                            Login
                          </button>
                        </div>
                      </div>
                      {error && (
                        <div className="col-12">
                          <div className="alert alert-danger">{error}</div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
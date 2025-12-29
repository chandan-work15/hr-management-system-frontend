import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/authService'
import { setToken } from '../../utils/auth'
import Logo from '../../assets/images/logo.png'

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(form);
      setToken(data.token);
      navigate("/dashboard");
      console.log("pass")
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full px-3">
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-sm">
              <div className="bg-white/95 rounded-[2rem] shadow-lg">
                <div className="p-4 sm:p-5 md:p-6 xl:p-8">
                  {/* Logo */}
                  <div className="text-center mb-4">
                    <img
                      src={Logo}
                      alt="Logo"
                      className="mx-auto w-[280px]"
                    />
                  </div>

                  {/* Heading */}
                  <h2 className="text-sm font-normal text-center text-gray-500 mb-6">
                    Sign in to your account
                  </h2>

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      {/* Username */}
                      <div>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder=""
                            className="peer w-full rounded-md border border-gray-300 px-3 pt-5 pb-2 text-sm focus:border-red-500 focus:outline-none"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                          />
                          <label className="absolute left-3 top-1 text-xs text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm transition-all">
                            User Name
                          </label>
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder=""
                            className="peer w-full rounded-md border border-gray-300 px-3 pt-5 pb-2 text-sm focus:border-red-500 focus:outline-none"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                          />
                          <label className="absolute left-3 top-1 text-xs text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm transition-all">
                            Password
                          </label>
                        </div>
                      </div>

                      {/* Remember Me */}
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-gray-500">
                          <input type="checkbox" className="accent-red-600" />
                          Keep me logged in
                        </label>
                      </div>

                      {/* Button */}
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="w-full rounded-lg bg-red-600 py-3 text-white text-lg font-medium hover:bg-red-700 transition"
                        >
                          Log in
                        </button>
                      </div>

                      {/* Error Placeholder */}
                      {error &&
                        <div className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
                          {error || "Invalid credentials"}
                        </div>
                      }
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login
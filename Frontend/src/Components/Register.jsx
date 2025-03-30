import React, { useState } from "react"
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        userType: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            )

            const data = await response.json()

            if (data.success) {
                toast.success(
                    "Registration successful! Redirecting to login..."
                )
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            } else {
                toast.error(data.error || "Registration failed")
            }
        } catch (error) {
            toast.error("Server error. Please try again.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-blue-50 to-green-100"></div>

            <div className="relative z-10 flex w-full max-w-[90%] h-[90vh] bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-lg overflow-hidden">
                <form
                    onSubmit={handleSubmit}
                    className="w-full md:w-3/5 p-8 bg-white"
                >
                    <h2 className="text-3xl font-bold text-green-600 text-center mb-8">
                        Create Account
                    </h2>

                    <div className="relative mb-6">
                        <input
                            type="text"
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            placeholder=" "
                            className="peer w-full bg-transparent border-b-2 border-gray-400 focus:border-green-600 focus:outline-none text-gray-800 py-5 placeholder-transparent"
                        />
                        <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-600">
                            <FaUser className="mr-2 inline-block text-lg text-gray-400" />
                            Username
                        </label>
                    </div>

                    <div className="relative mb-6">
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder=" "
                            className="peer w-full bg-transparent border-b-2 border-gray-400 focus:border-green-600 focus:outline-none text-gray-800 py-5 placeholder-transparent"
                        />
                        <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-600">
                            <FaEnvelope className="mr-2 inline-block text-lg text-gray-400" />
                            Email
                        </label>
                    </div>

                    <div className="relative mb-6">
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder=" "
                            className="peer w-full bg-transparent border-b-2 border-gray-400 focus:border-green-600 focus:outline-none text-gray-800 py-5 placeholder-transparent"
                        />
                        <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-600">
                            <FaLock className="mr-2 inline-block text-lg text-gray-400" />
                            Password
                        </label>
                    </div>

                    <div className="relative mb-6">
                        <select
                            name="userType"
                            required
                            value={formData.userType}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b-2 border-gray-400 focus:border-green-600 focus:outline-none text-gray-800 py-3"
                        >
                            <option value="">Select User Type</option>
                            <option value="student">Student</option>
                            <option value="hostelOwner">Hostel Owner</option>
                            <option value="messOwner">Mess Owner</option>
                            <option value="gymOwner">Gym Owner</option>
                        </select>
                        <FaUserTag className="absolute left-0 top-4 text-lg text-gray-400" />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-3 rounded-lg transition duration-300"
                    >
                        Register
                    </button>

                    <div className="text-center mt-6 text-gray-500">
                        <p>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-green-600 hover:text-green-500 transition duration-300"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>

                <div className="w-2/5 hidden md:block">
                    <img
                        src="https://i.pinimg.com/736x/ec/fb/9f/ecfb9ffd184bceec03b3c19161eee7fd.jpg"
                        alt="Registration Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}

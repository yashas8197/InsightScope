import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = "fullname is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    console.log(formData);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(
          "https://insight-scope-pp2r.vercel.app/api/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (data.token) {
          localStorage.setItem("authToken", data.token);

          navigate("/dashboard");
        } else {
          setErrors("Signup failed. Please try again.");
        }

        setFormData({
          fullname: "",
          email: "",
          password: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Signup error:", error);
        setErrors("An error occurred during signup.");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <Card className="w-full sm:w-96 p-6 bg-white rounded-lg shadow-xl">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            Sign Up
          </h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* fullname Input */}
            <div>
              <label htmlFor="fullname" className="block text-gray-600">
                fullname
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full p-3 border rounded-md mt-2"
                placeholder="Enter fullname"
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm">{errors.fullname}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-md mt-2"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-md mt-2"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-3 rounded-md hover:bg-teal-700 focus:outline-none"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </CardFooter>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-teal-600 hover:text-teal-700 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useFetch } from "@/utils/useFetch";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { fetchLogin } = useFetch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginAsGuest = () => {
    const guestCredentials = { email: "yash@gmail.com", password: "yash" };
    setFormData(guestCredentials);

    // Trigger validation for guest login credentials
    fetchLogin(guestCredentials, setErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation and login attempt
    await fetchLogin(formData, setErrors);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <Card className="w-full sm:w-96 p-6 bg-white rounded-lg shadow-xl">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            Login
          </h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </CardFooter>
        <div className="w-3/4 mx-auto">
          <button
            type="button"
            className="w-full bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 focus:outline-none"
            onClick={handleLoginAsGuest}
          >
            Login as Guest
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-teal-600 hover:text-teal-700 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;

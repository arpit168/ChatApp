import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!formData.email)
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.mobileNumber)
      newErrors.mobileNumber = "Mobile number is required";
    else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Invalid mobile number";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ CONNECTED TO BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message });
        return;
      }

      // Save token/user if returned and notify
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      alert("Registered successfully 🎉");

      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <p className="text-error text-sm text-center">{errors.general}</p>
            )}

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-error text-sm">{errors.fullName}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email}</p>
            )}

            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              className="input input-bordered w-full"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            {errors.mobileNumber && (
              <p className="text-error text-sm">{errors.mobileNumber}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-error text-sm">{errors.password}</p>
            )}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-error text-sm">
                {errors.confirmPassword}
              </p>
            )}

            <button
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

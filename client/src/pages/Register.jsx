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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Register Data:", formData);
    alert("Registered successfully 🎉");

    // ✅ Clear form after successful register
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    });

    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
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
            </div>

            {/* Email */}
            <div>
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
            </div>

            {/* Mobile Number */}
            <div>
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                className="input input-bordered w-full"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              {errors.mobileNumber && (
                <p className="text-error text-sm">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
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
            </div>

            {/* Confirm Password */}
            <div>
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
            </div>

            <button className="btn btn-primary w-full">
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <span className="link link-primary cursor-pointer">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

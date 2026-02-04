import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

   const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors({ password: data.message });
      return;
    }

    // ✅ Save token
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful 🎉");

    setFormData({ email: "", password: "" });
    setErrors({});
  } catch (error) {
    console.error(error);
  }
};


    // optional: clear form
    setFormData({
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-3">
            Don’t have an account?{" "}
            <span className="link link-primary cursor-pointer">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

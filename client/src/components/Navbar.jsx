import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("chatKaroTheme") || "");

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setTheme(newTheme);
    localStorage.setItem("chatKaroTheme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  return (
    <>
      <div className="bg-primary flex justify-between px-5 py-2 text-center sticky top-0 z-50">
        <h1>ChatKaro</h1>
        <div className="space-x-2">
          <span>Home</span>
          <span>About</span>
        </div>

        <div className="flex gap-3 ">
          <button className="btn btn-secondary"><Link to={"/login"}>Login</Link></button>
           <button className="btn btn-secondary"><Link to={"/register"}>Register</Link></button>

          <select
            name="theme"
            id="theme"
            className="select"
            onChange={handleThemeChange}
            value={theme}
          >
            <option value="">Default</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="claude">Claude</option>
            <option value="spotify">Spotify</option>
            <option value="vscode">VSCode</option>
            <option value="black">Black</option>
            <option value="corporate">Corporate</option>
            <option value="ghibli">Ghibli</option>
            <option value="gourmet">Gourmet</option>
            <option value="luxury">Luxury</option>
            <option value="mintlify">Mintlify</option>
            <option value="pastel">Pastel</option>
            <option value="perplexity">Perplexity</option>
            <option value="shadcn">Shadcn</option>
            <option value="slack">Slack</option>
            <option value="soft">Soft</option>
            <option value="valorant">Valorant</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;
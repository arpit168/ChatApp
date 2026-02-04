import React from "react";

const Navbar = () => {
  return (
    <div className="bg-primary flex justify-between">
      <h1>Chat Karo</h1>
      <div className="flex gap-2">
        <div>HOME</div>
        <div>ABOUT</div>
      </div>
      <div className="flex gap-5">
        <button className="btn btn-secondary">Login</button>
        <select name="theme" id="theme" className="select ">
          <option value="">--Select Theme--</option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;

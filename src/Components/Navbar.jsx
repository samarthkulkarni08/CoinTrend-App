import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { UserAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="ml-4 text-2xl">CoinTrend</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>

      {user?.email ? (
        <div>
          <Link to="/account" className="max-md:hidden p-2 hover:text-accent">
            Account
          </Link>
          <button
            className="max-md:hidden text-accent py-2 px-4 ml-4 rounded-2xl shadow-lg hover:shadow-2xl"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="hidden md:block mr-4">
          <Link to="/signin" className="p-4 hover:text-accent">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-button text-btnText py-2 px-5 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* hamburger menu */}
      <div
        onClick={handleNav}
        className="block md:hidden cursor-pointer z-10 mr-6"
      >
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full p-4">
          <li onClick={handleNav} className="border-b py-6">
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleNav} className="border-b py-6">
            <Link to="/account">Account</Link>
          </li>
          <li className="py-6">
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex flex-col items-center justify-center w-full p-4">
          <Link to="/signin">
            <button
              onClick={handleNav}
              className="w-80 my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl"
            >
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button
              onClick={handleNav}
              className="w-80 my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

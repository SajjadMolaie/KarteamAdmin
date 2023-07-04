import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";

import Logo from "../images/logo.svg";
import LogoSmall from "../images/logoSmall.svg";
import User from "../images/user.svg";
import Dashboard from "../images/dashboard.svg";
import Chart from "../images/chart.svg";
import Folder from "../images/folder.svg";
import Profile from "../images/profile.svg";
import Setting from "../images/setting.svg";
import Logout from "../images/logout.svg";
import Company from "../images/company.svg";
import LocationDark from "../images/locationDark.svg";
import Clock from "../images/clock.svg";

const Nav = ({ user, children }) => {
  const [nav, setNav] = useState(false);

  const changeNav = () => {
    setNav(!nav);
  };

  let style = nav
    ? "flex items-center px-4 py-2 h-10 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
    : "flex items-center justify-center h-10 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-200 hover:text-gray-700";

  let activeStyle = nav
    ? "flex items-center px-4 py-2 h-10 mt-5 text-white bg-blue-500 rounded-lg"
    : "flex items-center justify-center h-10 w-auto bg-blue-500 mt-5 rounded-lg";

  return (
    <>
      <nav
        className={
          nav
            ? "flex justify-between h-16 pl-20 pr-64 items-center bg-gray-bg"
            : "flex justify-between h-16 pl-20 pr-20 items-center bg-gray-bg"
        }
      >
        <BiMenuAltRight
          className="w-8 h-8 cursor-pointer hidden md:block"
          onClick={changeNav}
        />
        <div className="flex items-center">
          <img src={User} alt="User" className="w-10 h-10 ml-3" />
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
      </nav>
      <div className="flex">
        <aside
          className={
            nav
              ? "flex flex-col w-80 h-screen px-4 py-8 z-50 bg-gray-bg border-r rtl:border-r-0 rtl:border-l transition-all ease-in-out duration-300"
              : "flex flex-col w-20 h-screen px-4 py-8 z-50 bg-gray-bg border-r rtl:border-r-0 rtl:border-l transition-all ease-in-out duration-300"
          }
        >
          <a href="#" className="mx-auto">
            <img
              className={nav ? "w-auto h-11" : "w-auto h-8"}
              src={nav ? Logo : LogoSmall}
            />
          </a>

          {nav && (
            <div className="flex items-center mt-14">
              <img
                className="object-cover w-7 h-7 mx-2 rounded-full"
                src={User}
                alt="avatar"
              />
              <h4 className="mx-2 mt-2 font-medium text-gray-800">{`${user.firstName} ${user.lastName}`}</h4>
            </div>
          )}

          <nav className="flex flex-col flex-1 mt-12">
            <div>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? activeStyle : style)}
              >
                <img src={Dashboard} alt="Dashboard" className="w-6 h-6" />
                {nav && <span className="mx-4 font-medium">داشبورد</span>}
              </NavLink>
              <NavLink
                to="/company"
                className={({ isActive }) => (isActive ? activeStyle : style)}
              >
                <img src={Company} alt="Company" className="w-6 h-6" />
                {nav && <span className="mx-4 font-medium">شرکت ها</span>}
              </NavLink>
              <NavLink
                to="/location"
                className={({ isActive }) => (isActive ? activeStyle : style)}
              >
                <img src={LocationDark} alt="location" className="w-6 h-6" />
                {nav && <span className="mx-4 font-medium">موقعیت ها</span>}
              </NavLink>
              <NavLink
                to="/time"
                className={({ isActive }) => (isActive ? activeStyle : style)}
              >
                <img src={Clock} alt="time" className="w-6 h-6" />
                {nav && <span className="mx-4 font-medium">فعالیت ها</span>}
              </NavLink>
              <NavLink
                to="/cartable"
                className={({ isActive }) => (isActive ? activeStyle : style)}
              >
                <img src={Folder} alt="Dashboard" className="w-6 h-6" />
                {nav && <span className="mx-4 font-medium">کارتابل من</span>}
              </NavLink>
              <NavLink
                to="/users"
                className={({ isActive }) => (isActive ? activeStyle : style)}
              >
                <img src={Profile} alt="Dashboard" className="w-6 h-6" />
                {nav && <span className="mx-4 font-medium">پرسنل</span>}
              </NavLink>
              <NavLink
                to="/reports"
                className={({ isActive }) => (isActive ? activeStyle : style)}
              >
                <img src={Chart} alt="Dashboard" className="w-6 h-6" />
                {nav && <span className="mx-4 font-medium">گزارش ها</span>}
              </NavLink>
              <NavLink
                to="/setting"
                className={({ isActive }) => (isActive ? activeStyle : style)}
              >
                <img src={Setting} alt="Dashboard" className="w-6 h-6" />
                {nav && (
                  <span className="mx-4 font-medium">تنظیمات کسب و کار</span>
                )}
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/logout"
                className={({ isActive }) => (isActive ? activeStyle : style)}
              >
                <img src={Logout} alt="Dashboard" className="w-6 h-6" />
                {nav && <span className="mx-4 font-medium">خروج</span>}
              </NavLink>
            </div>
          </nav>
        </aside>
        <div className="mx-3 mt-5 w-full md:mx-24">{children}</div>
      </div>
    </>
  );
};

export default Nav;

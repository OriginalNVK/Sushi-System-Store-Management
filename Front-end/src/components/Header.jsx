import React, { useState, useEffect } from "react";
import { logo } from "../assets";
import { navLinks, navLinksEmployee, navLinksManager } from "../constants";
import email from "../assets/email.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState("");

  const Navigate = useNavigate();
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLogged(false);
    setRole("");
    Navigate("/");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isLogged) {
      setIsLogged(true);
      setRole(user.role);
    }
  }, []);

  return (
    <nav className="flex items-center border-b-2 border-gray bg-gray2 px-20">
      <div className="w-300 flex items-center justify-center pr-20">
        <a href="/">
          <img
            src={logo}
            alt="logo"
            className="md:w-[140px] md:p-4 px-2 w-[100px]"
          />
        </a>
        <div className="flex justify-center items-center flex-col font-play text-white font-bold">
          <p className="text-2xl">OISHII SUSHI</p>
          <p className="text-2xl">HCM STREET FOOD</p>
        </div>
      </div>
      <div className="flex flex-col flex-1 flex-wrap justify-between gap-8">
        <div className="flex justify-between items-center">
          <div className="hidden lg:flex gap-2 cursor-pointer">
            <img src={email} alt="email" className="w-8 h-8" />
            <p className="text-xl text-white">Support@oishii.com</p>
          </div>
          <div className="text-xl text-white">
            {isLogged ? (
              <span>
                Hello {role === "manager branch" ? "Manager" : role === "employee"? "Employee" : "Customer"} |{" "}
                <button
                  className="cursor-pointer hover:text-orange"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </span>
            ) : (
              <>
                <a
                  href="/register"
                  className="cursor-pointer hover:text-orange"
                >
                  Register
                </a>
                {" | "}
                <a href="/login" className="cursor-pointer hover:text-orange">
                  Login
                </a>
              </>
            )}
          </div>
        </div>
        <ul className="list-none flex flex-1 flex-wrap justify-between px-4 md:py-0 py-2">
          {(isLogged && role === "employee" ? navLinksEmployee : role=='manager branch'? navLinksManager : navLinks).map(
            (link) => (
              <li
                key={link.id}
                className="font-play cursor-pointer md:text-xl text-xl text-white hover:text-orange uppercase"
              >
                <a
                  href={`${link.id !== "" ? `/${link.id}` : "/"}`}
                  className="flex gap-2 items-center"
                >
                  <img src={link.icon} alt={link.title} className="w-6 h-6" />
                  {link.title}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

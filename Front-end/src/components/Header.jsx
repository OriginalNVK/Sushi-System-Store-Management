import React, { useState, useEffect } from "react";
import { logo } from "../assets";
import { navLinks } from "../constants";
import email from "../assets/email.png";

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState('');

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
    setIsLogged(false); // Cập nhật trạng thái đăng nhập
    setRole(''); // Reset vai trò người dùng
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.isLogged) { // Kiểm tra xem người dùng đã đăng nhập chưa
      setIsLogged(true);
      setRole(user.role);  // Lưu lại vai trò người dùng
      }
  }, []);

  return (
    <nav className="flex items-center border-b-2 border-gray bg-gray2 px-20">
      <div className="w-300 flex items-center justify-center pr-20">
        <a href="/" className="">
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
          <div className="hidden md:flex gap-2 cursor-pointer">
            <img src={email} alt="email" className="w-8 h-8" />
            <p className="text-xl text-white ">Support@oishii.com</p>
          </div>
          <div className="text-xl text-white ">
            {isLogged ? (
              // Nếu người dùng đã đăng nhập, hiển thị thông tin vai trò và nút đăng xuất
              <span>
                Hello {role === 'customer' ? 'Customer' : 'Admin'} |    
                <button
                  className="cursor-pointer hover:text-orange"
                  onClick={handleLogout} // Gọi hàm đăng xuất khi nhấn nút
                >
                  Logout
                </button>
              </span>
            ) : (
              // Nếu người dùng chưa đăng nhập, hiển thị nút đăng ký và đăng nhập
              <>
                <button className="cursor-pointer hover:text-orange">
                  <a href="/register">Register</a>
                </button>
                |
                <button className="cursor-pointer hover:text-orange">
                  <a href="/login">Login</a>
                </button>
              </>
            )}
          </div>
        </div>
        <ul className="list-none flex flex-1 flex-wrap justify-between px-4 md:py-0 py-2">
          {navLinks.map((link) => (
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
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

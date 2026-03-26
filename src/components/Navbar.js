import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { useState } from 'react';

export default function Navbar() {

  const [isOpen, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "My Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Logout", path: "/login" }
  ];

  return (
    <>
      <nav className="p-4 text-white flex items-center justify-between w-full relative">

        {/* Logo */}
        <Link to="/home" className="text-2xl font-bold">
          SkillConnect
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-primary">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/team">CREATE | JOIN TEAM</Link></li>
          <li><Link to="/explore">EXPLORE</Link></li>
          <li><Link to="/explore-hackathons">HACKATHONS</Link></li>
          <li><Link to="/host">HOST</Link></li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Profile Icon */}
          <FiUser
            onClick={() => setOpen(!isOpen)}
            className="cursor-pointer border-2 border-primary rounded-full size-8 p-1"
          />

          {/* Hamburger Menu (Mobile Only) */}
          <div className="md:hidden">
            {menuOpen ? (
              <FiX size={24} onClick={() => setMenuOpen(false)} />
            ) : (
              <FiMenu size={24} onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-base text-white p-4 space-y-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link to="/team" onClick={() => setMenuOpen(false)}>CREATE | JOIN TEAM</Link>
          <Link to="/explore" onClick={() => setMenuOpen(false)}>EXPLORE</Link>
          <Link to="/host" onClick={() => setMenuOpen(false)}>HOST</Link>
        </div>
      )}

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="absolute right-4 top-[70px] w-48 p-2 shadow-lg border border-muted text-white bg-base font-primary z-50 rounded-lg">
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="p-2 hover:text-primary hover:bg-secondary cursor-pointer transition duration-200 rounded"
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
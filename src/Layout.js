import React from 'react'
import Navbar from './components/Navbar';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoGoogle,
  IoLogoLinkedin,
  IoLogoWhatsapp,
  IoLogoYoutube,
  IoLogoGithub
} from "react-icons/io";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {

  const socialLinks = [
    { icon: <IoLogoFacebook />, link: "https://facebook.com" },
    { icon: <IoLogoInstagram />, link: "https://instagram.com" },
    { icon: <IoLogoGoogle />, link: "https://google.com" },
    { icon: <IoLogoLinkedin />, link: "https://linkedin.com" },
    { icon: <IoLogoYoutube />, link: "https://youtube.com" },
    { icon: <IoLogoGithub />, link: "https://github.com" },
    { icon: <IoLogoWhatsapp />, link: "https://whatsapp.com" }
  ];

  return (
    <div className="bg-base min-h-screen flex flex-col">

      <Navbar />

      <div className="mt-[50px] flex-grow">
        {children}
      </div>

      <footer className="text-white flex flex-col items-center justify-center bg-base">

        <div className="border-t border-t-muted border-b border-b-muted w-full flex flex-col md:flex-row items-center md:items-start justify-between p-10 gap-8">

          <div className='small-6 large-3'>
            <nav>
              <h4 className="text-lg font-semibold mb-3">Portfolio</h4>
              <ul>
                <li>
                  <Link to="/about" className="hover:text-primary transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary transition">
                    Help
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Hackathon Section */}
          <div className="small-6 large-3">
            <nav>
              <h4 className="text-lg font-semibold mb-3">Hackathons</h4>
              <ul>
                <li>
                  <Link to="/explore-hackathons" className="hover:text-primary transition">
                    Browse Hackathons
                  </Link>
                </li>
                <li>
                  <Link to="/host-hackathon" className="hover:text-primary transition">
                    Host a Hackathon
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className='small-6 large-3'>
            <nav>
              <h4 className="text-lg font-semibold mb-3">Portfolio</h4>
              <ul>
                <li>
                  <Link to="/profile" className="hover:text-primary transition">
                    Your Teams
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-primary transition">
                    Your Projects
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex gap-5">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:text-primary transition duration-200 cursor-pointer"
              >
                {item.icon}
              </a>
            ))}
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="m-6 font-primary text-sm text-gray-400">
          © 2026 SkillConnect. All rights reserved.
        </div>

      </footer>

    </div>
  )
}

export default Layout
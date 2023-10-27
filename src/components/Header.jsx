import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LabLogo from "../assets/Test2.jpg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoffittLogo from "../assets/MoffittLogo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuth } from "../contexts/AuthContext"; // Make sure the path is correct

const Header = () => {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [showAboutMenu, setShowAboutMenu] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to the homepage after logout
  };

  const handleClick = () => {
    setNav(!nav);
  };
  const handleMobileMenuClick = (menu) => {
    if (menu === "About") {
      setShowAboutMenu(!showAboutMenu);
      setShowToolsMenu(false);
    } else if (menu === "Tools") {
      setShowToolsMenu(!showToolsMenu);
      setShowAboutMenu(false);
    }
  };
  const handleAboutClick = () => {
    setShowAboutMenu(!showAboutMenu);
    setShowToolsMenu(false);
  };

  const handleToolsClick = () => {
    setShowToolsMenu(!showToolsMenu);
    setShowAboutMenu(false);
  };

  const getCurrentPage = () => {
    const currentPage = baseActions.find(
      (action) => action.href === window.location.pathname
    );
    return currentPage ? currentPage.label : null;
  };

  const baseActions = [
    { label: "Home", href: "/" },
    { label: "Research", href: "/research" },
    {
      label: "About",
      href: "/about",
      type: "dropdown",
      subActions: [
        { label: "People", href: "/people" },
        { label: "Logo", href: "https://nlplab123456789.s3.amazonaws.com/Doc.pdf" },
      ],
    },
    {
      label: "Tools",
      href: "/tools",
      type: "dropdown",
      subActions: [
        { label: "Inception", href: "http://inception.lailab.info:8080/" },
        { label: "Philm2Web", href: "https://inception.lailab.info/pages/PHILM/" },
      ],
    },
  ];

  // Add extra action if user is an admin
  if (isLoggedIn && isAdmin) {
    const aboutAction = baseActions.find(action => action.label === 'About');
    if (aboutAction) {
      aboutAction.subActions.push({ label: "Admin Dashboard", href: "/admin-dashboard" });
    }
  }

  return (
    <>
      <header className="bg-[#f5f5f5] flex items-center justify-between py-4 px-4">
        <a className="flex items-center hover:cursor-pointer" href="/">
          <img src={LabLogo} alt="Lab Logo" className="h-[60px]  mr-4" />
          <h1 className="hidden md:block text-xl font-semibold text-[#003366]">
            Language Intelligence
          </h1>
        </a>
        <ul className="hidden md:flex md:items-center cursor-pointer md:space-x-4">
          {baseActions.map((action) => (
            <li key={action.href}>
              {action.type === "dropdown" ? (
                <>
                  <span
                    className={`hover:text-[black] text-lg text-[#005a9b] mx-4`}
                    onClick={
                      action.label === "About"
                        ? handleAboutClick
                        : handleToolsClick
                    }
                  >
                    {action.label}
                    <ExpandMoreIcon fontSize="medium" />
                  </span>
                  {(action.label === "About" && showAboutMenu) || (action.label === "Tools" && showToolsMenu) ? (
                    <ul className="absolute bg-[#ffffff] z-10 border rounded-md">
                      {action.subActions.map((subAction) => (
                        <li
                          key={subAction.label}
                          className="flex items-center p-4 border-b hover:text-[black] text-lg cursor-pointer text-[#005a9b]"
                        >
                          <a href={subAction.href} className="mx-4">
                            {subAction.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              ) : (
                <a
                  href={action.href}
                  className={`hover:text-[black] text-lg text-[#005a9b] mx-4 ${
                    getCurrentPage() === action.label
                      ? "underline"
                      : ""
                  }`}
                >
                  {action.label}
                </a>
              )}
            </li>
          ))}
          {isLoggedIn ? (
            <li>
              <div 
                role="button" 
                onClick={handleLogout} 
                className="hover:text-[black] text-lg text-[#005a9b] mx-4 cursor-pointer"
              >
                Logout
              </div>
            </li>
          ) : (
            <li>
              <a href="/login" className="hover:text-[black] text-lg text-[#005a9b] mx-4">
                Login
              </a>
            </li>
          )}
        </ul>
        <div>
          <img src={MoffittLogo} alt="Moffitt Logo" className="h-10 mx-4" />
        </div>
        <div className="md:hidden">
          <IconButton onClick={handleClick}>
            {!nav ? <MenuIcon fontSize="large" /> : <CancelIcon fontSize="large" />}
          </IconButton>
        </div>
      </header>
      {nav ? (
        <div className="flex flex-col w-full h-full bg-white md:hidden">
          <ul>
            {baseActions.map((action) => (
              <li key={action.href} className="hover:bg-gray-200">
                {action.type === "dropdown" ? (
                  <>
                    <div
                      className="flex items-center justify-between p-4 border-b"
                      onClick={() => handleMobileMenuClick(action.label)}
                    >
                      <span className="text-lg font-medium text-[#005a9b]">
                        {action.label}
                      </span>
                      <ExpandMoreIcon fontSize="medium" />
                    </div>
                    {((action.label === "About" && showAboutMenu) || (action.label === "Tools" && showToolsMenu)) && (
                      <ul className="border border-t-0">
                        {action.subActions.map((subAction) => (
                          <li key={subAction.label}>
                            <a
                              href={subAction.href}
                              className="block p-4 text-lg font-medium text-center text-[#005a9b] border-b border-gray-300"
                            >
                              {subAction.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <a
                    href={action.href}
                    className="block p-4 text-lg font-medium text-center text-[#005a9b] border-b"
                  >
                    {action.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Header;

import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LabLogo from "../assets/Test2.jpg";
import { Close } from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoffittLogo from "../assets/MoffittLogo.png";
import CancelIcon from "@mui/icons-material/Cancel";


const Header = () => {
  const actions = [
    { label: "Home", href: "/" },
    { label: "Research", href: "/research" },
    { label: "Publications", href: "/publications" },
    {
      label: "About",
      href: "/about",
      type: "dropdown",
      subActions: [
        {
          label: "People",
          href: "/people",
        },
        {
          label: "Logo",
          href: "https://nlplab123456789.s3.amazonaws.com/Doc.pdf",
        },
      ],
    },
    {
      label: "Tools",
      href: "/tools",
      type: "dropdown",
      subActions: [
        {
          label: "Inception",
          href: "http://inception.lailab.info:8080/",
        },
        {
          label: "Philm2Web",
          href: "https://inception.lailab.info/pages/PHILM/",
        },
      ],
    },
  ];

  const [nav, setNav] = useState(false);
  const [showAboutMenu, setShowAboutMenu] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true); // Track user login status
  const isAdmin = true; // Replace with actual authorization logic for admin access

  const handleClick = () => {
    setNav(!nav);
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
    const currentPage = actions.find(
      (action) => action.href === window.location.pathname
    );
    return currentPage ? currentPage.label : null;
  };

  return (
    <>
      <header className="bg-[#f5f5f5] flex items-center justify-between py-4">
        <a className="flex items-center ml-4 hover:cursor-pointer" href="/">
          <img src={LabLogo} alt="Lab Logo" className="h-[60px]  mr-4" />
          <h1 className="hidden md:text-xl md:flex md:flex-col md:font-semibold text-[#003366]">
            <span>Language</span>
            <span>Intelligence</span>
          </h1>
        </a>
        <ul className="hidden md:flex md:items-center cursor-pointer md:space-x-4">
          {actions.map((action) => (
            <li key={action.href}>
              {action.type === "dropdown" ? (
                <>
                  <span
                    className={`hover:text-[black] text-lg text-[#005a9b] mx-4  ${
                      action.subActions.some(
                        (subAction) =>
                          subAction.href === window.location.pathname
                      )
                        ? "underline underline-offset-8"
                        : ""
                    }`}
                    onClick={
                      action.label === "About"
                        ? handleAboutClick
                        : action.label === "Tools"
                        ? handleToolsClick
                        : undefined
                    }
                  >
                    {action.label}
                    <ExpandMoreIcon fontSize="medium" />
                  </span>
                  {action.label === "About" && showAboutMenu && (
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
                  )}
                  {action.label === "Tools" && showToolsMenu && (
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
                  )}
                </>
              ) : (
                <a
                  href={action.href}
                  className={`hover:text-[black] text-lg text-[#005a9b] mx-4 ${
                    getCurrentPage() === action.label
                      ? "underline underline-offset-8"
                      : ""
                  }`}
                  onClick={
                    action.label === "About" ? handleAboutClick : undefined
                  }
                >
                  {action.label}
                </a>
              )}
            </li>
          ))}
          {/* Conditionally render Login/Logout and Admin Dashboard tabs */}
          {!loggedIn ? (
            <li>
              <a href="/login" className="hover:text-[black] text-lg text-[#005a9b] mx-4">
                Login
              </a>
            </li>
          ) : (
            <>
              <li>
                <a href="/logout" className="hover:text-[black] text-lg text-[#005a9b] mx-4">
                  Logout
                </a>
              </li>
              {isAdmin && (
                <li>
                  <a href="/dashboard" className="hover:text-[black] text-lg text-[#005a9b] mx-4">
                    Admin Dashboard
                  </a>
                </li>
              )}
            </>
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
      <div
        className={
          nav
            ? "fixed left-0 h-full border-r border-r-gray-900 ease-in-out duration-500 bg-[#f5f5f5]"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <ul className="text-[#005a9b] p-4 space-y-4 items-center">
          <h1 className="text-xl font-semibold">
            Language and Intelligence Lab
          </h1>
          {actions.map((action) => {
            if (action.label !== "About") {
              return (
                <li
                  key={action.href}
                  className="text-[#005a9b] text-lg border-b border-gray-600"
                >
                  <a href={action.href} className="hover:text-[#0e2734]">
                    {action.label}
                  </a>
                </li>
              );
            }
            return null;
          })}
          <li className="text-[#005a9b] text-lg border-b border-gray-600">
            <a href="/people" className="hover:text-[#0e2734]">
              People
            </a>
          </li>
          <li className="text-[#005a9b] text-lg border-b border-gray-600">
            <a href="/blogs" className="hover:text-[#0e2734]">
              Blogs
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;

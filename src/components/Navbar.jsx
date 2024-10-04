import React, { useState, useEffect, useRef } from "react";
import Avatar from 'react-avatar';
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdMic } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import logo from "../../public/logo.png";
import profile from "../../public/profile.jpg";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);


  // Static list of suggestions (replace with API call if needed)
  const allSuggestions = [
    "React tutorials",
    "React vs Vue",
    "Best programming languages 2024",
    "How to use useState in React",
    "JavaScript tips and tricks",
    "CSS Flexbox guide",
    "Understanding React Hooks",
    "Building a Navbar in React",
    "Deploying React applications",
    "Responsive design principles",
    "wwe",
    "carryminati",
    "t series",
    "Arijit Singh songs", 
    "pubg",
    "pubg gameplay videos",
  ];

  // Handle clicks outside the suggestions dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.trim().length > 0
    ) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filteredSuggestions = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search/${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="flex justify-between fixed top-0 w-full bg-white px-6 py-2 shadow-md z-50" ref={wrapperRef}>
      {/* Left Section: Menu and Logo */}
      <div className="flex items-center space-x-4 ">
        <AiOutlineMenu className="text-xl cursor-pointer" />
        <img src={logo} alt="Logo" className="w-28 cursor-pointer" onClick={() => navigate("/")} />
      </div>

      {/* Middle Section: Search Bar */}
      <div className="relative flex w-[43%] items-center">
        <div className="w-full px-4 py-2 border border-gray-400 rounded-l-full flex items-center">
          <CiSearch size="20px" className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full"
            onChange={handleInputChange}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
          />
        </div>
        <button
          className="px-4 py-2 border border-gray-400 bg-gray-100 rounded-r-full flex items-center justify-center"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <CiSearch size="24px" />
        </button>
        <IoMdMic
          size="42px"
          className="ml-3 border border-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
        />
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Section: Icons and Avatar */}
      <div className="flex space-x-5 items-center ">
        <RiVideoAddLine className="text-2xl cursor-pointer hover:text-gray-700" />
        <AiOutlineBell className="text-2xl cursor-pointer hover:text-gray-700" />
        <Avatar src={profile} size="32" round={true} className="cursor-pointer" />
      </div>
    </div>
  );
}

export default Navbar;
import React, { useState, useRef, useEffect } from "react";
import { FaHackerrank } from "react-icons/fa";
import Logo from "@/assets/logo-trans.png";
import Search from "../Search";
import "./styles.scss";
import { FiSearch } from "react-icons/fi";
import Menu from "../Menu";

function Header() {
  // You can now get a ref directly to the DOM button:
  const ref = useRef<HTMLInputElement>(null);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    if (showSearchInput) {
      ref?.current?.focus();
    }
  }, [showSearchInput]);

  return (
    <div className="header">
      <img className="header_logo" src={Logo} alt="logo" width={70} />

      <div className="header_search">
        <Search />
      </div>

      {showSearchInput && (
        <div className="header_search--md-show">
          <Search ref={ref} onBlur={() => setShowSearchInput(false)} />
        </div>
      )}

      {!showSearchInput ? (
        <div className="header_menu">
          <div
            className="header_menu_search"
            onClick={() => {
              setShowSearchInput((prev) => !prev);
            }}
          >
            <FiSearch />
          </div>
          <Menu />
        </div>
      ) : null}
    </div>
  );
}

export default Header;

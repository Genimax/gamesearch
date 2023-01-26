import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  return (
    <div className="main-container">
      <Logo />
      <SearchBar />
    </div>
  );
};

export default Header;

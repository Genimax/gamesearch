import React, { useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Header = () => {
  const [placeholder, setPlaceholder] = useState("find your game");

  return (
    <div className="main-container">
      <Logo />
      <SearchBar defaultText={placeholder} onGameChange={setPlaceholder} />
    </div>
  );
};

export default Header;

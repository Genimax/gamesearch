import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import classNameRender from "./ClassNameRender";

const Header: React.FC = () => {
  const [placeholder, setPlaceholder] = useState("find your game");

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return (
    <div className={`main-container${classNameRender(path, "-up")}`}>
      <div className={`header-container${classNameRender(path, "-up")}`}>
        <Logo />
        <SearchBar defaultText={placeholder} onGameChange={setPlaceholder} />
      </div>
    </div>
  );
};

export default Header;

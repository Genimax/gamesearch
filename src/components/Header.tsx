import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import classNameRender from "../functions/ClassNameRender";
import { useHeader } from "../hooks/header";

const Header: React.FC = () => {
  const { placeholder, path, setPlaceholder } = useHeader();

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

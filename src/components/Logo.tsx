import React, { useEffect, useState } from "react";
import classNameRender from "./ClassNameRender";

const Logo: React.FC = () => {
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

  const onLogoClick = (e: any) => {
    e.preventDefault();
    window.history.pushState({}, "", "/");
    const navE = new PopStateEvent("popstate");
    window.dispatchEvent(navE);
  };

  return (
    <a
      href="/"
      onClick={onLogoClick}
      className={`logo-container${classNameRender(path, "-up")}`}
    >
      <img
        className={`logo-icon${classNameRender(path, "-up")}`}
        src="./logo1.svg"
        alt="logo"
      />
      <h4 className={`logo-text`}>gamechecks</h4>
    </a>
  );
};

export default Logo;

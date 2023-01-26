import React, { useEffect, useState } from "react";

const Logo: React.FC = () => {
  const [path, setPath] = useState(window.location.pathname);

  const classNameRender: Function = (): string => {
    if (path !== "/") return "-up";
    return "";
  };

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
      className={`logo-container${classNameRender()}`}
    >
      <img
        className={`logo-icon${classNameRender()}`}
        src="./logo1.svg"
        alt="logo"
      />
      <h4 className={`logo-text`}>gamechecks</h4>
    </a>
  );
};

export default Logo;

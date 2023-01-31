import React, { useState, useEffect } from "react";

export function useLogo() {
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

  const onLogoClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", "/");
    const navE = new PopStateEvent("popstate");
    window.dispatchEvent(navE);
  };

  return { path, onLogoClick };
}

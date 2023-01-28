import { useEffect, useState } from "react";

export function useHeader() {
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

  return { placeholder, path, setPlaceholder };
}

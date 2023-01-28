import React from "react";

const onLocationChange = (component: React.Component) => {
  const setTracker = () => {
    component.setState({ path: window.location.pathname });
  };

  window.addEventListener("popstate", setTracker);

  return () => {
    window.removeEventListener("popstate", setTracker);
  };
};

export default onLocationChange;

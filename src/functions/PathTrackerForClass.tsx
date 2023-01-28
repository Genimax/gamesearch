import React from "react";

const onLocationChange = (component: React.Component) => {
  console.log(component);

  const setTracker = () => {
    component.setState({ path: window.location.pathname });
  };

  window.addEventListener("popstate", setTracker);

  return () => {
    window.removeEventListener("popstate", setTracker);
  };
};

export default onLocationChange;

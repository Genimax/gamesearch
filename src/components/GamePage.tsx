import React from "react";
import PathTrackerClass from "../functions/PathTrackerForClass";

class GamePage extends React.Component {
  state = { path: window.location.pathname };

  componentDidMount() {
    PathTrackerClass(this);
  }

  render(): React.ReactNode {
    // return <div>{this.state.path}</div>;
    return;
  }
}

export default GamePage;

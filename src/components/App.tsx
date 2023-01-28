import React from "react";
import Header from "./Header";
import GamePage from "./GamePage";
import PathTrackerForClass from "../functions/PathTrackerForClass";

class App extends React.Component {
  state = { path: window.location.pathname };

  componentDidMount() {
    PathTrackerForClass(this);
  }

  render() {
    return (
      <>
        <Header />
        {this.state.path !== "/" ? <GamePage /> : null}
      </>
    );
  }
}

export default App;

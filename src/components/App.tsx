import React from "react";
import Header from "./Header";
import GamePage from "./GamePage";
import PathTrackerForClass from "../functions/PathTrackerForClass";
import { Routes, Route } from "react-router-dom";

class App extends React.Component {
  state = { path: window.location.pathname };

  componentDidMount() {
    PathTrackerForClass(this);
  }

  render() {
    return (
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Header />
              {this.state.path !== "/" ? <GamePage /> : null}
            </>
          }
        />
      </Routes>
    );
  }
}

export default App;

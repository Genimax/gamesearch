import React from "react";

type LoadingProps = { advice: String };

class Loading extends React.Component<LoadingProps> {
  render(): React.ReactNode {
    return (
      <div className="search-results">
        <img src="./loading.png" id="loading-icon" alt="loading" />
        <div className="loading-advice-holder">
          <p className="loading-header">GameChecks Life Tip:</p>
          <p id="loading-text">{this.props.advice}</p>
        </div>
      </div>
    );
  }
}

export default Loading;

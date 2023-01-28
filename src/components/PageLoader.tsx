import React from "react";

class PageLoader extends React.Component {
  render() {
    return (
      <div className="loading-page-main">
        <h1 className="loading-page-text">LOADING...</h1>
        <svg width="0" height="0">
          <filter id="gooey-black-hole">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="20"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -16"
              result="goo"
            />
          </filter>
        </svg>
        <div className="black-hole">
          <ul className="gooey-container">
            <li className="bubble"></li>
            <li className="bubble"></li>
            <li className="bubble"></li>
            <li className="bubble"></li>
            <li className="bubble"></li>
            <li className="bubble"></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PageLoader;

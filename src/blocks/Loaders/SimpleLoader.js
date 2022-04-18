import React, { Component } from "react";
class SimpleLoader extends Component {
  render() {
    return (
      <div className="simple-loader">
        <div
          className="single-loader align-items-center justify-content-center"
          id="loader"
        >
          <div className="loader_img">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SimpleLoader;

import React from "react";

const FixedLoader = () => {
  return (
    <div className="full-page-loader align-items-center justify-content-center">
      <div className="loader_img">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default FixedLoader;

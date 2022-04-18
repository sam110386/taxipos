import React from "react";
import { connect } from "react-redux";

const FullLoader = ({ pageLoading }) => {
  if (!pageLoading) return null;

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

const mapStateToPops = (state) => {
  const { pageLoading } = state.global;
  return { pageLoading };
};

export default connect(mapStateToPops)(FullLoader);

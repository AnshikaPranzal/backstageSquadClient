import React from "react";
// import Footer from "./Footer";

const Base = ({ children }) => {
  return (
    <div>
      <div className="header-padding">
        {children}
      </div>
    </div>
  );
};

export default Base;

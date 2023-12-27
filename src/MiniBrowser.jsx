import React from "react";

const MiniBrowser = ({ url }) => {
  return (
    <div className="mini-browser" style={{ height: "700px", marginTop: 80 }}>
      <iframe title="Mini Browser" src={url} width="100%" height="100%" />
    </div>
  );
};

export default MiniBrowser;

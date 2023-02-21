import React from "react";
import ReactDOM from "react-dom";

const rootNode = document.getElementById("#mw-content");
const root = ReactDOM.createRoot(rootNode);

const profileTop = React.createElement("div", { id: "profile-top" });

root.render(profileTop);

ReactDOM.render(profileTop, root);

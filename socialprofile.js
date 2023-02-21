$.getScript(
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"
).then(
  function () {
    $.getScript(
      "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"
    ).then(
      function () {
        const rootNode = document.createElement("div");
        document.getElementById("mw-content").prepend(rootNode);
        const root = ReactDOM.createRoot(rootNode);

        const profileTop = React.createElement("div", { id: "profile-top" });

        root.render(profileTop);

        ReactDOM.render(profileTop, root);
      },
      function (e) {
        // Script failed. X is not available
        mw.log.error(e.message); // => "Failed to load script"
      }
    );
  },
  function (e) {
    // Script failed. X is not available
    mw.log.error(e.message); // => "Failed to load script"
  }
);

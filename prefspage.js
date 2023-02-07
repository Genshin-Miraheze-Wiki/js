if (mw.config.values.wgPageName === "Preferences") {
  mw.loader.using("oojs-ui-core").done(function () {
    $(function () {
      async function changePrefs(skin) {
        var params = {
          action: "options",
          change: "skin=" + skin,
          format: "json",
        };

        api = new mw.Api();

        await api.postWithToken("csrf", params).done(function (data) {
          console.log(data);
        });
      }

      var params = {
        action: "query",
        meta: "userinfo",
        uiprop: "options",
        format: "json",
      };

      var api = new mw.Api();

      api.get(params).then(function (prefsData) {
        var skinDropdown = new OO.ui.DropdownInputWidget({
          $overlay: true,
          options: [
            {
              data: "cosmos",
              label: "Cosmos",
            },
            {
              data: "evelution",
              label: "Evelution",
            },
          ],
          value: prefsData.query.userinfo.options.skin,
        });

        var layoutPrefsHeader = document.createElement("h2");
        layoutPrefsHeader.innerText = "Site skin and appearance";

        var skinHeader = document.createElement("h3");
        skinHeader.innerText = "Skin";

        skinHeader.style.border = "0";
        skinHeader.style.padding = "0";
        skinHeader.style.margin = "0";
        skinHeader.style.marginBottom = "5px";

        layoutPrefsHeader.style.border = "0";
        layoutPrefsHeader.style.padding = "0";
        layoutPrefsHeader.style.margin = "0";
        layoutPrefsHeader.style.marginBottom = "5px";

        $("#mw-content-text").append(layoutPrefsHeader);
        $("#mw-content-text").append(skinHeader);

        $("#mw-content-text").append(skinDropdown.$element);

        //skinDropdown.on("change", skinSelect);

        var saveBtn = new OO.ui.ButtonWidget({
          label: "Save settings",
        });

        saveBtn.on("click", async function () {
          var progressBar = new OO.ui.ProgressBarWidget({
            progress: false,
          });

          $("#mw-content-text").append(progressBar.$element);

          await changePrefs(skinDropdown.value);

          setTimeout(function () {
            location.reload();
          }, 1500);
        });

        $("#mw-content-text").append(saveBtn.$element);
      });
    });
  });
}

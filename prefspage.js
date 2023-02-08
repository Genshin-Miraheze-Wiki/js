if (mw.config.values.wgPageName === "Genshin_Impact_Wiki:Preferences") {
  /*history.replaceState(
    null,
    "",
    "https://genshinimpact.miraheze.org/wiki/Special:Preferences"
  );*/

  mw.loader.using("oojs-ui-core").done(function () {
    $(function () {
      async function changePrefs(skin, responsive) {
        var params = {
          action: "options",
          change: `skin=${skin}|skin-responsive=${responsive}`,
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

        $("#mw-content-text").append(document.createElement("br"));

        var mobileResponsiveCheckbox = new OO.ui.CheckboxInputWidget({
          value: "mobileresponsive",
          selected: prefsData.query.userinfo.options["skin-responsive"] == "1",
        });

        mobileResponsiveFieldset = new OO.ui.FieldsetLayout({
          label: "Enable mobile compatibility",
        });

        mobileResponsiveFieldset.addItems([
          new OO.ui.FieldLayout(mobileResponsiveCheckbox, {
            label:
              "Automatically adapt the site's layout to screen size on mobile when using a mobile device",
            align: "inline",
          }),
        ]);

        $("#mw-content-text").append(mobileResponsiveFieldset.$element);

        $("#mw-content-text").append(document.createElement("br"));

        var saveBtn = new OO.ui.ButtonWidget({
          label: "Save settings",
        });

        saveBtn.on("click", async function () {
          var progressBar = new OO.ui.ProgressBarWidget({
            progress: false,
          });

          $("#mw-content-text").append(progressBar.$element);

          await changePrefs(
            skinDropdown.value,
            mobileResponsiveCheckbox.selected ? "1" : "0"
          );

          setTimeout(function () {
            location.reload();
          }, 1500);
        });

        $("#mw-content-text").append(saveBtn.$element);
      });
    });
  });
}

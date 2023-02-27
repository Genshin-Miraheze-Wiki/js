window.addEventListener("load", function () {
  $("#pt-preferences > a")[0].href =
    "https://genshinimpact.miraheze.org/wiki/Genshin_Impact_Wiki:Preferences";
});

if (mw.config.values.wgPageName === "Genshin_Impact_Wiki:Preferences") {
  mw.loader.using("oojs-ui-core").done(function () {
    $(function () {
      async function changePrefs(skin, responsive) {
        var params = {
          action: "options",
          change: `skin=${skin}|skin-responsive=${responsive}`,
          format: "json",
        };

        api = new mw.Api();

        await api.postWithToken("csrf", params);
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

        api
          .get({
            action: "query",
            meta: "userinfo",
            uiprop: "email",
            format: "json",
          })
          .then(function (prefsData) {
            var emailPrefsHeader = document.createElement("h2");
            emailPrefsHeader.innerText = "Email address";

            emailPrefsHeader.style.border = "0";
            emailPrefsHeader.style.padding = "0";
            emailPrefsHeader.style.margin = "0";
            emailPrefsHeader.style.marginBottom = "5px";

            $("#mw-content-text").append(document.createElement("br"));
            $("#mw-content-text").append(emailPrefsHeader);

            var emailTextInput = new OO.ui.TextInputWidget({
              value: prefsData.query.userinfo.email,
              disabled: true,
            });

            $("#mw-content-text").append(emailTextInput.$element);

            var changeEmailBtn = new OO.ui.ButtonWidget({
              label: "Change or remove email address",
              href: "https://genshinimpact.miraheze.org/wiki/Special:ChangeEmail",
              target: "_blank",
            });

            $("#mw-content-text").append(changeEmailBtn.$element);

            $("#mw-content-text").append(document.createElement("br"));

            var mirahezeMetaText = document.createElement("p");
            mirahezeMetaText.innerHTML =
              'Most Miraheze-wide settings aren\'t listed here. You can manage them <a target="_blank" rel="nofollow" href="https://meta.miraheze.org/wiki/Special:Preferences">on Miraheze Meta</a>.';

            $("#mw-content-text").append(mirahezeMetaText);

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
  });
}

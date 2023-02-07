import "./prefspage";

window.addEventListener("load", function () {
  if (
    mw.config.values.wgNamespaceNumber === 2 &&
    mw.config.values.wgPageName.includes("/")
  ) {
    // by default, css removes #cosmos-page-header from user namespaces, but if we are in a user subpage (not root page), we will reverse that
    document.getElementById("cosmos-page-header").style.display = "block";
  }

  if (
    mw.config.values.wgNamespaceNumber === 2 &&
    !mw.config.values.wgPageName.includes("/")
  ) {
    // but, if we're on a user root page, socialprofile gives a user page header for us, so we don't need the cosmos header. we already remove this through css, so let's also remove it from the dom via to avoid accessibility or seo issues
    document.getElementById("cosmos-page-header").remove();
  }
});

/* taken from polandball wiki at https://www.polandballwiki.com/wiki/MediaWiki:Common.js */
$("#discord-widget").html(
  '<iframe src="https://discord.com/widget?id=1062994000677715988&theme=dark" width="280" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>'
);

// taken from modernizr library, this is so that we can remove broken elements from the home page on mobile
if (
  mw.config.values.wgPageName === "Genshin_Impact_Wiki" &&
  ("ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch))
) {
  // this IS already removed through css, but we remove it through js too just in case
  $(".main-page-tag-rcs")[0].remove();
} else if (mw.config.values.wgPageName === "Genshin_Impact_Wiki") {
  // but if we're on desktop, we should make it visible again instead
  document.getElementById("desktopcolumns").style.display = "block";
}

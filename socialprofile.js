if (
  mw.config.values.wgNamespaceNumber === 3 && // user talk namespace
  mw.config.values.wgArticleId !== 0 // if the article id is 0 then it doesnt exist
) {
  fetch(
    `https://genshinimpact.miraheze.org/w/api.php?origin=*&action=parse&text=%7B%7B%23avatar%3A${encodeURIComponent(
      mw.config.values.wgPageName.split(":")[1]
    )}%7D%7D&contentmodel=wikitext&format=json`
    /*
    uses the mediawiki api to parse the results of the socialprofile avatar parser function (https://www.mediawiki.org/wiki/Extension:SocialProfile)
    then get the data back from it and turn it into an image url
    a bit complex, but it works well enough
    */
  ).then(function (data) {
    data.json().then(function (b) {
      const avatarUrl = /(?<=<img src=").*(?=" border=")/gm
        .exec(b.parse.text["*"])[0] /*
        executes a regex to get the image back from the json data, check the api url above and comments to see how that works
        */
        .replace("//", "https://")
        /*
        converts the returned data into a https url instead of a "//" path (pretty sure that dynamically chooses between http and https), there is no reason we would load this from a http path
         */
        .replace("2_m", "2_l"); /*
        the avatar that we get back from the API is in "m" size (presumably "medium"?) and is very small. changing it to "l" (large?) size makes it workable.
        also the letter that comes after 2_ is the size i think, no clue how the naming structure was decided
        */

      const profileElement = document.createElement("div");
      profileElement.innerHTML = `<div id="profile-top">
<div style="float: left;
margin: 0 8px 0 0;
position: relative;
padding-left: 2em;">
          <img
            src="${avatarUrl}"
            style="width:138px;
            height:138px;
            border-width:1px;
            border-style:solid;
            border-radius:50%;
            object-fit: cover;
            background-color: #fff;
            border: 1px solid #dcdcdc;
            padding: 3px;"
            alt="avatar"
            border="0"
          />
        </div>
        <div id="profile-right">
          <div style="padding: 0 0 6px 6px;">
            <div class="hgroup">
              <h1 itemprop="name">${mw.config.values.wgPageName
                .split(":")[1]
                .replaceAll("_", " ")}</h1>
              <span class="tag tag-sysop">Administrator</span>
            </div>
            <div class="visualClear"></div>
          </div>
          <div class="profile-actions">
            <a
            href="https://genshinimpact.miraheze.org/wiki/Special:UpdateProfile"
            rel="nofollow"
              >Edit profile</a
            >
            |
            <a
            href="https://genshinimpact.miraheze.org/wiki/User:${encodeURIComponent(
              mw.config.values.wgPageName.split(":")[1]
            )}"
            rel="nofollow"
            >User profile</a
            |
            <a href="https://genshinimpact.miraheze.org/wiki/Special:UploadAvatar"
            rel="nofollow"
              >Upload avatar</a
            >
            |
            <a href="https://genshinimpact.miraheze.org/wiki/Special:Watchlist"
            rel="nofollow"
              >My watchlist</a
            >
            |
            <a
              href="https://genshinimpact.miraheze.org/wiki/Special:Contributions/Collei"
              rel="nofollow"
              >Contributions</a
            >
            |
            <a
              rel="nofollow"
              >Talk page</a
            >
          </div>
        </div>
        <div class="visualClear"></div>
      </div>
      `;

      $("#ca-nstab-user").remove(); // removes the "back to user page" thing
      $("#firstHeading").remove(); // remove page header
      $("#cosmos-page-header").css("float", "right"); // floats the edit button to the right. if you dont do this the layout looks awkward.
      $("#CosmosRailWrapper").remove(); // removes the cosmos rail, looks weird here and is rather pointless
      $("#cosmos-pageBody-content", "width", "100% !important"); // makes the text content fill most of the page, otherwise there's going to be a bunch of unused blank space

      document.getElementById("content").prepend(profileElement);
    });
  });
}

if (
  mw.config.values.wgNamespaceNumber === 2 &&
  mw.config.values.wgArticleId !== 0
) {
  $(".profile-actions")[0].innerHTML;
  $(".profile-actions")[0].innerHTML +
    `| <a href="https://genshinimpact.miraheze.org/wiki/User_talk:${encodeURIComponent(
      mw.config.values.wgPageName.split(":")[1]
    )}" rel="nofollow">Talk page</a></div>`;
}

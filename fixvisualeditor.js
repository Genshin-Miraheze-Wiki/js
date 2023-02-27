// fixes the visual editor button disappearing at random

label = "Edit";

title = "Edit this page";

if (
  !document.querySelector("#ca-ve-edit") &&
  document.querySelector("#ca-edit")
) {
  editSource = document.querySelector("#ca-edit");

  newEdit = editSource.cloneNode(true);

  pageTitle = document
    .querySelector('meta[property="og:title"]')
    .content.replace(/\s/g, "_");

  newEdit.innerHTML =
    '<a href="/w/index.php?title=' +
    pageTitle +
    '&amp;veaction=edit" title="Edit this page [alt-shift-v]" accesskey="v">Edit</a>Edit</a>';

  newEdit.id = "ca-ve-edit";

  editSource.before(newEdit);
}

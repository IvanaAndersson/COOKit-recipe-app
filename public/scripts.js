//FILEPOND FILE UPLOAD

FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

FilePond.setOptions({
  stylePanelAspectRatio: 0.5,
});

//Turn all file input elements into ponds
FilePond.parse(document.body);

// MAIN PAGE SCRIPTS

const container = document.querySelector("#main-page-container");
if (
  container.childElementCount >= 1 &&
  container.innerText !== "There are no recipes to display"
) {
  container.classList.add("recipes-grid");
} else {
  container.classList.remove("recipes-grid");
}

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

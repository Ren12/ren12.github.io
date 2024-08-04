Dropzone.autoDiscover = false;

let uploadPhotoDropzone = new Dropzone("#dropzone", {
    url: '/file-upload',
    uploadMultiple: true,
    autoProcessQueue: false,
    dictDefaultMessage: 'Drag and drop photos here or <a href="javascript:void(0);">select on your device</a>',
    previewTemplate: `
          <div class="dz-preview dz-file-preview">
            <div class="dz-image"><img data-dz-thumbnail /></div>
            <div class="dz-remove" data-dz-remove><img src="../static/images/icons/delete-white-icon.svg" alt="Delete" /></div>
          </div>
        `
});

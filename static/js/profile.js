$('.user-settings__item').on('mouseenter', function () {
    if ($(this).hasClass('editable')) {
        $(this).find('.user-settings__edit').addClass('show');
    }
});

$('.user-settings__item').on('mouseleave', function () {
    $(this).find('.user-settings__edit').removeClass('show');
});

$('.user-settings__edit').on('click', function () {
    $(this).siblings('.user-settings__label, .user-settings__value').hide();
    $(this).siblings('form').addClass('show');
    $(this).parents('.user-settings__item').removeClass('editable');
    $(this).removeClass('show');
});

$('.user-settings__save').on('click', function () {
    $(this).parents('form').siblings('.user-settings__label, .user-settings__value').show();
    $(this).parents('.user-settings__item').find('.user-settings__edit').addClass('show');
    $(this).parents('form').removeClass('show');
    $(this).parents('.user-settings__item').addClass('editable');
});

$('.user-settings__radiobutton input[type=radio]').on('change', function () {
    $(this).parents('form').siblings('.user-settings__label, .user-settings__value').show();
    $(this).parents('.user-settings__item').find('.user-settings__edit').addClass('show');
    $(this).parents('form').removeClass('show');
    $(this).parents('.user-settings__item').addClass('editable');
});

//     avatar upload
let uploadAvatarButton = document.querySelector('.user-general__pic');
let currentAvatarImg = document.getElementById('current-avatar') || false;
let deleteAvatarButton = document.getElementById('delete-avatar') || false;
let saveAvatarButton = document.getElementById('save-avatar') || false;
let modalOverlay = document.querySelector('.upload-modal-overlay') || false;
let cropper = '';


if (uploadAvatarButton != null) {

    uploadAvatarButton.addEventListener('click', function () {
        if ($('#avatar').length) {
            if ($(currentAvatarImg).length) {
                // init cropper
                cropper = new Cropper(currentAvatarImg, {
                    viewMode: 2,
                    guides: false,
                    cropBoxResizable: true,
                    center: false,
                    autoCropArea: 0.8,
                    aspectRatio: 1,
                });
            }

            $(modalOverlay).addClass('show');

        } else {
            this.querySelector('.upload-input').click();
        }
    });


    $('.upload-input').on('change', function () {
        cropper.destroy();
        let reader = new FileReader();
        reader.onload = function (e) {
            // create new image
            let img = document.createElement('img');
            img.id = 'image';
            img.src = e.target.result;
            $("#uploaded-avatar-block").empty();
            $("#uploaded-avatar-block").html($(img));
            // init cropper
            cropper = new Cropper(img, {
                viewMode: 2,
                guides: false,
                cropBoxResizable: true,
                center: false,
                autoCropArea: 0.8,
                aspectRatio: 1,
            });

            $(modalOverlay).addClass('show');
        }
        reader.readAsDataURL(this.files[0]);
    });

    $(saveAvatarButton).on('click', function (e) {

        cropper.getCroppedCanvas().toBlob((blob) => {
            const formData = new FormData();

            formData.append('avatar', blob, 'image.png');

            $.ajax($('#avatar_form').attr('action'), {
                method: 'PUT',
                data: formData,
                processData: false,
                contentType: false,
                success(res) {
                    if ($('#avatar').length) {
                        $('#avatar').remove();
                    }
                    const image = '<img id="avatar" src="' + res.thumbnail_small + '" />';
                    const editDiv = '<div class="edit-photo">Edit Photo</div>';
                    $(uploadAvatarButton).prepend(image);
                    $('#avatar').after(editDiv);
                    $('.header__user-pic img')
                    $('.header__user img').attr('src', res.thumbnail_small)
                    $('.upload-input').remove();

                    $(modalOverlay).removeClass('show');
                    cropper.destroy();
                    $('#delete-avatar').show()
                },
                error() {
                    console.log('Upload error');
                },
            });
        });
    });

    $(deleteAvatarButton).on('click', function () {
        $.getJSON('/profile/deleteavatar/', function (data){
            $(modalOverlay).removeClass('show');
            $('#delete-avatar').hide();
            $('#current-avatar').remove();
            $('#avatar').remove();
            $('.edit-photo').remove();
            $('.header__user-pic img').remove();
            $(uploadAvatarButton).prepend('<input class="upload-input" type="file" accept="image/*"/>');
        })
    });

    modalOverlay.addEventListener( 'click', (e) => {
        const withinBoundaries = e.composedPath().includes(modalOverlay.querySelector('.upload-modal'));

        if (!withinBoundaries) {
            modalOverlay.classList.remove('show');
        }
    });
}

Dropzone.autoDiscover = false;

let uploadDocumentsDropzone = new Dropzone('#dropzone-documents', {
    url: '/file-upload',
    dictDefaultMessage: `Drag and drop PDF/JPG files here or <a href="javascript:void(0);">select file on your device</a>`,
    acceptedFiles: 'application/pdf',
    previewsContainer: '.dz-custom-previews',
    previewTemplate: `
          <div class="dz-preview dz-file-preview document">
            <div class="dz-pic"></div>
            <div class="dz-name" data-dz-name></div>
            <div class="dz-delete" data-dz-remove>
              <img src="../static/images/icons/close-blue-icon2.svg" alt="Delete" />
            </div>
          </div>
        `
});




let $hiddenImages = $('.hidden-images img');

if ($hiddenImages.length > 0) {
    const $thumbs = $('.profile__images-thumbs');
    let extraImagesCount = 0;

    $hiddenImages.each(function (index) {
        if (index < 3) {
            $thumbs.append('' +
                '<div class="thumbnail">' +
                '   <img src="' + $(this).attr('src') + '">' +
                '</div>');
        }
        if (index == 3) {
            $thumbs.append('' +
                '<div class="thumbnail more">' +
                '   <img src="' + $(this).attr('src') + '">' +
                '   <span class="other-photos-count"></span>' +
                '</div>');
        }
        if (index > 3) {
            extraImagesCount++;
        }
    });

    if (extraImagesCount > 0) {
        $thumbs.find('.other-photos-count').text('+' + extraImagesCount);
    }
}


$(".thumbnail").click(function() {
    $('.image-modal-overlay').addClass('show');
});


let uploadImagesDropzone = new Dropzone('#dropzone-img', {
    url: '/file-upload',
    dictDefaultMessage: `Drag and drop photos here or <a href="javascript:void(0);">select on your device</a>`,
    acceptedFiles: 'image/*',
    autoProcessQueue: false,
    previewTemplate: `
          <div class="dz-preview dz-file-preview">
            <div class="dz-image"><img data-dz-thumbnail /></div>
            <div class="dz-remove" data-dz-remove>
              <img src="../static/images/icons/delete-white-icon.svg" alt="Delete" />
            </div>
          </div>
        `
});

uploadImagesDropzone.on("queuecomplete", function() {
    // Получение списка загруженных файлов
    const uploadedFiles = uploadImagesDropzone.files;

    // Для каждого загруженного файла добавляем его как тег img в блок .hidden-images
    uploadedFiles.forEach(function(file) {
        const imgTag = document.createElement('img');
        imgTag.src = file.dataURL; // или file.xhr.response, если файл был загружен на сервер
        document.querySelector('.hidden-images').appendChild(imgTag);
        $hiddenImages = $('.hidden-images img');
        $('.profile__images-thumbs').find('.other-photos-count').text('+' + ($hiddenImages.length - 4));
    });
});



//============== Добавление видео
const videoPreviewList = document.getElementById('videos-list');
const videoInput = document.getElementById('video-input');
let videosArr = [];

$('#show-video-form').on('click', function () {
    $('.profile__videos-form').show();
    $('.profile__videos-description').hide();
});

$('#cancel-add-video').on('click', function () {
    $(videoInput).val('');
    $(this).parents('.profile__videos-form').hide();
    $('.profile__videos-description').show();
});

$('#add-video').on('click', function () {

    const videoInputValue = videoInput.value;
    if (videoInputValue === '') {
        return
    }

    let videoId;
    let imageUrl;

    // Получение ID видео из ссылки
    if (videoInputValue.includes('youtube')) {
        videoId = videoInputValue.split('v=')[1];
        imageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        displayThumbnail();
        videosArr.unshift({videoSource: 'youtube', videoId: videoId});
    } else if (videoInputValue.includes('vimeo')) {
        videoId = videoInputValue.split('/').pop();
        fetch(`https://vimeo.com/api/v2/video/${videoId}.json`)
            .then(response => response.json())
            .then(data => {
                imageUrl = data[0].thumbnail_large;
                displayThumbnail();
                videosArr.unshift({videoSource: 'vimeo', videoId: videoId});
            });
    }

    $('.profile__videos-form').hide();
    $('.profile__videos-description').show();
    console.log(videosArr)

    // Отображение изображения-превью для добавленной ссылки видео
    function displayThumbnail(){
        const videoPreview = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute('src', imageUrl);
        videoPreview.classList.add('video-preview');
        videoPreview.appendChild(img);
        videoPreviewList.insertBefore(videoPreview, videoPreviewList.firstChild);
    }
});



// удаление видео
$(document).on('click', '.video-preview', function () {
    const index = $(this).index();
    console.log(index)
    videosArr.splice(index, 1);
    $(this).remove();
    console.log(videosArr)
});


// переход в режим редактирования текстового блока
$('.profile__block-edit').on('click', function () {
    $(this).parents('.profile__block-view').hide();
    $(this).parents('.profile__block').find('.profile__block-form').show();
});

// сохранение текстового блока
$('.profile__button-save').on('click', function () {
    $(this).parents('.profile__block').find('.profile__block-view').show();
    $(this).parents('.profile__block-form').hide();
});

// удаление текстового блока
$('.profile__button-delete').on('click', function () {

});


// переход в режим редактирования блока цены
$('.aed-prices__edit').on('click', function () {
    $(this).parents('.aed-prices__item-view').hide();
    $(this).parents('.aed-prices__item').find('.aed-prices__item-form').show();
});

// сохранение блока цены
$('.aed-prices__item-save').on('click', function () {
    $(this).parents('.aed-prices__item').find('.aed-prices__item-view').show();
    $(this).parents('.aed-prices__item-form').hide();
});




// закрытие модалки просмотра изображений по клику на оверлей
$('.image-modal-overlay').on( 'click', function(e) {
    const withinBoundaries = $(e.target).closest('.image-modal').length > 0;

    if (!withinBoundaries) {
        $('.image-modal-overlay').removeClass('show');
    }
});

// закрытие модалки по кнопке закрыть
$('.image-modal__close').on('click', function() {
    $('.image-modal-overlay').removeClass('show');
});


// кастомизация селектов
document.querySelectorAll('.js-choice').forEach(function (choiceItem) {
    let choices = new Choices(choiceItem, {
        searchEnabled: false,
        itemSelectText: ''
    });
});

$('#open-documents-upload-modal').on( 'click', function() {
    $('.documents-modal-overlay').addClass('show');
});

// закрытие модалки просмотра изображений по клику на оверлей
$('.documents-modal-overlay').on( 'click', function(e) {
    const withinBoundaries = $(e.target).closest('.documents-modal').length > 0;

    if (!withinBoundaries) {
        $('.documents-modal-overlay').removeClass('show');
    }
});

$('.js-more').on('click', function () {
    $(this).toggleClass('active');
    $('.js-actions').hide();
    $(this).siblings('.js-actions').toggle();
});

$(document).mouseup( function(e){
    let div = $('.js-actions');
    if ( !div.is(e.target) && div.has(e.target).length === 0 ) {
        div.hide();
    }
});

const textarea = document.querySelector('textarea');
const minHeight = textarea.scrollHeight;

function resizeTextarea() {
    textarea.style.height = minHeight + 'px';
    textarea.style.height = Math.max(textarea.scrollHeight, minHeight) + 'px';
    if (textarea.offsetHeight >= 106) {
        textarea.classList.add('scrollable');
    } else {
        textarea.classList.remove('scrollable');
    }
}

textarea.addEventListener('input', resizeTextarea);


let chatUploadArea = document.getElementById('chat-upload-area') || false;
let dropzonePlaceholder = document.querySelector('.js-dropzone-placeholder') || false;

if (chatUploadArea && dropzonePlaceholder) {
    // ==== загрузка изображений
    Dropzone.autoDiscover = false;

    const myDropzone = new Dropzone("#chat-upload-area", {
        url: "/file/post",
        autoProcessQueue: false,
        previewsContainer: "#image-preview",
        previewTemplate: `
          <div class="dz-preview dz-file-preview">
            <div class="dz-image"><img data-dz-thumbnail /></div>
            <div class="dz-remove" data-dz-remove><img src="../static/images/icons/delete-white-icon.svg" alt="Delete" /></div>
          </div>`
    });

    const chatUploadArea = document.querySelector(".js-dropzone-placeholder");
    let dragCounter = 0;

    myDropzone.on("dragenter", function(file, response) {
        dragCounter++;
        if (dragCounter === 1) {
            chatUploadArea.style.display = "flex";
        }
    });

    myDropzone.on("dragleave", function(file, response) {
        dragCounter--;
        if (dragCounter === 0) {
            chatUploadArea.style.display = "none";
        }
    });

    myDropzone.on("drop", function(file, response) {
        dragCounter = 0;
        chatUploadArea.style.display = "none";
    });


    $(".js-upload-button").on("click", function() {
        $('#chat-upload-area').click();
    });
}




$(document).ready(function() {
    $('.datepicker').datepicker({
        dateFormat: "d M",
        duration: "fast"
    });

    $('.offer-form input.datepicker').on('change', function() {
        const startDate = new Date(document.getElementById("startDate").value);
        const endDate = new Date(document.getElementById("endDate").value);

        if (startDate > endDate) {
            document.getElementById("startDate").value = "";
        }
    });

    $('.offer-form input:not(.datepicker)').on('input', function() {
        let value = $(this).val().replace(/\D/g, "");
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        $(this).val(value);
    });
});




Dropzone.autoDiscover = false;

let uploadPhotoDropzone = new Dropzone("#dropzone", {
    url: '/file-upload',
    uploadMultiple: true,
    autoProcessQueue: false,
    dictDefaultMessage: 'Drag and drop photos here or select on your device',
    previewTemplate: `
          <div class="dz-preview dz-file-preview">
            <div class="dz-image"><img data-dz-thumbnail /></div>
            <div class="dz-remove" data-dz-remove><img src="../static/images/icons/delete-white-icon.svg" alt="Delete" /></div>
          </div>
        `
});

let modalOverlay = document.querySelector('.additional-modal-overlay') || false;


$('#place-job-button').on("click", function() {
    uploadPhotoDropzone.processQueue();
});


$("#add-new-image").on("click", function() {
    $('#dropzone').click();
});

$('.change-button').on('click', function () {
    $(this).siblings('input').attr('readonly', false);
});






$('.custom-select').each(function() {
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val(),
            class: $this.children('option').eq(i).is(':selected') ? 'selected' : ''
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        let $optionsList = $(this).next('ul.select-options');
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });

        $(this).toggleClass('active').next('ul.select-options').toggle();

        if ($optionsList.css('display') === 'block') {
            var scrollTo = $('ul.select-options li.selected').position().top + $optionsList.scrollTop() - $optionsList.position().top;

            // Прокручиваем контейнер так, чтобы выбранный элемент был видим
            $optionsList.animate({
                scrollTop: scrollTo
            }, 0);
        }
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $('.select-options li').removeClass('selected');
        $(this).addClass('selected');
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        // Сообщаем, что значение изменилось
        $this.trigger('change');
    });

    $('.select-options li.selected').trigger('click');

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });
});

let $timeType = $('.time-type');
let $24hToggle = $('#24h');

if ($24hToggle.checked) {
    $timeType.addClass('d-none');
}

$24hToggle.change(function(){
    if(this.checked) {
        $timeType.addClass('d-none');
    } else {
        $timeType.removeClass('d-none');
    }
});

$('#additional-edit').on('click', function () {
    modalOverlay.classList.add('show');
    $('body').addClass('overflow-hidden');
});

$("#upload-photos").on("click", function() {
    $('#dropzone').click();
});


modalOverlay.addEventListener( 'click', (e) => {
    const withinBoundaries = e.composedPath().includes(modalOverlay.querySelector('.additional-modal'));

    if (!withinBoundaries) {
        modalOverlay.classList.remove('show');
        $('body').removeClass('overflow-hidden');
    }
});


$('.job-type__count-decrease').on('click', function(e) {
    e.stopPropagation();
    let $inputTypeNumber = $(this).parents('.job-type__count').find('input');
    let currentValue = parseInt($inputTypeNumber.val());

    if (currentValue > 0) {
        $inputTypeNumber.val(currentValue - 1);
    }

    if (parseInt($inputTypeNumber.val()) === 0) {
        $(this).parents('.job-type').find('.job-type__input').prop( "checked", false );
        $(this).parents('.job-type').find('.job-type__input').change()
        $inputTypeNumber.val(0);
    }
});

$('.job-type__count-increase').on('click', function(e) {
    e.stopPropagation();
    console.log(e.target)
    let $inputTypeNumber = $(this).parents('.job-type__count').find('input');
    let currentValue = parseInt($inputTypeNumber.val());
    $inputTypeNumber.val(currentValue + 1);
    $(this).parents('.job-type').find('.job-type__input').prop( "checked", true );
    $(this).parents('.job-type').find('.job-type__input').trigger('change');
});

$('.job-type__count input').on('input', function() {
    // if (parseInt($(this).val()) === 0) {
    //     $(this).parents('.job-type').find('.job-type__input').prop( "checked", false );
    // } else {
    //     $(this).parents('.job-type').find('.job-type__input').prop( "checked", true );
    // }

    let $jobTypeInput = $(this).parents('.job-type').find('.job-type__input');
    if (parseInt($(this).val()) === 0) {
        $jobTypeInput.prop( "checked", false );
    } else {
        $jobTypeInput.prop( "checked", true );
    }
    $jobTypeInput.change()
});

$('.job-type__input[type="radio"]').on('change', function () {
    if ($(this).parent().hasClass('count')) {
        if (parseInt($(this).parent().find('.job-type__count input').val()) === 0) {
            $(this).parent().find('.job-type__count input').val(1);
        }
    }
    $(this).parent().siblings('.count').find('.job-type__count input').val(0);
    $(this).parent().siblings('.count').find('.job-type__count input').change()
});

$('.job-type__input[type="checkbox"]').on('change', function () {
    if ($(this).parent().hasClass('count')) {
        if ($(this).prop('checked')) {
            if (parseInt($(this).parent().find('.job-type__count input').val()) === 0) {
                $(this).parent().find('.job-type__count input').val(1);
            }
        } else {
            $(this).parent().find('.job-type__count input').val(0);
        }

        $(this).parent().find('.job-type__count input').change()
    }
});


$('#open-map-modal').click(function () {
    $('.map-modal-overlay').addClass('show');
});

$('.map-modal-overlay').on('click', function(e) {
    const withinBoundaries = $(e.target).closest('.map-modal').length > 0;

    if (!withinBoundaries) {
        $('.map-modal-overlay').removeClass('show');
        $('body').removeClass('overflow-hidden');
    }
});

$('.tag').on('mouseenter', function () {
    $('.clipboard').css({clipPath: 'polygon(50% 35%, 70% 35%, 70% 55%, 50% 55%)'});
});

$('.tag').on('mouseleave', function () {
    $('.clipboard').css({clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)'});
});



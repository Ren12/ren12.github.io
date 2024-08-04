function setQuantityLeftPosition(input) {
    const quantityCanvas = document.createElement('canvas');
    const $quantity = input.siblings('.main-search__quantity-found');
    const quantityCanvasContext = quantityCanvas.getContext('2d');
    quantityCanvasContext.font = '400 16px "Prompt", sans-serif';
    const metrics = quantityCanvasContext.measureText(input.val());
    $quantity.css('left', metrics.width + 40 + 'px');

    if (input.val() === '') {
        $quantity.hide();
    } else {
        $quantity.show();
    }
}


$('.main-search input[type="text"].active').each(function () {
    if ($(this).val() !== '') {
        setQuantityLeftPosition($(this));
    }
});


//==== change measure position on input text
$('.main-search input[type="text"].active').on('input', function () {
    setQuantityLeftPosition($(this));
});


$('.tags-filter-button').on('click', function () {
    $(this).toggleClass('active');
});


$('.filter-tag').on('click', function () {
    $(this).toggleClass('active');

    $('.selected-tags .count').text($('.filter-tag.active').length);
});


$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 270) {
        $('.new-main-page__active-jobs').addClass('compact position-fixed');
        $('header').addClass('position-fixed');

    } else {
        $('.new-main-page__active-jobs').removeClass('compact position-fixed');
        $('header').removeClass('position-fixed');
    }
});


$('#open-map-modal').click(function () {
    $('.map-modal-overlay').addClass('show');
    $('body').addClass('overflow-hidden');
});

$('.map-modal-overlay').on('click', function(e) {
    const withinBoundaries = $(e.target).closest('.map-modal').length > 0;

    if (!withinBoundaries) {
        $('.map-modal-overlay').removeClass('show');
        $('body').removeClass('overflow-hidden');
    }
});

$(document).keydown(function(e) {
    if (e.key === "Escape") {
        $('.map-modal-overlay').removeClass('show');
        $('body').removeClass('overflow-hidden');
    }
});

$(document).ready(function() {
    if ($(".js-range-slider").length) {
        $(".js-range-slider").ionRangeSlider({
            type: "double",
            skin: "round",
            min: parseInt($('.aed-indicator').data("min")),
            max: parseInt($('.aed-indicator').data("max")),
            from: parseInt($('.aed-indicator').data("val")),
            to: parseInt($('.aed-indicator').data("max")),
            prettify_separator: ',',
            onStart: function (data) {

            },
            onFinish: function (data) {
                console.log(data.to)
            }
        });
    }

    if ($('.new-main-page__slider').length) {
        $('.new-main-page__slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            arrows: false,
            dots: true,
            pauseOnHover: false,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    }


});

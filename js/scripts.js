$(document).ready(function(){
    const $closeMenu = $('.close-menu');
    const $openMenu = $('.open-menu');
    const $menu = $('.menu');
    const $slider = $('.slider');

    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        anchorPlacement: 'top-bottom'
    });

    $closeMenu.on('click', function () {
        $menu.removeClass('opened');
    });

    $openMenu.on('click', function () {
        $menu.addClass('opened');
    });

    $slider.on('init', function (event, slick, currentSlide, nextSlide) {
        let currentSlideNumber = currentSlide ? currentSlide : 0;
        let video = slick.$slides.find('video')[currentSlideNumber].play();
    });

    $slider.on('wheel', (function(e) {
        e.preventDefault();

        if (e.originalEvent.deltaY < 0) {
            $(this).slick('slickNext');
        } else {
            $(this).slick('slickPrev');
        }
    }));

    $slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
        let videos = slick.$slides.find('video').each(function (item) {
            slick.$slides.find('video')[item].pause();
            item.currentTime = 0;
        });


        let video = slick.$slides.find('video')[currentSlide].play();
    });

    if ($slider.length) {
        $slider.slick({
            centerMode: true,
            slidesToShow: 1,
            variableWidth: true,
            arrows: false,
            dots: false,
            speed: 700,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
});
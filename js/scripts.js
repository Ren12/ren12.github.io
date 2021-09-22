$(document).ready(function(){
    const $closeMenu = $('.close-menu');
    const $openMenu = $('.open-menu');
    const $menu = $('.menu');
    const $slider = $('.slider');

    $closeMenu.on('click', function () {
        $menu.removeClass('opened');
    });

    $openMenu.on('click', function () {
        $menu.addClass('opened');
    });

    if ($slider.length) {
        $slider.slick({
            centerMode: true,
            slidesToShow: 1,
            variableWidth: true,
            arrows: false,
            dots: false
        });

        $slider.on('wheel', (function(e) {
            e.preventDefault();

            if (e.originalEvent.deltaY < 0) {
                $(this).slick('slickNext');
            } else {
                $(this).slick('slickPrev');
            }
        }));

        $slider.on('init', function (event, slick, currentSlide, nextSlide) {
            console.log('123');
            let video = slick.$slides.find('video')[currentSlide].play();
        });

        $slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
            let videos = slick.$slides.find('video')[0];
            videos.pause();
            videos.currentTime = 0;
            let video = slick.$slides.find('video')[currentSlide].play();
        });
    }
});
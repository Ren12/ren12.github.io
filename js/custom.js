/**
 * Template Name: Kindle
 * Version: 1.0
 * Template Scripts
 * Author: MarkUps
 * Author URI: http://www.markups.io/

 Custom JS

 1. FIXED MENU
 2. MENU SMOOTH SCROLLING
 3. GOOGLE MAP
 4. READER TESTIMONIALS ( SLICK SLIDER )
 5. MOBILE MENU CLOSE

 **/


(function ($) {


    /* ----------------------------------------------------------- */
    /*  1. FIXED MENU
    /* ----------------------------------------------------------- */


    jQuery(window).bind('scroll', function () {
        if ($(window).scrollTop() > 150) {

            $('#mu-header').addClass('mu-fixed-nav');

        } else {
            $('#mu-header').removeClass('mu-fixed-nav');
        }
    });


    /* ----------------------------------------------------------- */
    /*  2. MENU SMOOTH SCROLLING
    /* ----------------------------------------------------------- */

    //MENU SCROLLING WITH ACTIVE ITEM SELECTED

    // Cache selectors
    let lastId,
        topMenu = $(".mu-menu"),
        topMenuHeight = topMenu.outerHeight() + 13,
        // All list items
        menuItems = topMenu.find('.nav-link'),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            let item = $($(this).attr('href'));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.on('click', function (e) {
        let href = $(this).attr("href"),
            offsetTop = href === "#top" ? 0 : $(href).offset().top - topMenuHeight + 22;
        jQuery('html, body').stop().animate({
            scrollTop: offsetTop
        }, 500);
        e.preventDefault();
    });

    // Bind to scroll
    jQuery(window).scroll(function () {
        // Get container scroll position
        let fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        let cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        let id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;

        }

        // Set/remove active class
        menuItems.parents('li').removeClass("active");
        console.log(topMenu.find('a[href="#' + id + '"]').parents('li'));
        topMenu.find('[href="#' + id + '"]').parents('li').addClass("active");

    })


    /* ----------------------------------------------------------- */
    /*  4. READER TESTIMONIALS (SLICK SLIDER)
    /* ----------------------------------------------------------- */

    $('.mu-testimonial-slide').slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        cssEase: 'linear'
    });

    /* ----------------------------------------------------------- */
    /*  5. MOBILE MENU CLOSE
    /* ----------------------------------------------------------- */

    jQuery('.mu-menu').on('click', 'li a', function () {
        $('.mu-navbar .show').collapse('hide');
    });


})(jQuery);


  

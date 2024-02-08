$(document).ready(function () {

    $('.search__form').click(function() {
        $('.search__list').addClass('active')
    })

    $('.search__button').click(function(e) {
        if(!$('.search').hasClass('active')) {
            $('.search').addClass('active')
        } else {
            window.location.href='search-page.html';
        }
    })

    
    $(document).mouseup(function (e){ 
        var div = $(".search:not(.opened)"); 
        if (!div.is(e.target)
            && div.has(e.target).length === 0) { 
            
            $('.search__list').removeClass('active')
            setTimeout(() => {
                div.removeClass('active');
            }, 300);
            
    }

    });


    $('.main-posts__slider').slick({
        dots: true
    })

    $('.nav-toggler').click(function () {
        $(this).toggleClass('active');
        $('nav').toggleClass('active')
    })


    var posts = $('.posts').html();

    $('.more-posts').click(function() {
        // console.log(posts);
        $('.posts').append(posts);
    })
})
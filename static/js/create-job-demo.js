
$('.tag').on('mouseenter', function () {
    $('.clipboard').css({clipPath: 'polygon(415px 75px, 450px 50px, 576px 78px, 577px 156px, 543px 186px, 420px 154px)'});
});

$('.tag').on('mouseleave', function () {
    $('.clipboard').css({clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)'});
});

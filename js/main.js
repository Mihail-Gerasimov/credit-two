$(document).ready(function() {
    // slider
    if ($(window).width() < 577) {

        $('.desctop-reviews__block').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            appendDots: '.dots',
            prevArrow: '.prev',
            nextArrow: '.next'
        });
    }
});
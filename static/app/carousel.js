$( document ).ready(function() {
    console.log( "document is ready!" );
    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({fullWidth: true});
});

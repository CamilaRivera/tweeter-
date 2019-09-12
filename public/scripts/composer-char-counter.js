jQuery(document).ready(function ($) {

  $('textarea').on('input', function (event) {
    let count = 140 - this.value.length;
    $('.counter').text(count);
    if(count < 0){
      $('.counter').addClass('redCounter');
    } else {
      $('.counter').removeClass('redCounter');
    }
    $('.error').slideUp();
  });

  $('.back-to-top').click(function() {
    $(window).scrollTop(0);

    });

    $(window).scroll(function() {
      console.log('apareci');
      console.log(document.body.scrollTop);
      if(window.scrollY < 400) {
          $(".back-to-top").fadeOut();
      } else {
          $(".back-to-top").fadeIn();
      }
  });
});



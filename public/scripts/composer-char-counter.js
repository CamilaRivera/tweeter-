jQuery(document).ready(function ($) {
// function for counter in the new tweet 
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

  //back to top toggle button function
  $('.back-to-top').click(function() {
    $("html").animate({ scrollTop: 0 }, "slow");
    });

// check if the button is in the upper part of the page
    $(window).scroll(function() {
      if(window.scrollY < 400) {
          $(".back-to-top").fadeOut();
      } else {
          $(".back-to-top").fadeIn();
      }
  });
});



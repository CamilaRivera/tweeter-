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

});



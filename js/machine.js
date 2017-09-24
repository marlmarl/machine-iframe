$(document).ready(function() {
   var clicked = 0;
   $('.machine').fadeIn(500).show();
   $('.valve').click(function(e) {
      e.preventDefault();
      $('.top-valve').hide();
      if (clicked < 1) {
         render();
      }
      clicked = 1;
   });

   $('.valve').click(function(e) {

      e.preventDefault();
      var info = $(this).find('.infoRef').attr('title');
      var screenframe = $(this).find('.screenRef').attr('title');

      $('.part').removeClass( 'rotate' );
      $(this).find('.part').addClass('rotate');
      $('.active-fact').hide();
      $('.active-screen').hide();
      $('.machine').addClass('shake').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){
            $(this).removeClass('shake');
        });
       if (window.matchMedia('(max-width: 767px)').matches){
          $('.start-screen').show();
          $('.facts').fadeIn(500).css("display","flex");
          $('body').addClass('modal-open');
          $(info).show();
          $('.screen-mobile').show();
          $('.fact-screen-mobile').show();
      }else{
          $('.screen-mobile').hide();
          $('.facts').css("display","block");
            $(screenframe).fadeIn(500).show().addClass('active-screen');
            $(info).fadeIn(500).show().addClass('active-fact');
      }
   });

   $('.close-fact').click(function(e) {
      $('.facts').fadeOut(500);
      $(this).closest('.single-fact-container').hide();
      $('body').removeClass('modal-open');
   });
    
    window.onresize = function() {
        $('.facts').css("display","none");
        $('.part').removeClass( 'rotate' );
    }

   function load() {
      if (loading) {
         setTimeout(load, 100);
      } else {
         render();
      }
   }



});

(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  
// parallax
const scene = document.getElementById('scene');
const parallaxInstance = new Parallax(scene);

// tabs
$('.nav-item').on('click', function(e){
  e.preventDefault();
  let currTab = $(this).index();

    $('.nav-item').removeClass('active');
    $(this).addClass('active');

    $('.tab-pane').removeClass('show active');
    $('.tab-pane').eq(currTab).addClass('show active');
})

$('.nav-item').on('click', function(){
  let href = $(this).attr('href');

  $('html, body').animate({
    scrollTop:$(href).offset().top
  }, {
    duration: 370,
    easing: "linear"
  });
  return false  
})

// Hamburger 
$('.hamburger').on('click', function(){
  $('.main-menu').toggle();
})
$('.close').on('click', function(){
  $('.main-menu').hide();
})


// modal window
$('.header-btn').on('click', function(){
  $('.wrapper-modal').fadeIn();
})
$('.header-btn').on('click', function(){
  $('.wrapper-modal').addClass('active')
})
$('.form-order').on('click', function(){
  $('.wrapper-modal').fadeOut();
})

$('.overlay').on('click', function(){
  $('.wrapper-modal').fadeOut();
})

$('.form-order').children().on('click', function(e){
  e.stopPropagation();
})

$('.modal-close').on('click', function(){
  $('.wrapper-modal').hide();
})

$('.overlay').on('click', function(){
  $('.wrapper-modal').hide();
})


// validate
$('.button-form').on('click', function(e){
  e.preventDefault();
  $(this).parent('form').submit();
})

$.validator.addMethod('regex', function(value, element, regexp){
  let regExsp = new RegExp(regexp);
  return regExsp.test(value);
}, 'Please check your input')

function valEll(el){
  el.validate({
    rules:{
      firstName : {
        required:true,
        regex: "[A-Za-z]{1,32}"
      },
      email : {
        required: true,
        regex: "[0-9A-Za-z]"
      },
      phone : {
        required: true, 
        digits: true,
        minlength: 10,
        maxlength: 13, 
        regex: "[0-9]+"
      }
      }, 
      messages : {
        firstName:{
          required: 'Field is required',
          regexp: 'Enter your name correctly'
        },
        email : {
          required: 'Field is required',
          regexp: 'Enter your email correctly'
        },
        phone : {
          required: 'Field is required',
          regexp: 'Enter your phone correctly'
        }
      },
      submitHandler:function(form){
        $('#preloader-active').fadeIn();
        let $form = $(form);
        let $formId = $(form).attr('id');
        switch($formId){
          case 'form-book':
            $.ajax({
              type:'POST',
              url: $form.attr('action'),
              data: $form.serialize()
            })
            .done(function(){
              console.log('Success');
            })
            .fail(function(){
              console.log('Fail');
            })
            .always(function(){
              setTimeout(function(){
                $form.trigger('reset');
                $('.wrapper-modal').fadeOut();
              }, 1000);
              setTimeout(function(){
                $('#preloader-active').fadeOut();
              }, 1400)
            });
            break;
            case 'search-box':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data : $form.serialize()
            })
            .done(function(){
              console.log('Success');
            })
            .fail(function(){
              console.log('Fail');
            })
            .always(function(){
              setTimeout(function(){
                $form.trigger('reset');
              }, 1000);
              setTimeout(function(){
                $('#preloader-active').fadeOut();
              }, 1400)
            });
            break;
            case 'search':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data : $form.serialize()
            })
            .done(function(){
              console.log('Success');
            })
            .fail(function(){
              console.log('Fail');
            })
            .always(function(){
              setTimeout(function(){
                $form.trigger('reset');
              }, 1000);
              setTimeout(function(){
                $('#preloader-active').fadeOut();
              }, 1400)
            });
            break;
        }
        return false;
      }
  })
};
$('.form-val').each(function(){
  valEll($(this));
})

// slider
var mySwiper = new Swiper ('.swiper-container', {
    spaceBetween : 50,
    loop : true,
    stopOnLastSlide : false,
    autoplay : {
        delay: 4000
    }
})
})(jQuery);

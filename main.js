$(document).ready(function () {

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 20) {
      $('#navbar').css('box-shadow', '0 2px 20px rgba(0,0,0,0.3)');
    } else {
      $('#navbar').css('box-shadow', 'none');
    }
  });

  $('#hamburger').on('click', function () {
    $(this).toggleClass('open');
    var $menu = $('#mobileMenu');
    if ($menu.hasClass('open')) {
      $menu.removeClass('open').fadeOut(200);
    } else {
      $menu.addClass('open').fadeIn(200);
    }
  });

  $('#mobileMenu a').on('click', function () {
    $('#hamburger').removeClass('open');
    $('#mobileMenu').removeClass('open').fadeOut(200);
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('#hamburger, #mobileMenu').length) {
      $('#hamburger').removeClass('open');
      $('#mobileMenu').removeClass('open').fadeOut(150);
    }
  });

  function revealItems() {
    $('[data-reveal]').each(function () {
      var top = $(this).offset().top;
      var winBottom = $(window).scrollTop() + $(window).height();
      if (top < winBottom - 40) {
        $(this).addClass('revealed');
      }
    });
  }
  revealItems();
  $(window).on('scroll', revealItems);

  var currentIdx = 0;

  function getItems() {
    return $('.gallery-item').toArray();
  }

  function openLightbox(idx) {
    currentIdx = idx;
    var items = getItems();
    var $item = $(items[idx]);
    var src = $item.data('src');
    var caption = $item.data('caption') || '';
    $('#lbImg').attr('src', src);
    $('#lbCaption').text(caption);
    $('#lightbox').addClass('open');
    $('body').css('overflow', 'hidden');
  }

  function closeLightbox() {
    $('#lightbox').removeClass('open');
    $('body').css('overflow', '');
  }

  function navigate(dir) {
    var items = getItems();
    currentIdx = (currentIdx + dir + items.length) % items.length;
    var $item = $(items[currentIdx]);
    $('#lbImg').fadeOut(100, function () {
      $(this).attr('src', $item.data('src')).fadeIn(150);
    });
    $('#lbCaption').text($item.data('caption') || '');
  }

  $(document).on('click', '.gallery-item', function () {
    var idx = getItems().indexOf(this);
    openLightbox(idx);
  });

  $('#lbClose').on('click', closeLightbox);
  $('#lightboxBackdrop').on('click', closeLightbox);

  $('#lbPrev').on('click', function (e) { e.stopPropagation(); navigate(-1); });
  $('#lbNext').on('click', function (e) { e.stopPropagation(); navigate(1); });

  $(document).on('keydown', function (e) {
    if (!$('#lightbox').hasClass('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  $(document).on('mouseenter', '.interest-card, [class*="hover:shadow"]', function () {
    $(this).css('transition', 'all 0.2s ease');
  });

});

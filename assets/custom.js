/*

Envy by WeTheme (http://www.wetheme.com)
Custom JS

Last Update:
2nd December 2014
- Added Sidr code

*/

// product flat popup
function productFlatPopups() {
	if ( $('body').hasClass('template-product') ){
		$('.entry-content img').on('click', function(){
			var $productFlatURL = $('#oi_image-flat').attr('src'),
				$productFlatAlt = $('#oi_image-flat').attr('alt');

			// reset product flat
			$('#oi_product-flat-large').attr('src', $productFlatURL);
			$('#oi_product-flat-large').attr('alt', $productFlatAlt);

			// disable body scroll
			$('body').addClass('oi_no-scroll');

			// show product flat popup
			$('#oi_product-flat-popup').show();

			// close product flat popup on button click
			$('#oi_product-flat-popup button').on('click', function(){
				// hide popup
				$('#oi_product-flat-popup').hide();

				// re-enable body scroll
				$('body').removeClass('oi_no-scroll');
			});

			// close product flat popup on 'esc' ket
			$('body').on('keydown', function(e){
				if ( e.keyCode == '27' ) {
					// hide popup
					$('#oi_product-flat-popup').hide();

					// re-enable body scroll
					$('body').removeClass('oi_no-scroll');
				}
			});
		});
	}
} 

$(document).ready(function(){
	productFlatPopups();
});

// alert banner controls
function alertBannerControls() {
	$('#oi_alert-banner button').on('click', function(){
		$('#oi_alert-banner').hide();
		$('.alert-banner-offset').removeClass('alert-banner-offset');
		$('span.BOLD-mc-picker-mnt').attr('style','margin-top:4px');
	});
}

$(document).ready(function(){
	alertBannerControls();
})

$(window).load(function(){
	if ($('#oi_alert-banner').is(':visible') ) {
		setTimeout(function(){
			$('span.BOLD-mc-picker-mnt').addClass('alert-banner-offset');
		}, 250);
	}
})

// close cart when opened 
function cartDrawerControls() {
	$(document).keyup(function(e){
	    if(e.keyCode === 27){
	      if ($('#cartDrawer').hasClass('slide-in')){
	        $('#cartDrawer').removeClass('slide-in');
	        $('header').removeClass('fade-out');
	        $('.main').removeClass('fade-out');
	        $('body').removeClass('oi_no-scroll');
	      }
	    }
	});

	$('body').on('click', function(e){
		if ( !$(e.target).hasClass('no-click') ) {
			if ($('#cartDrawer').hasClass('slide-in')){
				$('#cartDrawer').removeClass('slide-in');
		        $('header').removeClass('fade-out');
		        $('.main').removeClass('fade-out');
		        $('body').removeClass('oi_no-scroll');
			}
		}
	});

	$('#cartDrawer #cartDrawerInner > button').on('click', function(){
		if ($('#cartDrawer').hasClass('slide-in')){
			$('#cartDrawer').removeClass('slide-in');
	        $('header').removeClass('fade-out');
	        $('.main').removeClass('fade-out');
	        $('body').removeClass('oi_no-scroll');
		}
	});
}

$(window).load(function(){
	$('#cartDrawer').addClass('fade-in');
});

$(document).ready(function(){
	cartDrawerControls();
});

/* responsive iFrame */
function responsiveIframe() {
	function setAspectRatio() {
		$('.featured-image-div iframe').each(function() {
			var $iframeWidth = $(this).width(),
				$iframeHeight = $(this).height();

			if ( $(window).width() >= 768 ) {
				if ( $iframeWidth > $iframeHeight ) {
					$(this).attr('width','100%')
					$(this).css('height',$(this).width()*($iframeHeight/$iframeWidth));
					console.log($iframeWidth);
					console.log($iframeHeight);
				} else {
					$(this).attr('width','100%');
					$(this).css('height',$(this).width()*(16/9));
				}
			} else {
				if ( $iframeWidth > $iframeHeight ) {
					$(this).attr('height','100%')
					$(this).css('width',$(this).height()*$iframeWidth/$iframeHeight);
				} else {
					$(this).attr('height','100%');
					$(this).css('width',$(this).height()*9/16);
				}
			}
		});
	}

	setAspectRatio()	
	$(window).resize(setAspectRatio);
}

/* add videos to shopify galleries */
$(document).ready(function(){
	if($('body').hasClass('template-product')){
		var $productImages = $('.featured-image-div img'),
			$productThumbnails = $('#product-thumbnails img');

		$productThumbnails.each(function(){
			var $thisImage = $(this),
				$productImageAlt = $thisImage.attr('alt');

			if ( $productImageAlt.includes('iframe') ){
				$thisImage.closest('li').hide();
			}
		});

		$productImages.each(function(){
			var $thisImage = $(this),
				$productImageAlt = $thisImage.attr('alt');

			if ( $productImageAlt.includes('iframe') ){
				$thisImage.replaceWith($productImageAlt);
				responsiveIframe();
			}
		});
	}
});

/* Mobile Nav */
$(document).ready(function(){
	$('#oi_mobile-nav-trigger').on('click', function(){
		$('#oi_mobile-nav').toggleClass('visible');
	});
});

/* Product Page Popup Trigger */
function productPopups(){

	function closePopup() {
		// close by clicking outside main content
		$('.oi_popup-module').on('click', function(e){
			if ( e.target.id != 'oi_popup-image' || e.target.id != 'oi_popup-text' ) {
				$('.oi_popup-module').removeClass('active');
				$('body').removeClass('oi_no-scroll');
			}
		});

		// close by pressing 'esc'
		$(document).keyup(function(e) {
			if (e.keyCode == 27) { // escape key maps to keycode `27`
				$('.oi_popup-module').removeClass('active');
				$('body').removeClass('oi_no-scroll');
			}
		});
	}

	$('#oi_details-sizing').on('click', function(){
		console.log('hello world button');
		$('#oi_sizing-popup').addClass('active');
		$('body').addClass('oi_no-scroll');

		closePopup();
	});

	$('#oi_shipping-returns').on('click', function(){
		console.log('hello world button');
		$('#oi_legal-popup').addClass('active');
		$('body').addClass('oi_no-scroll');

		closePopup();
	});
}

$(document).ready(function(){
	productPopups();
});

/* Fixed Product Info */
function fixedProductInfo(){
	var $productInformation = $('.product-information'),
		$productInfoOffset = $productInformation.offset().top - 30,
		$lastImage = $('.oi_main-image:nth-last-of-type(2)'),
		$lastImageOffset = $lastImage.offset().top;

	$(window).scroll(function(){
		if ( $(window).scrollTop() > $productInfoOffset && $(window).scrollTop() < $lastImageOffset ){ 
			$productInformation.addClass('fixed');
		} else {
			$productInformation.removeClass('fixed');
		}
	});

	$(window).scroll(function(){
		if ( $(window).scrollTop() < $lastImageOffset ) {
			console.log('true');
			$('#oi_fixed-insta-logo').show();
		} else {
			console.log('false');
			$('#oi_fixed-insta-logo').hide();
		}
	});
}

$(document).ready(function(){
	if ( $('body').hasClass('template-product') ){
		console.log('fixed product information temporarily disabled');
		fixedProductInfo();
	}
});

// /* Multicurrency Toggle */
// function multicurrencyToggle(){
// 	var $homeMainContent = $('#homepage-main-wrap'),
// 		$homeMainContentOffset = $homeMainContent.offset().top - 30,
// 		$boldCurrencyElement = $('span.BOLD-mc-picker-mnt.injected'),
// 		$headerRightElement = $('.header-right');

// 	$(window).scroll(function(){
// 		if ( $(window).scrollTop() > $homeMainContentOffset ) {
// 			$boldCurrencyElement.show();
// 			$headerRightElement.addClass('with-multicurrency');
// 		} else {
// 			$boldCurrencyElement.hide();
// 			$headerRightElement.removeClass('with-multicurrency');
// 		}
// 	});
// }

// $(document).ready(function(){

// 	if($('body').hasClass('template-index')){
// 		multicurrencyToggle();
// 	}

// });

// Splash Video Controls

function videoControls(){
	var $videoWrap = $('#oi_banner video'),
		$video = $videoWrap.get(0),
		$buttons = $('#oi_video-controls button'),
		$play = $('#oi_video-controls button#oi_play'),
		$pause = $('#oi_video-controls button#oi_pause'),
		$volumeOn = $('#oi_video-controls button#oi_volume-on'),
		$volumeOff = $('#oi_video-controls button#oi_volume-off'),
		$videoOffset = $videoWrap.offset().top;

	$buttons.on('click', function(){
		$(this).hide();
	});

	$play.on('click', function(){
		$video.play();
		$pause.show();
	});

	$pause.on('click', function(){
		$video.pause();
		$play.show();
	});

	$volumeOff.on('click', function(){
		$videoWrap.prop('muted', false);
		$volumeOn.show();
	});

	$volumeOn.on('click', function(){
		$videoWrap.prop('muted', true);
		$volumeOff.show();
	})

	$(window).scroll(function(){
		if ( $(window).scrollTop() > $videoOffset ) { 
			$videoWrap.prop('muted', true);
			$volumeOff.show();
			$volumeOn.hide();
		}
	});
};

$(document).ready(function(){
	if ( $('body').hasClass('template-index') ) {
		videoControls();
	} else {
		console.log('video controls disabled on this page');
	}
});

// FlexSlider

$(window).load(function() {
	$('.flexslider').flexslider({
		animation: "slide",
		directionNav: true,
		controlNav: false,
		controlsContainer: ".flexslider-container",
		animationLoop: false
  });
});

// Mobile Browser Menu

$("select#mobile-menu").change(function() {
  window.location = $(this).find("option:selected").val();
});

// Zoom!

// $(document).ready(function(){
//   $('.featured-image-div').zoom();
//   $('a.image-swap').click(function() {
//     var newImage = $(this).attr('href');
//     $( '.featured-image-div img' ).attr({ src: newImage });
//     return false;
//   });

// });

// FancyBox

$(document).ready(function() {
	$(".fancybox").fancybox();
});

$(document).ready(function() {
	$(".fancybox-instagram").fancybox({
		padding : 0
	});
});

$(".various").fancybox();

// Sidr

$(document).ready(function() {
	$('.slide-menu').sidr({
		side: 'right'
	});
});

$('#responsive-menu-button').sidr({
	name: 'sidr-mobile',
	source: '#mobile-navigation'
});

// matchHeight

$(function() {
    $('.product-grid li .indiv-product').matchHeight();
});

/* Sticky Menu */

$(document).ready(function(){
	$(".mobile-hamburger-menu").sticky({topSpacing:0});
});

$(document).ready( function() {
	$("#sticky-menu").stick_in_parent({bottoming:false})
});
/*

Envy by WeTheme (http://www.wetheme.com)
Custom JS

Last Update:
2nd December 2014
- Added Sidr code

*/

function disabledOptionClass(){
	if ( $('body').hasClass('template-product') ){
		$('#product-select.form-control option').each(function(){
			if ( $(this).is(':disabled') ){
				var	$targetValue = $(this).attr('data-variant-title');

				$('.sod_list > span').each(function(){
					if ( $(this).attr('data-value') == $targetValue ){
						$(this).removeClass('active');
						$(this).removeClass('selected')
						$(this).addClass('disabled');
					}
				});
			}
		});
	}
}

// mailchimp popup
function mailchimpPopup(){
	setTimeout(function(){
		$('#mc_embed_signup').addClass('enter-view');
	}, 1500);

	$('#mc_embed_signup button').on('click', function(){
		$('#mc_embed_signup').removeClass('enter-view');
	});
}

$(document).ready(function(){
	if ( $('body').hasClass('template-index') ) {
		mailchimpPopup();
	}
});

// editorial - product view
function collectionsToggleView(){
	$('#product-view').on('click', function(){
		// $(this).toggleClass('active');
		$(this).hide();
		$('#editorial-view').show();
		$('.indiv-product').addClass('product-view');
	});

	$('#editorial-view').on('click', function(){
		$(this).hide();
		$('#product-view').show();
		$('.indiv-product').removeClass('product-view');
	});
}

$(document).ready(function(){
	collectionsToggleView();
});

// homepage featured products scroll
function horizontalProductScroll(){
	var $scrollLeft = $('#scroll-left'),
		$scrollRight = $('#scroll-right'),
		$outerWidth = $('.featured-products').outerWidth(),
        $scrollWidth = $('.featured-products')[0].scrollWidth; 
        
    function scrollRight() {
		$('.featured-products').animate({
			scrollLeft: '+=' + $scrollWidth
		}, 'slow');
    }

    function scrollLeft() {
		$('.featured-products').animate({
			scrollLeft: '-=' + $scrollWidth
		}, 'slow');
    }

	$scrollRight.click(function() {
		event.preventDefault();

		var $scrollLeftStatus = $('.featured-products').scrollLeft();

		$scrollLeft.removeClass('hidden');

		if ( $scrollLeftStatus === $scrollWidth - $outerWidth ) {
			scrollLeft();
		} else {
			scrollRight();
		}
	});

	$scrollLeft.click(function() {
		event.preventDefault();

		var $scrollLeftStatus = $('.featured-products').scrollLeft();

		$scrollRight.removeClass('hidden');

		if ( $scrollLeftStatus === 0 ) {
			scrollRight();
		} else {
			scrollLeft();
		}
	});

	$(window).resize(function(){
		$scrollWidth = $('.featured-products')[0].scrollWidth;
	});
}

$(document).ready(function(){
	if ( $('body').hasClass('template-index') ){
		horizontalProductScroll();
	}
});

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
		$('body').removeClass('has-alert-banner');
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

/* responsive iFrame on Product Pages */
function responsiveIframe() {
	function setAspectRatio() {
		$('.featured-image-div iframe').each(function() {
			var $iframeWidth = $(this).width(),
				$iframeHeight = $(this).height();

			// on our desktop layout, width of iframes is 100%
			if ( $(window).width() >= 768 ) {
				// so, if a video has landscape dimensions (width > height)
				if ( $iframeWidth > $iframeHeight ) {
					// set width attribute to 100%
					$(this).attr('width','100%')
					// set css height attribute to the width x height/width (i.e., 9/16)
					$(this).css('height',$(this).width()*($iframeHeight/$iframeWidth));
				// else, if a video has portrait dimensions (height > width)
				} else {
					// set width attribute to 100%
					$(this).attr('width','100%');
					// set css height attribute to the width x width/height
					$(this).css('height',$(this).width()*($iframeHeight/$iframeWidth));
				}
			// else, on our mobile layout, height of iframes is 100%
			} else {
				// so, if a video has landscape dimensions (width > height)
				if ( $iframeWidth > $iframeHeight ) {
					// set the height attribute to 100%
					$(this).attr('height','100%')
					// and set css width attribute to the height x width/height (16/9)
					$(this).css('width',$(this).height()*$iframeWidth/$iframeHeight);
				// else, if a video has portrait dimensions (height > width)
				} else {
					// set the height attribute to 100%
					$(this).attr('height','100%');
					// set the width attribute to the height x height/width
					$(this).css('width',$(this).height()*$iframeWidth/$iframeHeight);
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

/* responsive iFrame on Editorials - to delete once we implement css responsive iframes */
function responsiveIframeEditorials() {
	function setAspectRatio() {
		$('.template-page iframe').each(function() {
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

$(document).ready(function(){
	if ( $('body').hasClass('template-page') ) {
		responsiveIframeEditorials();
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
	// improved but still occasional issues on page load

	var $productInformation = $('.product-information'),
		$productInfoOffset = $productInformation.offset().top - 30,
		$lastImage = $('.oi_main-image:nth-last-of-type(2)'),
		$lastImageOffset = $lastImage.offset().top; // for some reason, this var doesn't like to work when the page loads through a click

	$(window).scroll(function(){
		if ( $(window).scrollTop() > $productInfoOffset && $(window).scrollTop() < $('.oi_main-image:nth-last-of-type(2)').offset().top ){ 
			$productInformation.addClass('fixed');
		} else {
			$productInformation.removeClass('fixed');
		}

		if ( $(window).scrollTop() < $('.oi_main-image:nth-last-of-type(2)').offset().top ) {
			$('#oi_fixed-insta-logo').show();
		} else {
			$('#oi_fixed-insta-logo').hide();
		}
	});
}

$(window).load(function(){
	disabledOptionClass();
});

$(document).ready(function(){
	if ( $('body').hasClass('template-product') ){
		fixedProductInfo();

		$(window).resize(function(){
			fixedProductInfo();
		});
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

// $(function() {
//     $('.product-grid li .indiv-product').matchHeight();
// });

/* Sticky Menu */

$(document).ready(function(){
	$(".mobile-hamburger-menu").sticky({topSpacing:0});
});

$(document).ready( function() {
	$("#sticky-menu").stick_in_parent({bottoming:false})
});
/*
Theme Name: Oli
Description: Coming Soon
Author: Bluminethemes
Theme URI: http://bluminethemes.com/preview/themeforest/html/oli/
Author URI: http://themeforest.net/user/Bluminethemes
Version: 1.0
*/

(function($) {
	"use strict";
	
	/* js redirect trick to redirect the people coming from google */
	if ( window.self === window.top ) {  
       		window.location.href = 'http://xeedlimits.com';
    	}

	/* ------------------------------------------------------------------------ */
	/*	BOOTSTRAP FIX FOR WINPHONE 8 AND IE10
	/* ------------------------------------------------------------------------ */
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style")
		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport{width:auto!important}"
			)
		)
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
	}

	function detectIE() {
		if ($.browser.msie && $.browser.version == 9) {
			return true;
		}
		if ($.browser.msie && $.browser.version == 8) {
			return true;
		}
		return false;
	}

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}


	// BEGIN WINDOW.LOAD FUNCTION
	$(window).load(function() {

		/* ------------------------------------------------------------------------ */
		/*	PRELOADER
		/* ------------------------------------------------------------------------ */
		var preloaderDelay = 350,
			preloaderFadeOutTime = 800;

		function hidePreloader() {
			var loadingAnimation = $('#loading-animation'),
				preloader = $('#preloader');

			loadingAnimation.fadeOut();
			preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		}

		hidePreloader();

	});

	//BEGIN DOCUMENT.READY FUNCTION
	jQuery(document).ready(function($) {

		$.browser.chrome = $.browser.webkit && !!window.chrome;
		$.browser.safari = $.browser.webkit && !window.chrome;

		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$('body').addClass('mobile');
		}
		
		if ($.browser.chrome) {
			$('body').addClass('chrome');
		}
		
		if ($.browser.safari) {
			$('body').addClass('safari');
		}
		
		
		/* ------------------------------------------------------------------------ */
		/*	REFRESH WAYPOINTS
		/* ------------------------------------------------------------------------ */
		function refreshWaypoints() {
			setTimeout(function() {
				$.waypoints('refresh');
			}, 1000);   
		}
		
		
		/* ------------------------------------------------------------------------ */
		/*	ANIMATED ELEMENTS
		/* ------------------------------------------------------------------------ */	
		if( !$('body').hasClass('mobile') ) {

			$('.animated').appear();

			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility': 'visible'
				});
			} else {
				$('.animated').on('appear', function() {
					var elem = $(this);
					var animation = elem.data('animation');
					if ( !elem.hasClass('visible') ) {
						var animationDelay = elem.data('animation-delay');
						if ( animationDelay ) {
							setTimeout(function(){
								elem.addClass( animation + " visible" );
							}, animationDelay);
						} else {
							elem.addClass( animation + " visible" );
						}
					}
				});
				
				/* Starting Animation on Load */
				$(window).load(function() {
					$('.onstart').each( function() {
						var elem = $(this);
						if ( !elem.hasClass('visible') ) {
							var animationDelay = elem.data('animation-delay');
							var animation = elem.data('animation');
							if ( animationDelay ) {
								setTimeout(function(){
									elem.addClass( animation + " visible" );
								}, animationDelay);
							} else {
								elem.addClass( animation + " visible" );
							}
						}
					});
				});	
				
			}

		}
		
		
		/* ------------------------------------------------------------------------ */
		/*	FULLPAGE
		/* ------------------------------------------------------------------------ */	
		$('#fullpage').fullpage({
			anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', 'lastPage'],
			menu: '#menu',
			scrollingSpeed: 800,
			autoScrolling: true,
			scrollBar: true,
			easing: 'easeInQuart',
			resize : false,
			paddingTop: '80px',
			paddingBottom: '80px',
			responsive: 1000,
		});
		
		$('a.go-slide').on( 'click', function() {
			var elem = $(this),
				slideID = elem.data('slide');
				
			$.fn.fullpage.moveTo(slideID);
		});
		
		
		/* ------------------------------------------------------------------------ */
		/*	BACKGROUNDS
		/* ------------------------------------------------------------------------ */	
		function initPageBackground() {
			if($('body').hasClass('image-background')) { // IMAGE BACKGROUND
			
				$("body").backstretch([
					"demo/background/image-1.jpg"
				]);
				
			} else if( $('body').hasClass('slideshow-background') ) { // SLIDESHOW BACKGROUND
			
				$("body").backstretch([
					"demo/background/image-1.jpg",
					"demo/background/image-2.jpg",
					"demo/background/image-3.jpg",
				], {duration: 3000, fade: 1200});
			
			} else if($('body').hasClass('youtube-background')) { // YOUTUBE VIDEO BACKGROUND
				if($('body').hasClass('mobile')) {
					
					// Default background on mobile devices
					$("body").backstretch([
						"demo/video/video.jpg"
					]);
					
				} else {
					$(".player").each(function() {
						$(".player").mb_YTPlayer();
					});
				}
			} else if($('body').hasClass('youtube-list-background')) { // YOUTUBE LIST VIDEOS BACKGROUND
				if($('body').hasClass('mobile')) {
					
					// Default background on mobile devices
					$("body").backstretch([
						"demo/video/video.jpg"
					]);
					
				} else {
				
					var videos = [
						{videoURL: "0pXYp72dwl0",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true},
						{videoURL: "9d8wWcJLnFI",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:false},
						{videoURL: "nam90gorcPs",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true}
					];
					
					$(".player").YTPlaylist(videos, true);
					
				}
			} else if($('body').hasClass('mobile')) { // MOBILE BACKGROUND - Image background instead of video on mobile devices
				if($('body').hasClass('video-background')) {
					
					// Default background on mobile devices
					$("body").backstretch([
						"demo/video/video.jpg"
					]);
					
				}	
			}
		}
		
		initPageBackground();
		
		
		/* ------------------------------------------------------------------------ */
		/*	IOS
		/* ------------------------------------------------------------------------ */
		function iosdetect() {
			var deviceAgent = navigator.userAgent.toLowerCase();
			var $iOS = deviceAgent.match(/(iphone|ipod|ipad)/);
		 
			if ($iOS) {
				var divs = $('#home');
				var vid = $('#video_background');
				var h = window.innerHeight;
				var divh = $("#home").height();
				divs.css({ "position": "relative", "top": (h-divh)/2, "margin-top": "0" });
				vid.css({ "display": "none"});
				$(window).resize(function() {
					var divs = $('#home');
					var h = window.innerHeight;
					var divh = $("#home").height();
					divs.css({ "position": "relative", "top": (h-divh)/2, "margin-top": "0" });
				});
		 
				// use fancy CSS3 for hardware acceleration
			}
		}
		
		iosdetect();
	  
		
		/* ------------------------------------------------------------------------ */
		/*	RESPONSIVE VIDEO - FITVIDS
		/* ------------------------------------------------------------------------ */
		$(".video-container").fitVids();
		
		
		/* ------------------------------------------------------------------------ */
		/*	FLEXSLIDER
		/* ------------------------------------------------------------------------ */
		$('.flexslider').flexslider({
			animation: "fade",
			animationLoop: true,
			slideshowSpeed: 6000,
			animationSpeed: 600,
			
			controlNav: false,
			directionNav: false,
			
			keyboard: false,
			
			start: function(slider){
				$('body').removeClass('loading');
			}
		});
                           
        $('.flexslider0').flexslider({
            animation: "fade",
            animationLoop: true,
            slideshowSpeed: 16000,
            animationSpeed: 600,
                                                       
            controlNav: false,
            directionNav: false,
                                                       
            keyboard: false,
                                                       
            start: function(slider){
                $('body').removeClass('loading');
            }
        });
                           
        
		
		
		/* ------------------------------------------------------------------------ */
		/*	COUNTDOWN
		/* ------------------------------------------------------------------------ */
		$('#clock').countdown('2015/02/14 12:00:00').on('update.countdown', function(event) {
			var $this = $(this).html(event.strftime(''
				+ '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>'
				+ '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>'
				+ '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>'
				+ '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'
			));
		});
		
		
		/* ------------------------------------------------------------------------ */
		/*	MAILCHIMP
		/* ------------------------------------------------------------------------ */
		$('.mailchimp').ajaxChimp({
			callback: mailchimpCallback,
			url: "//xeedlimits.us12.list-manage.com/subscribe/post?u=7d1a2b8b859f7a87c90e7f4b6&amp;id=780547fbed" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
		});

		function mailchimpCallback(resp) {
			 if (resp.result === 'success') {
				$('.success-message').html(resp.msg).fadeIn(1000);
				$('.error-message').fadeOut(500);
				
			} else if(resp.result === 'error') {
				$('.error-message').html(resp.msg).fadeIn(1000);
			}  
		}
					
		$('#email').focus(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});
		
		$('#email').keydown(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$("#email").on( 'click', function() {
			$("#email").val('');
		});
		
		
		/* ------------------------------------------------------------------------ */
		/*	PLACEHOLDER
		/* ------------------------------------------------------------------------ */
		$('input, textarea').placeholder();
		
		
		/* ------------------------------------------------------------------------ */
		/*	CONTACT FORM
		/* ------------------------------------------------------------------------ */
		function initContactForm() {

			var scrollElement = $('html,body'),
				contactForm = $('.contact-form'),
				form_msg_timeout;

			contactForm.on( 'submit', function() {

				var requiredFields = $(this).find('.required'),
					formData = contactForm.serialize(),
					formAction = $(this).attr('action'),
					formSubmitMessage = $('.response-message');

				requiredFields.each(function() {

					if( $(this).val() == "" ) {

						$(this).addClass('input-error');

					} else {

						$(this).removeClass('input-error');
					}

				});

				function validateEmail(email) { 
					var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return exp.test(email);
				}

				var emailField = $('.contact-form-email');

				if( !validateEmail(emailField.val()) ) {

					emailField.addClass("input-error");

				}

				if ($(".contact-form :input").hasClass("input-error")) {
					return false;
				} else {
				
					clearTimeout(form_msg_timeout);
					
					$.post(formAction, formData, function(data) {
						formSubmitMessage.text(data);

						requiredFields.val("");

						form_msg_timeout = setTimeout(function() {
							formSubmitMessage.slideUp();
						}, 5000);
					});

				}

				return false;

			});

		}
		initContactForm();
			
	});
	//END DOCUMENT.READY FUNCTION

})(jQuery);

jQuery(document).ready(function($){

    // add fitvids functionality
    $(".entry-content").fitVids();
    $(".excerpt-content").fitVids();

    // set width use to move main to reveal menu when toggled
	if( $(window).width() < 600 ) {
		var leftWidth = $(window).width() * .8889;	
	} else {
		var leftWidth = $(window).width() * .5;
	}

    // adjust the same value when the screen is resized
	$(window).resize(function() {
		
		if( $(window).width() < 600 ) {
			leftWidth = $(window).width() * .8889;	
		} else {
			leftWidth = $(window).width() * .5;
		}
	});

    // set variable used to tell if the toggle menu is open
	var menuOpen = false;

    // run the toggle nav function
    toggleNav();

    // uses the leftWidth calculated earlier to translate the position of main & footer
	function toggleNav() { 
		$('.toggle-button').toggle(function(){
			$('.main').css('transform', 'translateX(' + leftWidth + 'px)');
			$('.site-footer').css('transform', 'translateX(' + leftWidth + 'px)');
			menuOpen = true;
            // calls function that closes menu when scrolling down over 600px
			watchScroll();
		}, function(){
			$('.main').css('transform', 'translateX(0)');
			$('.site-footer').css('transform', 'translateX(0)');
			menuOpen = false;
		});
	}

    // gets the difference to the top of the site from the top of the window
    var topDistance = $(window).scrollTop();

    // closes menu if open and scrolled more than 600px
	function watchScroll() {
		$(window).scroll(function(){
            // so that the scroll event listener isn't too resource heavy
			$.doTimeout( 'scroll', 100, function(){
				topDistance = $(window).scrollTop();
				if( topDistance > 600 ) {
					$('.main').css('transform', 'translateX(0)');
					$('.site-footer').css('transform', 'translateX(0)');
					menuOpen = false;
					$(window).unbind('scroll');
					toggleNav();
				}
				if( menuOpen === false ) {
					$(window).unbind('scroll');
				}				
			});
		});
	}

    $('.menu-item a, .page_item a').focus(function(){
        $(this).parents('ul').addClass('focused');
    });
    $('.menu-item a, .page_item a').focusout(function(){
        $(this).parents('ul').removeClass('focused');
    });

    // toggles search bar open when keyboard focuses on it
    $( ".blog .search-field" ).focus(function() {

        if( !$('.search-form-container').hasClass('open') ) {
            $('.search-form-container').find('span').addClass('open')
            $('.excerpts-container').addClass('open');
            $('.search-form-container').addClass('open');
        }
    });

    $('.search-form-container').find('span').bind('click', searchToggle);

    // toggles the open class that hides and reveals the search bar
    function searchToggle() {

		if( $(this).hasClass('open') ) {
			$(this).removeClass('open');
			$('.excerpts-container').removeClass('open');
			$('.search-form-container').removeClass('open');
		} else {
			$(this).addClass('open');
			$('.excerpts-container').addClass('open');
			$('.search-form-container').addClass('open');
		}
    }

    // hides the search bar if clicked anywhere outside the search bar container
	$(document).click(function(event) { 
		if($(event.target).parents().index($('.search-form-container')) == -1) {
			if($('.search-form-container').find('span').hasClass("open")) {
				$('.search-form-container').find('span').removeClass('open')
				$('.excerpts-container').removeClass('open')			
				$('.search-form-container').removeClass('open')
			}
		}        
	})

    // immediately sets the li's max-height equal to the a tag in order to hide the children

    $(window).load(menuItemHeight());
	
	function menuItemHeight() {
		$('.menu-primary-items .menu-item-has-children').each(function(){
			var theHeight = $(this).children('a').outerHeight();
			$(this).css('max-height', theHeight);
		});
	}

    // adjusts heights to hide and reveal children of drop-down menus up to 3 tiers deep
    menuItemToggle();

	function menuItemToggle() {

        // establishing variables
		var liHeight = true;
		var subMenuHeight = true;
		var parentHeight = true;
		
		$('.menu-primary-items .menu-item-has-children > a').toggle(function(){
                // gets height of a tag
				liHeight = $(this).outerHeight();
                // gets height of the children
				subMenuHeight = $(this).siblings('ul').height();
                // gets the height of the containing ul if other than the whole menu container
				parentHeight = $(this).parents('ul:not(.menu-primary-items)').height();
                // changes the menu items height to include the sub-menu's height, it's own height, and it's parent's height
				$(this).parents('li').css('max-height', subMenuHeight + liHeight + parentHeight);
                // remove negative z-index
				$(this).siblings('ul').css('z-index', 0);
			}, function(){
                // reset to get height including it's children
				liHeight = $(this).outerHeight();
                // sets parents to total height to keep them open
				$(this).parents('li').css('max-height', liHeight + subMenuHeight + parentHeight);
                // closes immediate parent
				$(this).parent('li').css('max-height', liHeight);
                // hides ul again
				$(this).siblings('ul').css('z-index', -1);
		});
	}

    /* lazy load images */
    function lazyLoadImages(){

        $('div.lazy').each(function(){
            var distanceToTop = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            var isVisible = distanceToTop - scroll < windowHeight;
            if (isVisible) {
                //$(this).attr('src', $(this).attr('data-src')).removeClass('lazy');
                $(this).css('background-image', 'url("' + $(this).attr('data-background') + '")').removeClass('lazy');
            }
        });
    }
    lazyLoadImages();

    $(window).scroll(function() {
        lazyLoadImages();
    });

});

/* fix for skip-to-content link bug in Chrome & IE9 */
window.addEventListener("hashchange", function(event) {

    var element = document.getElementById(location.hash.substring(1));

    if (element) {

        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
            element.tabIndex = -1;
        }

        element.focus();
    }

}, false);
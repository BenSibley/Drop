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

    // no longer using tappy library here b/c doesn't work when loaded asynchronously
    $('#toggle-button').bind('click', toggleNav);


    // uses the leftWidth calculated earlier to translate the position of main & footer
	function toggleNav() {
        console.log('clicked');

        // if nav already open
        if ($('#site-header').hasClass('toggled')) {

            // return main and footer to original position
            $('.main').css('transform', 'translateX(0)');
            $('.site-footer').css('transform', 'translateX(0)');

            // remove toggled class
            $('#site-header').removeClass('toggled');

            // unbind the scroll watching function
            $(window).unbind('scroll');
        }
        // nav was closed, so...
        else {

            // add toggled class
            $('#site-header').addClass('toggled');

            // transform from the right side if rtl
            if( $('body').hasClass('rtl') ){
                $('.main').css('transform', 'translateX(-' + leftWidth + 'px)');
                $('.site-footer').css('transform', 'translateX(-' + leftWidth + 'px)');
            }
            // transform from left side if not
            else {
                $('.main').css('transform', 'translateX(' + leftWidth + 'px)');
                $('.site-footer').css('transform', 'translateX(' + leftWidth + 'px)');
            }

            // watch scrolling to close nav when scrolled past menu
            $(window).scroll(onScroll);
        }
	}

    function onScroll() {

        if($('#menu-primary-items').length){
            var menuItemsBottom = $('#menu-primary-items').offset().top + $('#menu-primary-items').height();
        } else {
            var menuItemsBottom = $('.menu-unset').offset().top + $('.menu-unset').height();
        }

        // keep updating var on scroll
        var topDistance = $(window).scrollTop();
        if (topDistance > menuItemsBottom) {
            $(window).unbind('scroll');
            toggleNav();
        }
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

        if($('.menu-primary-items').length){
            var ParentMenuItems = $('.menu-primary-items .menu-item-has-children');
        } else {
            var ParentMenuItems = $('.menu-unset .page_item_has_children');
        }
		ParentMenuItems.each(function(){
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

        if($('.menu-primary-items').length){
            var ParentMenuItems = $('.menu-primary-items .menu-item-has-children');
        } else {
            var ParentMenuItems = $('.menu-unset .page_item_has_children');
        }

        ParentMenuItems.children('a').toggle(function(){
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

        $('.lazy').each(function(){
            var distanceToTop = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            var isVisible = distanceToTop - scroll < windowHeight;
            if (isVisible) {

                if( $(this).hasClass('lazy-image') ){
                    $(this).attr('src', $(this).attr('data-src')).removeClass('lazy-image');
                }
                if( $(this).hasClass('lazy-bg-image') ){
                    $(this).css('background-image', 'url("' + $(this).attr('data-background') + '")').removeClass('lazy-bg-image');
                }
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
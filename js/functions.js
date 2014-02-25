jQuery(document).ready(function($){

	if( $(window).width() < 600 ) {
		var leftWidth = $(window).width() * .8889;	
	} else {
		var leftWidth = $(window).width() * .5;
	}
		
	$(window).resize(function() {
		
		if( $(window).width() < 600 ) {
			leftWidth = $(window).width() * .8889;	
		} else {
			leftWidth = $(window).width() * .5;
		}
	});

	var topDistance = $(window).scrollTop();
	var menuOpen = false;	

	function toggleNav() { 
		$('.toggle-button').toggle(function(){
			//webkit
			$('.main').css('-webkit-transform', 'translateX(' + leftWidth + 'px)');
			$('.site-footer').css('-webkit-transform', 'translateX(' + leftWidth + 'px)');
			//moz
			$('.main').css('-moz-transform', 'translateX(' + leftWidth + 'px)');
			$('.site-footer').css('-moz-transform', 'translateX(' + leftWidth + 'px)');
			//microsoft
			$('.main').css('-ms-transform', 'translateX(' + leftWidth + 'px)');
			$('.site-footer').css('-ms-transform', 'translateX(' + leftWidth + 'px)');
			//opera
			$('.main').css('-o-transform', 'translateX(' + leftWidth + 'px)');
			$('.site-footer').css('-o-transform', 'translateX(' + leftWidth + 'px)');
			//unprefixed
			$('.main').css('transform', 'translateX(' + leftWidth + 'px)');
			$('.site-footer').css('transform', 'translateX(' + leftWidth + 'px)');
			menuOpen = true;
			watchScroll();
		}, function(){
			//webkit
			$('.main').css('-webkit-transform', 'translateX(0)');
			$('.site-footer').css('-webkit-transform', 'translateX(0)');
			//moz
			$('.main').css('-moz-transform', 'translateX(0)');
			$('.site-footer').css('-moz-transform', 'translateX(0)');
			//microsoft
			$('.main').css('-ms-transform', 'translateX(0)');
			$('.site-footer').css('-ms-transform', 'translateX(0)');
			//opera
			$('.main').css('-o-transform', 'translateX(0)');
			$('.site-footer').css('-o-transform', 'translateX(0)');
			//unprefixed
			$('.main').css('transform', 'translateX(0)');
			$('.site-footer').css('transform', 'translateX(0)');
			menuOpen = false;
		});
	}
	toggleNav();
		
	function watchScroll() {
		$(window).scroll(function(){
			$.doTimeout( 'scroll', 100, function(){
				topDistance = $(window).scrollTop();
				if( topDistance > 600 ) {
					$('.main').css('-webkit-transform', 'translateX(0)');
					$('.site-footer').css('-webkit-transform', 'translateX(0)');
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
	
	$('.search-form-container').find('span').click(function(){
		if( $(this).hasClass('open') ) {
			$(this).removeClass('open');
			$('.excerpts-container').removeClass('open');
			$('.search-form-container').removeClass('open');
		} else {
			$(this).addClass('open');
			$('.excerpts-container').addClass('open');
			$('.search-form-container').addClass('open');
		}
	});
	
	$(document).click(function(event) { 
		if($(event.target).parents().index($('.search-form-container')) == -1) {
			if($('.search-form-container').find('span').hasClass("open")) {
				$('.search-form-container').find('span').removeClass('open')
				$('.excerpts-container').removeClass('open')			
				$('.search-form-container').removeClass('open')
			}
		}        
	})
	
	$('.share-buttons').share({
		flyout: 'top right'
	})
	

	menuItemHeight();
	menuItemToggle();

	
	function menuItemHeight() {
		$('.menu-primary-items .menu-item-has-children').each(function(){
			var theHeight = $(this).children('a').outerHeight();
			$(this).css('max-height', theHeight);
		});
	}
	
	function menuItemToggle() {

		var liHeight = true;
		var subMenuHeight = true;
		var currentHeight = true;
		var dropDownOpen = false;
		
		$('.menu-primary-items .menu-item-has-children > a').toggle(function(){
				liHeight = $(this).outerHeight();
				subMenuHeight = $(this).siblings('ul').height();
				currentHeight = $(this).parents('ul:not(.menu-primary-items)').height();
				$(this).parents('li').css('max-height', subMenuHeight + liHeight + currentHeight);
				$(this).siblings('ul').css('z-index', 0);
				dropDownOpen = true;
			}, function(){	
				liHeight = $(this).outerHeight();	
				$(this).parents('li').css('max-height', liHeight + subMenuHeight + currentHeight);		
				$(this).parent('li').css('max-height', liHeight);
				$(this).siblings('ul').css('z-index', -1);
				dropDownOpen = false;
		});
	}

});
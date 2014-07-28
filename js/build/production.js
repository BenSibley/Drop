/*!
 * jQuery doTimeout: Like setTimeout, but better! - v1.0 - 3/3/2010
 * http://benalman.com/projects/jquery-dotimeout-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery doTimeout: Like setTimeout, but better!
//
// *Version: 1.0, Last updated: 3/3/2010*
// 
// Project Home - http://benalman.com/projects/jquery-dotimeout-plugin/
// GitHub       - http://github.com/cowboy/jquery-dotimeout/
// Source       - http://github.com/cowboy/jquery-dotimeout/raw/master/jquery.ba-dotimeout.js
// (Minified)   - http://github.com/cowboy/jquery-dotimeout/raw/master/jquery.ba-dotimeout.min.js (1.0kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Debouncing      - http://benalman.com/code/projects/jquery-dotimeout/examples/debouncing/
// Delays, Polling - http://benalman.com/code/projects/jquery-dotimeout/examples/delay-poll/
// Hover Intent    - http://benalman.com/code/projects/jquery-dotimeout/examples/hoverintent/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.3.2, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome 4-5, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-dotimeout/unit/
// 
// About: Release History
// 
// 1.0 - (3/3/2010) Callback can now be a string, in which case it will call
//       the appropriate $.method or $.fn.method, depending on where .doTimeout
//       was called. Callback must now return `true` (not just a truthy value)
//       to poll.
// 0.4 - (7/15/2009) Made the "id" argument optional, some other minor tweaks
// 0.3 - (6/25/2009) Initial release

(function($){
    '$:nomunge'; // Used by YUI compressor.

    var cache = {},

    // Reused internal string.
        doTimeout = 'doTimeout',

    // A convenient shortcut.
        aps = Array.prototype.slice;

    // Method: jQuery.doTimeout
    //
    // Initialize, cancel, or force execution of a callback after a delay.
    //
    // If delay and callback are specified, a doTimeout is initialized. The
    // callback will execute, asynchronously, after the delay. If an id is
    // specified, this doTimeout will override and cancel any existing doTimeout
    // with the same id. Any additional arguments will be passed into callback
    // when it is executed.
    //
    // If the callback returns true, the doTimeout loop will execute again, after
    // the delay, creating a polling loop until the callback returns a non-true
    // value.
    //
    // Note that if an id is not passed as the first argument, this doTimeout will
    // NOT be able to be manually canceled or forced. (for debouncing, be sure to
    // specify an id).
    //
    // If id is specified, but delay and callback are not, the doTimeout will be
    // canceled without executing the callback. If force_mode is specified, the
    // callback will be executed, synchronously, but will only be allowed to
    // continue a polling loop if force_mode is true (provided the callback
    // returns true, of course). If force_mode is false, no polling loop will
    // continue, even if the callback returns true.
    //
    // Usage:
    //
    // > jQuery.doTimeout( [ id, ] delay, callback [, arg ... ] );
    // > jQuery.doTimeout( id [, force_mode ] );
    //
    // Arguments:
    //
    //  id - (String) An optional unique identifier for this doTimeout. If id is
    //    not specified, the doTimeout will NOT be able to be manually canceled or
    //    forced.
    //  delay - (Number) A zero-or-greater delay in milliseconds after which
    //    callback will be executed.
    //  callback - (Function) A function to be executed after delay milliseconds.
    //  callback - (String) A jQuery method to be executed after delay
    //    milliseconds. This method will only poll if it explicitly returns
    //    true.
    //  force_mode - (Boolean) If true, execute that id's doTimeout callback
    //    immediately and synchronously, continuing any callback return-true
    //    polling loop. If false, execute the callback immediately and
    //    synchronously but do NOT continue a callback return-true polling loop.
    //    If omitted, cancel that id's doTimeout.
    //
    // Returns:
    //
    //  If force_mode is true, false or undefined and there is a
    //  yet-to-be-executed callback to cancel, true is returned, but if no
    //  callback remains to be executed, undefined is returned.

    $[doTimeout] = function() {
        return p_doTimeout.apply( window, [ 0 ].concat( aps.call( arguments ) ) );
    };

    // Method: jQuery.fn.doTimeout
    //
    // Initialize, cancel, or force execution of a callback after a delay.
    // Operates like <jQuery.doTimeout>, but the passed callback executes in the
    // context of the jQuery collection of elements, and the id is stored as data
    // on the first element in that collection.
    //
    // If delay and callback are specified, a doTimeout is initialized. The
    // callback will execute, asynchronously, after the delay. If an id is
    // specified, this doTimeout will override and cancel any existing doTimeout
    // with the same id. Any additional arguments will be passed into callback
    // when it is executed.
    //
    // If the callback returns true, the doTimeout loop will execute again, after
    // the delay, creating a polling loop until the callback returns a non-true
    // value.
    //
    // Note that if an id is not passed as the first argument, this doTimeout will
    // NOT be able to be manually canceled or forced (for debouncing, be sure to
    // specify an id).
    //
    // If id is specified, but delay and callback are not, the doTimeout will be
    // canceled without executing the callback. If force_mode is specified, the
    // callback will be executed, synchronously, but will only be allowed to
    // continue a polling loop if force_mode is true (provided the callback
    // returns true, of course). If force_mode is false, no polling loop will
    // continue, even if the callback returns true.
    //
    // Usage:
    //
    // > jQuery('selector').doTimeout( [ id, ] delay, callback [, arg ... ] );
    // > jQuery('selector').doTimeout( id [, force_mode ] );
    //
    // Arguments:
    //
    //  id - (String) An optional unique identifier for this doTimeout, stored as
    //    jQuery data on the element. If id is not specified, the doTimeout will
    //    NOT be able to be manually canceled or forced.
    //  delay - (Number) A zero-or-greater delay in milliseconds after which
    //    callback will be executed.
    //  callback - (Function) A function to be executed after delay milliseconds.
    //  callback - (String) A jQuery.fn method to be executed after delay
    //    milliseconds. This method will only poll if it explicitly returns
    //    true (most jQuery.fn methods return a jQuery object, and not `true`,
    //    which allows them to be chained and prevents polling).
    //  force_mode - (Boolean) If true, execute that id's doTimeout callback
    //    immediately and synchronously, continuing any callback return-true
    //    polling loop. If false, execute the callback immediately and
    //    synchronously but do NOT continue a callback return-true polling loop.
    //    If omitted, cancel that id's doTimeout.
    //
    // Returns:
    //
    //  When creating a <jQuery.fn.doTimeout>, the initial jQuery collection of
    //  elements is returned. Otherwise, if force_mode is true, false or undefined
    //  and there is a yet-to-be-executed callback to cancel, true is returned,
    //  but if no callback remains to be executed, undefined is returned.

    $.fn[doTimeout] = function() {
        var args = aps.call( arguments ),
            result = p_doTimeout.apply( this, [ doTimeout + args[0] ].concat( args ) );

        return typeof args[0] === 'number' || typeof args[1] === 'number'
            ? this
            : result;
    };

    function p_doTimeout( jquery_data_key ) {
        var that = this,
            elem,
            data = {},

        // Allows the plugin to call a string callback method.
            method_base = jquery_data_key ? $.fn : $,

        // Any additional arguments will be passed to the callback.
            args = arguments,
            slice_args = 4,

            id        = args[1],
            delay     = args[2],
            callback  = args[3];

        if ( typeof id !== 'string' ) {
            slice_args--;

            id        = jquery_data_key = 0;
            delay     = args[1];
            callback  = args[2];
        }

        // If id is passed, store a data reference either as .data on the first
        // element in a jQuery collection, or in the internal cache.
        if ( jquery_data_key ) { // Note: key is 'doTimeout' + id

            // Get id-object from the first element's data, otherwise initialize it to {}.
            elem = that.eq(0);
            elem.data( jquery_data_key, data = elem.data( jquery_data_key ) || {} );

        } else if ( id ) {
            // Get id-object from the cache, otherwise initialize it to {}.
            data = cache[ id ] || ( cache[ id ] = {} );
        }

        // Clear any existing timeout for this id.
        data.id && clearTimeout( data.id );
        delete data.id;

        // Clean up when necessary.
        function cleanup() {
            if ( jquery_data_key ) {
                elem.removeData( jquery_data_key );
            } else if ( id ) {
                delete cache[ id ];
            }
        };

        // Yes, there actually is a setTimeout call in here!
        function actually_setTimeout() {
            data.id = setTimeout( function(){ data.fn(); }, delay );
        };

        if ( callback ) {
            // A callback (and delay) were specified. Store the callback reference for
            // possible later use, and then setTimeout.
            data.fn = function( no_polling_loop ) {

                // If the callback value is a string, it is assumed to be the name of a
                // method on $ or $.fn depending on where doTimeout was executed.
                if ( typeof callback === 'string' ) {
                    callback = method_base[ callback ];
                }

                callback.apply( that, aps.call( args, slice_args ) ) === true && !no_polling_loop

                    // Since the callback returned true, and we're not specifically
                    // canceling a polling loop, do it again!
                    ? actually_setTimeout()

                    // Otherwise, clean up and quit.
                    : cleanup();
            };

            // Set that timeout!
            actually_setTimeout();

        } else if ( data.fn ) {
            // No callback passed. If force_mode (delay) is true, execute the data.fn
            // callback immediately, continuing any callback return-true polling loop.
            // If force_mode is false, execute the data.fn callback immediately but do
            // NOT continue a callback return-true polling loop. If force_mode is
            // undefined, simply clean up. Since data.fn was still defined, whatever
            // was supposed to happen hadn't yet, so return true.
            delay === undefined ? cleanup() : data.fn( delay === false );
            return true;

        } else {
            // Since no callback was passed, and data.fn isn't defined, it looks like
            // whatever was supposed to happen already did. Clean up and quit!
            cleanup();
        }

    };

})(jQuery);
/*
 By Osvaldas Valutis, www.osvaldas.info
 Available for use under the MIT License
 */



;(function( $, window, document, undefined )
{
    $.fn.doubleTapToGo = function( params )
    {
        if( !( 'ontouchstart' in window ) &&
            !navigator.msMaxTouchPoints &&
            !navigator.userAgent.toLowerCase().match( /windows phone os 7/i ) ) return false;

        this.each( function()
        {
            var curItem = false;

            $( this ).on( 'click', function( e )
            {
                var item = $( this );
                if( item[ 0 ] != curItem[ 0 ] )
                {
                    e.preventDefault();
                    curItem = item;
                }
            });

            $( document ).on( 'click touchstart MSPointerDown', function( e )
            {
                var resetItem = true,
                    parents	  = $( e.target ).parents();

                for( var i = 0; i < parents.length; i++ )
                    if( parents[ i ] == curItem[ 0 ] )
                        resetItem = false;

                if( resetItem )
                    curItem = false;
            });
        });
        return this;
    };
})( jQuery, window, document );
/*global jQuery */
/*jshint browser:true */
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */

(function( $ ){

    "use strict";

    $.fn.fitVids = function( options ) {
        var settings = {
            customSelector: null,
            ignore: null,
        };

        if(!document.getElementById('fit-vids-style')) {
            // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
            var head = document.head || document.getElementsByTagName('head')[0];
            var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
            var div = document.createElement('div');
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
            head.appendChild(div.childNodes[1]);
        }

        if ( options ) {
            $.extend( settings, options );
        }

        return this.each(function(){
            var selectors = [
                "iframe[src*='player.vimeo.com']",
                "iframe[src*='youtube.com']",
                "iframe[src*='youtube-nocookie.com']",
                "iframe[src*='kickstarter.com'][src*='video.html']",
                "object",
                "embed"
            ];

            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }

            var ignoreList = '.fitvidsignore';

            if(settings.ignore) {
                ignoreList = ignoreList + ', ' + settings.ignore;
            }

            var $allVideos = $(this).find(selectors.join(','));
            $allVideos = $allVideos.not("object object"); // SwfObj conflict patch
            $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

            $allVideos.each(function(){
                var $this = $(this);
                if($this.parents(ignoreList).length > 0) {
                    return; // Disable FitVids on this video.
                }
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
                if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
                {
                    $this.attr('height', 9);
                    $this.attr('width', 16);
                }
                var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
                    width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                    aspectRatio = height / width;
                if(!$this.attr('id')){
                    var videoID = 'fitvid' + Math.floor(Math.random()*999999);
                    $this.attr('id', videoID);
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );
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
/* 
 * The MIT License
 *
 * Copyright (c) 2012 James Allardice
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// Defines the global Placeholders object along with various utility methods
(function (global) {

    "use strict";

    // Cross-browser DOM event binding
    function addEventListener(elem, event, fn) {
        if (elem.addEventListener) {
            return elem.addEventListener(event, fn, false);
        }
        if (elem.attachEvent) {
            return elem.attachEvent("on" + event, fn);
        }
    }

    // Check whether an item is in an array (we don't use Array.prototype.indexOf so we don't clobber any existing polyfills - this is a really simple alternative)
    function inArray(arr, item) {
        var i, len;
        for (i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                return true;
            }
        }
        return false;
    }

    // Move the caret to the index position specified. Assumes that the element has focus
    function moveCaret(elem, index) {
        var range;
        if (elem.createTextRange) {
            range = elem.createTextRange();
            range.move("character", index);
            range.select();
        } else if (elem.selectionStart) {
            elem.focus();
            elem.setSelectionRange(index, index);
        }
    }

    // Attempt to change the type property of an input element
    function changeType(elem, type) {
        try {
            elem.type = type;
            return true;
        } catch (e) {
            // You can't change input type in IE8 and below
            return false;
        }
    }

    // Expose public methods
    global.Placeholders = {
        Utils: {
            addEventListener: addEventListener,
            inArray: inArray,
            moveCaret: moveCaret,
            changeType: changeType
        }
    };

}(this));

(function (global) {

    "use strict";

    var validTypes = [
            "text",
            "search",
            "url",
            "tel",
            "email",
            "password",
            "number",
            "textarea"
        ],

    // The list of keycodes that are not allowed when the polyfill is configured to hide-on-input
        badKeys = [

            // The following keys all cause the caret to jump to the end of the input value
            27, // Escape
            33, // Page up
            34, // Page down
            35, // End
            36, // Home

            // Arrow keys allow you to move the caret manually, which should be prevented when the placeholder is visible
            37, // Left
            38, // Up
            39, // Right
            40, // Down

            // The following keys allow you to modify the placeholder text by removing characters, which should be prevented when the placeholder is visible
            8, // Backspace
            46 // Delete
        ],

    // Styling variables
        placeholderStyleColor = "#ccc",
        placeholderClassName = "placeholdersjs",
        classNameRegExp = new RegExp("(?:^|\\s)" + placeholderClassName + "(?!\\S)"),

    // These will hold references to all elements that can be affected. NodeList objects are live, so we only need to get those references once
        inputs, textareas,

    // The various data-* attributes used by the polyfill
        ATTR_CURRENT_VAL = "data-placeholder-value",
        ATTR_ACTIVE = "data-placeholder-active",
        ATTR_INPUT_TYPE = "data-placeholder-type",
        ATTR_FORM_HANDLED = "data-placeholder-submit",
        ATTR_EVENTS_BOUND = "data-placeholder-bound",
        ATTR_OPTION_FOCUS = "data-placeholder-focus",
        ATTR_OPTION_LIVE = "data-placeholder-live",
        ATTR_MAXLENGTH = "data-placeholder-maxlength",

    // Various other variables used throughout the rest of the script
        test = document.createElement("input"),
        head = document.getElementsByTagName("head")[0],
        root = document.documentElement,
        Placeholders = global.Placeholders,
        Utils = Placeholders.Utils,
        hideOnInput, liveUpdates, keydownVal, styleElem, styleRules, placeholder, timer, form, elem, len, i;

    // No-op (used in place of public methods when native support is detected)
    function noop() {}

    // Avoid IE9 activeElement of death when an iframe is used.
    // More info:
    // http://bugs.jquery.com/ticket/13393
    // https://github.com/jquery/jquery/commit/85fc5878b3c6af73f42d61eedf73013e7faae408
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }

    // Hide the placeholder value on a single element. Returns true if the placeholder was hidden and false if it was not (because it wasn't visible in the first place)
    function hidePlaceholder(elem, keydownValue) {
        var type,
            maxLength,
            valueChanged = (!!keydownValue && elem.value !== keydownValue),
            isPlaceholderValue = (elem.value === elem.getAttribute(ATTR_CURRENT_VAL));

        if ((valueChanged || isPlaceholderValue) && elem.getAttribute(ATTR_ACTIVE) === "true") {
            elem.removeAttribute(ATTR_ACTIVE);
            elem.value = elem.value.replace(elem.getAttribute(ATTR_CURRENT_VAL), "");
            elem.className = elem.className.replace(classNameRegExp, "");

            // Restore the maxlength value
            maxLength = elem.getAttribute(ATTR_MAXLENGTH);
            if (parseInt(maxLength, 10) >= 0) { // Old FF returns -1 if attribute not set (see GH-56)
                elem.setAttribute("maxLength", maxLength);
                elem.removeAttribute(ATTR_MAXLENGTH);
            }

            // If the polyfill has changed the type of the element we need to change it back
            type = elem.getAttribute(ATTR_INPUT_TYPE);
            if (type) {
                elem.type = type;
            }
            return true;
        }
        return false;
    }

    // Show the placeholder value on a single element. Returns true if the placeholder was shown and false if it was not (because it was already visible)
    function showPlaceholder(elem) {
        var type,
            maxLength,
            val = elem.getAttribute(ATTR_CURRENT_VAL);
        if (elem.value === "" && val) {
            elem.setAttribute(ATTR_ACTIVE, "true");
            elem.value = val;
            elem.className += " " + placeholderClassName;

            // Store and remove the maxlength value
            maxLength = elem.getAttribute(ATTR_MAXLENGTH);
            if (!maxLength) {
                elem.setAttribute(ATTR_MAXLENGTH, elem.maxLength);
                elem.removeAttribute("maxLength");
            }

            // If the type of element needs to change, change it (e.g. password inputs)
            type = elem.getAttribute(ATTR_INPUT_TYPE);
            if (type) {
                elem.type = "text";
            } else if (elem.type === "password") {
                if (Utils.changeType(elem, "text")) {
                    elem.setAttribute(ATTR_INPUT_TYPE, "password");
                }
            }
            return true;
        }
        return false;
    }

    function handleElem(node, callback) {

        var handleInputsLength, handleTextareasLength, handleInputs, handleTextareas, elem, len, i;

        // Check if the passed in node is an input/textarea (in which case it can't have any affected descendants)
        if (node && node.getAttribute(ATTR_CURRENT_VAL)) {
            callback(node);
        } else {

            // If an element was passed in, get all affected descendants. Otherwise, get all affected elements in document
            handleInputs = node ? node.getElementsByTagName("input") : inputs;
            handleTextareas = node ? node.getElementsByTagName("textarea") : textareas;

            handleInputsLength = handleInputs ? handleInputs.length : 0;
            handleTextareasLength = handleTextareas ? handleTextareas.length : 0;

            // Run the callback for each element
            for (i = 0, len = handleInputsLength + handleTextareasLength; i < len; i++) {
                elem = i < handleInputsLength ? handleInputs[i] : handleTextareas[i - handleInputsLength];
                callback(elem);
            }
        }
    }

    // Return all affected elements to their normal state (remove placeholder value if present)
    function disablePlaceholders(node) {
        handleElem(node, hidePlaceholder);
    }

    // Show the placeholder value on all appropriate elements
    function enablePlaceholders(node) {
        handleElem(node, showPlaceholder);
    }

    // Returns a function that is used as a focus event handler
    function makeFocusHandler(elem) {
        return function () {

            // Only hide the placeholder value if the (default) hide-on-focus behaviour is enabled
            if (hideOnInput && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && elem.getAttribute(ATTR_ACTIVE) === "true") {

                // Move the caret to the start of the input (this mimics the behaviour of all browsers that do not hide the placeholder on focus)
                Utils.moveCaret(elem, 0);

            } else {

                // Remove the placeholder
                hidePlaceholder(elem);
            }
        };
    }

    // Returns a function that is used as a blur event handler
    function makeBlurHandler(elem) {
        return function () {
            showPlaceholder(elem);
        };
    }

    // Functions that are used as a event handlers when the hide-on-input behaviour has been activated - very basic implementation of the "input" event
    function makeKeydownHandler(elem) {
        return function (e) {
            keydownVal = elem.value;

            //Prevent the use of the arrow keys (try to keep the cursor before the placeholder)
            if (elem.getAttribute(ATTR_ACTIVE) === "true") {
                if (keydownVal === elem.getAttribute(ATTR_CURRENT_VAL) && Utils.inArray(badKeys, e.keyCode)) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    return false;
                }
            }
        };
    }
    function makeKeyupHandler(elem) {
        return function () {
            hidePlaceholder(elem, keydownVal);

            // If the element is now empty we need to show the placeholder
            if (elem.value === "") {
                elem.blur();
                Utils.moveCaret(elem, 0);
            }
        };
    }
    function makeClickHandler(elem) {
        return function () {
            if (elem === safeActiveElement() && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && elem.getAttribute(ATTR_ACTIVE) === "true") {
                Utils.moveCaret(elem, 0);
            }
        };
    }

    // Returns a function that is used as a submit event handler on form elements that have children affected by this polyfill
    function makeSubmitHandler(form) {
        return function () {

            // Turn off placeholders on all appropriate descendant elements
            disablePlaceholders(form);
        };
    }

    // Bind event handlers to an element that we need to affect with the polyfill
    function newElement(elem) {

        // If the element is part of a form, make sure the placeholder string is not submitted as a value
        if (elem.form) {
            form = elem.form;

            // If the type of the property is a string then we have a "form" attribute and need to get the real form
            if (typeof form === "string") {
                form = document.getElementById(form);
            }

            // Set a flag on the form so we know it's been handled (forms can contain multiple inputs)
            if (!form.getAttribute(ATTR_FORM_HANDLED)) {
                Utils.addEventListener(form, "submit", makeSubmitHandler(form));
                form.setAttribute(ATTR_FORM_HANDLED, "true");
            }
        }

        // Bind event handlers to the element so we can hide/show the placeholder as appropriate
        Utils.addEventListener(elem, "focus", makeFocusHandler(elem));
        Utils.addEventListener(elem, "blur", makeBlurHandler(elem));

        // If the placeholder should hide on input rather than on focus we need additional event handlers
        if (hideOnInput) {
            Utils.addEventListener(elem, "keydown", makeKeydownHandler(elem));
            Utils.addEventListener(elem, "keyup", makeKeyupHandler(elem));
            Utils.addEventListener(elem, "click", makeClickHandler(elem));
        }

        // Remember that we've bound event handlers to this element
        elem.setAttribute(ATTR_EVENTS_BOUND, "true");
        elem.setAttribute(ATTR_CURRENT_VAL, placeholder);

        // If the element doesn't have a value and is not focussed, set it to the placeholder string
        if (hideOnInput || elem !== safeActiveElement()) {
            showPlaceholder(elem);
        }
    }

    Placeholders.nativeSupport = test.placeholder !== void 0;

    if (!Placeholders.nativeSupport) {

        // Get references to all the input and textarea elements currently in the DOM (live NodeList objects to we only need to do this once)
        inputs = document.getElementsByTagName("input");
        textareas = document.getElementsByTagName("textarea");

        // Get any settings declared as data-* attributes on the root element (currently the only options are whether to hide the placeholder on focus or input and whether to auto-update)
        hideOnInput = root.getAttribute(ATTR_OPTION_FOCUS) === "false";
        liveUpdates = root.getAttribute(ATTR_OPTION_LIVE) !== "false";

        // Create style element for placeholder styles (instead of directly setting style properties on elements - allows for better flexibility alongside user-defined styles)
        styleElem = document.createElement("style");
        styleElem.type = "text/css";

        // Create style rules as text node
        styleRules = document.createTextNode("." + placeholderClassName + " { color:" + placeholderStyleColor + "; }");

        // Append style rules to newly created stylesheet
        if (styleElem.styleSheet) {
            styleElem.styleSheet.cssText = styleRules.nodeValue;
        } else {
            styleElem.appendChild(styleRules);
        }

        // Prepend new style element to the head (before any existing stylesheets, so user-defined rules take precedence)
        head.insertBefore(styleElem, head.firstChild);

        // Set up the placeholders
        for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
            elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

            // Get the value of the placeholder attribute, if any. IE10 emulating IE7 fails with getAttribute, hence the use of the attributes node
            placeholder = elem.attributes.placeholder;
            if (placeholder) {

                // IE returns an empty object instead of undefined if the attribute is not present
                placeholder = placeholder.nodeValue;

                // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
                if (placeholder && Utils.inArray(validTypes, elem.type)) {
                    newElement(elem);
                }
            }
        }

        // If enabled, the polyfill will repeatedly check for changed/added elements and apply to those as well
        timer = setInterval(function () {
            for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
                elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

                // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
                placeholder = elem.attributes.placeholder;
                if (placeholder) {
                    placeholder = placeholder.nodeValue;
                    if (placeholder && Utils.inArray(validTypes, elem.type)) {

                        // If the element hasn't had event handlers bound to it then add them
                        if (!elem.getAttribute(ATTR_EVENTS_BOUND)) {
                            newElement(elem);
                        }

                        // If the placeholder value has changed or not been initialised yet we need to update the display
                        if (placeholder !== elem.getAttribute(ATTR_CURRENT_VAL) || (elem.type === "password" && !elem.getAttribute(ATTR_INPUT_TYPE))) {

                            // Attempt to change the type of password inputs (fails in IE < 9)
                            if (elem.type === "password" && !elem.getAttribute(ATTR_INPUT_TYPE) && Utils.changeType(elem, "text")) {
                                elem.setAttribute(ATTR_INPUT_TYPE, "password");
                            }

                            // If the placeholder value has changed and the placeholder is currently on display we need to change it
                            if (elem.value === elem.getAttribute(ATTR_CURRENT_VAL)) {
                                elem.value = placeholder;
                            }

                            // Keep a reference to the current placeholder value in case it changes via another script
                            elem.setAttribute(ATTR_CURRENT_VAL, placeholder);
                        }
                    }
                } else if (elem.getAttribute(ATTR_ACTIVE)) {
                    hidePlaceholder(elem);
                    elem.removeAttribute(ATTR_CURRENT_VAL);
                }
            }

            // If live updates are not enabled cancel the timer
            if (!liveUpdates) {
                clearInterval(timer);
            }
        }, 100);
    }

    Utils.addEventListener(global, "beforeunload", function () {
        Placeholders.disable();
    });

    // Expose public methods
    Placeholders.disable = Placeholders.nativeSupport ? noop : disablePlaceholders;
    Placeholders.enable = Placeholders.nativeSupport ? noop : enablePlaceholders;

}(this));
/* Respond.js: min/max-width media query polyfill. (c) Scott Jehl. MIT Lic. j.mp/respondjs  */
(function( w ){

    "use strict";

    //exposed namespace
    var respond = {};
    w.respond = respond;

    //define update even in native-mq-supporting browsers, to avoid errors
    respond.update = function(){};

    //define ajax obj
    var requestQueue = [],
        xmlHttp = (function() {
            var xmlhttpmethod = false;
            try {
                xmlhttpmethod = new w.XMLHttpRequest();
            }
            catch( e ){
                xmlhttpmethod = new w.ActiveXObject( "Microsoft.XMLHTTP" );
            }
            return function(){
                return xmlhttpmethod;
            };
        })(),

    //tweaked Ajax functions from Quirksmode
        ajax = function( url, callback ) {
            var req = xmlHttp();
            if (!req){
                return;
            }
            req.open( "GET", url, true );
            req.onreadystatechange = function () {
                if ( req.readyState !== 4 || req.status !== 200 && req.status !== 304 ){
                    return;
                }
                callback( req.responseText );
            };
            if ( req.readyState === 4 ){
                return;
            }
            req.send( null );
        },
        isUnsupportedMediaQuery = function( query ) {
            return query.replace( respond.regex.minmaxwh, '' ).match( respond.regex.other );
        };

    //expose for testing
    respond.ajax = ajax;
    respond.queue = requestQueue;
    respond.unsupportedmq = isUnsupportedMediaQuery;
    respond.regex = {
        media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
        keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
        comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
        urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
        findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
        only: /(only\s+)?([a-zA-Z]+)\s?/,
        minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
        other: /\([^\)]*\)/g
    };

    //expose media query support flag for external use
    respond.mediaQueriesSupported = w.matchMedia && w.matchMedia( "only all" ) !== null && w.matchMedia( "only all" ).matches;

    //if media queries are supported, exit here
    if( respond.mediaQueriesSupported ){
        return;
    }

    //define vars
    var doc = w.document,
        docElem = doc.documentElement,
        mediastyles = [],
        rules = [],
        appendedEls = [],
        parsedSheets = {},
        resizeThrottle = 30,
        head = doc.getElementsByTagName( "head" )[0] || docElem,
        base = doc.getElementsByTagName( "base" )[0],
        links = head.getElementsByTagName( "link" ),

        lastCall,
        resizeDefer,

    //cached container for 1em value, populated the first time it's needed
        eminpx,

    // returns the value of 1em in pixels
        getEmValue = function() {
            var ret,
                div = doc.createElement('div'),
                body = doc.body,
                originalHTMLFontSize = docElem.style.fontSize,
                originalBodyFontSize = body && body.style.fontSize,
                fakeUsed = false;

            div.style.cssText = "position:absolute;font-size:1em;width:1em";

            if( !body ){
                body = fakeUsed = doc.createElement( "body" );
                body.style.background = "none";
            }

            // 1em in a media query is the value of the default font size of the browser
            // reset docElem and body to ensure the correct value is returned
            docElem.style.fontSize = "100%";
            body.style.fontSize = "100%";

            body.appendChild( div );

            if( fakeUsed ){
                docElem.insertBefore( body, docElem.firstChild );
            }

            ret = div.offsetWidth;

            if( fakeUsed ){
                docElem.removeChild( body );
            }
            else {
                body.removeChild( div );
            }

            // restore the original values
            docElem.style.fontSize = originalHTMLFontSize;
            if( originalBodyFontSize ) {
                body.style.fontSize = originalBodyFontSize;
            }


            //also update eminpx before returning
            ret = eminpx = parseFloat(ret);

            return ret;
        },

    //enable/disable styles
        applyMedia = function( fromResize ){
            var name = "clientWidth",
                docElemProp = docElem[ name ],
                currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[ name ] || docElemProp,
                styleBlocks	= {},
                lastLink = links[ links.length-1 ],
                now = (new Date()).getTime();

            //throttle resize calls
            if( fromResize && lastCall && now - lastCall < resizeThrottle ){
                w.clearTimeout( resizeDefer );
                resizeDefer = w.setTimeout( applyMedia, resizeThrottle );
                return;
            }
            else {
                lastCall = now;
            }

            for( var i in mediastyles ){
                if( mediastyles.hasOwnProperty( i ) ){
                    var thisstyle = mediastyles[ i ],
                        min = thisstyle.minw,
                        max = thisstyle.maxw,
                        minnull = min === null,
                        maxnull = max === null,
                        em = "em";

                    if( !!min ){
                        min = parseFloat( min ) * ( min.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
                    }
                    if( !!max ){
                        max = parseFloat( max ) * ( max.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
                    }

                    // if there's no media query at all (the () part), or min or max is not null, and if either is present, they're true
                    if( !thisstyle.hasquery || ( !minnull || !maxnull ) && ( minnull || currWidth >= min ) && ( maxnull || currWidth <= max ) ){
                        if( !styleBlocks[ thisstyle.media ] ){
                            styleBlocks[ thisstyle.media ] = [];
                        }
                        styleBlocks[ thisstyle.media ].push( rules[ thisstyle.rules ] );
                    }
                }
            }

            //remove any existing respond style element(s)
            for( var j in appendedEls ){
                if( appendedEls.hasOwnProperty( j ) ){
                    if( appendedEls[ j ] && appendedEls[ j ].parentNode === head ){
                        head.removeChild( appendedEls[ j ] );
                    }
                }
            }
            appendedEls.length = 0;

            //inject active styles, grouped by media type
            for( var k in styleBlocks ){
                if( styleBlocks.hasOwnProperty( k ) ){
                    var ss = doc.createElement( "style" ),
                        css = styleBlocks[ k ].join( "\n" );

                    ss.type = "text/css";
                    ss.media = k;

                    //originally, ss was appended to a documentFragment and sheets were appended in bulk.
                    //this caused crashes in IE in a number of circumstances, such as when the HTML element had a bg image set, so appending beforehand seems best. Thanks to @dvelyk for the initial research on this one!
                    head.insertBefore( ss, lastLink.nextSibling );

                    if ( ss.styleSheet ){
                        ss.styleSheet.cssText = css;
                    }
                    else {
                        ss.appendChild( doc.createTextNode( css ) );
                    }

                    //push to appendedEls to track for later removal
                    appendedEls.push( ss );
                }
            }
        },
    //find media blocks in css text, convert to style blocks
        translate = function( styles, href, media ){
            var qs = styles.replace( respond.regex.comments, '' )
                    .replace( respond.regex.keyframes, '' )
                    .match( respond.regex.media ),
                ql = qs && qs.length || 0;

            //try to get CSS path
            href = href.substring( 0, href.lastIndexOf( "/" ) );

            var repUrls = function( css ){
                    return css.replace( respond.regex.urls, "$1" + href + "$2$3" );
                },
                useMedia = !ql && media;

            //if path exists, tack on trailing slash
            if( href.length ){ href += "/"; }

            //if no internal queries exist, but media attr does, use that
            //note: this currently lacks support for situations where a media attr is specified on a link AND
            //its associated stylesheet has internal CSS media queries.
            //In those cases, the media attribute will currently be ignored.
            if( useMedia ){
                ql = 1;
            }

            for( var i = 0; i < ql; i++ ){
                var fullq, thisq, eachq, eql;

                //media attr
                if( useMedia ){
                    fullq = media;
                    rules.push( repUrls( styles ) );
                }
                //parse for styles
                else{
                    fullq = qs[ i ].match( respond.regex.findStyles ) && RegExp.$1;
                    rules.push( RegExp.$2 && repUrls( RegExp.$2 ) );
                }

                eachq = fullq.split( "," );
                eql = eachq.length;

                for( var j = 0; j < eql; j++ ){
                    thisq = eachq[ j ];

                    if( isUnsupportedMediaQuery( thisq ) ) {
                        continue;
                    }

                    mediastyles.push( {
                        media : thisq.split( "(" )[ 0 ].match( respond.regex.only ) && RegExp.$2 || "all",
                        rules : rules.length - 1,
                        hasquery : thisq.indexOf("(") > -1,
                        minw : thisq.match( respond.regex.minw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" ),
                        maxw : thisq.match( respond.regex.maxw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" )
                    } );
                }
            }

            applyMedia();
        },

    //recurse through request queue, get css text
        makeRequests = function(){
            if( requestQueue.length ){
                var thisRequest = requestQueue.shift();

                ajax( thisRequest.href, function( styles ){
                    translate( styles, thisRequest.href, thisRequest.media );
                    parsedSheets[ thisRequest.href ] = true;

                    // by wrapping recursive function call in setTimeout
                    // we prevent "Stack overflow" error in IE7
                    w.setTimeout(function(){ makeRequests(); },0);
                } );
            }
        },

    //loop stylesheets, send text content to translate
        ripCSS = function(){

            for( var i = 0; i < links.length; i++ ){
                var sheet = links[ i ],
                    href = sheet.href,
                    media = sheet.media,
                    isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";

                //only links plz and prevent re-parsing
                if( !!href && isCSS && !parsedSheets[ href ] ){
                    // selectivizr exposes css through the rawCssText expando
                    if (sheet.styleSheet && sheet.styleSheet.rawCssText) {
                        translate( sheet.styleSheet.rawCssText, href, media );
                        parsedSheets[ href ] = true;
                    } else {
                        if( (!/^([a-zA-Z:]*\/\/)/.test( href ) && !base) ||
                            href.replace( RegExp.$1, "" ).split( "/" )[0] === w.location.host ){
                            // IE7 doesn't handle urls that start with '//' for ajax request
                            // manually add in the protocol
                            if ( href.substring(0,2) === "//" ) { href = w.location.protocol + href; }
                            requestQueue.push( {
                                href: href,
                                media: media
                            } );
                        }
                    }
                }
            }
            makeRequests();
        };

    //translate CSS
    ripCSS();

    //expose update for re-running respond later on
    respond.update = ripCSS;

    //expose getEmValue
    respond.getEmValue = getEmValue;

    //adjust on resize
    function callMedia(){
        applyMedia( true );
    }

    if( w.addEventListener ){
        w.addEventListener( "resize", callMedia, false );
    }
    else if( w.attachEvent ){
        w.attachEvent( "onresize", callMedia );
    }
})(this);
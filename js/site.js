/* Restyle Convergence Form Modules using Bootstrap */
$(document).ready(function() {
	$('.form-horizontal .control-group, .form-comments .control-group').addClass('form-group');
	$('.form-group select, .form-group textarea, .form-group input').addClass('form-control');
	$('.comments, .field.field-tags').addClass('well');

	//Add Bootstrap Dropdowns to Nav
	$('.nav li.has-children ul.child-menu').each(function() {
		var copyThis = $(this).siblings('a');
		copyThis.removeClass('active');
		var copyClass = copyThis.attr('class');		
		$(this).parent().addClass('dropdown');
		$(this).addClass('dropdown-menu');
		copyThis.clone().prependTo(this).wrap('<li class="'+copyClass+'"><li>');
		$(this).siblings().attr('data-toggle', 'dropdown');
		/*Remove the following line to remove the arrows next to dropdown menus*/
		$(this).siblings().append('<span class="caret"></span>');
	});
	//Add Level 3 Dropdowns to Nav
	$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(e) {
		e.preventDefault(); 
		e.stopPropagation(); 
		$('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
		$(this).parent().addClass('open');

		var menu = $(this).parent().find("ul");
		var menupos = $(menu).offset();

		if (menupos.left + menu.width() > $(window).width()) {
			var newpos = -$(menu).width();
			menu.css({ left: newpos });    
		} else {
			var newpos = $(this).parent().width();
			menu.css({ left: newpos });
		}
	});
});

/* 
* Convergence Accordion Widget v1.1
* Copyright 2013-2014 Nate Cornelius - http://natecornelius.com | http://holeintheroof.com
*/
$(document).ready(function() {  
	$('.accordion-widget').each(function(){
		var $title = $(this).find('.accordion-title .article-title a');
		var $content = $(this).find('.accordion-body');
		var $link = $title.attr('href');
		$title.attr('href','#'+$link);

		$title.click(function(e){
			e.preventDefault();
			if ($(this).parents('.accordion-widget').hasClass('collapsed')){
				$(this).parents('.accordion-widget').removeClass('collapsed').addClass('expanded');		  
			}
			else if ($(this).parents('.accordion-widget').hasClass('expanded')){
				$(this).parents('.accordion-widget').removeClass('expanded').addClass('collapsed');		  
			}
			$content.not(':animated').slideToggle();
			$('html,body').stop().animate({scrollTop: $content.siblings('.accordion-title').offset().top}, 400, function() { 
				location.hash = $link.replace('#',''); 
			});
		});
	});
});

/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function($){

	"use strict";

	$.fn.fitVids = function( options ) {
		var settings = {
			customSelector: null
		};

		if(!document.getElementById('fit-vids-style')) {

			var div = document.createElement('div'),
				ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

			div.className = 'fit-vids-style';
			div.id = 'fit-vids-style';
			div.style.display = 'none';
			div.innerHTML = '&shy;<style>         \
.fluid-width-video-wrapper {        \
width: 100%;                     \
position: relative;              \
padding: 0;                      \
}                                   \
\
.fluid-width-video-wrapper iframe,  \
.fluid-width-video-wrapper object,  \
.fluid-width-video-wrapper embed {  \
position: absolute;              \
top: 0;                          \
left: 0;                         \
width: 100%;                     \
height: 100%;                    \
}                                   \
</style>';

			ref.parentNode.insertBefore(div,ref);

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

			var $allVideos = $(this).find(selectors.join(','));
			$allVideos = $allVideos.not("object object"); // SwfObj conflict patch

			$allVideos.each(function(){
				var $this = $(this);
				if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
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
})( jQuery );


$(document).ready(function(){
	// fit those vids
	$(".bit-text").fitVids({ customSelector: "iframe[src^='http://www.screenr.com']"});
});
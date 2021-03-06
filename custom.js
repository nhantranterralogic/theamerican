//////////////////
/// INIT VARIABLES ....
////////////////

var url = window.location.href.indexOf('#') > -1 ? window.location.href.substring(0, window.location.href.indexOf('#')) : window.location.href;
url = url.indexOf('/?clienttype=smartdevice') > -1 ? url.replace('/?clienttype=smartdevice', '') : url; // use check mobile on desktop
url = url.indexOf('?clienttype=smartdevice') > -1 ? url.replace('?clienttype=smartdevice', '') : url; // use check mobile on desktop
var GLOBALDATA = ''; // get all data of the page with JSON format

var AMERICAN = {
     initData: function () {
        $.ajax({
                url: url + '?clienttype=container.json',
                async: false //make blocking I/O
            })
            .fail(function (err) {
                console.log(err);
            })
            .done(function (result) {
                GLOBALDATA = result.features;
            });
    },
    /*giang.nguyen*/
    siteWideElements: {
        navigationbar: function(){
            var isSearch = false;
            // edit home icon
            var $homelink = $wn('#WNColsAll > div:nth-child(1) > section > nav > a');
            var href = $homelink.attr('href');
            var $anthorNav = $wn('#WNColsAll > div:nth-child(1) > section > nav > div:nth-child(2)').clone();
            $anthorNav.find('> nav').remove();
            $anthorNav.find(' > a').attr('href', href).text('');
            $anthorNav.addClass('home');
            $homelink.replaceWith($anthorNav);
            $wn('#WNColsAll > div:nth-child(1) > section > nav').css('display', 'table');
            // init
            var posBrading = 0;
                posBrading = $wn('#WNColsAll > div:nth-child(1) > section.nav.wn-bg-page-nav').position().top;

            var pos = $wn(document).scrollTop();
            if (pos > posBrading) {
                $wn('#WNColsAll > div:nth-child(1) > section.nav.wn-bg-page-nav').addClass('fixed-nav');
            } else {
                $wn('#WNColsAll > div:nth-child(1) > section.nav.wn-bg-page-nav').removeClass('fixed-nav');
            }
            $wn(document).scroll(function (event) {
                var pos = $wn(document).scrollTop();
                if (pos > posBrading) {
                    $wn('#WNColsAll > div:nth-child(1) > section.nav.wn-bg-page-nav').addClass('fixed-nav');
                } else {
                    $wn('#WNColsAll > div:nth-child(1) > section.nav.wn-bg-page-nav').removeClass('fixed-nav');
                }
            });
            $wn('#WNColsAll > div:nth-child(1) > section > nav > div > a').addClass('custom');
            // select active nav item 
            var idPage = wng_pageInfo.containerId;
            $wn('#WNColsAll > div:nth-child(1) > section > nav > div.menu-cont').each(function(){
                var currentId = $wn(this).find('> a').attr('href');
                if ( currentId.indexOf( '/' + idPage ) > -1 ){
                    $wn(this).addClass('active');
                }
            });
            // insdert the search function
            var html = '<div class="menu-cont search" style="width: 50px; height: 42px;">'+
                '<form class="search" action="/search" method="get">'+
                '<input type="hidden" name="vendor" value="ez"><input class="text" type="text" name="qu" size="10" value="" placeholder="Search">'+
                '<button class="submit wn-accent-a" type="submit">Go</button></form></div>';
            $wn('#WNColsAll > div:nth-child(1) > section.nav.wn-bg-page-nav > nav').append(html);
            // events 
            $wn('.menu-cont.search').click(function(e){
                if( !isSearch ){
                    $wn('#WNColsAll > div:nth-child(1) > section > nav > div > form').css('display', 'block');
                    isSearch = true;
                }else if ( e.target.nodeName != 'INPUT' ){
                    $wn('#WNColsAll > div:nth-child(1) > section > nav > div > form').css('display', 'none');
                    isSearch = false;
                }
            })
            // // remove event search
            // $wn(window).click(function (e) {
            //     if ( (e.target.className.indexOf("menu-cont search") < 0 && e.target.nodeName != 'INPUT' && isSearch) ||
            //          ( isClick && e.target.className.indexOf("menu-cont search") > -1 ) ) {
            //         $wn('#WNColsAll > div:nth-child(1) > section > nav > div.menu-cont.search > form').hide();
            //         isSearch = false;
            //         isClick = false;
            //     }
            // });
            // remove old background
            $wn('#WNAffRFDTV > img:first').remove();
            // remove VIDEO UB if this not removed
            if ($wn('#WNDS70 > div > .wnDVUtilityBlock').length) {
                $wn('#WNDS70 .wnDVUtilityBlock').css('visibility', 'hidden');
            }
            $wn('#WNBrandingImage').appendTo('.countdown').css({
                'position': 'absolute',
                'left': '335px',
                'top': '-45px'
            });

            $wn('#WNColsAll section nav .menu-cont:nth-child(9)').insertAfter('#WNColsAll section nav .menu-cont.home');

        },
        footer: function(){
            $wn('#WNCopyright > table').remove();
            // clone top nav to bottom nav 
            var $nav = $wn('#WNColsAll > div:nth-child(1) > section').clone();
            $nav.find('nav.simple-a.sub').remove();
            $wn('#WNCopyright').html($nav);
            $wn('#WNCopyright > section').removeClass('fixed-nav');
            $wn('#WNCopyright > section > nav > div.menu-cont').removeClass('active');
            $wn('#WNCopyright > section > nav > div.menu-cont.search').remove();
            // edit footer information
            var html = '<section class="footer wn-bg-page-worldnow"><footer class="worldnow row wn-accent-a"><p>All content © Copyright 2000 - 2016 <a href="http://www.worldnow.com" target="_new">Frankly Media</a> and <span class="clientname" data-brandname="" data-clientname="The American"></span>. All Rights Reserved. For more information on this site, please read our <a href="/story/22901104/privacy-policy">Privacy Policy</a>, <a href="/category/267767/terms-of-use">Terms of Service</a>, and <a target="policy" href="/category/304378/press-the-american">Press</a>.</p></footer></section>';
            $wn('#WNCopyright').append(html);

        }
    },

    /*nhan.tran*/
    topStory: function () {
        $wn('#csTsr > div.csTsrLinks').remove();
        $wn('#csTsr > div.csTsrStage').addClass('TSAStage');
        $wn('.TSAStage').css({
            'position': 'relative'
        });
        $wn('#WNTopStoryWrap #csTsr .TSAStage .csSlide').each(function(){
            $wn(this).width(650).height(366);
            var headline = $wn(this).find('.csTsrBottom h4 a').text();
            $wn(this).attr('title', headline);
            $wn(this).find('.csTsrBottom').addClass('csTsrBottomNew');
            var thumbnailURL = $wn(this).find('.csTsrTop a img').attr('src');
            $wn(this).css('background', 'url(' + thumbnailURL + ')');
            $wn(this).find('.csTsrTop a img').remove();
            $wn(this).find('.csTsrBottom h4 a').css({
                'padding': '10px 5px 0px 15px',
                'display': 'block'
            });
        });

        var currentIndex = 0;
        var indexDisplay = currentIndex + 1;
        var length = $wn('#WNTopStoryWrap #csTsr .TSAStage .csSlide').length;

        var slider = '<span id="counterindex"><button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style="display: block;">Previous</button><div class="slick-counter">'+ indexDisplay + ' / ' + length +'</div><button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style="display: block;">Next</button></span>';

        $wn('#csTsr').append(slider);

        $wn('#csTsr .slick-arrow.slick-next').click(function(){
            $(this).css('opacity', '0.4');
            if (currentIndex == length - 1) {
                currentIndex = length - 1;
            } else {
                currentIndex = currentIndex + 1;
            }

            var indexDisplay = currentIndex + 1;
            $wn('#csTsr #counterindex .slick-counter').text(indexDisplay + ' / ' + length);

            $wn('#WNTopStoryWrap #csTsr .TSAStage .csSlide').each(function(index){
                if (index == currentIndex) {
                    $wn(this).fadeIn('fast');
                } else {
                    $wn(this).hide();
                }
            });

            $(this).css('opacity', '1');

        });

        $wn('#csTsr .slick-arrow.slick-prev').click(function(){
            if (currentIndex == 0) {
                currentIndex = 0;
            } else {
                currentIndex = currentIndex - 1;
            }

            var indexDisplay = currentIndex + 1;
            $wn('#csTsr #counterindex .slick-counter').text(indexDisplay + ' / ' + length);

            $wn('#WNTopStoryWrap #csTsr .TSAStage .csSlide').each(function(index){
                if (index == currentIndex) {
                    $wn(this).fadeIn('fast');
                } else {
                    $wn(this).hide();
                }
            });

        });

    },

    countdown: function(time){

        var deadline = time,
        timeinterval;

        $('#WNBranding').prepend('<div class="countdown"><div class="day"></div><div class="hour"></div><div class="min"></div><div class="sec"></div></div>');

        function getTimeRemaining(endtime){

            var t = Date.parse(endtime) - Date.parse(new Date()),
                s = Math.floor((t/1000)%60),
                m = Math.floor((t/1000/60)%60),
                h = Math.floor((t/(1000*60*60))%24),
                d = Math.floor(t/(1000*60*60*24));

            return {
                't': t,
                'd': d,
                'h': h,
                'm': m,
                's': s
            }
	}

	function initializeClock(cs, endtime){
	  	var $clock = $(cs);

		function updateClock(){
		  var t = getTimeRemaining(endtime);

		  $clock.find('.day').html(('0' + t.d).slice(-2));
		  $clock.find('.hour').html(('0' + t.h).slice(-2));
		  $clock.find('.min').html(('0' + t.m).slice(-2));
		  $clock.find('.sec').html(('0' + t.s).slice(-2));

		  if(t.t<=0){
			$clock.find('.day').html('');
			$clock.find('.hour').html('');
			$clock.find('.min').html('');
			$clock.find('.sec').html('');
		    clearInterval(timeinterval);
		  }
		}
		updateClock();
		var timeinterval = setInterval(updateClock,1000);

	}	
	
	initializeClock('.countdown', deadline);

	return;
  },

  socialTool: function() {
      var tools = '<li class="tools"><ul id="CDEV-branding-social-icons" class="cdev-branding-social-icons"><li class="facebook"><a href="https://www.facebook.com/RFDTVTheAMERICAN" aria-label="Facebook" target="_blank"><i class="fa fa-facebook fa-fw" aria-hidden="true"></i></a></li><li class="twitter"><a href="https://twitter.com/RFDTVAmerican" aria-label="twitter" target="_blank"><i class="fa fa-twitter fa-fw" aria-hidden="true"></i></a></li><li class="youtube"><a href="https://www.youtube.com/user/RFDTVnetwork" aria-label="Youtube" target="_blank"><i class="fa fa-youtube fa-fw" aria-hidden="true"></i></a></li><li class="rss"><a href="/?clienttype=rss" aria-label="RSS" target="_blank"><i class="fa fa-rss fa-fw" aria-hidden="true"></i></a></li><li class="contact"><a href="mailto:Events@rfdtv.com" aria-label="Contact Us"><i class="fa fa-envelope fa-fw" aria-hidden="true"></i></a></li></ul><a class="cdev-back" href="http://www.rfdtv.com">Back to RFDTV.COM</a><ul class="membercenter inline wnMemberCenter wnMemberCenter-loggedOut" refresh="1"></ul></li>';

      $wn(tools).appendTo('#WNBranding');
  },

  headlineBox2B: function() {
        $('#DisplaySizeId-4 > ul > li').unwrap();

        $('#DisplaySizeId-4 > li:gt(8)').remove();

        var element = $("#DisplaySizeId-4 > li:gt(0)");
        for(var i = 0; i < element.length; i+=3) {
            element.slice(i, i+3).wrapAll("<div class='grid-row'></div>");
        }

  }
}


/* attack functions */
/**
 * When body is starting to render
 * 1. Hide original/in-build content
 * 2. Pre-populate data for rendering when body rendering is done
 */
Worldnow.EventMan.event('bodystart', function () {
    AMERICAN.initData();
   /* giang.nguyen */

   /*nhan.tran*/

});


$("body").load(function(){
    AMERICAN.initData();
});

/**
 * col4 is ready to serve
 */
Worldnow.EventMan.event('WNCol4done', function () {
   /* giang.nguyen */

   /*nhan.tran*/
   
});

/**
 * Col23 is ready to serve
 */
Worldnow.EventMan.event('wncol23done', function () {
   /* giang.nguyen */
   
   /*nhan.tran*/
});

/**
 * Body is done
 * 1. Show custom/populated data
 */
Worldnow.EventMan.event('bodydone', function () {
    /* giang.nguyen */

   /*nhan.tran*/
    AMERICAN.topStory();
});
window.onload = function () {
    /* giang.nguyen */

   /*nhan.tran*/
   
}

/**
 * Populate data when document is ready
 */
Worldnow.EventMan.event('documentready', function () {
    /* giang.nguyen */
    
   /*nhan.tran*/
   
});

$(window).load(function () {
 /* giang.nguyen */
 // cannot get at the documentready, bodyready.....
AMERICAN.countdown('2017/02/19 00:00:00 GMT-0600');
AMERICAN.siteWideElements.navigationbar();
AMERICAN.socialTool();
AMERICAN.siteWideElements.footer();


/*nhan.tran*/
   
});

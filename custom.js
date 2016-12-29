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
        }
    }

    /*nhan.tran*/

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
AMERICAN.siteWideElements.navigationbar();

/*nhan.tran*/
   
});

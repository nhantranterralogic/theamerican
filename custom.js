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
    }
    /*giang.nguyen*/

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

/*nhan.tran*/
   
});

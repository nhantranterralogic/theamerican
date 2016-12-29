//////////////////
/// INIT VARIABLES ....
////////////////

var url = window.location.href.indexOf('#') > -1 ? window.location.href.substring(0, window.location.href.indexOf('#')) : window.location.href;
url = url.indexOf('/?clienttype=smartdevice') > -1 ? url.replace('/?clienttype=smartdevice', '') : url; // use check mobile on desktop
url = url.indexOf('?clienttype=smartdevice') > -1 ? url.replace('?clienttype=smartdevice', '') : url; // use check mobile on desktop
var GLOBALDATA = ''; // get all data of the page with JSON format

/* */
var CDEVSupport = {
    msieversion: function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
            return (parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
        } else {
            return '0';
        }
    },

    convertToEDTTimeZone: function (clientDate, timezone) {
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var offset = 0;
        switch (timezone) {
            case 'EST':
                return moment(new Date(clientDate)).utcOffset('-5.0').format('MMM DD, YYYY hh:mm A') + ' EST';
            case 'EDT':
                break;
        }
    },
    // id:
    showLoading: function (id) {
        var loading = '<div class="load-wrapp">' +
            '<div class="load-4">' +
            '<div class="ring-1"></div>' +
            '</div>' +
            '</div>';
        $wn(loading).prependTo($wn('#' + id));
    },
    hideLoading: function () {
        $wn('.load-wrapp').remove();
    },
    extraAd: function (adNum, w, h, $container, method) {

        var newOwnerInfo = $wn.parseJSON('{"' + wng_pageInfo.affiliateName.toLowerCase() + '": {"share":1 }}'),
            $ad = '<div id="WNAd' + adNum + '" class="wnad wnad' + adNum + '"></div>',
            wncc = wng_pageInfo.contentClassification.toLowerCase();

        while (wncc.indexOf(" ") != -1) {
            wncc = wncc.replace(" ", "");
        }

        $container[method]($ad);

        var ad = new Worldnow.Ad({
            id: adNum,
            ownerinfo: newOwnerInfo,
            width: w,
            height: h,
            wncc: wncc,
            type: 'dom',
            application: 'banner',
            parent: 'WNAd' + adNum
        });
        ad.load();
        $wn('#WNTopVideosWrapper').insertAfter($wn('#WNAd146'));
        return;
    },
    /**
     * replace ajax on enviroment Worlnow, and only run on WN
     * @param {[type]} url             [description]
     * @param {[type]} callbacksuccess [description]
     * @param {[type]} callbackerror   [description]
     */
    WNHttpRequestManagerRequest: function (url, callbacksuccess, callbackerror) {
        WNHttpRequestManager.makeRequest(url, {
            onSuccess: function () {
                // var data = $.parseJSON(this.response.responseText);
                callbacksuccess(this.response);
            },
            onError: function (e) {
                console.log('error when call WNHttpRequestManager function.');
                callbackerror(e);
                return;
            }
        });
    },
    /**
     * [description]
     * @param  {[type]} url             [description]
     * @param  {[type]} callbacksuccess [description]
     * @param  {[type]} callbackerror   [description]
     * @return {[type]}                 [description]
     */
    ajaxCall: function (url, callbacksuccess, callbackerror) {
        $.ajax({
            url: url,
            success: function (data) {
                callbacksuccess(data);
            },
            error: function (error) {
                callbackerror(error);
            }
        });
    },
    /**
     * move position of ad copy and remove old AD
     * @param  {Number} idAD        ex: WNAD46 -> idAD = 46
     * @param  {String} idContentAd ex: 246 and must different idAD of WN
     * @param  {String} timeout
     * @param  {String} style    style of jquery assign: append, prependTo, after...
     * @return {String}             no
     */
    moveAds: function (idAD, idADNew, idContentAd, style) {
        if (wng_pageInfo.ads[idAD]) {
            var myad = wng_pageInfo.ads[idAD];
            var ad = wng_pageInfo.ads[idAD];
            ad = null;
            myad.id = idADNew;
            Worldnow.AdMan.attachAd({
                selector: '#' + idContentAd,
                attachStyle: style
            }, myad);
            $wn('#WNAd' + idAD).remove();
        }
    },
    //for generateDataLink to get data from XML
    generateDataLink: function (url) {
        var hashPosition = url.indexOf('#');
        if (hashPosition == -1) {
            return url + '?debug_verbose=XML&frankly-key=MjAxNi0wOS0xNQ==&frankly-email=pmtandhqn@gmail.com&frankly-data=XML';
        } else {
            return url.substring(0, hashPosition) + '?debug_verbose=XML&frankly-key=MjAxNi0wOS0xNQ==&frankly-email=pmtandhqn@gmail.com&frankly-data=XML';
        }
    },
    //for generateDataLink to get data from XML
    generateDataLink: function (url) {
        var hashPosition = url.indexOf('#');
        if (hashPosition == -1) {
            return url + '?debug_verbose=XML&frankly-key=MjAxNi0wOS0xNQ==&frankly-email=pmtandhqn@gmail.com&frankly-data=XML';
        } else {
            return url.substring(0, hashPosition) + '?debug_verbose=XML&frankly-key=MjAxNi0wOS0xNQ==&frankly-email=pmtandhqn@gmail.com&frankly-data=XML';
        }
    },
    escapeRegExp: function (str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    },
    replaceAll: function (str, find, replace) {
        if ((typeof replace == 'undefined') || (replace.trim().length == 0)) {
            return '';
        } else {
            return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
        }
    },
    convertDate: function (e, t, i, a) {
        return t = t || "%MMM% %DD%, %YYYY% %h%:%mm% %AMPM% %tz%",
            1 == a ? new Date(e).customFormat(t, i) : new Date(e).customFormat(t, i)
    },
    // Methods of Story(S)
    // remove_tags: remove HTML's tag in text
    // getStoryAbstractImageJSON: get Abstract Image of S
    // getStoryHeadlineJSON: get headline of S
    // getStoryLinkJSON: get link of S
    // getStoryIDJSON: get ID of S
    // getStoryDateJSON: get time of S
    // getStoryAbstractJSON: get abstract content of specific story
    // getStoryIconClipJSON: check S has clip or not
    // spliceStories: get story list from ID, ....
    // getStoryListTopics
    storySuport: {
        remove_tags: function (html) {
            return jQuery(html).text();
        },
        //get abstractimage of specific story
        getStoryAbstractImageJSON: function (story) {
            //if the story is hasn't have any abtractimage, just use default images
            if ((typeof story.abstractimage == 'undefined') || (story.abstractimage.length == 0)) {
                return 'http://kmir.images.worldnow.com/images/4513961_G.jpg';
            } else {
                return story.abstractimage.filename;
            }
        },
        //get headline of specific story
        getStoryHeadlineJSON: function (story) {
            return story.headline;
        },
        //get hyperlink of specific story
        getStoryLinkJSON: function (story) {
            // var type = story.type;
            // var storyID = story.id;
            // var pageurl = story.seo.pageurl;
            // return '/' + type + '/' + storyID + '/' + pageurl;
            return story.link;
        },
        //get id of specific story
        getStoryIDJSON: function (story) {
            return story.id;
        },
        //get date of specific story
        getStoryDateJSON: function (story) {
            var date;
            //if story has lastediteddate, mean that story has been edited
            if ((typeof story.lastEditedDate !== 'undefined') || (story.lastEditedDate.length > 0)) {
                date = 'Updated: ' + CDEVSupport.convertDate(story.lastEditedDate, '', false);
            } else {
                date = 'Posted: ' + CDEVSupport.convertDate(story.lastEditedDate, '', false);
            }
            return date;
        },
        //get abstract content of specific story
        getStoryAbstractJSON: function (story) {
            // return this.remove_tags(story.abstract);
            return story.abstract;
        },
        //getStory iconClip
        getStoryIconClipJSON: function (story) {
            var hasClip = false;
            if ((typeof story.surfaceable !== 'undefined') && (story.surfaceable[0].type == 'Clip') && (story.surfaceable[0].status == 'L')) {
                hasClip = true;
            }

            return hasClip;
        },
        getStoryUpdatedTimeJSON: function (story) {
            return story.updatedDate;
        },
        /*======================================================================================================
         *
         * SPLICES STORIES IN ARRAY WITH MATCHED DISPLAYSIZE, FROM BEGININDEX, WITH NUMBER STORIES IN DATA PARAMS
         *
         *=======================================================================================================*/
        spliceStories: function (displaySize, beginIndex, numerStories, data) {
            var dataDS = [];
            var result = [];
            //CHECK FIRST: if beginIndex param if greater than data length, return empty array now!!
            if (beginIndex > data.length - 1) {
                return result;
            }
            //loop and push all data stories matched this displaySize
            for (var i = 0; i < data.length; i++) {
                if (data[i].displaysize == displaySize) {
                    dataDS.push(data[i]);
                }
            }
            //when beginIndex greater than length of data DISPLAYSIZE input. CANNOT get any result form it
            if (beginIndex > dataDS.length - 1) {
                return result;
            }
            //loop all matched data matched and get avaiable data
            for (var j = beginIndex; j < dataDS.length; j++) {
                result.push(dataDS[j]);
                //if number of result equals number user need or end of array result
                if ((result.length == numerStories) || (j == dataDS.length - 1)) {
                    return result;
                }
            }
        },
        //get all topic in story in push it in a result array
        getStoryListTopics: function (story) {
            var list = [];
            if (typeof story == 'undefined') {
                return list;
            }
            if ((typeof story.topics !== 'undefined') && (story.topics.length > 0)) {
                for (var i = 0; i < story.topics.length; i++) {
                    list.push(story.topics[i].value);
                }
            }
            return list;
        }
    },
    // getCategory: return category with id
    categorySupport: {
        getCategory: function (data, id) {
            var categories = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].displaysize == id && data[i].type == 'category') {
                    categories.push(data[i]);
                }
            }
            return categories;
        }
    },
    getDataByDisplaysizeID: function(listData, id){
      if ( Object.prototype.toString.call( listData ) === '[object Array]'  ){
        var len = listData.length;
        var listResult = [];
        for ( var i = 0; i < len; i++ ){
          if( listData[i].displaysize == id )
            listResult.push(listData[i]);
        }
        return listResult;
      }
      return [];
    }
};
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

/*nhan.tran*/
   
});

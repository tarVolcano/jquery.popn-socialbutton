/*jshint white:false, eqnull:true, immed:false, jquery:true, forin:false */

// Generated by CoffeeScript 1.6.2
/*!
* jQuery POP'n SocialButton v0.1.1
*
* http://github.com/ktty1220/jquery.popn-socialbutton
*
* Copyright (c) 2013 ktty1220 ktty1220@gmail.com
* Licensed under the MIT license
*/
(function(jQuery) {
  'use strict';
  var $;

  $ = jQuery;
  /**
  * Twitter:ツイート数とFacebook:いいね数を取得
  * 参考: http://q.hatena.ne.jp/1320898356
  */

  return $.fn.popnSocialButton = function(services, options) {
    var exOptions, iconSize, popnUp, sName, servicesProp, _addLink, _i, _len,
      _this = this;

    if (options == null) {
      options = {};
    }
    exOptions = $.extend({}, {
      url: location.href,
      text: $('title').html(),
      imgDir: './img',
      buttonSpace: 12,
      countPosition: {
        top: 32,
        right: -12
      },
      countColor: {
        text: '#ffffff',
        bg: '#cc0000',
        textHover: '#ffffff',
        bgHover: '#ff6666',
        border: '#ffffff'
      },
      countSize: 10
    }, options);
    exOptions.urlOrg = exOptions.url;
    exOptions.url = encodeURIComponent(exOptions.url);
    exOptions.text = encodeURIComponent(exOptions.text);
    iconSize = 44;
    popnUp = 4;
    servicesProp = {
      twitter: {
        img: 'twitter_2x.png',
        alt: 'Twitter Share Button',
        shareUrl: "https://twitter.com/share?url=" + exOptions.url + "&text=" + exOptions.text,
        commentUrl: "https://twitter.com/search/?q=" + exOptions.url,
        countUrl: "http://urls.api.twitter.com/1/urls/count.json?url=" + exOptions.url,
        jsonpFunc: function(json) {
          var _ref;

          return (_ref = json.count) != null ? _ref : 0;
        }
      },
      facebook: {
        img: 'facebook_2x.png',
        alt: 'Facebook Share Button',
        shareUrl: "http://www.facebook.com/sharer.php?u=" + exOptions.url + "&t=" + exOptions.text,
        countUrl: "https://graph.facebook.com/" + exOptions.url,
        jsonpFunc: function(json) {
          var _ref;

          return (_ref = json.shares) != null ? _ref : 0;
        }
      },
      hatebu: {
        img: 'hatena_bookmark_2x.png',
        alt: 'Hatena Bookmark Share Button',
        shareUrl: "http://b.hatena.ne.jp/add?mode=confirm&url=" + exOptions.url + "&title=" + exOptions.text + "&mode=confirm",
        commentUrl: "http://b.hatena.ne.jp/entry/" + exOptions.urlOrg,
        countUrl: "http://api.b.st-hatena.com/entry.count?url=" + exOptions.url,
        jsonpFunc: function(json) {
          return json != null ? json : 0;
        }
      }
    };
    _addLink = function(name, prop) {
      var countCSS, countTag, imgTag, shareTag, wrapTag, _ref;

      wrapTag = $('<div/>').attr({
        "class": "popn-socialbutton-wrap " + name
      }).css({
        'float': 'left',
        position: 'relative',
        width: iconSize,
        height: iconSize,
        marginTop: popnUp,
        marginLeft: exOptions.buttonSpace,
        marginRight: exOptions.buttonSpace
      });
      shareTag = $('<a/>').attr({
        href: prop.shareUrl,
        "class": 'popn-socialbutton-share',
        target: '_blank'
      }).css({
        display: 'block',
        width: '100%',
        height: '100%'
      });
      imgTag = $('<img/>').attr({
        src: "" + exOptions.imgDir + "/" + prop.img,
        alt: prop.alt
      }).css({
        border: 'none'
      });
      countCSS = $.extend({}, {
        display: 'none',
        position: 'absolute',
        color: exOptions.countColor.text,
        backgroundColor: exOptions.countColor.bg,
        border: "solid 2px " + exOptions.countColor.border,
        fontSize: exOptions.countSize,
        textDecoration: 'none',
        fontWeight: 'bold',
        lineHeight: 1.5,
        padding: '0 4px',
        borderRadius: 6,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
        zIndex: 1
      }, exOptions.countPosition);
      countTag = $('<a/>').attr({
        href: (_ref = prop.commentUrl) != null ? _ref : prop.shareUrl,
        "class": 'popn-socialbutton-count',
        target: '_blank'
      }).css(countCSS);
      wrapTag.append(shareTag.append(imgTag)).append(countTag);
      $(_this).append(wrapTag);
      return $.ajax({
        url: prop.countUrl,
        dataType: 'jsonp',
        success: function(json) {
          return countTag.show().text(prop.jsonpFunc(json));
        }
      });
    };
    for (_i = 0, _len = services.length; _i < _len; _i++) {
      sName = services[_i];
      if (servicesProp[sName] != null) {
        _addLink(sName, servicesProp[sName]);
      }
    }
    $(this).height(iconSize + popnUp);
    $(this).find('.popn-socialbutton-share').click(function() {
      var left, top;

      top = (screen.height / 2) - 180;
      left = (screen.width / 2) - 240;
      window.open(this.href, '', "width=520, height=400, top=" + top + ", left=" + left);
      return false;
    });
    $(this).find('.popn-socialbutton-count').mouseenter(function() {
      return $(this).css({
        color: exOptions.countColor.textHover,
        backgroundColor: exOptions.countColor.bgHover
      });
    }).mouseleave(function() {
      return $(this).css({
        color: exOptions.countColor.text,
        backgroundColor: exOptions.countColor.bg
      });
    });
    return $(this).find('.popn-socialbutton-wrap').mouseenter(function() {
      return $(this).css({
        marginTop: 0
      });
    }).mouseleave(function() {
      return $(this).css({
        marginTop: 4
      });
    });
  };
})(jQuery);

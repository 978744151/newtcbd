define(['zepto', 'underscore', 'backbone', 'app/utils',
        'text!templates/alipayTips.html'
    ],
    function ($, _, Backbone, utils, alipayTips) {
        var $page = $("#alipayTips-page");
        var pageView = Backbone.View.extend({
            el: $page,
            render: function () {
                utils.showPage($page, function () {
                    if (isWeiXin()) {
                        $page.empty().append(alipayTips);
                        $page.find(".alipay_tips").show();
                    } else {
                        var url = location.href;
                        var redirectUrl = url.substring(url.indexOf("redirectUrl") + 12);
                        location.href = redirectUrl;
                    }
                });
            },
            events: {
                //确认支付
                "tap .alipay_tips .fx": "hideTips"
            },

            hideTips: function () {
                $(".alipay_tips").show();
            }
        });
        return pageView;
    });

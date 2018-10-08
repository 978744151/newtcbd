define(
    [
        'zepto', 'jquery', 'artTemplate','underscore', 'backbone', 'urlGroup', 'spinner',
        'swiper', 'echo', 'app/api', 'app/basket', 'app/refreshtoken',
        'app/utils', 'app/scroll',
        'text!templates/integralShopStatus.html'
    ],

    function ($, Jquery,artTemplate, _, Backbone, UrlGroup, Spinner, Swiper, echo, Api, basket, Token, utils, scroll,
              integralShopStatus) {

        var $page = $("#integralShopStatus-page");
        var integralShopStatusView = Backbone.View.extend({
            el: $page,
            render: function (id) {
                //utils.showMenu();
                utils.showPage($page, function () {
                    $page.empty().append(integralShopStatus);
                    var ids = {ids:id};
                    console.log(ids);
                    var html = artTemplate("integralShopStatus",ids);
                    $('.integral_content').html(html)
                    $('.lookOther').on('tap', function () {
                        window.location.hash = "main"
                    })
                });
            },
        });
        return integralShopStatusView;
    });

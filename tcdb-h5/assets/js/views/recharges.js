define(
    [
        'zepto', 'jquery', 'underscore', 'backbone', 'urlGroup',
        'swiper', 'echo', 'app/api', 'app/basket',
        'app/utils', 'app/scroll',
        'text!templates/recharges.html'
    ],

    function ($, Jquery, _, Backbone, UrlGroup, Swiper, echo, Api, basket, utils, scroll,
              recharges) {

        var $page = $("#recharges");

        var rechargesView = Backbone.View.extend({
            el: $page,
            render: function () {
                utils.showPage($page, function () {
                    $page.empty().append(recharges);
                    init.recharges_content_baht()
                    init.recharges_content_pay()
                });
            },
        })

        var init =  {
            recharges_content_baht : function () {
                $('body').on('tap','.recharges_content_baht span', function () {
                    $(this).addClass('active').siblings().removeClass('active')
                    var bath = $(this).text()
                    $('.recharges_content_go span').text('Recharge:'  +bath)
                })
            },
            recharges_content_pay: function () {
                $('body').on('tap','.rechargesCheckbox', function () {
                    console.log($('.rechargesCheckbox'));
                    $(this).addClass('active').parents().siblings().find('.rechargesCheckbox').removeClass('active')
                })
            }
        }
        return rechargesView;
    });

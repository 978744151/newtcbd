define(
    [
        'zepto', 'jquery', 'underscore', 'backbone', 'urlGroup',
        'swiper', 'echo', 'app/api', 'app/basket',
        'app/utils', 'app/scroll',
        'text!templates/language.html'
    ],

    function($, Jquery, _, Backbone, UrlGroup, Swiper, echo, Api, basket, utils, scroll,
             language) {

        var $page = $("#main-language");
        var languageView = Backbone.View.extend({
            el: $page,
            render: function () {
                utils.showPage($page, function () {
                    $page.empty().append(language);
                    languageBottom()
                });
            },


        })
        var languageBottom = function () {
            $('.languageBottom div').on('tap', function () {
                console.log($(this));
                var $this = $(this);
                $this.addClass('active').siblings().removeClass('active')
            })
            $('.languageGo').on('tap', function () {
                var english = $(".English"),
                    tai = $('.tai')
                if(english.hasClass('active')){
                    localStorage.setItem('lan',1)
                }else{
                    localStorage.setItem('lan',2)
                }
                console.log(window.ctx)
                window.top.location = window.ctx + '#main';

            })
        }
        return languageView;
    });

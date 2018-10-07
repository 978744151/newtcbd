define(
    [
        'zepto', 'jquery','mui','artTemplate', 'underscore', 'backbone', 'urlGroup',
        'swiper', 'echo', 'app/api', 'app/basket',
        'app/utils', 'app/scroll',
        'text!templates/integralShop.html'
    ],

    function($, Jquery,mui, artTemplate,_, Backbone, UrlGroup, Swiper, echo, Api, basket, utils, scroll,
             integralShop) {

        var $page = $("#integralShop-page");
        var integralShopView = Backbone.View.extend({
            el: $page,
            render: function () {
                utils.showPage($page, function () {
                    $page.empty().append(integralShop);
                    mui('.mui-scroll-wrapper').scroll({
                        deceleration: 0.0006, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                        indicators: false,//去除滚动条
                        start:98 + '%'
                    });

                    mui.init({
                        swipeBack: false,
                        pullRefresh: {
                            container: '#pull',
                            down: {
                                callback: pulldownRefresh
                            },
                            up: {
                                auto:false,//可选,默认false.自动上拉加载一次
                                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                                callback : pullupRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                            }
                        }
                    });
                    function pulldownRefresh(){
                        setTimeout(function () {
                            mui('#pull').pullRefresh().endPulldownToRefresh();
                            flag = false
                            params = {page : 1,page_size:8}
                            mui('#pull').pullRefresh().refresh(true);
                            renders(params)
                        }, 700)
                    }
                    function pullupRefresh() {
                        setTimeout(function () {
                            mui('#pull').pullRefresh().endPullupToRefresh(flag);
                            renders(params)
                        }, 1000)
                    }
                    renders(params)
                });
            },
        })
        var params = {page : 1,page_size:8}
        var thisgoods = [];
        var flag = null;
        function renders(params){
            Api.getIntegralShop(params, function (data) {
                var data  = data.result;
                if(thisgoods != [] && params.page != 1){
                    thisgoods = thisgoods.concat(data.data.list);
                }else{
                    thisgoods = data.data.list;
                }
                console.log(params.page_size,data.total_pages)
                flag  = params.page > data.total_pages ? true : false;
                console.log(flag);

                if(flag == false ){
                    params.page++
                }
                data.thisgoods = thisgoods;
                var html = artTemplate("tpl", data);
                $('.integral_content').html(html);
                if(flag == true){
                    $('.ui-container').append(' <div class="text-center"> - 我已经到底了 - </div>')
                }
            })
        }
        $('body').on('tap','.announced_good_list', function (e) {
            e.stopImmediatePropagation();
            var id = $(this).data('id')
            console.log(id);

            window.location.hash = 'integralShopCalc/'+id
        })
        return integralShopView;
    }
);

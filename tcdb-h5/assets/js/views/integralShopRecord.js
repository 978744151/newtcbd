define(
    [
        'zepto', 'jquery','mui','artTemplate', 'underscore', 'backbone', 'urlGroup',
        'swiper', 'echo', 'app/api', 'app/basket',
        'app/utils', 'app/scroll',
        'text!templates/integralShopRecord.html'
    ],

    function($, Jquery,mui, artTemplate,_, Backbone, UrlGroup, Swiper, echo, Api, basket, utils, scroll,
             integralShopRecord) {
        var params;
        var flag;
        var thisgoods;
        var $page = $("#integralShopRecord-page");
        var integralShopRecordView = Backbone.View.extend({
            el: $page,
            render: function () {
                utils.showPage($page, function () {
                    $page.empty().append(integralShopRecord);
                    params = {  page:1 ,page_size : 8 };
                    flag=null
                    thisgoods = []
                    //console.log(params);
                    Record(params)
                });
            }
        });

        //console.log(params);
        function Record(params) {
            Api.IntegralShopRecord(params, function (data) {
                console.log(params);
                var datas = data.result
                if(thisgoods != [] && params.page != 1){
                    thisgoods = thisgoods.concat(datas.data);
                }else{
                    thisgoods = datas.data;
                }
                flag  = params.page > datas.total_pages ? true : false;
                datas.thisgoods = thisgoods;
                var html = artTemplate("record",datas)
                $(".order_list").html(html)
                if(flag == false ){
                    params.page++
                }else{

                    $('.order_all').append(' <div class="text-center"> - 我已经到底了 - </div>')
                }
                utils.muiScroll()
                muScroll()
            })
        }
        function muScroll(){
            for(var i = mui.hooks.inits.length-1,item;i>=0;i--){
                item=mui.hooks.inits[i];
                if(item.name=="pullrefresh"){
                    item.repeat=true;
                }
            }
            mui.init({
                swipeBack: false,
                pullRefresh: {
                    container: '#pulls',
                    down: {
                        callback: pulldownRefresh,
                        auto:false,
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
                    mui('#pulls').pullRefresh().endPulldownToRefresh();
                    flag = false
                    params = {page : 1,page_size:8}
                    mui('#pulls').pullRefresh().refresh(true);
                    Record(params)
                }, 700)
            }
            function pullupRefresh() {
                setTimeout(function () {
                    mui('#pulls').pullRefresh().endPullupToRefresh(flag);
                    Record(params)
                }, 700)
            }
        }
        return integralShopRecordView;
    }
);

define(
    [
        'zepto', 'jquery', 'artTemplate','underscore', 'backbone', 'urlGroup', 'spinner',
        'swiper', 'echo', 'app/api', 'app/basket', 'app/refreshtoken',
        'app/utils', 'app/scroll',
        'text!templates/integralShopOrder.html'
    ],

    function ($, Jquery,artTemplate, _, Backbone, UrlGroup, Spinner, Swiper, echo, Api, basket, Token, utils, scroll,
              integralShopOrder) {

        var $page = $("#integralShopOrder-page");
        var addressId = null;
        var shopId = null;
        var integralShopOrderView = Backbone.View.extend({
            el: $page,
            render: function (id) {
                //utils.showMenu();
                utils.showPage($page, function () {
                    $page.empty().append(integralShopOrder);
                    addressId = utils.storage.get("orderConAddId");
                    id = id;
                    init();
                    getShowAddress();
                    goPay()
                });
                function total(data){
                    var num = mui('.mui-numbox').numbox().getValue()
                    console.log(num)
                    $('.good_total_price').text(num * data.exchangePonit)
                    $('body').on('change', '.mui-numbox-input', function () {
                        var num = mui('.mui-numbox').numbox().getValue()
                        var remain = data.remain;
                        console.log(remain);
                        if(num > remain){
                            mui.toast('库存不足');
                            $('.mui-numbox-btn-plus').attr('disabled','disabled')
                        }

                        $('.good_total_price').text(num * data.exchangePonit)
                    })
                }
                function init(){
                    Api.getIntegralShopCalc(id,function(data){
                        var data = data.result;
                        console.log(data);
                        shopId = data.id
                        var html = artTemplate("good-info-item", data);
                        $('.good-info').html(html);
                        mui(".mui-numbox").numbox();
                        //$('.good_count').spinner();
                        //$('.spinner').css({"height":"30px" , "margin-top" : "0px"})
                        total(data);
                    })
                };
                function goPay(){
                    $('.btn_pay').on('tap', function () {
                        var formDatas =
                            //num:mui('.mui-numbox').numbox().getValue(),
                            //address_id :utils.storage.get("orderConAddId"),
                            //id:shopId
                            "num=" + mui('.mui-numbox').numbox().getValue() + "&" +
                            "address_id=" + utils.storage.get("orderConAddId") + "&" +
                            "id=" +  shopId + "&access_token="+utils.storage.get("access_token") +  "&source=1"
                        var params = {formDatas:formDatas}
                        console.log(params);
                        Api.IntegralShopPay(params, function (data) {
                            if(data.err_code == 0){
                                window.location.hash = "integralShopStatus/1"
                            }else{
                                window.location.hash = "integralShopStatus/2"
                            }
                            mui.toast(data.result)
                        },function () {
                            window.location.hash = "integralShopStatus/2"
                        })
                    })
                }
                //得到显示地址
               function getShowAddress(){

                    if(addressId != null && addressId != ""){
                        //debugger
                        var param = {id:addressId};
                        Api.getAddress(param, function(successData){
                            var address = successData.result;
                            //展示地址
                            toShowAddress(1,address); //地址列表选择的地址
                        }, function(errorData){
                            //token过期 刷新token
                            if( errorData.err_code == 20002 ){

                                Token.getRefeshToken(1,function(data){//1 需要先判断是否登录

                                    getShowAddress();

                                },function(data){
                                });
                            }
                        });
                    }else{

                        Api.getAddressList(null, function(successData){
                            var address = successData.result.data;
                            if(address.length>0){
                                //展示地址
                                toShowAddress(0,address);
                            }

                        }, function(errorData){

                            //token过期 刷新token
                            if( errorData.err_code == 20002 ){

                                Token.getRefeshToken(1,function(data){//1 需要先判断是否登录

                                    getShowAddress();

                                },function(data){

                                });
                            }
                        });
                    }


                };
                //展示地址
                function toShowAddress(flag,address){
                    var showAddressData;
                    if(flag == 1){
                        showAddressData =address;
                    } else {
                        showAddressData = address[0];//初始化是第一个地址

                        _.each(address, function(item){//有默认地址
                            if(item.is_default == 1){
                                showAddressData = item;
                            }
                        });
                    }


                    var template = _.template($("#user_address_item").html());

                    $(".user_address_info").empty().append(template(showAddressData));

                };
            },
            events: {
                //进入地址页面
                "tap .user_address_info":"addressInfo",

            },
            addressInfo: function(e){

                window.location.hash = "addressManage/" + "orderConfirm";

            }
        });
        return integralShopOrderView;
    });

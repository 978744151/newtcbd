define(['zepto', 'underscore', 'backbone','app/api','app/utils','text!templates/shareWinning.html'
    ],

    function($, _, Backbone, Api, utils, page) {
       
        var $page = $("#shareWinning-page");
        var orderId;//中奖商品id
        var invitationCode; //邀请码
        var view = Backbone.View.extend({
            el: $page,
            render: function(id) {
                //utils.showMenu();
                orderId = id;
                utils.showPage($page, function() {
                    //$page.empty().append(page);

                    initData();
                });
            },
            events: {
              "input .award_input":"awardInput",
              "tap .award_dowload":"awardDowload",
            },

            awardInput: function(e){
                e.stopImmediatePropagation();
                var mobile = $page.find(".award_input").val();
                if(!verify(mobile,1)){
                     $page.find(".dowload-type").addClass("no-award-dowload").removeClass("award_dowload");
                    return;
                }

                $page.find(".dowload-type").removeClass("no-award-dowload").addClass("award_dowload");
            },

            //绑定手机号 并进入下载APP页面
            awardDowload: function(e){
                e.stopImmediatePropagation();

                var mobile = $page.find(".award_input").val();
                if(!verify(mobile)){
                    return;
                }
                
                var formData = "invitation_code=" + invitationCode + "&" + 
                                "mobile=" + mobile;

                 var param = {formData: formData};
                Api.ydbBindMobile(param, function(data){
                    $.Dialog.info("绑定手机成功，请下载APP领取红包");

                    //TODO
                }, function(data){

                });
            }
        });

        //初始化数据 中奖分享页面
        var initData = function(){

            Api.getShareWinData({
                order_id:orderId

            }, function(data){
                var template = _.template(page);
                $page.empty().append(template(data.result));
                invitationCode = data.result.invitation_code;
            }, function(data){

            });
        };

        var verify = function(mobile,type){
            if(mobile == null || mobile == ""){
                if(type != 1){
                    $.Dialog.info("请输入手机号码！");
                }
                return false;
            }

            if(!$.isPhone(mobile)){
                if(type != 1){
                    $.Dialog.info("你输入的手机格式不正确！");
                }
                return false;
            }

            return true;
        };
        
    return view;
    });

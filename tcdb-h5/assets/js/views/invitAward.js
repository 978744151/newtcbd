define(['zepto', 'underscore', 'backbone','app/api','app/utils','text!templates/invitAward.html'
    ],

    function($, _, Backbone, Api, utils, page) {
       
        var $page = $("#invitAward-page");
        var invitationCode;//邀请码
        var inviterName;//邀请人
        var view = Backbone.View.extend({
            el: $page,
            render: function(code,name) {
                invitationCode = code;
                inviterName = name || "胖子猿";
                //utils.showMenu();
                utils.showPage($page, function() {
                    $page.empty().append(page);
                    $page.find(".invit_award_name").html(inviterName);
                });
            },
            events: {
                "input .award_input":"awardInput",
                "tap .award_dowload":"awardDowload",
              
            }, 

            //
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

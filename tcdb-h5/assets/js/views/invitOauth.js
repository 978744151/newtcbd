define(['zepto', 'underscore', 'backbone','echo','app/api','app/utils','text!templates/invitOauth.html'
    ],

    function($, _, Backbone,echo, Api, utils, page) {
       
        var $page = $("#invitOauth-page");
        var imageRenderToken;
        var $invitOauthContainer;
        var $invitOauthItem;
        var invitationCode;//邀请码
        var inviterName;//邀请人
        var view = Backbone.View.extend({
            el: $page,
            render: function(code) {
                invitationCode = code;
                //utils.showMenu();
                utils.storage.set("tcdbInivitCode",code);
                utils.showPage($page, function() {
                    $page.empty().append(page);
                    $invitOauthContainer = $page.find(".invit-goods-list");
                    $invitOauthItem = $page.find("#invitOauth-item");
                    initData()
                });
                
            },
            events: {
//              "input .award_input":"awardInput",
//              "tap .award_dowload":"awardDowload",
                "tap .oauth-open-btn" : "confirmOauth"
              
            },
            confirmOauth: function(e) {
            	e.stopImmediatePropagation();
            	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1f04a1d3d7493132&redirect_uri=' + encodeURIComponent('http://h5.tcdb.kuaimao.shop/#testPage/0') + '&response_type=code&scope=snsapi_userinfo&state=tcjp#wechat_redirect'
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
         //初始化数据
        var initData = function(){
            Api.getInvitOauthGoods({
                page_size:3
            }, function(data){
                var template = _.template($invitOauthItem.html());
                $invitOauthContainer.empty().append(template(data.result));
                asynLoadImage();
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
        
        //动态加载图片
        var asynLoadImage = function () {
            echo.init({
                throttle: 250,
            });

            if (imageRenderToken == null) {
                imageRenderToken = window.setInterval(function () {
                    echo.render();
                }, 350);
            }
        };

        
    return view;
    });

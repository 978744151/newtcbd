define(['zepto', 'underscore', 'backbone', 'echo','app/api','app/utils','text!templates/pkShare.html'
    ],

    function($, _, Backbone, echo, Api, utils, page) {
       
        var $page = $("#pkShare-page");
        var imageRenderToken;
        var $pkShareContainer;
        var $pkShareItem;
        var invitationCode;//邀请码
        var roomId;
        var view = Backbone.View.extend({
            el: $page,
            render: function(id, code, auctionId) {
                //utils.showMenu();
                roomId = id;
                utils.storage.set("tcdbInivitCode",code);
                utils.storage.set("auctionId",auctionId);
                utils.showPage($page, function() {
                    $page.empty().append(page);
                    $pkShareContainer = $page.find(".ydb-contain");
                    $pkShareItem = $page.find("#pkShare-item");
                    initData();
                });
            },
            events: {

              "tap .pk-oauth-btn":"confirmOauth",
//            "input .award_input":"awardInput",
//            "tap .award_dowload":"awardDowload",
            },  
            confirmOauth: function(e) {
            	e.stopImmediatePropagation();
            	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1f04a1d3d7493132&redirect_uri=' + encodeURIComponent('http://h5.tcdb.kuaimao.shop/#testPage/1') + '&response_type=code&scope=snsapi_userinfo&state=tcjp#wechat_redirect'
            },

            //监听手机号码
            awardInput: function(e){
                e.stopImmediatePropagation();
                var mobile = $page.find(".award_input").val();
                if(!verify(mobile,1)){
                     $page.find(".dowload-type").addClass("no-award-dowload").removeClass("award_dowload");
                    return;
                }
                $page.find(".dowload-type").removeClass("no-award-dowload").addClass("award_dowload");
            },

            //绑定手机号码 进入下载APP页面
            awardDowload: function(e){
                e.stopImmediatePropagation();

                var mobile = $page.find(".award_input").val()
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
            } ,
        });

        //初始化数据
        var initData = function(){
            Api.getPKRoomInfo({
                room_id:roomId,
            }, function(data){
				utils.storage.set("tcdbRoom_sn",data.result.room_sn);
                utils.storage.set("auction_id",data.result.auction_id);
                //invitationCode = data.result.invitation_code;
                var template = _.template($pkShareItem.html());
                $pkShareContainer.empty().append(template(data.result));
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

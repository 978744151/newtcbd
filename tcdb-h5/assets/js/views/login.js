
 define(['zepto', 'underscore', 'backbone',
         'app/utils',
         'app/api'
     ],
    function($, _, Backbone, utils, Api) {
        console.log(111111111)
        $btnLogin    = $(".btn_login");
        $btnRegister = $(".btn_register"); 
        $mobile      = $("#mobile"); 
        $password    = $("#password"); 

        var RegisterModel = {

            init : function(){
                this.isLogin();
                this.initOpenId();
                this.login();
                this.register();
            },

            isLogin: function(){

                if(utils.isLogined()){
                    utils.storage.set("backAgain","yes");
                    history.back();
                }
            },

            initOpenId : function(){
                if(isWeiXin()){
                    var code = $.getQueryString("code");
                    if($.isBlank(code)){
                        $.Dialog.info("微信认证失败，请刷新再试");
                        return;
                    }
                    Api.getOpenid(code, function(data){
                        if(!$.isBlank(data.result.openid)){
                            utils.storage.set("wxOpenid", data.result.openid);
                        }
                    });
                }else{
                     utils.storage.set("wxOpenid", "text");
                }
            },

            login : function() {
                $btnLogin.on("click", function(){
                    //window.location.href = window.c

                    //返回
                    //window.location.href = window.ctx + utils.storage.get("loginSuccessBack");
                    

                    var mobile   = $mobile.val();
                    var password = $password.val();
                    if(!RegisterModel.verify(mobile,password) ){
                        return;
                    }
                    var formData = "mobile=" + mobile + "&" +
                                   "password=" + password + "&" +
                                   "openid=" +  utils.storage.get("wxOpenid");

                    var param = {formData:formData};
                    Api.phoneLogin(param,function(){

                    },function(successData){

                        utils.storage.set("loginSuccess","yes");
                        //置换凭证 refresh_token
                        utils.storage.set("refresh_token",successData.result.refresh_token);
                        //接口访问凭证 access_token
                        utils.storage.set("access_token",successData.result.access_token);
                        //过期时间
                        utils.storage.set("expire_time",successData.result.expire_time);
                        //返回到上一页
                        //history.back();
                        //return
                        //返回
                        window.location.href = window.ctx + utils.storage.get("loginSuccessBack");
                        return;
                                              
                        //window.location.href=document.referrer

                    },function(errorData){

                    });
                    
                })
            },

            register: function(){
                $btnRegister.on("tap", function(){
                    window.location.href = window.ctx + "/register/step1.html";
                });
            },

            verify: function( mobile, password ){
                if (mobile == "") {
                    $.Dialog.info("请输入您的手机号码");
                    return false;
                }

                if (!$.isPhone(mobile)) {
                    $.Dialog.info("您输入的手机号码格式不正确");
                    return false;
                }

                if (password == "") {
                    $.Dialog.info("请输入您的密码");
                    return false;
                }

                return true;

            },


        }


        RegisterModel.init();
     });
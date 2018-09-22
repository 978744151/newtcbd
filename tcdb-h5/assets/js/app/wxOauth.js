/**刷新token的相关操作；
*author czy_1；
*time   16/9/21；
*/
define(['zepto', 'app/utils', 'app/api'],function($, utils, Api){

	var wxOauth = function(invitation_code, openFunction){
		if(isWeiXin()){
            var code = $.getQueryString("code");
            if($.isBlank(code)){
                $.Dialog.info("微信认证失败，请刷新再试");
                return;
            }
            Api.wxOauthStep1(code, function(res){
                if(!$.isBlank(res.openid)){
                    Api.wxOauthStep2(res.access_token, res.openid, function(msg){
		                if(!$.isBlank(msg.openid)){
		                    Api.inviteBind(invitation_code, msg.unionid, msg.nickname, msg.headimgurl, function(){
		                    	openFunction()
		                    },  function (data) {


							})
		                }
		            });
                }
            });
        }
	};

	return{
		wxOauth:wxOauth,
	};



});
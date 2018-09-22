define(['zepto', 'underscore', 'backbone',
		 'app/api',
		'app/utils', 'app/wxOauth',
		'text!templates/testPage.html'
	],

	function ($, _, Backbone, Api, utils, oauth, testPageTemplate) {
		var $page = $("#test-page");
		var $invitCode;
		var $room_sn;
		var testPageView = Backbone.View.extend({
			el: $page,
			render: function (code) {
				var status = code
				//utils.showMenu();
				utils.showPage($page, function () {
					
					$page.empty().append(testPageTemplate);
					$invitCode = utils.storage.get("tcdbInivitCode")
					if(status == 0){
						oauth.wxOauth($invitCode, onload)
					}else {
						$room_sn = utils.storage.get("tcdbRoom_sn")
						oauth.wxOauth($invitCode, onloadPK)
					}
					
					
					
					

				});
			},
			

		});
		
		var onload = function() {
			// new Mlink({
			// 	mlink:'https://ada5pw.mlinks.cc/AcGB',//短链地址
			// 	autoRedirectToDownloadUrl: true,
		 //    	button:document.getElementById('btnOpenApp')
			// });	
			
			$("#btnOpenApp").attr('href', 'https://ada5pw.mlinks.cc/AcGB').click();
		};
		
		var onloadPK = function() {
			$auction_id = utils.storage.get("auction_id")
			// new Mlink({
			// 	mlink:'https://ada5pw.mlinks.cc/AcG0',//短链地址
			// 	params: {
			// 		auction_id: $auction_id
			// 	},
		 //    	button:document.getElementById('btnOpenGoods')
			// });	
			var $openGoodsBtn = $("#btnOpenGoods");
			$openGoodsBtn.attr('href', 'https://ada5pw.mlinks.cc/AcG0?auction_id=' + $auction_id);
			$openGoodsBtn.click();
		};

		

		

		return testPageView;

	});

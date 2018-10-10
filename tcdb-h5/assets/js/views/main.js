define(['zepto', 'cookie','underscore', 'backbone',
		'swiper', 'echo', 'app/api', 'dropload',
		'app/utils', 'app/scroll', 'app/basket',
		'text!templates/main.html'
	],

	function ($,cookie, _, Backbone, Swiper, echo, Api, _dropload, utils, scroll, basket, mainTemplate) {



		var $page = $("#main-page");
		var imageRenderToken = null;
		var $pageNum; //页码
		var $pageSize; //每页记录数
		var $announcedGoodType;
		var droploadType;
		var $dropload;
		var $directionFlag;


		var lans = localStorage.getItem("lan") ? localStorage.getItem("lan") : window.location.href = window.ctx + '/language.html';

		var mainView = Backbone.View.extend({
			el: $page,
			render: function () {
				//utils.showMenu();
				utils.showPage($page, function () {

					$page.empty().append(mainTemplate);
					$(".main_contain").hide();
					$dropload = null;
					$pageNum = 1;//页码
					$announcedGoodType = 1;
					$directionFlag = 1;
					$pageSize = 10;//每页记录数
					//initEvent();//初始化轮播和进入二级页面事件

					initData();//初始化首页数据

				});
			},
			events: {

				"tap .text-tap": "textFunction",


				//"tap .text-tap": "textFunction",


				"tap .good_search": "goodSearch",

				//进入分类 、精选商品、晒单。。。
				"tap .tab_bar_list li": "tabBarList",

				//加入购物车
				"tap .add_to_shopping_cart": "addToShoppingCart",

				//夺宝商品 详情
				"tap .announced_good_list li": "duobaoGoodInfo",

				//消息 中奖提醒 myMessage
				"tap .icon_message": "myMessage",

				"tap .to_shopping_cart":"shoppingCart",



			},

			textFunction: function () {

			},
			shoppingCart: function(){

				window.location.hash = "shoppingCart";
			},
			goodSearch: function () {

				window.location.hash = "goodSearch";
			},

			tabBarList: function (e) {
				e.stopImmediatePropagation();

				$this = $(e.currentTarget);

				var href = $this.data("href");

				if (href) {
					window.location.hash = href;
				}

			},

			//夺宝 商品性情
			duobaoGoodInfo: function (e) {

				e.stopImmediatePropagation();

				window.location.hash = "duobaoInfo/" + $(e.currentTarget).data("id");


			},

			myMessage: function () {

				window.location.hash = "myMessage";

			},

			//加入购物车
			addToShoppingCart: function (e) {
				e.stopImmediatePropagation();

				var id = parseInt($(e.currentTarget).parent().data("id"));

				var quantity = parseInt(1);
				var formData = "auction_id=" + id + "&" +
					"quantity=" + quantity;
				var param = {formData: formData};
				basket.addShoppingCart(param, function (data) {

					$.Dialog.success("添加成功");
				}, function () {

				});

			},

		});
		var flag;
		function dates(){
			var days = localStorage.getItem("day") ? localStorage.getItem("day") : null;
			console.log(flag)
			var time = date();
			if(days && days == time){
				flag = true;
			}else if(days && days != time){
				flag = false;
				localStorage.setItem("day" , time)
			}else{
				flag = false;
				localStorage.setItem("day" , time);
			}
			function date(){
				var date = new Date();
				var year = date.getFullYear() // 年
				var month = date.getMonth() + 1; // 月
				var day  = date.getDate(); // 日
				return year +"-" + month + "-" + day;
			}
		}
		var initEvent = function () {
			var type = utils.getStor()
			$('.hot').html(lan(type).mainPage.Popular)
			$('.new').html(lan(type).mainPage.latest)
			$('.program').html(lan(type).mainPage.completion)
			//initSwiper();//初始化轮播图

			//获奖信息 上下轮播
			$(".bonus_record_list_container").myScroll({
				speed: 100,  //滚动速度,值越大速度越慢
				line: 1 //滚动的行数
			});


			//夺宝商品 按需排序
			$(".announced_type_list").find(".ui-col").each(function () {

				$(this).click(function () {
					//如果已经选中
					if ($(this).hasClass("active")) {
						$(this).siblings(".ui-col").removeClass("active");
					}
					else {
						$(this).addClass("active").siblings(".ui-col").removeClass("active");
					}


					var type = $(this).data("type");
					$announcedGoodType = type;
					var direction = $(this).data("direction");
					//console.log("type: " + type);
					//getIndianaGoods( direction);
					$directionFlag = direction
					$(".announced_good_list").empty();
					$pageNum = 1;
					$dropload = null;
					dropload.init();

				});
			});

		};

		//
		var getIndianaGoods = function ( direction) {
			if (!direction)direction = 1;
			if($announcedGoodType ==4 ){
				direction = $directionFlag;
			}
			var param = {
				page: $pageNum,
				page_size: $pageSize,
				type: $announcedGoodType,
				direction: direction,
			};
			//console.log(param);

			if ($announcedGoodType == 4 && $directionFlag == 1) {		//升序
				$page.find(".announced_type_list .icon_img_4")
					.find(".sort_up").addClass("active")
					.siblings().removeClass("active");
			}
			if ($announcedGoodType == 4 && $directionFlag == 2) {		//降序
				$page.find(".announced_type_list .icon_img_4")
					.find(".sort_down").addClass("active")
					.siblings().removeClass("active");
			}

			if (droploadType == "up") {

				$dropload.noData(false);
				$dropload.resetload();
				$dropload.unlock();
				dropload.init();
				return;
			}


			Api.getIndianaGoods(param,
				function (successData) {
					console.log(successData);

					if (successData.result.data.length > 0) {

						var template = _.template($("#announced_good_item").html());
						$(".announced_good_list").append(template(successData.result));

						$pageNum++;

						$dropload.noData(false);
						$dropload.resetload();
						$dropload.unlock();
					} else {

						$dropload.noData(true);
						$dropload.resetload();
						$dropload.lock("down");
					}

					if ($announcedGoodType == 4) {
						//if (direction == 1) {
						//}
						direction = direction == 1 ? 2 : 1;
						$page.find(".announced_type_list .icon_img_4")
							.attr("data-direction", direction);
					}


				}, function (errorData) {


				})

		};

		//初始化首页数据
		var initData = function () {
			Api.getHomeData(null,
				function (successData) {
					dates()
					console.log(successData)
					var template = _.template($("#main_item").html());
					$(".main_contain").empty().append(template(successData.result));
					$(".main_contain").show();
					utils.timeCountDown($(".time_count_down"), "main", null);
					asynLoadImage();
					bannerEvent();
					initEvent();//初始化轮播和进入二级页面事件

					//getIndianaGoods();//获取类型为“人气”的夺宝商品列表

					$(".announced_good_list").empty();
					$pageNum = 1;
					$dropload = null;
					dropload.init();

					flag ? $('.index_yy').hide() : $('.index_yy').show()
					console.log(flag);
					$('body').on('click', ".index_box_button",function () {
						console.log(1)
						console.log(successData.result.popup.link);
						var link = successData.result.popup.link
						window.location.href = link
					})
					$('body').on('click', ".index_box_close img",function () {
						$('.index_yy').hide()
					})
				},
				function (errorData) {

				});
				category()
		};
		function category(){
			var param = null
			Api.getCategories(param,function (data) {
				console.log(data.result)
				var result = data.result.data
				var html =  ""
				for(var i = 0;i<result.length;i++){
					html+= '<li class=" ui-txt-line-height-30 text-tap" data-id='+result[i].id +' data-name='+result[i].name +'>'
					html+= '<div class="ui-icon">'
					html+= '<img src='+result[i].icon +'>'
					html+= '</div>'
					html+= '<span class="ui-txt-default">'+ result[i].name +'</span>'
					html+= '</li>'
				}
				$('.tab_bar_cate').html(html)

				var width = $('body').width()
				var liWidth = width * 0.9 / 4
				$('.text-tap').css('width',liWidth)
				mui('.mui-scroll-wrapper').scroll({
					deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
				});
			})
			var timeoutflag = null;
			$('body').on('tap','.text-tap', function () {
				var $that = $(this)
				if(timeoutflag != null){
					clearTimeout(timeoutflag);
				}
				timeoutflag=setTimeout(function(){
					var cateId = $that.data('id')
					var cateName = $that.data('name')
					window.location.hash = "categoryGoodList/" + cateId;
					localStorage.setItem('cateName',cateName)
				},300);
			});
		}
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

		var dropload = {
			init: function () {
				$dropload = $(".announced_good_list").dropload({
					scrollArea: window,
					loadDownFn: function (me) {
						droploadType = "down";
						if ($pageNum == 1) {
							$(".announced_good_list").empty();
						}
						getIndianaGoods();
					},
					loadUpFn: function (me) {
						droploadType = "up";
						$pageNum = 1
						$(".announced_good_list").empty();
						getIndianaGoods();
					}
				});

			},

			lock: function () {
				$dropload.lock();
			},

			reload: function () {
				$dropload.resetload();
			},

			reset: function (flag) {
				$pageNum = 1;
				flag = flag || false;
				$dropload.unlock("down");
				$dropload.noData(flag);
				$dropload.resetload();
			}
		};

		//初始化轮播图
		var bannerEvent = function () {

			var mySwiper = new Swiper('.banner_img_list', {
				passiveListeners: false,
				initialSlide: 1,//设定初始化时slide的索引。
				direction: 'horizontal',//Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
				speed: 300,//滑动速度，即slider自动滑动开始到结束的时间（单位ms）
				autoplay: 3000,//自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
				autoplayDisableOnInteraction: false,//用户操作swiper之后，是否禁止autoplay。默认为true：停止。
				grabCursor: true,//设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。
				setWrapperSize: true,//开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
				//上一个,下一个
//                      nextButton: '.swiper-button-next',
//                      prevButton: '.swiper-button-prev',
				//pagination : '.swiper-pagination',
				//prevSlideMessage: 'Previous slide',
				//nextSlideMessage: 'Next slide',
				//firstSlideMessage: 'This is the first slide',
				//lastSlideMessage: 'This is the last slide',
				//paginationBulletMessage:'Go to slide {{index}}',
				slidesOffsetBefore: 0,//设定slide与左边框的预设偏移量（单位px）。
				slidesOffsetAfter: 0,//设定slide与右边框的预设偏移量（单位px）。
				freeMode: false,//默认为false   false：一次滑一个 true：滑到哪里算哪里
				freeModeSticky: true,//使得freeMode也能自动贴合。 滑动模式下也可以贴合
				//slidesPerView: 3,//一页 显示的个数
				effect: 'slide',//slide的切换效果，默认为"slide"（位移切换），"fade"（淡入）"cube"（方块）"coverflow"（3d流）。
				loop: true,
				//// 如果需要分页器
				pagination: '.swiper-pagination',
				//// 如果需要前进后退按钮
				//nextButton: '.swiper-button-next',
				//prevButton: '.swiper-button-prev',
				//// 如果需要滚动条
				//scrollbar: '.swiper-scrollbar',
				onTap: function (swiper) {
					var href = $(swiper.clickedSlide).data("href");
					if (href == "") {
						return;
					}
					//window.location.href = href;
					if (href.indexOf("=resale") > -1) {
						window.location.hash = "resale";
					}

					if (href.indexOf("=share") > -1) {
						window.location.hash = "share";
					}

					if (href.indexOf("=auctions") > -1) {
						utils.getUrl(href);
						var id = utils.storage.get("id");
						window.location.hash = "duobaoInfo/" + id;
					}

					if (href.indexOf("http://") > -1) {
						window.location.href = href;
					}
					//如果是 伪协议
					if (href.indexOf("mxep://") > -1) {
						if (href.indexOf("=") > -1)
							href = href.split("=")[1];
						if (href.indexOf("#") > -1)
							href = href.split("#")[1];

						window.location.hash = href;
					}
				}
			})

		};


		return mainView;
	});

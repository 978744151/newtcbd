define(['zepto', 'underscore', 'backbone','swiper', 'echo', 'app/api','app/utils', 'text!templates/pkShow.html'
	],

	function ($, _, Backbone, Swiper, echo, Api, utils,page) {

		var $page = $("#pkShow-page");
		var view = Backbone.View.extend({
			el: $page,
			render: function () {
				//utils.showMenu();
				utils.showPage($page, function () {
					$page.empty().append(page);


					bannerEvent();
				});
			},
			events: {				
			},

		});

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

		//初始化轮播图
		var bannerEvent = function () {

			var mySwiper = new Swiper('.banner_img_list', {
				initialSlide: 1,//设定初始化时slide的索引。
				direction: 'horizontal',//Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
				speed: 300,//滑动速度，即slider自动滑动开始到结束的时间（单位ms）
				autoplay: 3000,//自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
				autoplayDisableOnInteraction: false,//用户操作swiper之后，是否禁止autoplay。默认为true：停止。
				grabCursor: true,//设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。
				setWrapperSize: true,//开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
				slidesOffsetBefore: 0,//设定slide与左边框的预设偏移量（单位px）。
				slidesOffsetAfter: 0,//设定slide与右边框的预设偏移量（单位px）。
				freeMode: false,//默认为false   false：一次滑一个 true：滑到哪里算哪里
				freeModeSticky: true,//使得freeMode也能自动贴合。 滑动模式下也可以贴合
				//slidesPerView: 3,//一页 显示的个数
				effect: 'slide',//slide的切换效果，默认为"slide"（位移切换），"fade"（淡入）"cube"（方块）"coverflow"（3d流）。
				loop: true,
				pagination: '.swiper-pagination',
				onTap: function (swiper) {
					var href = $(swiper.clickedSlide).data("href");
					if (href == "") {
						return;
					}
				}
			})

		};


		return view;
	});

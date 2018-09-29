//window.assetVersion = "1.0.0";
//window.API_URL = "http://www.ydb.com:82/mxep/";
//window.ctx = "http://www.ydb.com:82";
//window.imageDomain = "http://image.hexianhui.cn";
//window.assetVersion = "1.0.2";
//window.API_URL = "http://h5.tcdb.kuaimao.shop/tcdb";
//window.ctx = "http://h5.tcdb.kuaimao.shop";
//window.imageDomain = "http://image.hexianhui.cn";

window.assetVersionion = "1.0.2";

window.API_URL =  "http://localhost:801/tcdb";

window.ctx =  "http://localhost:801";


window.imageDomain  = "http://image.hexianhui.cn";

//window.assetVersion = "1.0.2";
//window.API_URL = "http://localhost:801/tcdb";
//window.ctx = "http://localhost:801";
//window.imageDomain = "http://image.hexianhui.cn";
requirejs.config({
	//By default load any module IDs from js/lib
	// baseUrl: 'assets/js/lib',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		zepto: 'libs/zepto.min',
	    jquery: 'libs/jquery-2.1.1.min',
		backbone: 'libs/backbone.min',
		underscore: 'libs/underscore.min',
		text: 'libs/text',
		urlGroup: "libs/urlGroup",//url集合
		swiper: 'libs/swiper.min',//轮播图
		spinner: 'libs/jquery.spinner',//数量加减
		//rotate: 'libs/jquery.rotate.min',//大转盘
		kinerLottery: 'libs/kinerLottery',//大转盘
		map: 'libs/map',//map
		echo: 'libs/echo.min',
		countdown: 'libs/countdown',
		frozen: 'libs/frozen',
		jweixin: 'http://res.wx.qq.com/open/js/jweixin-1.1.0',
		dropload: 'libs/dropload',
		mobiscroll: 'libs/mobiscroll',
		fly: 'libs/fly',
		mui:'libs/mui.min',
		artTemplate:'libs/template-web'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		// 'jquery': {
		// 	exports: '$'
		// },
		'zepto': {
			exports: '$'
		},
		'backbone': {
			deps: ['underscore', 'zepto'],
			exports: 'Backbone'
		},
		'urlGroup': {
			deps: ['zepto'],
			exports: 'UrlGroup'
		},
		'swiper': {
			deps: ['zepto'],
			exports: 'Swiper'
		},
		'spinner': {
			deps: ['zepto'],
			exports: 'Spinner'
		},
		'map': {
			deps: ['zepto'],
			exports: 'Map'
		},
		//kinerLottery
		'kinerLottery': {
			deps: ['zepto'],
			exports: 'KinerLottery'
		},
		//'rotate': {
		//	deps: ['zepto'],
		//	exports: 'Rotate'
		//},
		'jweixin': {
			deps: [],
			exports: 'jweixin'
		},
		'frozen': {
			deps: ['zepto'],
			exports: 'Frozen'
		},
		'mobiscroll': {
			deps: ['zepto'],
			exports: 'Mobiscroll'
		},
		'mui': {
			deps: ['zepto'],
			exports: 'mui'
		},
		'artTemplate': {
			deps: ['zepto'],
			exports: 'artTemplate'
		}
	},
	urlArgs: "v=" + window.assetVersion
});


function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	}
	else {
		return false;
	}
}
// Start the router
requirejs(['router'], function (Router) {
	Router.initialize();
});
function lan(country){
    if(country == 1){
        language = {
            product:'Product introduction:HabbiGo is a new type of social e-commercial product based on the Thai market. Users can purchase goods online through the APP and website or goup purchase through the platform. The grouping purchase method will be much cheaper than the direct street shopping, but Not everyone can complete the goup purchase, and need to be lucky enough. If the group purchase  is not successful,  the platform will return money to users by converting user`s recharged money into credits exchange, by which users can exchange the favorite goods on the platform.',//产品简介
            //主要页面
            mainPage : {
                Daily:'Daily necessities',//1.1日常用品 、、、
                fastFood: 'fast food',//速食品
                electronicProducts: 'electronic products',//电子
                luxury: 'luxury goods',//奢侈品
                Popular: 'Popular',//热门的
                latest: 'latest',//最新的
                project: 'project time',//项目时间
                snap: 'snap up',//抢购
                integrate: 'integrate purchase',//拼购
                cancel: 'cancel',//取消
                Consulting: 'Consulting service',//咨询客服
                call:'call',//拨打电话,
                Home:'Home',//主页
                History:'History',//历史记录
                Discover:'Discover',//发现
                Personal:'Personal Center',//个人中心
                me:'me',//我的
                Number:'Number of participants',//参与人数
                completion:'program',//完成度completion degree
                issue:'issue number',//期号
                winner:'winner',//获得者
                lucky:'lucky',//幸运者
                announcement:'announcement time',//公布时间,
                Username:'Username',//用户名
                minutes:'xx minutes ago',       //xx分钟前
                hours:'xx hours ago',//xx小时前
                like:'like',//喜欢
                love:'love',//赞
                Recharge:'Recharge',//充值
                integrate:'integrate purchase record',//拼购记录
                lucky:' lucky record',//幸运记录
                purchase:'purchase record',//购买记录
                discovery:' my discovery',//我的发现
                delivery:'my delivery address',//我的收货地址
                customer:'Call Center',//客服中心
                settings:'settings',//设置，
                Login:'Login',//登录
                registration:'registration',//注册
                clickLogin:'click to login',//点击进行登录
                selectRecharge:'select recharge amount',//选择充值金额
                choosePayment:'choose payment method',//选择支付方式
                recharge:'recharge immediately',//立即充值
                notifications:'Push notifications',//关于我们
                aboutUs:' about us',//意见反馈
                languageSelection:'language selection',//选择语言
                logout:'logout',//退出登录
                Graphic:'Graphic introduction',//图文介绍
                sharing:'sharing with prizes',//有奖分享
                immediately:'buying immediately',//立刻购买
                remaining:'remaining quantity',//剩余数量,
                remainings:'remaining',
                inviting:'inviting friends',//邀请朋友,
                chooseLoginMethod:'Choose login method'
            },
            //营销文档
            Market:{
                Super:"Super discount",//超级大优惠Super
                great:"great news",//特大喜讯great
                goodGift:" 0 baht to get a good Gift",//0元抢好礼
                missed:"not to be missed",//不容错过
                takePart:"take part in it",//马上参与
                TellFriends:"Tell friends right now",//马上告诉朋友
                grandly:"grandly promotes",//隆重推出
                HelpMe:"Help me buy it",//帮我拼购
                HelpHim:'Help him buy it',//帮TA拼一下
                Participants:'Participants',//参与的人
                download:'download now',//立即下载
                information:'more information',//了解更多
                Earn:'Earn points',//获得积分
                Congratulations:'Congratulations to 。。。 for getting。。。',//恭喜xxx获得xxx
                opportunity:'rare opportunity',//机会难得
                Redeem:'Redeem gift',//兑换好礼
                RechargeMore:'Recharge 10 baht, you can get 1 credit, the points can be used to redeem the beautiful gifts of the points mall in the platform.',//充值10泰铢，即可获得1积分，积分可以用来兑换平台中积分商城的精美礼品
            }
        }
    }
    else if(country == 2)
        language = {
            product:'HabbiGo.เป็นสินค้าอีคอมเมิร์ซการสื่อสารระหว่างบุคคลทางสังคมไหม่ชึ่งประดิษฐ์สำหรับตลาดประเทศไทย  ลุกค้าชื้อสินค้าโดยAPP หรือชื้อโดยเว็บไซต์ออนไลน์ได้ หรือว่าไช้วิธีชื้อของเป็นกลุ่มกับคนไดคนอื่นโดยแพลตฟอร์มการซื้อขาย  ชื้อของด้วยวิธีที่สามจะถูกกว่าวิธีอื่น  แต่ไม่ไช่ทุกคนที่อยู่ในกลุ่มชื้อของได้รับความสำเร็จ ต้องการความโชคนิดหน่อยนะ  ลุกค้ากลุ่มชื้อของที่ไม่ได้รับความสำเร็จ  แพลตฟอร์มการซื้อขายจะแลกเงินของเขาเป็นปริพันธ์ของลุกค้าเอง   แล้วลุกค้าแลกปริพันธ์เป็นสินค้าพอใจได้ชึ่งอยู่แพลตฟอร์ม', //产品简介
            //主要页面
            mainPage : {
                Daily:'ความจำเป็นรายวัน',//1.1日常用品 、、、
                fastFood: 'อาหารพร้อมบริโภค',//速食品
                electronicProducts: 'ผลิตภัณฑ์อิเล็กทรอนิกส',//电子
                luxury: 'สินค้าฟุ่มเฟือย',//奢侈品
                //1.1 ความจำเป็นรายวัน  อาหารพร้อมบริโภค  ผลิตภัณฑ์อิเล็กทรอนิกส์   สินค้าฟุ่มเฟือย
                Popular: 'ร้อนแรง',//热门的
                latest: 'สินค้ไหม่',//最新的
                project: 'เวลาโครงการ ',//项目时间
                snap: 'รีบชื้อทันที',//抢购
                integrate: 'ร่วมกลุ่มชื้อของ',//拼购
                cancel: 'ยกเลิก',//取消
                Consulting: 'ให้คำปรึกษาด้านบริการลูกค้า',//咨询客服
                call:'โทร.เบอร์',//拨打电话,
                //1.2 ร้อนแรง    สินค้ไหม่     เวลาโครงการ  รีบชื้อทันที   ร่วมกลุ่มชื้อของ  ยกเลิก   ให้คำปรึกษาด้านบริการลูกค้า   โทร.เบอร์
                Home:'หน้าหลัก',//主页
                History:'ประวัติการบันทึก',//历史记录
                Discover:'การค้นหา',//发现
                Personal:'บัญชีผู้ใช้ของฉัน',//个人中心
                me:'ของฉัน',//我的
                //1.3 หน้าหลัก   ประวัติการบันทึก   การค้นหา   บัญชีผู้ใช้ของฉัน   ของฉัน
                Number:'จำนวนคนที่ร่วม',//参与人数
                completion:'เสร็จสิ้น',//完成度
                issue:'เลขงวด',//期号
                winner:'ผู้ได้รับ',//获得者
                lucky:'ผู้โชคดี',//幸运者
                announcement:'เวลาประกาศ',//公布时间,
                //1.4 จำนวนคนที่ร่วม     เสร็จสิ้น   เลขงวด    ผู้ได้รับ   ผู้โชคดี    เวลาประกาศ
                Username:'ชื่อลุกค้า',//用户名
                minutes:'xxนาที',       //xx分钟前
                hours:'xxชั่วโมง',//xx小时前
                like:'ชอบ',//喜欢
                love:'กใจ',//赞
                //1.5 ชื่อลุกค้า      xxนาที     xxชั่วโมง     ชอบ    ถูกใจ
                Recharge:'เติมเงิน',//充值
                integrate:'บันทึกการชื้อเป็นกลุ่ม',//拼购记录
                lucky:' บันทึกโชคดี',//幸运记录
                purchase:'บันทึกการชื้อของ',//购买记录
                discovery:'ประกฏการของฉัน',//我的发现
                delivery:'ที่อยู่รับของ',//我的收货地址
                customer:'ศูนย์บริการลูกค้า',//客服中心
                settings:'จัดตั้งขึ้น',//设置，
                // 1.6 เติมเงิน   บันทึกการชื้อเป็นกลุ่ม   บันทึกโชคดี   บันทึกการชื้อของ   ประกฏการของฉัน  ที่อยู่รับของ    ศูนย์บริการลูกค้า  จัดตั้งขึ้น
                Login:'เข้าสู่ระบบ',//登录
                registration:'สมัคร์สมาชีกไหม่',//注册
                clickLogin:'คลิกเพื่อเข้าสู่ระบบ',//点击进行登录
                selectRecharge:'เลือกจำนวนการเติมเงิน',//选择充值金额
                choosePayment:'เลือกวิธีการชำระเงิน',//选择支付方式
                recharge:'เติมเงินทันที',//立即充值
                // 1.7 เข้าสู่ระบบ   สมัคร์สมาชีกไหม่    คลิกเพื่อเข้าสู่ระบบ    เลือกจำนวนการเติมเงิน    เลือกวิธีการชำระเงิน   เติมเงินทันที
                notifications:'เกี่ยวกับเรา',//关于我们
                aboutUs:' ความคิดเห็น',//意见反馈
                languageSelection:' เลือกภาษา',//选择语言
                logout:'ออกจากระบบ',//退出登录
                //1.8 ข่าวดัน   เกี่ยวกับเรา   ความคิดเห็น   เลือกภาษา   ออกจากระบบ
                Graphic:'แนะนำรูปภาพและข้อความ',//图文介绍
                sharing:'แชร์รางวัล',//有奖分享
                immediately:'ชื้อทันที',//立刻购买
                remaining:'จำนวนเหลือ',//剩余数量
                inviting:'ชวนเพื่อน',//邀请朋友,
                //1.9 แนะนำรูปภาพและข้อความ     แชร์รางวัล     ชื้อทันที      จำนวนเหลือ  ชวนเพื่อน
                chooseLoginMethod:'เลือกวิธีเข้าสู่ระบบ'
                //  2.0 เลือกวิธีเข้าสู่ระบบ
            },
            //营销文档
            Market:{
                Super:"ซูเปอร์ราคาพิเศษ",//超级大优惠Super
                great:"ข่าวเยี่ยมมาก",//特大喜讯great
                goodGift:"ชื้อของ  0  บาท",//0元抢好礼
                missed:"อย่าพลาด",//不容错过
                takePart:"ร่วมทันที",//马上参与
                TellFriends:"รีบบอกพื่อน",//马上告诉朋友
                grandly:"แพร่หลายแกรนด์",//隆重推出
                HelpMe:"ช่วยฉันชื้อของเป็นกลุ่ม",//帮我拼购
                HelpHim:'ช่วยเขาสักที',//帮TA拼一下
                Participants:'คนที่ร่วม',//参与的人
                download:'ดาวน์โหลดทันที',//立即下载
                information:'เรียนรู้เพิ่มเติม',//了解更多
                Earn:'ปริพันธ์ที่ได้รับ',//获得积分
                Congratulations:'การแสดงความยินดีที่  xxx  ได้รับรางวัล  xxx',//恭喜xxx获得xxx
                opportunity:'โอกาสที่หาได้ยาก',//机会难得
                Redeem:'แลกของขวัญเยี่ยม',//兑换好礼
                RechargeMore:'เติมเงิน 10 บาทก็ได้รับปริพันธ์ 1    ปริพันธ์แลกของขวัญสวยงามที่ศูนย์การค้าปริพันธ์ชึ่งอยู่ในแพลตฟอร์มได้',//充值10泰铢，即可获得1积分，积分可以用来兑换平台中积分商城的精美礼品
            }
        }
    return language
}
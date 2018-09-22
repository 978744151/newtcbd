define(['zepto', 'underscore', 'backbone',
        'swiper', 'echo', 'frozen', 'app/api',
        'app/utils',
        'text!templates/recharge.html'
    ],

    function ($, _, Backbone, Swiper, echo, frozen, Api, utils, rechargeTemplate) {

        var $page = $("#recharge-page");

        var rechargeTemplateData;

        var rechargeView = Backbone.View.extend({
            el: $page,
            render: function (id, name) {
                utils.showPage($page, function () {
                    //$page.empty().append(rechargeTemplate);
                    rechargeTemplateData = null;
                    initData();

                });
            },
            events: {

                "tap .money_list li": "selectRechargeAmount",
                "tap .pay-wrap .pay-item": "choosePayMethod",
                "tap .btn_pay": "rechargePay"
            },

            selectRechargeAmount: function (e) {

                e.stopImmediatePropagation();

                var $this = $(e.currentTarget);
                //点击选中 充值金额
                if (!$this.hasClass("btn_other")) {
                    $this.addClass("active").siblings(".item").removeClass("active");

                    var item = $this.data("item");

                    $(".recharge_template_desc").html(rechargeTemplateData[item].desc);

                }

                //选择  其他金额
                if ($this.hasClass("btn_other")) {
                    $this.addClass("active").siblings(".item").removeClass("active");
                    var $npt = $("<input>").addClass("ui-input").addClass("other_money")
                        .attr("maxlength", "3")
                        .attr("placeholder", "其他金额")
                        .css({
                            "background": "transparent",
                            "text-align": "center",
                            "color": "#ff6e2b"
                        });
                    //禁止输入数字
                    $npt.keyup(function () {
                        this.value = this.value.replace(/\D/g, '')
                    });
                    //移除焦点 显示数字
                    $npt.blur(function () {
                        var val = $(this).val();
                        if (val) {
                            val = "<div>" + val + "</div>";
                        }
                        else {
                            val = "<div>其他金额</div>";
                            $this.closest(".btn_other").removeClass("active");
                        }

                        $this.closest(".btn_other").html(val);
                    });

                    if ($this.find(".other_money").length == 0) {
                        $this.find("div").html($npt);
                        $npt.focus();
                    }
                }
            },

            //选择支付方式
            choosePayMethod: function (e) {
                e.stopImmediatePropagation();
                var $this = $(e.currentTarget);
                $this.siblings().removeClass("active");
                $this.addClass("active");
            },

            rechargePay: function () {
                var money = $(".money_list .active").text();
                money = $.trim(money);
                if ($.isBlank(money) || parseInt(money) === 0) {
                    $.message("warn", {
                        content: '请输入或者选择充值金额'
                    });
                    return;
                }
                //创建订单
                var payType = $(".pay-wrap .active").find(".icon-select").attr("data-id"); //充值支付方式
                Api.rechargePay(money, payType, function (data) {
                    if (!$.isBlank(data.result.alipay_wap)) {
                        utils.storage.set("alipay_url", data.result.alipay_wap);
                        window.location.href = window.ctx + "/pay/alipayTips.html?redirectUrl=" + data.result.alipay_wap;

                    } else if (!$.isBlank(data.wechat)) {

                    }
                });
            }


        });

        var initData = function () {

            Api.getRechargeTemplate(null, function (successData) {

                rechargeTemplateData = successData.result.templates;

                var template = _.template(rechargeTemplate);

                $(".recharge_template_desc").html(rechargeTemplateData[0].desc);

                $page.empty().append(template(successData.result));
            });
        };


        return rechargeView;
    });

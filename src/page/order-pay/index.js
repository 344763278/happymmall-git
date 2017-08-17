require('./index.css');
require('page/common/top-nav/index.js');
require('page/common/search/index.js');

var crumb         = require('page/common/crumbs/index.js');
var _mm 		  = require('util/mm.js');
var _order 		  = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	init : function(){
		this.onLoad();
	},
	onLoad : function() {
		this.loadPage();
		this.LoadCrumb();
		
	},
	// 加载面包屑
	LoadCrumb : function(){
		crumb.init('订单支付');
	},
	// 加载页面
	loadPage : function(){
		var _this    = this,
		    orderNo  = _mm.getUrlParam('orderNumber'),
		    $orderPay = $('.order-pay');
		_order.orderPay(orderNo, function(res){
			_this.render(res, $orderPay);
			// 请求成功并渲染页面后，等待付款，然后监听付款状态
			_this.listenOrderPayStatus();
		}, function(errorMsg){ 
			$orderPay.html('<p style="color:red;">'+errorMsg+'</p>');
		});
	},
	// 渲染页面
	render : function(res, $wrap){
		var html = _mm.renderHtml(templateIndex, res);
		$wrap.html(html);
	},
	// 每个5秒监听一次订单状态，看看是否付款成功，如果成功就跳转
	listenOrderPayStatus(){
		var orderNo  = _mm.getUrlParam('orderNumber');
		setInterval(function(orderNo){
			_order.listenOrderPayStatus(orderNo, function(res){
				console.log(res)
				// 付款成功，那么就跳结果也
				if(res === false){ 
					window.location.href = 'result.html?type=pay&orderNo='+_mm.getUrlParam('orderNumber');
				}
			}, function(errorMsg){

			});
		}, 5e3);
		
	}
};

$(function(){
	page.init();
});
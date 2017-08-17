require('./index.css');
require('page/common/top-nav/index.js');
require('page/common/search/index.js');


var crumb         = require('page/common/crumbs/index.js');
var _mm    		  = require('util/mm.js');
var _order 	      = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadOrderDetail();
		this.LoadCrumb();
	},
	bindEvent : function(){
		this.gotoPay();
		this.cancelOrder();
	},
	loadOrderDetail : function(){
		var _this = this;
		var orderNumber = _mm.getUrlParam('orderNumber');
		 _order.orderDetail(orderNumber, function(res){
		 	res.isCancel = res.statusDesc === '已取消' ? false :  true; 
		 	_this.render(res);  
		 }, function(errorMsg){
		 	_mm.errorTips(errorMsg);
		 });
	},
	// 加载面包屑
	LoadCrumb : function(){
		crumb.init('订单详情');
	},
	gotoPay : function(){
		$(document).on('click', '.pay', function(){
			var orderNo = $(this).data('order-no');  
			window.location.href = './order-pay.html?orderNumber='+orderNo; 
		});
	},
	cancelOrder : function(){
		$(document).on('click', '.cancel', function(){
			var orderNo = $(this).data('order-no');
			if(confirm('你确定要取消订单吗？')){
				_order.orderCancel(orderNo, function(res, msg){ 
					$('.pay, .cancel').hide();
					$('.order-status').text('已取消');
				}, function(errorMsg){
					_mm.errorTips(errorMsg);
				});
			}; 
			
		});
	},
	render : function(res){
		var html = _mm.renderHtml(templateIndex, res);
		$('.order-detail-wrap').html(html);
	}
};

$(function(){
	page.init();
});
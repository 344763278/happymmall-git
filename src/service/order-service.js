var _mm = require('util/mm.js');

order = { 
	// 获取从购物车页面过来的购物车列表
	getOrderCartProduct : function(resolve, reject){ 
		_mm.request({
			method  : 'POST',
			url     : _mm.getServerUrl('/order/get_order_cart_product.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 创建一个订单
	createOrder : function(shippingId, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				shippingId : shippingId
			},
			url     : _mm.getServerUrl('/order/create.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 获取订单列表 
	getOrderList : function(data, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    :  data,
			url     : _mm.getServerUrl('/order/list.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 某个订单的详情页
	orderDetail : function(orderNo, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				orderNo : orderNo
			},
			url     : _mm.getServerUrl('/order/detail.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 取消某个订单
	orderCancel : function(orderNo, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				orderNo : orderNo
			},
			url     : _mm.getServerUrl('/order/cancel.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 去支付接口
	orderPay : function(orderNo, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				orderNo : orderNo
			},
			url     : _mm.getServerUrl('/order/pay.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 监听订单支付状态
	listenOrderPayStatus : function(orderNo, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				orderNo : orderNo
			},
			url     : _mm.getServerUrl('/order/query_order_pay_status.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 支付宝回调
	alipayCallback : function(orderNo, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				orderNo : orderNo
			},
			url     : _mm.getServerUrl('/order/alipay_callback.do'), 
			success : resolve,
			error   : reject
		});
	}
};

module.exports = order;
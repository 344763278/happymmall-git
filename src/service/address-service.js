var _mm = require('util/mm.js');

shipping = { 
	// 获取地址列表
	getShippingList : function(resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				pageNum  : 1,
				pageSize : 20
			},
			url     : _mm.getServerUrl('/shipping/list.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 选中一个地址  
	selectShipping : function(shippingId, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				shippingId  : shippingId
			},
			url     : _mm.getServerUrl('/shipping/select.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 编辑地址  
	updataShipping : function(data, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : data,
			url     : _mm.getServerUrl('/shipping/update.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 删除地址  
	deleteShipping : function(shippingId, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				shippingId : shippingId
			},
			url     : _mm.getServerUrl('/shipping/del.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 创建/添加地址  
	createShipping : function(data, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : data,
			url     : _mm.getServerUrl('/shipping/add.do'), 
			success : resolve,
			error   : reject
		});
	}
};

module.exports = shipping;
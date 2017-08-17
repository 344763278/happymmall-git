var _mm = require('util/mm.js');

product = {
	//获取商品list数据
	getProductList : function(params, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : params,
			url     : _mm.getServerUrl('/product/list.do'),
			success : resolve,
			error   : reject
		});
	},
	//获取商品详情数据
	getProductDetail : function(productId, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				productId : productId
			},
			url     : _mm.getServerUrl('/product/detail.do'),
			success : resolve,
			error   : reject
		});
	}
};

module.exports = product;
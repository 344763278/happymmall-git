var _mm = require('util/mm.js');

cart = {
	//获取购物车数量 
	getCartCount : function(resolve, reject){ 
		_mm.request({
			url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error   : reject
		});
	},
	// 商品加入购物车 
	addCart : function(data, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			url     : _mm.getServerUrl('/cart/add.do'),
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 获取购物车商品列表  /cart/update.do
	getCartList : function(resolve, reject){ 
		_mm.request({
			method  : 'POST',
			url     : _mm.getServerUrl('/cart/list.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 获取购物车商品列表,比如点击加和减  
	updateCart : function(data, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : data,
			url     : _mm.getServerUrl('/cart/update.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 删除某个或某几个购物车商品,若删除多个,把id用逗号隔开再连接
	deleteProducts : function(productIds, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				productIds : productIds
			},
			url     : _mm.getServerUrl('/cart/delete_product.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 选中某个商品（基于删除一个商品） 
	selectOneProduct : function(productId, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				productId : productId
			},
			url     : _mm.getServerUrl('/cart/select.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 取消选中某个商品  
	unSelectOneProduct : function(productId, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : {
				productId : productId
			},
			url     : _mm.getServerUrl('/cart/un_select.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 购物车全选 
	selectAll : function(resolve, reject){ 
		_mm.request({
			method  : 'POST', 
			url     : _mm.getServerUrl('/cart/select_all.do'), 
			success : resolve,
			error   : reject
		});
	},
	// 购物车取消全选 
	unSelectAll : function(resolve, reject){ 
		_mm.request({
			method  : 'POST', 
			url     : _mm.getServerUrl('/cart/un_select_all.do'), 
			success : resolve,
			error   : reject
		});
	}
};

module.exports = cart;
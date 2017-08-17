require('./index.css');
require('page/common/search-simple/index.js');
var _mm = require('util/mm.js');


var page = {
	init:function(){
		this.onLoad();
	},
	onLoad:function(){
		var ele = _mm.getUrlParam('type');
		$('.'+ele).show();

		if(ele === 'pay'){
			var orderNo = _mm.getUrlParam('orderNo');
			$('.order-no').text(orderNo);
		}
	}
};

$(function(){
	page.init();
})
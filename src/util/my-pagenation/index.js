require('./index.css'); 
var _mm           = require('util/mm.js');
var templateIndex = require('./index.string');

var pagenation = function ($wrap, option){
	this.$wrap    = $($wrap);
	this.option   = option; 
	this.init(); 
};

pagenation.prototype.init = function(){
	// 拿到参数，渲染页面
	var _this  = this,
	    option = this.option,  
	    html   = _mm.renderHtml(templateIndex, option); 
	// 如果只有1也，那么就不显示分页
	if(option.pages <= 1)return null;
	this.$wrap.html(html);

	// // 把当前页加个checked class
	// var pageItem      = $('.page-item'),
	//     $currPageItem = null; 
	// pageItem.each(function(index, item){  
	// 	if($(item).text() === (option.pageNum+'')){ 
	// 		$currPageItem = $(item);
	// 		return;
	// 	};
	// }); 
	// $currPageItem.addClass('checked');

	// // 点击某页
	// $(document).off('click', '.page-item').on('click', '.page-item', function(){ 
	// 	var $pageItem = $(this);
	// 	if($pageItem.hasClass('checked')){
	// 		return;
	// 	};
	// 	var num = $pageItem.data('page-num');  
	// 	if(typeof _this.callback === 'function'){
	// 		_this.callback(num); 
	// 	}
	// });

};

module.exports = pagenation;
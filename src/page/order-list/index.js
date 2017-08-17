require('./index.css');
require('page/common/top-nav/index.js');
require('page/common/search/index.js');

var crumb         = require('page/common/crumbs/index.js');
var _mm    		  = require('util/mm.js');
var pagenation 	  = require('util/my-pagenation/index.js');
var _order 	      = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	data : {
		pageSize : 4,
		pageNum  : 1
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadOrderList();
		this.LoadCrumb();
	},
	bindEvent : function(){

	},
	loadOrderList : function(){
		var _this = this;
		$('.order-list-wrap').html('<p class="loading"></p>');
		_order.getOrderList(this.data, function(res){
			var $wrap = $('.order-list-wrap'); 
			var html = _mm.renderHtml(templateIndex, res); 
			$wrap.html(html);
			
			// 加载分页信息
			_this.loadPagenation(res); 

		}, function(errorMsg){ 
			$('.order-list-wrap').html('<p>'+errorMsg+'</p>'); 
		})
	},
	// 加载面包屑
	LoadCrumb : function(){
		crumb.init('订单列表');
	},
	// 加载分页信息
	loadPagenation : function(res){ 
		var _this = this; 
		new pagenation('.pagenation', res); 

		// 把当前页加个checked class
		var pageItem      = $('.page-item'),
		    $currPageItem = null; 
		pageItem.each(function(index, item){  
			if($(item).text() === (res.pageNum+'')){ 
				$currPageItem = $(item);
				return;
			};
		}); 
		$currPageItem.addClass('checked');

		// 点击某页
		$(document).off('click', '.page-item').on('click', '.page-item', function(){ 
			var $pageItem = $(this);
			if($pageItem.hasClass('checked')){
				return;
			}; 
		    num = $pageItem.data('page-num');  
		    _this.data.pageNum = num;  
			_this.loadOrderList();
		});

		// 点击上一页
		$(document).off('click', '.prev').on('click', '.prev', function(){
			if($(this).hasClass('disable'))return;
			var num = res.prePage;
		    _this.data.pageNum = num;  
			_this.loadOrderList();
			
		});

		// 点击下一页
		$(document).off('click', '.next').on('click', '.next', function(){
			if($(this).hasClass('disable'))return;
			var num = res.nextPage;
		    _this.data.pageNum = num;  
			_this.loadOrderList();
			
		});
	}
};

$(function(){
	page.init();
});
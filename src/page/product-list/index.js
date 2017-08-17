require('./index.css');
require('page/common/top-nav/index.js');
require('page/common/search/index.js');


var _mm 	      = require('util/mm.js');
var pagenation 	  = require('util/my-pagenation/index.js');
var _product      = require('service/product-service.js');
var templateIndex = require('./index.string');


var page = {
	data : {
		categoryId : '',
		keyword    : '',
		pageNum    : 1,
		pageSize   : 2,
		orderBy    : 'default'
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		var _this = this,
		    $wrap = $('.goods-items');
		this.data.categoryId = _mm.getUrlParam('categoryId');
		this.data.keyword    = _mm.getUrlParam('keyword');
		this.data.categoryId !== null ? delete this.data.keyword : delete this.data.categoryId; 
		$wrap.html('<p class="loading"></p>');
		_product.getProductList(this.data, function(res){
			// 请求成功，开始render页面 
			_this.render(res); 
			// 加载分页信息
			_this.loadPagenation(res); 
		}, function(errorMsg){
			$wrap.html('<p>'+errorMsg+'</p>');
		});
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
			_this.onLoad();
		});

		// 点击上一页
		$(document).off('click', '.prev').on('click', '.prev', function(){
			if($(this).hasClass('disable'))return;
			var num = res.prePage;
		    _this.data.pageNum = num;  
			_this.onLoad();
			
		});

		// 点击下一页
		$(document).off('click', '.next').on('click', '.next', function(){
			if($(this).hasClass('disable'))return;
			var num = res.nextPage;
		    _this.data.pageNum = num;  
			_this.onLoad();
			
		});
	}, 
	bindEvent : function(){ 
		var _this = this;
		// 点击默认排序按钮，请求接口
		$('.default').click(function(){
			if(!$(this).hasClass('active')){
				$(this).addClass('active').siblings().removeClass('active')
				$('.price').text('价格从低到高');
				// 获取默认排序接口
				_this.request('default', _this); 
			};
		});

		// 点击价格排序接口
		$('.price').click(function(){ 
			// 重复点击，切换价格排序图标(图标不显示，所以用文字)
			if($(this).hasClass('active') ){
				var text = $(this).text();
				if(text === '价格从高到低'){
					$(this).text('价格从低到高');
					// 获取价格升序接口
					_this.request('price_asc', _this); 
				}else{
					$(this).text('价格从高到低'); 
					// 获取价格降序接口
					_this.request('price_desc', _this); 
				}; 
			};

			// 切换价格排序的class
			if(!$(this).hasClass('active')){
				$(this).addClass('active').siblings().removeClass('active');
				// 获取价格升序接口 
				_this.request('price_asc', _this); 
			}; 
		});
	},
	// 渲染页面
	render : function(res){
		var renderData = res;
		renderData.isEmpty = renderData.list.length;
		var html = _mm.renderHtml(templateIndex, renderData);
		$('.goods-items').html(html);
	},
	// 请求接口函数封装
	request : function(orderBy, _this){
		_this.data.orderBy = orderBy;
		_product.getProductList(_this.data, function(res){
			// 请求成功，开始render页面  
			_this.render(res);
		}, function(errorMsg){
			_mm.errorTips(errorMsg);
		});
	}
};

$(function(){
	page.init();
});


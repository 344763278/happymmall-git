require('./index.css');
require('page/common/top-nav/index.js');
require('page/common/search/index.js');
 
var _mm 	 	  = require('util/mm.js');
var _product 	  = require('service/product-service.js');
var _cart 	      = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
	data : {

	},
	init : function(){
		this.onLoad();
		this.bindEvent(); 
	},
	onLoad : function(){ 
		var productId = _mm.getUrlParam('productId');
		if(productId){
			this.render(productId);  	
		}; 
	},
	bindEvent : function(){
		var _this = this;

		// 鼠标移过小图切换大图
		// 像这种全部加载出来的东西，一定要事件委托
		$(document).on('mouseenter', '.item-li', function(){ 
			$(this).addClass('active').siblings().removeClass('active');
			var src = $(this).find('img').attr('src'); 
			$('.bg-img ').find('img').attr('src',src);
		});  

		// 点击增加商品数量按钮
		$(document).on('click', '.up', function(){
			var maxCount   = _this.data.stock;
			var num 	   = $('.count-input').text()
			var inputCount = parseInt(num); 
			if(inputCount < maxCount && maxCount){
				inputCount++;
				$('.count-input').text(inputCount);
			}else{
				_mm.errorTips('该商品库存不足')
			};
		});

		// 点击减少商品数量按钮
		$(document).on('click', '.down', function(){
			var minCount   = 1;
			var num 	   = $('.count-input').text()
			var inputCount = parseInt(num); 
			if(inputCount > minCount){
				inputCount--;
				$('.count-input').text(inputCount);
			}else{
				// _mm.errorTips('最少选择一件')
			};
		});


		// 点击加入购物车
		$(document).on('click', '.join-cart', function(){  
			var data = {
				productId : _this.data.id,
				count     : parseInt( $('.count-input').text() )
			}; 

			_cart.addCart(data, function(res, msg){ 
				window.location.href = './result.html?type=addCart'
			}, function(errorMsg){ 
				_mm.errorTips(errorMsg);
			})


		});

	},
	render : function(productId){
		var _this  = this,
		    $wrap  = $('.goods-detail');
		$wrap.html('<p class="loading"></p>');
		_product.getProductDetail(productId, function(res){ 
			_this.data = res;
			_this.data.subImages = res.subImages.split(','); 
			var html = _mm.renderHtml(templateIndex, _this.data);
			$wrap.html(html);

		}, function(errorMsg){
			$wrap.html('<p>'+errorMsg+'</p>');
		});
	},

};

$(function(){
	page.init();
});
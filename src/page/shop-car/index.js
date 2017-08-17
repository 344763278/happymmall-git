require('./index.css'); 
require('page/common/search/index.js');

var crumb         = require('page/common/crumbs/index.js');
var topNavPage    = require('page/common/top-nav/index.js');
var _mm 		  = require('util/mm.js');
var _cart  		  = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
	data : {

	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadShopCarList();
		this.LoadCrumb();
	},
	// 加载面包屑
	LoadCrumb : function(){
		crumb.init('购物车详情');
	},
	loadShopCarList : function(){
		var _this = this; 
		// 加载页面购物车列表
		// 注意:先缓存数据,第一是因为购物车列表有头个尾,根据list列表是否为空来判断是否
		// 显示整个页面(还是vue简单),其次就是 
		$('.shop-car').html('<p class="loading"></p>');
		_cart.getCartList(function(res){
			// 请求成功，render页面
			_this.render(res); 
		}, function(errorMsg){
			// 请求失败，提示
			$('.shop-car').html('<p>'+errorMsg+'</p>');
		}); 
	},
	bindEvent : function(){
		var _this = this;
		// 点击加，增加商品数量
		$(document).on('click', '.inc', function(){ 
			// data挂载的时候，不支持大小混写
			var $parent  = $(this).parents('.list-parent'),
				$n       = $(this).parent().siblings('.n'),
			    maxCount = $parent.data('stock'),
			    quantity = parseInt( $n.text() ),
			    id       = $parent.data('id'); 
			if(quantity < maxCount){  
				quantity++;    
				$n.text(quantity);

				var params = {
					productId : id,
					count     : quantity
				};
				// 逻辑OK，请求数据接口 
				_cart.updateCart(params, function(res){
					_this.render(res); 
				}, function(errorMsg){
					_mm.errorTips(errorMsg);
				})
			}else{
				alert('亲，库存不足了');
			} 
		})

		// 点击减，减少商品数量
		$(document).on('click', '.dec', function(){  
			var $parent  = $(this).parents('.list-parent'),
				$n       = $(this).parent().siblings('.n'),
			    minCount = 1,
			    quantity = parseInt( $n.text() ),
			    id       = $parent.data('id'); 
			if(quantity > minCount){  
				quantity--;    
				$n.text(quantity);

				var params = {
					productId : id,
					count     : quantity
				};
				// 逻辑OK，请求数据接口 
				_cart.updateCart(params, function(res){
					_this.render(res);
				}, function(errorMsg){
					_mm.errorTips(errorMsg);
				});
			}; 
		});

		// 点击删除，删除商品
		$(document).on('click', '.delete-product', function(){  
			var $parent  = $(this).parents('.list-parent'), 
			    id       = $parent.data('id');  

			// 逻辑OK，请求数据接口 
			_cart.deleteProducts(id, function(res){
				_this.render(res);
			}, function(errorMsg){
				_mm.errorTips(errorMsg);
			}); 
		});

		// 点击全选，全选商品和取消全选商品
		$(document).on('click', '.all-check', function(){     
			// 判断点击的元素是否存在checked属性
			if($(this).is(":checked")){
				_cart.selectAll(function(res){
					_this.render(res);
				}, function(errorMsg){
					_mm.errorTips(errorMsg);
				}); 
			}else{
				_cart.unSelectAll(function(res){
					_this.render(res);
				}, function(errorMsg){
					_mm.errorTips(errorMsg);
				});
			};
		}); 

		// 点击单选按钮，对商品进行选择
		$(document).on('click', '.check-sigle', function(){  
			var productId = $(this).parents('.list-parent').data('id');

			// 判断点击的元素是否存在checked属性
			if($(this).is(":checked")){
				_cart.selectOneProduct(productId, function(res){
					_this.render(res);
				}, function(errorMsg){
					_mm.errorTips(errorMsg);
				}); 
			}else{
				_cart.unSelectOneProduct(productId, function(res){
					_this.render(res);
				}, function(errorMsg){
					_mm.errorTips(errorMsg);
				});
			} 
		});

		// 点击取消选中，取消已经选中的商品
		$(document).on('click', '.del-checked', function(){  

			var $checkList = $('.check-sigle'),
			    productIds = [];
			$checkList.each(function(index, item){ 
				// 循环对象，看是否被选中，选中的商品，就找到其父级元素上的商品id
				if($(item).is(':checked')){ 
					var productId = $(item).parents('.list-parent').data('id');
					productIds.push(productId);
				}; 
			}); 
			// 把数组转化为字符串，用逗号连接下
			productIds = productIds.join(','); 

			// 逻辑OK，请求数据接口 
			_cart.deleteProducts(productIds, function(res){
				_this.render(res);
			}, function(errorMsg){
				_mm.errorTips(errorMsg);
			}); 
		}); 

		// 点击取消选中，取消已经选中的商品
		$(document).on('click', '.pay-money', function(){   
			if(_this.data.cartTotalPrice){ 
				window.location.href = './order-confirm.html'
			}else{
				alert('请选择商品再提交')
			}
		}); 


	},
	render : function(res){
		var _this          = this,
		html 			   = _mm.renderHtml(templateIndex, _this.data),
		$shopCar 		   = $('.shop-car');
		_this.data 		   = res;
		_this.data.isEmpty = _this.data.cartProductVoList.length; 

		var html 		   = _mm.renderHtml(templateIndex, _this.data); 
		$shopCar.html(html);

		// 触发导航条的购物车数量接口
		topNavPage.getCartCount();
	}
};

$(function(){
	page.init();
});


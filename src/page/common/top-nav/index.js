require('./index.css');

var _car  = require('service/cart-service.js'); 
var _user = require('service/user-service.js'); 
var _mm   = require('util/mm.js'); 

var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
		this.getCartCount(); 
	},
	onLoad : function(){ 
		//获取用户信息,如果可以获取到，那么就是登录状态
		_user.getUserInfo(function(res){
			$('.login-reg').hide().siblings('.welcome').show();
			$('.username').text(res.username);
		}, function(errorMsg){
			//.....
		})
	},
	bindEvent : function(){
		$('.login-out').click(function(){
			_user.logout(function(res){
				//如果退出成功，就强制刷新，自然就切换登录状态
				window.location.reload();
			}, function(errorMsg){
				_mm.errorTip(errorMsg);
			})
		});

		$('#do-login').click(function(){
			_mm.doLogin();
		});
	},
	// 这个要在其页面触发的，所以需要单独列出来，利于其他页面调用
	getCartCount : function(){
		//获取购物车的数量
		_car.getCartCount(function(res){  
			$('.cart-count').text(res||0);
		}, function(errorMsg){
			$('.cart-count').text(0);
		});
	}
};

$(function(){
	page.init();
});

module.exports = page;
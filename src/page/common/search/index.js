require('./index.css'); 
var _mm = require('util/mm.js');

var page = {
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		var keyword = _mm.getUrlParam('keyword');
		if(keyword){
			$('.search-input').val(keyword);
		};
	},
	bindEvent:function(){
		var _this = this;
		$('.search-btn').click(function(){
			_this.submit();
		});
		$('.search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		})
	},
	submit : function(){
		var keyword = $('.search-input').val();
		if(keyword){
			window.location.href = './product-list.html?keyword='+keyword;
		};
	}
};

$(function(){ 
	page.init();
});
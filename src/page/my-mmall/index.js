require('./index.css');
require('../common/top-nav/index.js');
require('../common/search/index.js');
require('../common/crumbs/index.js');


var _mm 			= require('util/mm.js');
var _user			= require('service/user-service.js');
var templateIndex   = require('./index.string');

var page = {
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		$('.ul-cont').html('<p class="loading"></p>');
		_user.getUserInfo(function(res){
			console.log(res) 
			var html = _mm.renderHtml(templateIndex, res);
			$('.ul-cont').html(html);
		}, function(errorMsg){ 
			// 请求失败，要求强制登录？？？？
			_mm.doLogin();
			// _mm.errorTips(errorMsg);
		})
	},
	bindEvent:function(){

	}
};

$(function(){
	page.init();
})
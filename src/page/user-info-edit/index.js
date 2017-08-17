require('./index.css');
require('page/common/top-nav/index.js');
require('page/common/search/index.js');
require('page/common/crumbs/index.js');

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
			var html = _mm.renderHtml(templateIndex, res);
			$('.ul-cont').html(html);
		}, function(errorMsg){
			_mm.errorTips(errorMsg);
		})
	},
	bindEvent:function(){
		// 开始点击
		$('.edit').click(function(){
			var formData = {
				phone 	 : $.trim($('.form-phone').val()),
				email 	 : $.trim($('.form-email').val()),
				question : $.trim($('.form-question').val()),
				answer   : $.trim($('.form-answer').val())
			};
			// 字段验证结果
			var validataResult = myValidate(formData);

			// 根据结果做事情
			if(validataResult.status === true){  
				_user.updataInfo(formData, function(res, msg){
					// 请求成功，则提示再跳转
					_mm.successTips(msg);
					window.location.href = './my-mmall.html';
				}, function(errorMsg){
					// 请求失败，直接提示
					_mm.errorTips(errorMsg);
				})
			}
			else{
				//验证不OK，提示验证失败的信息
				_mm.errorTips(validataResult.msg);
			};

			function myValidate(formData){ 
				var result = {
					status : false,
					msg    : ''
				}; 
				// 手机格式验证
				if(!_mm.validate(formData.phone, 'phone')){
					result.msg = '手机格式不正确'
					return result;
				}
				// 邮箱格式验证
				if(!_mm.validate(formData.email, 'email')){
					result.msg = '邮箱格式不正确'
					return result;
				}
				// 密保问题非空验证
				if(!_mm.validate(formData.question, 'require')){
					result.msg = '密保问题不能为空'
					return result;
				}
				// 密保答案非空验证
				if(!_mm.validate(formData.answer, 'require')){
					result.msg = '密保答案不能为空'
					return result;
				}

				result.status = true;
				result.msg = '验证成功'
				return result; 
			}

		})
	}
};

$(function(){
	page.init();
})
require('./index.css');
require('../common/search-simple/index.js');
 

var _user = require('service/user-service.js');
var _mm   = require('util/mm.js');

//字段验证结果
var errorTip = {
	show:function(msg){
		$('.proving').show().find('.text').text(msg);
	},
	hide:function(){
		$('.proving').hide();
	}
};

var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;

		// 验证用户名是否存在  
		$('.form-username').blur(function(){  

			var username = $.trim($('.form-username').val()); 

			if(username){
				_user.checkUsername(username, function(res){  
					errorTip.show('恭喜你，该用户名可以使用')
				}, function(errorMsg){ 
					errorTip.show(errorMsg)
				})
			}
		})
		
		

		//点击提交 
		$('.button-btn').click(function(){
			_this.submit();
		});
		//按下enter提交
		
	},
	submit:function(){
		var formData = {
			username : $.trim($('.form-username').val()),
			password : $.trim($('.form-password').val()), 
			phone : $.trim($('.form-phone').val()),
			email : $.trim($('.form-email').val()),
			question : $.trim($('.form-question').val()),
			answer : $.trim($('.form-answer').val()) 
		};

		var validataResult = myValidate(formData);
		if(validataResult.status === true){
			//验证OK，开始请求接口
			errorTip.hide(); 
			_user.register(formData, function(res){ 
				//注册成功后的处理 
				window.location.href = './result.html?type=register'
			}, function(errorMsg){
				errorTip.show(errorMsg);
			})
		}else{
			//验证不OK，提示验证失败的信息
			errorTip.show(validataResult.msg);
		};

		function myValidate(formData){ 
			var result = {
				status : false,
				msg    : ''
			};
			// 用户名非空验证
			if(!_mm.validate(formData.username, 'require')){
				result.msg = '用户名不能为空'
				return result;
			}
			// 密码非空验证
			if(!_mm.validate(formData.password, 'require') || formData.password.length<6){
				result.msg = '密码不能小于6位'
				return result;
			}
			// 密码一致性性验证
			if(formData.password.length != $('.form-password-repeat').val().length){
				result.msg = '两次密码不一致'
				return result;
			}
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
	}

};

$(function(){
	page.init();
})
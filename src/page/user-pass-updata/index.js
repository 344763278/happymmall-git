require('./index.css');
require('page/common/top-nav/index.js');
require('page/common/search/index.js');
require('page/common/crumbs/index.js');

var _user = require('service/user-service.js');
var _mm   = require('util/mm.js');

var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		//点击提交
		$('.edit').click(function(){
			_this.submit();
		}); 
		
	},
	submit:function(){
		var formData = {
			passwordOld : $.trim($('.old-pass').val()),
			passwordNew : $.trim($('.new-pass').val()) 
		};

		var validataResult = myValidate(formData); 
		if(validataResult.status === true){ 
			//验证OK，开始请求接口
			_user.resetPassword(formData, function(res, msg){ 
				//注册成功后的处理  
				window.location.href = './result.html?type=reset'
			}, function(errorMsg){
				_mm.errorTips(errorMsg);
			})
		}else{
			//验证不OK，提示验证失败的信息
			_mm.errorTips(validataResult.msg);
		};

		// 验证信息
		function myValidate(formData){ 
			var result = {
				status : false,
				msg    : ''
			};
			// 用户名非空验证
			if(!_mm.validate(formData.passwordOld, 'require')){
				result.msg = '原密码不能为空'
				return result;
			}
			// 密码非空验证
			if(!_mm.validate(formData.passwordNew, 'require') || formData.passwordNew.length<6){
				result.msg = '新密码不能小于6位'
				return result;
			}
			// 密码一致性性验证
			if(formData.passwordNew.length != $('.pass-repeat').val().length){
				result.msg = '两次密码不一致'
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
require('./index.css');
require('../common/search-simple/index.js');

var _user = require('service/user-service.js');
var _mm   = require('util/mm.js');

//字段验证结果
var errrorTip = {
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
		//点击提交
		$('.button-btn').click(function(){
			_this.submit();
		});
		//按下enter提交
		
	},
	submit:function(){
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())
		};

		var validataResult = myValidate(formData);
		if(validataResult.status === true){
			//验证OK，开始请求接口
			errrorTip.hide(); 
			_user.login(formData, function(res){ 
				//登录成功后的处理,这个要配合_mm.doLogin使用，否则无效;
				var href = _mm.getUrlParam('redirect');
				window.location.href = href;
			}, function(errorMsg){
				errrorTip.show(errorMsg);
			})
		}else{
			//验证不OK，提示验证失败的信息
			errrorTip.show(validataResult.msg);
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
			if(!_mm.validate(formData.password, 'require')){
				result.msg = '密码不能为空'
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
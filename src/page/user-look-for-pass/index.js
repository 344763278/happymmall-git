require('./index.css');
require('../common/search-simple/index.js');

var _user = require('service/user-service.js');
var _mm   = require('util/mm.js');

//字段验证结果提示
var errorTip = {
	show:function(msg){
		$('.proving').show().text(msg);
	},
	hide:function(){
		$('.proving').hide();
	}
};


var page = {
	data : {
		username    : '', 
		question    : '',
		answer 		: '',
		token 		: ''
	},
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){ 
		var _this = this;
		$('.btn1').click(function(){
			var username = $.trim($('#username').val());
			if(username){
				_user.checkUsername(username, function(res){  
					errorTip.show('用户名不存在，请输入有效的用户名');
					return; 
				}, function(errorMsg){    
					//存在，关闭提示不需要提示
					errorTip.hide(); 
					_this.data.username = username;  
					// 验证用户名已经存在了，开始第一个接口
					_this.step1(username);
				});
			}
		}) 
	},
	step1 : function(username){
		var _this = this;
		_user.forgetGetQuestion(username, function(res){
			// console.log(res)
			_this.data.question = res;
			$('.step1').hide();
			$('.step2').show();
			$('.question').text(res);
			$('.btn2').click(function(){
				var answer = $.trim($('#answer').val());
				if(answer){
					_this.step2(answer);
				}else{
					errorTip.show('请输入密保答案');
				}
			})
		}, function(errorMsg){
			errorTip.show(errorMsg);
		})
	},
	step2 : function(answer){
		var _this = this;
		var formData = {
			username : this.data.username,
			question : this.data.question,
			answer   : answer
		};
		_user.forgetCheckAnswer(formData, function(res){
			_this.data.answer = formData.answer;
			_this.data.token = res;

			$('.step2').hide();
			$('.step3').show();
			_this.step3();

		}, function(errorMsg){ 
			errorTip.show(errorMsg);
		})
	},
	step3 : function(){
		var _this = this;
		$('.btn3').click(function(){

			var newPassword = $.trim($('#new-pass').val());
			var formData = {
				username : _this.data.username,
				passwordNew : newPassword,
				forgetToken : _this.data.token
			};

			if(newPassword && newPassword.length>=6){
				_user.forgetResetPassword(formData, function(res, msg){
					_mm.successTips(msg);
					window.location.href = './result.html?type=reset'
				}, function(errorMsg){
					errorTip.show(errorMsg);
				})

			}else{
				errorTip.show('请输入不小于6位的密码');
			}

		})
	}  

};

$(function(){
	page.init();
})
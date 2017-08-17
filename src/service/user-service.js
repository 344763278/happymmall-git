var _mm = require('util/mm.js');

user = {
	//获取购物车数量
	getUserInfo : function(resolve, reject){ 
		_mm.request({
			method  : 'POST',
			url     : _mm.getServerUrl('/user/get_user_info.do'),
			success : resolve,
			error   : reject
		});
	}, 
	//退出登录
	logout     : function(resolve, reject){ 
		_mm.request({
			method  : 'POST',
			url     : _mm.getServerUrl('/user/logout.do'),
			success : resolve,
			error   : reject
		});
	},
	// 登录 
	login      : function(formData, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : formData,
			url     : _mm.getServerUrl('/user/login.do'),
			success : resolve,
			error   : reject
		});
	},
	// 注册
	register      : function(formData, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : formData,
			url     : _mm.getServerUrl('/user/register.do'),
			success : resolve,
			error   : reject
		});
	},
	// 更新个人信息
	updataInfo      : function(formData, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : formData,
			url     : _mm.getServerUrl('/user/update_information.do'),
			success : resolve,
			error   : reject
		});
	},
	// 重置密码
	resetPassword   : function(formData, resolve, reject){ 
		_mm.request({
			method  : 'POST',
			data    : formData,
			url     : _mm.getServerUrl('/user/reset_password.do'),
			success : resolve,
			error   : reject
		});
	},
	// 检查用户名是否存在，注册页异步验证
	checkUsername   : function(username, resolve, reject){ 
		_mm.request({ 
			method  : 'POST',
			data    : {
				type    : 'username',
                str     : username
			},
			url     : _mm.getServerUrl('/user/check_valid.do'),
			success : resolve,
			error   : reject
		});
	},
	// 密码找回第一步，用用户名来获取答案
	forgetGetQuestion : function(username, resolve, reject){
	    _mm.request({
	        url     : _mm.getServerUrl('/user/forget_get_question.do'),
	        data    : {
	            username : username
	        },
	        method  : 'POST',
	        success : resolve,
	        error   : reject
	    }); 
	},
	// 检查密保问题的答案
	forgetCheckAnswer : function(formData, resolve, reject){
	    _mm.request({
	        url     : _mm.getServerUrl('/user/forget_check_answer.do'),
	        data    : formData,
	        method  : 'POST',
	        success : resolve,
	        error   : reject
	    });
	},
	// 前面验证OK，提交用户名，新密码，token设置新密码
	forgetResetPassword : function(formData, resolve, reject){
	    _mm.request({
	        url     : _mm.getServerUrl('/user/forget_reset_password.do'),
	        data    : formData,
	        method  : 'POST',
	        success : resolve,
	        error   : reject
	    });
	} 
};

module.exports = user;
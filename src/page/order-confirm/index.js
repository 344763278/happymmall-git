require('./index.css');
require('page/common/top-nav/index.js');
require('page/common/search/index.js');

var crumb          = require('page/common/crumbs/index.js'); 
var _mm 	 	   = require('util/mm.js');
var _address 	   = require('service/address-service.js');
var _order 	 	   = require('service/order-service.js');
var templateAdress = require('./address.string');
var templateOrder  = require('./order.string');
var templateCitys  = require('./city-option.string');
var templateProvs  = require('./prov-option.string');
var dis            = require('./dis.js');

var page = {
	data : {

	},
	init : function(){
		this.onLoad();
		this.bindEvent(); 
	},
	onLoad : function(){
		this.loadAddressList();
		this.loadCartProducts();
		this.LoadCrumb(); 
	},
	bindEvent : function(){ 
		this.selectShipping();
		this.createOrder();
		this.addNewAddress();
		this.cityLinks();
		this.delAddress();
		this.editAddress();
	},
	// 加载地址列表
	loadAddressList : function(){  
		var _this = this;
		$('.address-items').html('<p class="loading"></p>');
		_address.getShippingList(function(res){
			_this.render(res , templateAdress, 'address-items');
			// 省市信息都要在加载玩地址信息后再加载 
			_this.addressProvince(); 
		}, function(errorMsg){
			$('.address-items').html('<p>'+errorMsg+'</p>');
		}); 
	},
	// 加载地址列表的省会城市
	addressProvince : function(){
		var data = {
			"list" : []
		};

		for(var item in dis){
			data.list.push(item); 
		};

		var html = _mm.renderHtml(templateProvs, data);
		$('#s_province').html(html);

	},
	// 加载从购物车过来的商品列表
	loadCartProducts : function(){  
		var _this = this;
		$('.side-main').html('<p class="loading"></p>');
		_order.getOrderCartProduct(function(res){
			_this.render(res , templateOrder, 'side-main');
		}, function(errorMsg){
			_mm.errorTips(errorMsg);
		})
	},
	LoadCrumb : function(){
		crumb.init('订单确认');
	},
	// 渲染页面
	render : function(res, tem, $wrap){ 
		var html = _mm.renderHtml(tem, res);
		$('.'+$wrap).html(html);
	},
	// 点击选择一个地址,才可以提交
	selectShipping : function(){
		var _this = this;
		$(document).on('click', '.address-item', function(){ 
			var shippingId = $(this).data('shipping-id');
			$(this).addClass('active').siblings('.address-item').removeClass('active');
			_address.selectShipping(shippingId, function(res){ 
				_this.data = res; 
			}, function(errorMsg){
				_mm.errorTips(errorMsg);
			});
		});
	},
	// 点击提交，创建一个新的订单，去付款
	createOrder : function(){
		var _this = this;
		$(document).on('click', '.submit-order' ,function(){
			// 判断数据是不是为空,本身是个空对象,直接判断会出错，根据里面的属性来判断才可以
			if(_this.data.id){
				_order.createOrder(_this.data.id, function(res){
					// 请求成功，跳转到支付页面
					console.log(res)
					window.location.href = './order-pay.html?orderNumber='+res.orderNo;
				}, function(errorMsg){
					_mm.errorTips(errorMsg);
				});
			}else{
				alert('请选择地址再提交');
			};
		});
	},
	// 点击使用新地址，创建一个地址
	addNewAddress : function(){ 
		var _this = this;
		$(document).on('click', '.add', function(e){
			e.stopPropagation(); 
			$('.new-address').show();

			// 先清空
			$('.username').val('');
			$('.s-province').val('请选择');
			$('.detail-area').val('');
			$('.phone').val('');
			$('.zip').val(''); 

			// 点击关闭按钮
			$(document).on('click', '.icon-cross', function(){ 
				$('.new-address').hide();
			});

			// 点击保存地址
			$(document).on('click', '.save-address', function(){
				var formData = {
					receiverName     : $.trim($(this).parents('.new-wrap').find('.username').val()),
					receiverProvince : $.trim($(this).parents('.new-wrap').find('.s-province').val()),
					receiverCity     : $.trim($(this).parents('.new-wrap').find('.s-city').val()),
					receiverAddress  : $.trim($(this).parents('.new-wrap').find('.detail-area').val()),
					receiverPhone    : $.trim($(this).parents('.new-wrap').find('.phone').val()),
					receiverZip      : $.trim($(this).parents('.new-wrap').find('.zip').val()) 
				}; 
				// 字段验证
				if(!_mm.validate(formData.receiverName, 'require')){
					alert('用户名不能为空');
					return;
				};
				if(formData.receiverProvince == '请选择'){
					alert('请选择省');
					return;
				};
				if(!_mm.validate(formData.receiverAddress, 'require')){
					alert('请输入详细地址');
					return;
				};
				if(!_mm.validate(formData.receiverPhone, 'phone')){
					alert('手机格式不正确');
					return;
				};
				if(!_mm.validate(formData.receiverZip, 'require')){
					alert('请输入邮编');
					return;
				};   
				// 请求成功，重新加载地址数据
				_address.createShipping(formData, function(res){
					_mm.successTips('添加地址成功');  
					// 不刷新的话，就会提交几次？
					// $('.new-address').hide();
					// _this.loadAddressList();
					window.location.reload();
				}, function(errorMsg){
					alert(errorMsg);
				}); 
			});  
		}); 
		
	},
	// 删除地址
	delAddress : function(){
		var _this = this;
		$(document).on('click', '.del', function(e){
			// 先阻止冒泡，不然父级会被选择
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('shipping-id'); 
			_address.deleteShipping(shippingId, function(res){
				_this.loadAddressList();
			}, function(errorMsg){
				_mm.errorTips(errorMsg);
			});
		});
	},
	// 编辑地址
	editAddress : function(){
		var _this = this;
		$(document).on('click', '.edit', function(e){
			e.stopPropagation();
			$('.new-address').show();

			// 点击关闭按钮
			$(document).on('click', '.icon-cross', function(){ 
				$('.new-address').hide();
			});

			var formData = {
				receiverName     : $.trim($(this).parents('.address-item').find('.addressee').text()),
				receiverProvince : $.trim($(this).parents('.address-item').find('.province').text()),
				receiverCity     : $.trim($(this).parents('.address-item').find('.form-city').text()),
				receiverAddress  : $.trim($(this).parents('.address-item').find('.detail-area').text()),
				receiverPhone    : $.trim($(this).parents('.address-item').find('.phone').text()),
				receiverZip      : $.trim($(this).parents('.address-item').find('.postal').text()) 
			};  

			$('.new-wrap').find('.username').val(formData.receiverName);
			$('.new-wrap').find('.s-province').val(formData.receiverProvince);
			// $('.new-wrap').find('.s-city').html('<option>'+formData.receiverCity+'</option>'); 
			$('.new-wrap').find('.detail-area').val(formData.receiverAddress);
			$('.new-wrap').find('.phone').val(formData.receiverPhone);
			$('.new-wrap').find('.zip').val(formData.receiverZip);

			// 点击保存编辑后地址
			$(document).on('click', '.save-address', function(){
				var formData = {
					receiverName     : $.trim($(this).parents('.new-wrap').find('.username').val()),
					receiverProvince : $.trim($(this).parents('.new-wrap').find('.s-province').val()),
					receiverCity     : $.trim($(this).parents('.new-wrap').find('.s-city').val()),
					receiverAddress  : $.trim($(this).parents('.new-wrap').find('.detail-area').val()),
					receiverPhone    : $.trim($(this).parents('.new-wrap').find('.phone').val()),
					receiverZip      : $.trim($(this).parents('.new-wrap').find('.zip').val()) 
				}; 
				// 字段验证
				if(!_mm.validate(formData.receiverName, 'require')){
					alert('用户名不能为空');
					return;
				};
				if(formData.receiverProvince == '请选择'){
					alert('请选择省');
					return;
				};
				if(!_mm.validate(formData.receiverAddress, 'require')){
					alert('请输入详细地址');
					return;
				};
				if(!_mm.validate(formData.receiverPhone, 'phone')){
					alert('手机格式不正确');
					return;
				};
				if(!_mm.validate(formData.receiverZip, 'require')){
					alert('请输入邮编');
					return;
				}; 
				console.log(formData)
				_address.updataShipping(formData, function(res){
					console.log(res)
				}, function(errorMsg){
					alert(errorMsg)
				})  
			});

		})
	},
	// 地址城市联动
	cityLinks : function(){ 
		var _this = this;
		$(document).on('change', '#s_province', function(){
			var provValue = $(this).val(); 
			_this.loadCity(provValue); 

		}); 
	},
	// 加载城市信息
	loadCity : function(provValue){
		if(provValue !== '请选择'){
			var citys = dis[provValue];
			data = {"list" : citys};
			var options = _mm.renderHtml(templateCitys, data);
			$('#s_city').html(options);
		}else{
			$('#s_city').html('<option></option>')
		}
	}
		
};

$(function(){
	page.init();
});
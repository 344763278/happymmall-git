
require('./swiper.css');
require('./index.css');
require('./swiper.js');

$(function(){
	var mySwiper = new Swiper ('.swiper-container', {

		// 自动播放
		autoplay  : 2000,

		// 起始页(不加就算0,)
		initialSlide : 0,

		// 移动方向(vertical和horizontal)
	   direction  : 'horizontal',
	   // 速度，默认是300
	   // 
	   speed : 500,
	   // 是否自动循环
	   loop       : true, 

	   // 鼠标滚轮控制，默认是false
	   mousewheelControl　: false,

	   // 对多个sider显示的时候有用
	   // slideToClickedSlide : false,

	   // 分页的类型，默认是原点
	   paginationType : 'bullets',

	   // 点击分页的时候，可以切换分页，默认是false
	   paginationClickable : true, 


	   // 如果需要分页器
	   pagination : '.swiper-pagination', 
	   // 如果需要前进后退按钮
	   nextButton : '.swiper-button-next',
	   prevButton : '.swiper-button-prev', 
	   // 如果需要滚动条
	   scrollbar  : '.swiper-scrollbar'
	 }) 
})

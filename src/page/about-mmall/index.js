require('./index.css');
require('page/common/top-nav/index.js');
require('page/common/search/index.js');

var crumb = require('page/common/crumbs/index.js'); 

var page = {
	init : function(){
		this.onLoad();
	},
	onLoad : function(){
		crumb.init('关于MMall')
	}
};

$(function(){
	page.init();
});
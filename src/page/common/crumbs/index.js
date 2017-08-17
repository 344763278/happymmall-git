require('./index.css');

var page = {
	init : function(name){
		this.onLoad(name);
	},
	onLoad : function(name){
		$('.distination').text(name);
	}
};


module.exports = page;
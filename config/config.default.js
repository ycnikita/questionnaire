const dbconfig = require('../psw-config.js');
exports.keys = 'ycnikita';
// 添加 view 配置
exports.view = {
	defaultViewEngine: 'nunjucks',
	mapping: {
		'.tpl': 'nunjucks',
	},
};
// exports.mongo = {
// 	client: dbconfig
// };
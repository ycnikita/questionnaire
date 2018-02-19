const Controller = require('egg').Controller;

class index extends Controller {
	async page() {
		const data = {};
		await this.ctx.render('index.tpl', data);
	}
}

module.exports = index;

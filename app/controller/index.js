const Controller = require('egg').Controller;

class index extends Controller {
	// 所有管理页面
	async list() {
		// 问卷列表页面
		const data = {};
		await this.ctx.render('list.tpl', data);
	}
	async edit() {
		// 问卷编辑页面
		const data = {};
		await this.ctx.render('edit.tpl', data);
	}
	async analysis() {
		// 问卷分析页面
		const data = {};
		await this.ctx.render('analysis.tpl', data);
	}
	async expenses() {
		// 问卷资费页面
		const data = {};
		await this.ctx.render('expenses.tpl', data);
	}
	async table() {
		// 问卷报表生成页面
		const data = {};
		await this.ctx.render('table.tpl', data);
	}
}

module.exports = index;

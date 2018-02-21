const Controller = require('egg').Controller;
/**
 * 后台管理页面相关的router请求
 * list 获取当前用户已经发布的调查问卷
 * edit 当前用户编辑上传问卷
 * analusis 返回指定的调查问卷的分析内容：主要反馈为图表
 * expenses 对当前用户指定的问卷进行金额的变更
 * table 生成pdf格式的表格，供用户下载
 */
class index extends Controller {
	// 所有管理页面
	async list() {
		// 问卷列表页面
		const data = {};
		await this.ctx.render('list.tpl', {'name': data.name});
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
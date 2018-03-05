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
	// 所有的管理页面
	// 问卷列表页面
	async list() {
		const data = await this.ctx.service.index.list();
		await this.ctx.render('list.tpl', {'list': data});
	}
	// 问卷编辑页面
	async edit() {
		const query = this.ctx.query;
		let data = {};
		if(query.id) {
			data = await this.ctx.service.index.getOnePage(query.id);
		}
		await this.ctx.render('edit.tpl', {data});
	}
	// 问卷分析页面
	async analysis() {
		const data = {};
		await this.ctx.render('analysis.tpl', data);
	}
	// 问卷资费页面
	async expenses() {
		const data = {};
		await this.ctx.render('expenses.tpl', data);
	}
	// 问卷报表生成页面
	async table() {
		const data = {};
		await this.ctx.render('table.tpl', data);
	}
	// 上传调查问卷
	async upload() {
		const data = await this.ctx.service.index.save(this.ctx.request.body);
		// 需要带用户参数
		this.ctx.body = { code: 200 };
	}
	// 删除调查问卷
	async delete() {
		const data = await this.ctx.service.index.delete(this.ctx.request.body);
		this.ctx.body = { code: 200 };
	}
	// 问卷报表生成页面
	async test() {
		const data = {};
		await this.ctx.render('a.html', data);
	}
	// 获取某个id的答案
	async getAnswers() {
		const id = this.ctx.query.id;
		const data = this.ctx.service.index.getAnswers(id);
		this.ctx.body = {code: 200, data: data};
	}
}

module.exports = index;

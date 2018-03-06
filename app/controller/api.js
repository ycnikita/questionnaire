const Controller = require('egg').Controller;
/**
 * 用于微信用户的相关api请求
 */
class API extends Controller {
	// 请求所有的问卷分类
	async getTypes () {
	}
	/**
	 * 请求某一页的问卷列表，排序
	 * @param {string} 
	 */
	async getPaperList () {
		const data = await this.ctx.service.index.conditionList();
		this.ctx.body = {code: 200, data};
	}
	/**
	 * 请求某个问卷的所有题目
	 * @param {string} id 问卷的id
	 */
	async getOnePaper () {
		const id = this.ctx.query.id;
		const data = await this.ctx.service.index.getOnePage(id);
		this.ctx.body = {code: 200, data};
	}
	/**
	 * 上传答案
	 * @param {string} id 	 问卷的id
	 * @param {array} answer 问卷的答案
	 */
	async uploadAnswer () {
		const id = this.ctx.query.id;
		const answer = this.ctx.query.answer;
		const result = await this.ctx.service.index.updataAnswer(id, answer);
		this.ctx.body = {code: 200};
	}
	/**
	 * 用户当前已完成问卷
	 * @param {string} username 微信用户名
	 */
	async getDoneList (username) {

	}
	/**
	 * 用户未完成问卷
	 * @param {string} username 微信用户名
	 */
	async getDoingList (username) {

	}
	/**
	 * 用户当前积分
	 * @param {string} username 微信用户名
	 */
	async curScore (username) {

	}
}

module.exports = API;

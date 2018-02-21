const Controller = require('egg').Controller;
/**
 * 用于微信用户的相关api请求
 */
class API extends Controller {
	// 请求所有的问卷分类
	async getTypes () {

	}
	/**
	 * 请求某个分类下面的某一页的问卷列表
	 * @param {string} type 某个分类的名字
	 */
	async getPaperList (type) {

	}
	/**
	 * 请求某个问卷的所有题目
	 * @param {string} id 问卷的id
	 */
	async getOnePaper (id) {

	}
	/**
	 * 上传答案
	 * @param {string} id 	问卷的id
	 * @param {string} number 问卷的题号
	 * @param {string} answer 当前选择的答案
	 */
	async uploadAnswer (id, number, answer) {

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

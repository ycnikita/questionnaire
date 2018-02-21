const Controller = require('egg').Controller;
/**
 * 后台管理页面用户登陆等相关内容处理
 */
class UserInfo extends Controller {
	/**
	 * 注册
	 * @param {string} username 自定义用户名
	 * @param {string} psd 自定义密码
	 * @param {string} code 短信验证码
	 */
	async register (username, psd, telphone, code) {
		// 写入各种用户信息并且进行短信验证码度反馈
	}
	// 短信验证码
	async checkCode (telphone) {

	}
	/**
	 * 进行登陆校验并且进行cookie写入，保持登陆状态
	 * @param {string} username 用户名
	 * @param {string} psd 用户密码
	 */
	async login (username, psd) {
		
	}
	// 登出，进行cookie覆盖登出
	async logout () {

	}
}

module.exports = UserInfo;

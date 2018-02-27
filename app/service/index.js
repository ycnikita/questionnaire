const Service = require('egg').Service;
class Control extends Service {
	// 读取某个用户生成的所有list（title， des， id）
	async list(page = 1) {
		const data = await this.app.mongo.find('qs', {});
		return data;
	}
	// 存放用户上传的问卷
	async save(data) {
		try {
			const result = await this.app.mongo.insertOne('qs', {doc: data});
			return result;
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = Control;

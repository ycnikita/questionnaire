const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;
class Control extends Service {
	// 读取某个用户生成的所有list（title， des， id）
	async list(page = 1) {
		const data = await this.app.mongo.find('qs', {});
		return data;
	}
	// 存放用户上传的问卷
	async save(data) {
		try {
			let result = {};
			const id = data.id || data._id;
			if(id) {
				delete data._id;
				result = await this.app.mongo.updateMany('qs', {
					filter: {"_id": ObjectId(id)}, 
					update: {
						"$set": data
					}
				});
			} else {
				result = await this.app.mongo.insertOne('qs', {doc: data});
			}
			return result;
		} catch (e) {
			console.log(e);
		}
	}
	// 获取某个id下的调查问卷
	async getOnePage(id) {
		try {
			const result = await this.app.mongo.find('qs', {query: {"_id": ObjectId(id)}});
			return result[0];
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = Control;
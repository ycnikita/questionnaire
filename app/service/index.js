const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;
class Control extends Service {
	// 读取某个用户生成的所有list（title， des， id）
	async list(page = 1) {
		const data = await this.app.mongo.find('qs', {
			projection: {
				_id: 1,
				title: 1,
				des: 1
			}
		});
		return data;
	}
	// 存放用户上传的问卷
	async save(data) {
		try {
			let result = {};
			const id = data.id || data._id;
			const initData = {
				name: '颜生',
				hot: Math.floor(Math.random()*10)
			};
			Object.assign(initData, data, {
				date: JSON.stringify(new Date()).split('T')[0].replace('"', '')
			});
			if(id) {
				delete initData._id;
				result = await this.app.mongo.updateMany('qs', {
					filter: {"_id": ObjectId(id)}, 
					update: {
						"$set": initData
					}
				});
			} else {
				result = await this.app.mongo.insertOne('qs', {doc: initData});
			}
			return result;
		} catch (e) {
			console.log(e);
		}
	}
	// 获取某个id下的调查问卷
	async getOnePage(id) {
		try {	
			const result = await this.app.mongo.find('qs', {
				query: {"_id": ObjectId(id)},
				projection: {
					_id: 1,
					title: 1,
					des: 1,
					topics: 1
				}
			});
			return result[0];
		} catch (e) {
			console.log(e);
		}
	}
	// 删除某个id对应的调查问卷
	async delete(params) {
		try {	
			const result = await this.app.mongo.deleteMany('qs', {filter: {"_id": ObjectId(params.id)}});
			return result;
		} catch (e) {
			console.log(e);
		}
	}
	// 获取布包含用户x的所有问卷列表
	async conditionList (name) {
		const data = await this.app.mongo.find('qs', {});
		return data;
	}
	// api存储答案
	async updataAnswer(id, answer) {
		// 更新答案
		const result = this.app.mongo.updateMany('qs',{
			filter: {"_id": ObjectId(id)}, 
			update: {
				"$push": {"answers": answer}	
			}
		});
		// 增加热度
		this.app.mongo.updateMany('qs',{
			filter: {"_id": ObjectId(id)}, 
			update: {
				"$inc": { "hot": 1 }
			}
		});
		return result;
	}
	// 获取某个问卷的答案列表
	async getAnswers (id) {
		const answers = await this.app.mongo.find('qs', {
			query: {"_id": ObjectId(id)},
			projection: {
				answers: 1
			}
		});
		return answers;
	}
}

module.exports = Control;
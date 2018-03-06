const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;
class Control extends Service {
	// 读取某个用户生成的所有list（title， des， id）（管理后台）
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
	// 存放用户上传的问卷(管理后台)
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
	// 获取某个id下的调查问卷（管理后台）
	async getOnePage(id) {
		try {	
			const result = await this.app.mongo.find('qs', {
				query: {"_id": ObjectId(id)},
				projection: {
					_id: 1,
					title: 1,
					des: 1,
					cost: 1,
					time: 1,
					num: 1,
					topics: 1
				}
			});
			return result[0];
		} catch (e) {
			console.log(e);
		}
	}
	// 删除某个id对应的调查问卷 （管理后台）
	async delete(params) {
		try {	
			const result = await this.app.mongo.deleteMany('qs', {filter: {"_id": ObjectId(params.id)}});
			return result;
		} catch (e) {
			console.log(e);
		}
	}
	// 分析列表，查询返回 {id, hot, num, title, des}（管理后台）
	async analysisList() {
		const data = await this.app.mongo.find('qs', {
			projection: {
				_id: 1,
				title: 1,
				des: 1,
				num: 1,
				hot: 1,
				des: 1
			}
		});
		return data;
	}
	// 分析列表，查询返回 {id, hot, num, title, des}（管理后台）
	async analysisOne(id) {
		const data = await this.app.mongo.find('qs', {
			query: {
				"_id": ObjectId(id)
			},
			projection: {
				title: 1,
				des: 1,
				num: 1,
				hot: 1,
				des: 1,
				answer: 1,
				topics: 1
			}
		});
		return data;
	}
	// 获取布包含用户x的所有问卷列表 （小程序）
	async conditionList (userInfo) {
		const userObj = JSON.parse(userInfo);
		const data = await this.app.mongo.find('qs', {});
		return data;
	}
	// api存储答案（小程序）
	async updataAnswer(id, answer) {
		// 更新答案
		const result = this.app.mongo.updateMany('qs',{
			filter: {"_id": ObjectId(id)}, 
			update: {
				"$push": {"answers": JSON.parse(answer)},
				"$inc": { "hot": 1 }
			}
		});
		return result;
	}
	// 获取某个问卷的答案列表 （小程序）
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
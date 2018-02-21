const Service = require('egg').Service;

class QList extends Service {
	async list(page = 1) {
		const data = await this.app.mongo.find('qs', {});
		return data;
	}
}

module.exports = QList;

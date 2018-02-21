module.exports = (app) => {
	const { router, controller } = app;
	// 后台管理功能页面
	router.get('/', controller.index.list);
	router.get('/control/list', controller.index.list);
	router.get('/control/edit', controller.index.edit);
	router.get('/control/table', controller.index.table);
	router.get('/control/analysis', controller.index.analysis);
	router.get('/control/expenses', controller.index.expenses);
	
	// 用户请求api
	router.post('/userinfo/registe', controller.user.register);
	router.post('/userinfo/check', controller.user.checkCode);
	router.post('/userinfo/login', controller.user.login);
	router.post('/userinfo/logout', controller.user.logout);

	// 客户端的请求内容
	router.get('/api/typeList', controller.api.getTypes);
	router.get('/api/paperList', controller.api.getPaperList);
	router.get('/api/paper', controller.api.getOnePaper);
	router.get('/api/uploadAnswer', controller.api.uploadAnswer);
	router.get('/api/doneList', controller.api.getDoneList);
	router.get('/api/doingList', controller.api.getDoingList);
	router.get('/api/curScore	', controller.api.curScore);
};

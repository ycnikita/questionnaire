module.exports = (app) => {
	const { router, controller } = app;
	// 功能页面
	router.get('/', controller.index.list);
	router.get('/list', controller.index.list);
	router.get('/edit', controller.index.edit);
	router.get('/table', controller.index.table);
	router.get('/analysis', controller.index.analysis);
	router.get('/expenses', controller.index.expenses);
};

module.exports = (app) => {
	const { router, controller } = app;
	console.log(controller);
	router.get('/', controller.index.page);
};

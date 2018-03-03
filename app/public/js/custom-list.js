(function($){
	var module = {
		init: function() {
			this.initEvents();
		},
		initEvents: function() {
			var _this = this;
			$('.delete').on('click', function(e) {
				var id = $(e.target).attr('data-id');
				var token = _this.getCookie('csrfToken');
				var title = $(e.target).attr('data-title');
				var f = window.confirm("确定删除问卷"+title+"?");
				if(!f) return;
				$.ajax({
					url: '/control/delete?_csrf='+token,
					type: "post",
					data: {
						"id": id
					},
					success: function(result) {
						if(+result.code === 200) {
							window.location.reload(true);
						} else {
							alert(result.des);
						}
					}
				});
			});
		},
		// 获取cookie
		getCookie: function(name) {
			var cookies = document.cookie.split(';');
			var matchCookie = cookies.filter(item => item.indexOf(`${name}=`) !== -1);
			if (matchCookie.length !== 0) {
				return matchCookie[0].split('=')[1];
			}
			return undefined;
		},
	};
	module.init();
})(jQuery);

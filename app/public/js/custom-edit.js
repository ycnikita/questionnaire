(function($){
	// 将公用元素检出
	var $finished = $('#finished'),
		$cost = $('input[name="cost"]'),
		$time = $('input[name="time"]');
	// 预览
	var $iphone = $('#pre_container');
	// 编辑区
	var $topicTypes = $('#topic_types'),
		$analysis = $('#analysis'),
		$topicInput = $('#topic_input'),
		$addItem = $('#add_item'),
		$topicFinish = $('#topic_finish'),
		$topicOptions = $('#topic_options');

	// 当前正在编辑的类型
	var editingType = undefined;
	// 当前所处的序号
	var choosenOrder = 0; 	// 当前正在修改的编号
	var curOrder = 0;		// 总的增长计数
	var curTopicOrder = 0;	// 题目的增长计数
	var curItemOrder = 1;	// 选项的增长计数(从0开始计数)

	// 记录填写内容，用于上传数据库
	var data = {
		title: '空标题',
		des: '空描述',
		topics: []
	};

	var module = {
		init: function() {
			// 初始化的执行流程
			this.initPage();
			this.initState();
			this.initEvents();
		},
		// 初始化页面（获取数据并且重新绘制页面）
		initPage: function() {
			// 如果没有id信息，不进行消息获取
			var _this = this;
			var url = document.location.href;
			var id = this.getQuery('id');
			if(!id) return;
			// 将信息提交
			var crfToken = _this.getToken('csrfToken');
			$.ajax({
				url: '/api/paper?_csrf='+crfToken,
				data: {id: id},
				success: function(result) {
					if(+result.code === 200) {
						// 获取题目成功，替换内容
						data = result.data;
						_this.updataView();
					}
				}
			});
		},
		// 给需要交互的元素添加交互事件
		initEvents: function() {
			// 根据选择的类型，添加不同的内容到手机展示区域，并且指定部分输入和输
			var _this = this;
			// 点击某个题目的监听
			$iphone.on('click', '.pre-wrapper', function(e) {
				var type = $(this).attr('data-type');
				var text = $($(this).find('.title-content')[0]).text();
				var order = $(this).attr('data-order');
				if(+order === choosenOrder) return;
				_this.initState();
				_this.changeNumber('choose', order, type);
				_this.startEdit(type);
				_this.choosenTopic($(this));
			});
			// 监听对各个题目的操作下拉的内容
			$('#topic_options').on('click', function(e) {
				var type = $(e.target).attr('data-type');
				if(type === 'delete') {
					_this.changeNumber('delete');
				}
				_this.changeData(type, 'title', '', choosenOrder);
				// 更新视图
				_this.updataView();
			})
			// 监听题目类型下拉的内容
			$topicTypes.on('click', 'li', function(e){
				var type = $(e.target).attr('data-type');
				if(!type) return false;
				_this.initState();
				_this.startEdit(type);
				// 根据type不同添加组件
				_this.addComponents(type);
			});

			// 文本区标题内容的变化，反应到预览区
			$topicInput.on('input', function(e) {
				if ((choosenOrder === undefined && editingType !== 'title' && editingType !== 'des') || editingType === undefined) {
					alert('请新建或选择一个编辑对象～');
					return;
				}
				var text = e.target.value;
				if(editingType === 'title' || editingType === 'des'){
					data[editingType] = text;
					$iphone.find(`.pre-${editingType}`).html(text);
				} else {
					if (data.topics[choosenOrder]) {
						data.topics[choosenOrder].content = text;
					}
					$iphone.find(`.pre-wrapper[data-order="${choosenOrder}"]`).find('.title-content').html(text);
				}
				_this.changeData('changeValue', 'title', text, choosenOrder);
			});

			// 点击添加选项按钮
			$addItem.on('click', function(e){
				if (choosenOrder === undefined || editingType === undefined) {
					alert('请新建或选择一个编辑对象～');
					return;
				}
				_this.addItem(`选项${curItemOrder + 2}`, editingType, curItemOrder + 1);
				_this.changeData('add', 'item', `选项${curItemOrder + 2}`, curItemOrder + 1);
			});

			// 选项输入框内容变化
			$('.options-wrap').on('input', '.option', function(e) {
				if (choosenOrder === undefined || editingType === undefined) {
					alert('请新建或选择一个编辑对象～');
					return;
				}
				var optionIndex = $(e.target).attr('data-order');
				var order = $('.pre-choosen').attr('data-order');
				var text = $(e.target).val();
				_this.changeData('changeValue', 'item', text, optionIndex);
				$('.pre-choosen').find(`input[id="${order}_${optionIndex}"]`).nextAll('span').text(text);
			});

			// 点击位置上下调换按钮
			$('.options-wrap').on('click', '.to-up', function(e) {
				if (choosenOrder === undefined || editingType === undefined) {
					alert('请新建或选择一个编辑对象～');
					return;
				}
				var index = $(e.target).parent().find('input').attr('data-order');
				_this.changeData('moveUp', 'item', undefined, index);
			});
			$('.options-wrap').on('click', '.to-down', function(e) {
				if (choosenOrder === undefined || editingType === undefined) {
					alert('请新建或选择一个编辑对象～');
					return;
				}
				var index = $(e.target).parent().find('input').attr('data-order');
				_this.changeData('moveDown', 'item', undefined, index);
			});

			// 点击完成按钮
			$topicFinish.on('click', function(e) {
				if(!editingType) return;
				_this.initState();
			});

			// 点击完成编辑按钮
			$finished.on('click', function(e){
				var cost = $cost.val();
				var time = $time.val();
				var id = $(e.target).attr('data-id');
				if(cost === '') {
					alert('酬劳不能为空');
					return;
				}
				if(time === '') {
					alert('请注明耗费时间');
					return;
				}
				data.cost = cost;
				data.time = time;
				if(id) {
					data.id = id;
				}
				console.log(data);
				var f = window.confirm("确定提交当前问卷？");
				if(!f) return;
				// 将信息提交
				var crfToken = _this.getToken('csrfToken');
				$.ajax({
					url: '/control/upload?_csrf='+crfToken,
					data: data,
					type: 'post',
					success: function(result) {
						if(+result.code === 200) {
							// 提交题目成功，跳转到已发布
							alert('提交题目成功！');
							window.location.href = '/control/list';
						} else {
							alert(result.des);
						}
					},
					error: function() {
						alert('上传数据失败，请稍后重试');
					}
				});
			});
		},
		// 首先将编辑的相关按钮，输入等置为不可编辑状态
		initState: function() {
			$topicInput.attr('disabled', true);
			$topicInput.val('');
			!($addItem.hasClass('disabled')) && $addItem.addClass('disabled');
			!($topicFinish.hasClass('disabled')) && $topicFinish.addClass('disabled');
			$('.options-wrap').find('input').attr('disabled', true);
			!($('.dp48').hasClass('disabled')) && $('.dp48').addClass('disabled');
			!($topicOptions.prev().hasClass('disabled')) && $topicOptions.prev().addClass('disabled');
			$('.addto').remove();
		},
		// 添加不同的题目文本内容到预览区
		addToPre: function(text) {
			// 根据当前的type，将输入文本按照不同样式展示在预览区
			if(editingType === 'title' || editingType === 'des'){
				data.title = text;
				$iphone.find(`.pre-${editingType}`).html(text);
			} else {
				data.prograph.push({index: curOrder, content: text});
				$iphone.find(`.pre-wrapper[data-order="${choosenOrder}"]`).find('.title-content').html(text);
			}
		},
		/* 开始编辑，进行状态更改：
		* 	1. 根菌type决定哪些按钮和输入框是否可进行输入和点击
		*/
		startEdit: function(type) {
			editingType = type;
			// 恢复状态
			$topicInput.attr('disabled', false);
			$topicFinish.removeClass('disabled');
			$('.options-wrap').find('input').attr('disabled', true);
			// 开始添加
			if(type === 'radio' || type === 'checkbox') {
				// 可以添加选项
				$addItem.removeClass('disabled');
				$('.options-wrap').find('input').attr('disabled', false);
				$topicOptions.prev().removeClass('disabled');
			} else if(type === 'prograph' || type === 'text') {
				$topicOptions.prev().removeClass('disabled');
			} else {
				// 使添加选项和选项的上下按钮可行
			}
		},
		// 预览中添加组件
		addComponents: function(type) {
			if(type === 'title' || type === 'des') {
				return false;
			}
			$('.pre-wrapper').removeClass('pre-choosen');
			// 根据类型不同，添加不同的组件
			if(type === 'prograph') {
				$iphone.append(`<div class="pre-wrapper pre-choosen" data-order="${curOrder}" data-type="prograph"><p class="title-content">一段描述段落</p></div>`);
				$topicInput.val('一段描述段落');
				this.changeData('add', 'title', '一段描述段落', curOrder);
			} else if (type === 'radio' || type === 'checkbox') {
				curItemOrder = 1;
				$iphone.append(`<div class="pre-wrapper pre-choosen" data-order="${curOrder}" data-type="${type}"><div class="order">${curTopicOrder+1}. </div><p class="title-content">标题</p>
				<ul>
					<li><label for="${curTopicOrder}_0"><input type="${type}" name="${curTopicOrder}" id="${curTopicOrder}_0" value="0"><i class="${type === 'radio'? 'circle' : 'rect' }"></i><span>选项1</span></label></li>
					<li><label for="${curTopicOrder}_1"><input type="radio" name="${curTopicOrder}" id="${curTopicOrder}_1" value="1"><i class="${type === 'radio'? 'circle' : 'rect' }"></i><span>选项2</span></label></li>
				</ul>
				</div>`);
				$topicInput.val('标题');
				this.changeData('add', 'title', '标题', curOrder);
				this.changeData('add', 'item', '选项1', 0);
				this.changeData('add', 'item', '选项2', 1);
			} else if (type === 'text') {
				$iphone.append(`<div class="pre-wrapper pre-choosen" data-order="${curOrder}" data-type="${type}"><div class="order">${curTopicOrder+1}. </div><p class="title-content">标题</p>
					<textarea row="5" name="${curTopicOrder}" class="topic-text" id="${curTopicOrder}"></textarea>
				</div>`);
				$topicInput.val('题目描述');
				this.changeData('add', 'title', '题目描述', curOrder);
			}
			this.changeNumber('add', curOrder, type);
		},
		// 点击选中某个预览中的组件
		choosenTopic: function(ele) {
			// 从ele中读取到所有数据，并且映射到编辑区
			var type = ele.attr('data-type'),
				text = $(ele.find('.title-content')[0]).text(),
				order = ele.attr('data-order');
			var _this = this;
			$topicInput.val(text.trim());
			// 如果是radio和checkbox，读取所有的选项卡，并填充到编辑区域
			if (type === 'radio' || type === 'checkbox') {
				var list = ele.find('li');
				curItemOrder = list.length - 1;
				list.each(function(index, target) {
					// 拿出id，value和text，组成一个li，放到编辑区
					if (index > 1) {
						_this.addItem($(target).find('span').text(), type, index, order);
					} else {
						// 替换编辑区input的值
						$('.options-wrap').find(`input[data-order="${index}"]`).val($(target).find('span').text());
					}
				});
			}
			// 指定当前选中order
			if (order !== undefined) choosenOrder = order;
			// 选中状态更改
			$('.pre-wrapper').removeClass('pre-choosen');
			!(ele.hasClass('pre-choosen')) && ele.addClass('pre-choosen');
		}, 
		// 更改一系列的编号（编号来源为选中的元素）
		changeNumber: function(changeType, order, type) {
			if (changeType === 'delete') {
				choosenOrder = undefined;
				editingType = undefined;
				if (type !== 'prograph') curTopicOrder -= 1;
				curOrder -= 1;
				return;
			}
			choosenOrder = order;
			editingType = type;
			if (changeType === 'add') {
				if (type !== 'prograph') curTopicOrder += 1;
				curOrder += 1;
			}
			if (changeType === 'delete') {
				if (type !== 'prograph') curTopicOrder -= 1;
				curOrder -= 1;
			}
		},
		// 添加一个选项到编辑区（如果没有传值，同时也添加到预览区）
		addItem: function(text, type, itemOrder, topicOrder) {
			var itemEdit = `<li class="option-item addto">
								<input type="text" data-order="${itemOrder}" class="option" value="${text || `选项${itemOrder+1}`}">
								<i class="material-icons dp48 to-up">present_to_all</i>
								<i class="material-icons dp48 to-down">present_to_all</i>
							</li>`,
				itemPre = `<li><label for="${curTopicOrder - 1}_${itemOrder}">
								<input type="${type}" name="${curTopicOrder - 1}" id="${curTopicOrder - 1}_${itemOrder}" value="${itemOrder}">
								<i class="${type === 'radio' ? 'circle' : 'rect'}"></i>
								<span>${text || `选项${itemOrder+1}`}</span>
							</label></li>`;
			$('.options-wrap').append(itemEdit);
			curItemOrder += 1;
			if (topicOrder === undefined) {
				$('.pre-choosen').find('ul').append(itemPre);
			}
		},
		// 根据数据的更改，刷新视图
		updataView: function() {
			// 便利data，更改dom结构
			var vDom = '';
			var topicIndex = 0;
			vDom += `<div class="pre-wrapper" data-type="title"><h1 class="pre-title title-content">${data.title}</h1></div>`;
			vDom += `<div class="pre-wrapper" data-type="des"><p class="pre-des title-content">${data.des}</p></div>`;
			// 题目和段落
			data.topics && data.topics.map(function(item, index){
				var type = item.type;
				if(type === 'prograph') {
					vDom += `<div class="pre-wrapper pre-choosen" data-order="${index}" data-type="prograph"><p class="title-content">${item.content}</p></div>`
				} else if (type === 'radio' || type === 'checkbox') {
					++topicIndex;
					vDom += `<div class="pre-wrapper pre-choosen" data-order="${index}" data-type="${type}"><div class="order">${topicIndex+1}. </div><p class="title-content">${item.content}</p>
					<ul>`;
					for (let i = 0; i < item.items.length; i++) {
						vDom += `<li><label for="${topicIndex}_${i}"><input type="${type}" name="${topicIndex}" id="${topicIndex}_0" value="0"><i class="${type === 'radio'? 'circle' : 'rect' }"></i><span>${item.items[i].content}</span></label></li>`;
					}
					vDom += '</ul></div>';
				} else if (type === 'text') {
					vDom += `<div class="pre-wrapper pre-choosen" data-order="${index}" data-type="${type}"><div class="order">${topicIndex+1}. </div><p class="title-content">${item.content}</p>
					<textarea row="5" name="${topicIndex}" class="topic-text" id="${topicIndex}"></textarea>
				</div>`;
				}
				
			});
			$iphone.find('.pre-wrapper').remove();
			$iphone.append(vDom);
			// 如果data有id，把id插入，并且更新耗时和花销
			if(data._id) {
				console.log(data);
				$('#finished').attr('data-id', data._id);
				$('#cost').val(data.cost);
				$('#time').val(data.time);
			}
		},
		// 每次更新数据(optionType: moveUp | moveDown | delete | changeValue | add, type: title | item)
		changeData: function(optionType, type, value, index) {
			let curTopicIndex = choosenOrder;
			if(choosenOrder === undefined) curTopicIndex = curOrder;
			if (type === 'item' && data.topics[curTopicIndex].items === undefined) {
				data.topics[curTopicIndex].items = [];
			}
			var arr = type === 'title' ? data.topics : data.topics[curTopicIndex].items;
			if (optionType === 'moveUp') {
				if (index === 0) return;
				// 交换
				var temp = data.topics[curTopicIndex].items[index];
				data.topics[index] = data.topics[index - 1];
				data.topics[index - 1] = temp;
			} else if (optionType === 'moveDown') {
				var len = arr.length;
				if(index === len - 1) return;
				// 交换
				var temp = data.topics[curTopicIndex].items[index];
				data.topics[index] = data.topics[index + 1];
				data.topics[index + 1] = temp;
			} else if (optionType === 'delete' && type === 'title') {
				arr.splice(index, 1);
			} else if (optionType === 'changeValue'){
				if(editingType === 'title' || editingType === 'des'){
					data[editingType] = value;
					return;
				}
				arr[index].content = value;
			} else {
				if(type === 'title') {
					arr.push({content: value, type: editingType});
				} else {
					arr.push({content: value});
				}
			}
		},
		// 获取crfToken
		getToken: function() {
			return this.getCookie('csrfToken');
		},
		// 获取cookie
		getCookie: function(name) {
			var cookies = document.cookie.split(';');
			var matchCookie = cookies.filter(item => item.indexOf(`${name}=`) !== -1);
			if (matchCookie.length !== 0) {
				return matchCookie[0].split('=')[1];
			}
			return '';
		},
		// 获取参数中某个值
		getQuery: function(name) {
			var search = document.location.search;
			var params = [];
			if(search) {
				params = search.split(/\?|&/g);
				return params.filter(item => item.indexOf(`${name}=`) !== -1)[0].split('=')[1];
			}
			return undefined;
		}
	};

	module.init();
})(jQuery);

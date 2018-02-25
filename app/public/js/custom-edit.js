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
		title: '',
		des: '',
		prograph: [],
		topics: []
	};

	var module = {
		init: function() {
			// 初始化的执行流程
			this.initState();
			this.initEvents();
		},
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
				_this.changeNumber('choose', $(this));
				_this.startEdit(type);
				_this.choosenTopic($(this));
			});
			// 监听对各个题目的操作下拉的内容
			$('topic_options').on('click', function() {

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
				var text = e.target.value;
				if(editingType === 'title' || editingType === 'des'){
					data.title = text;
					$iphone.find(`.pre-${editingType}`).html(text);
				} else {
					data.prograph.push({index: curOrder, content: text});
					$iphone.find(`.pre-wrapper[data-order="${choosenOrder}"]`).find('.title-content').html(text);
				}
			});

			// 点击添加选项按钮
			$addItem.on('click', function(e){
				_this.addItem(`选项${curItemOrder + 2}`, editingType, curItemOrder + 1);
			});

			// 选项输入框内容变化
			$('.options-wrap').on('input', '.option', function(e) {
				var optionIndex = $(e.target).attr('data-order');
				var order = $('.pre-choosen').attr('data-order');
				var text = $(e.target).val();
				$('.pre-choosen').find(`input[id="${order}_${optionIndex}"]`).next('span').text(text);
			});

			// 点击位置上下调换按钮
			$('.options-wrap').on('click', '.to-up', function(e) {
				console.log('aaa');
			});
			$('.options-wrap').on('click', '.to-down', function(e) {

			});

			// 点击完成按钮
			$topicFinish.on('click', function(e) {
				if(!editingType) return;
				_this.initState();
			});

			// 点击完成编辑按钮
			$finished.on('click', function(e){

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
			var ele = '';
			if(type === 'title' || type === 'des') {
				return false;
			}
			$('.pre-wrapper').removeClass('pre-choosen');
			// 根据类型不同，添加不同的组件
			if(type === 'prograph') {
				ele = $iphone.append(`<div class="pre-wrapper pre-choosen" data-order="${curOrder}" data-type="prograph"><p class="title-content">一段描述段落</p></div>`);
				$topicInput.val('一段描述段落');
			} else if (type === 'radio') {
				curItemOrder = 1;
				ele = $iphone.append(`<div class="pre-wrapper pre-choosen" data-order="${curOrder}" data-type="radio"><div class="order">${curTopicOrder+1}. </div><p class="title-content">标题</p>
				<ul>
					<li><label for="${curTopicOrder}_0"><input type="radio" name="${curTopicOrder}" id="${curTopicOrder}_0" value="0"><span>选项1</span><i class="circle"></i></label></li>
					<li><label for="${curTopicOrder}_1"><input type="radio" name="${curTopicOrder}" id="${curTopicOrder}_1" value="1"><span>选项2</span><i class="circle"></i></label></li>
				</ul>
				</div>`);
				$topicInput.val('标题');
			}
			this.changeNumber('add', ele);
		},
		// 数据操作
		optionData: function() {
			
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
		changeNumber: function(changeType, ele) {
			var order = ele.attr('data-order'),
				type = ele.attr('data-type');
				choosenOrder = order;
				editingType = type;
			if (changeType === 'add') {
				curTopicOrder += 1;
				curOrder += 1;
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
								<input type="radio" name="${curTopicOrder - 1}" id="${curTopicOrder - 1}_${itemOrder}" value="${itemOrder}">
								<span>${text || `选项${itemOrder+1}`}</span>
								<i class="circle"></i>
							</label></li>`;
			$('.options-wrap').append(itemEdit);
			curItemOrder += 1;
			if (topicOrder === undefined) {
				$('.pre-choosen').find('ul').append(itemPre);
			}
		}
		
	};

	module.init();
})(jQuery);


{% extends "base.tpl" %}
{% block links %}
	<link href="/public/css/custom-edit.css" rel="stylesheet" />
{% endblock %}
{% block content %}
	<div class="row top-header-wrap">
		<div class="top-header col-md-10 col-sm-10 col-md-offset-1 col-sm-offset-1">
			<div class="header">
				<button class="finish btn btn-primary" id="finished" data-id={{data[0]._id}}>完成编辑</button>
				<div class="global">
					<label for="cost" class="label">
						<span class="text">预计酬劳: </span> 
						<input type="text" class="cost" name="cost" value="{{data[0].cost}}">
					</label>
					<label for="time" class="label">
						<span class="text">预计用时: </span> 
						<input type="text" class="time" name="time"  value="{{data[0].time}}">
					</label>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="pre col-md-5 col-sm-5 col-md-offset-1 col-sm-offset-1">
			<div class="iphone">
			{# 如果有返回内容，直接进行将所有内容喷上去 #}
			{% if data.length > 0 %}
				<div class="iphone-box" id="pre_container">
					<div class="pre-wrapper" data-type="title"><h1 class="pre-title title-content">{{data[0].title}}</h1></div>
					<div class="pre-wrapper" data-type="des">
						<p class="pre-des title-content">
							{{data[0].des}}
						</p>
					</div>
					{% set number = 1 %}
					{% for item in data[0].topics %}
						{% if item.type === 'prograph' %}
							<div class="pre-wrapper" data-order="{{loop.index}}" data-type="prograph">
								<p class="title-content">{{ item.content }}</p>
							</div>
						{% elif item.type === 'text' %}
							<div class="pre-wrapper" data-order="{{loop.index}}" data-type="text">
								<div class="order">{{number}}. </div>
								<p class="title-content">{{item.content}}</p>
								<textarea row="5" name="{{number}}" class="topic-text" id="{{number}}"></textarea>
							</div>
							{% set number = (number + 1) %}
						{% elif (type === 'radio') %}
							<div class="pre-wrapper pre-choosen" data-order="{{loop.index}}" data-type="{{item.type}}">
								<div class="order">{{number}}. </div>
								<p class="title-content">{{item.content}}</p>
								<ul>
									{% for item2 in item.items %}
										<li>
											<label for="{{loop.index}}_0">
												<input type="{{item2.type}}" name="{{number}}" id="{{number}}_0" value="0">
												<i class="circle"></i>
												<span>选项1</span>
											</label>
										</li>
									{% endfor %}
								</ul>
							</div>
							{% set number = (number + 1) %}
						{% elif (type === 'checkbox') %}
							<div class="pre-wrapper pre-choosen" data-order="{{loop.index}}" data-type="{{item.type}}">
								<div class="order">{{number}}. </div>
								<p class="title-content">{{item.content}}</p>
								<ul>
									{% for item2 in item.items %}
										<li>
											<label for="{{loop.index}}_0">
												<input type="{{item2.type}}" name="{{number}}" id="{{number}}_0" value="0">
												<i class="rect"></i>
												<span>选项1</span>
											</label>
										</li>
									{% endfor %}
								</ul>
							</div>
							{% set number = (number + 1) %}
						{% endif %}
					{% endfor %}
				</div>
			{% else %}
				<div class="iphone-box" id="pre_container">
					<div class="pre-wrapper" data-type="title"><h1 class="pre-title title-content">空标题</h1></div>
					<div class="pre-wrapper" data-type="des">
						<p class="pre-des title-content">
							空描述
						</p>
					</div>
				</div>
			{% endif %}
			</div>
		</div>
		<div class="edit-area col-md-5 col-sm-5">
			<!-- 题目类型 -->
			<div class="types">
				<div class="dropdown">
					<a href="" class="dropdown-toggle btn" data-toggle="dropdown">选择类型 <b class="caret"></b></a>
					<ul class="dropdown-menu" id="topic_types">
						<li><a href="javascript:void(0);" data-type="prograph">段落说明</a></li>
						<li role="presentation" class="divider"></li>
						<li><a href="javascript:void(0);" data-type="radio">单项选择</a></li>
						<li><a href="javascript:void(0);" data-type="checkbox">多选</a></li>
						<li><a href="javascript:void(0);" data-type="text">填空</a></li>
						<li><a href="javascript:void(0);" data-type="score">评分组件</a></li>
					</ul>
				</div>
				<div class="dropdown" style="margin-left:20px;">
					<a href="" class="dropdown-toggle btn" data-toggle="dropdown">分析维度 <b class="caret"></b></a>
					<ul class="dropdown-menu" id="analysis">
						<li><a href="javascript:void(0);" data-type="sex">性别</a></li>
						<li><a href="javascript:void(0);" data-type="age">年龄段</a></li>
						<li><a href="javascript:void(0);" data-type="city">省市区</a></li>
					</ul>
				</div>
				<div class="dropdown" style="margin-left:20px;">
					<a href="" class="dropdown-toggle btn disabled" data-toggle="dropdown">操作 <b class="caret"></b></a>
					<ul class="dropdown-menu" id="topic_options">
						<li><a href="javascript:void(0);" data-type="moveUp">向上移动</a></li>
						<li><a href="javascript:void(0);" data-type="moveDown">向下移动</a></li>
						{# <li><a href="javascript:void(0);" data-type="insertUp">上方插入</a></li> #}
						{# <li><a href="javascript:void(0);" data-type="insertDown">下方插入</a></li> #}
						<li><a href="javascript:void(0);" data-type="delete">删除</a></li>
					</ul>
				</div>
			</div>
			<div class="title-text form-group">
				<label for="name">题目文本</label>
				<textarea class="form-control" rows="3" id="topic_input"></textarea>
			</div>
			<button class="add-option btn" id="add_item">添加一个选项
			</button>
			<ul class="options-wrap">
				<li class="option-item">
					<input type="text" data-order="0" class="option" value="选项1">
					<i class="material-icons dp48 to-up">present_to_all</i>
					<i class="material-icons dp48 to-down">present_to_all</i>
				</li>
				<li class="option-item" id="lastTwo">
					<input type="text" data-order="1" class="option" value="选项2">
					<i class="material-icons dp48 to-up">present_to_all</i>
					<i class="material-icons dp48 to-down">present_to_all</i>
				</li>
			</ul>
			<button class="append btn btn-primary" id="topic_finish">当前题目编辑完成</button>
		</div>
	</div>
{% endblock %}
{% block sideNav %}
{{ macros.active('edit') }}
{% endblock %}
{% block innerTitle %}
问卷编辑
{% endblock %}
{% block location %}
问卷编辑
{% endblock %}
{% block scripts %}
	<script src="/public/js/custom-edit.js"></script>
	<script>
		var dataTpl = JSON.parse({{data[0]}});
	</script>
{% endblock %}

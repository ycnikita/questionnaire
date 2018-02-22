{% extends "base.tpl" %}
{% block links %}
	<link href="/public/css/custom-edit.css" rel="stylesheet" />
{% endblock %}
{% block content %}
	<div class="row top-header-wrap">
		<div class="top-header col-md-10 col-sm-10 col-md-offset-1 col-sm-offset-1">
			<div class="header">
				<button class="finish btn btn-primary">完成编辑</button>
				<div class="global">
					<label for="cost" class="label">
						<span>预计酬劳: </span> 
						<input type="text" class="cost" name="cost">
					</label>
					<label for="time" class="label">
						<span>预计用时: </span> 
						<input type="text" class="time" name="time">
					</label>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="pre col-md-5 col-sm-5 col-md-offset-1 col-sm-offset-1">
			<div class="iphone">
				<div class="iphone-box">
				</div>
			</div>
		</div>
		<div class="edit-area col-md-5 col-sm-5">
			<!-- 题目类型 -->
			<div class="types">
				<div class="dropdown">
					<a href="" class="dropdown-toggle btn" data-toggle="dropdown">选择类型 <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="#">问卷标题</a></li>
						<li><a href="#">问卷描述</a></li>
						<li><a href="#">段落说明</a></li>
						<li role="presentation" class="divider"></li>
						<li><a href="#">单项选择</a></li>
						<li><a href="#">多选</a></li>
						<li><a href="#">填空</a></li>
						<li><a href="#">评分组件</a></li>
						<li><a href="#">分析维度</a></li>
					</ul>
				</div>
				<div class="dropdown" style="margin-left:20px;">
					<a href="" class="dropdown-toggle btn" data-toggle="dropdown">分析维度 <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="#">性别</a></li>
						<li><a href="#">年龄段</a></li>
						<li><a href="#">省市区</a></li>
					</ul>
				</div>
			</div>
			<div class="title-text form-group">
				<label for="name">题目文本</label>
				<textarea class="form-control" rows="3"></textarea>
			</div>
			<button class="add-option btn">添加一个选项
			</button>
			<ul class="options-wrap">
				<li class="option-item">
					<input type="text" class="option" value="选贤1">
					<i class="material-icons dp48 to-up">present_to_all</i>
					<i class="material-icons dp48 to-down">present_to_all</i>
				</li>
				<li class="option-item">
					<input type="text" class="option" value="选贤2">
					<i class="material-icons dp48 to-up">present_to_all</i>
					<i class="material-icons dp48 to-down">present_to_all</i>
				</li>
			</ul>
			<button class="append btn btn-primary">当前题目编辑完成</button>
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
{% endblock %}

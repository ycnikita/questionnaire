{% extends "base.tpl" %}
{% block links %}
	<link href="/public/css/custom-edit.css" rel="stylesheet" />
{% endblock %}
{% block content %}
	<div class="row top-header-wrap">
		<div class="top-header col-md-10 col-sm-10 col-md-offset-1 col-sm-offset-1">
			<div class="header">
				<div class="dropdown">
					<a href="" class="dropdown-toggle btn btn-primary" data-toggle="dropdown">提交/清空<b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="javascript:void(0);" id="finished">提交当前问卷</a></li>
						<li role="presentation" class="divider"></li>
						<li><a href="javascript:void(0);" id="reset">重置当前问卷</a></li>
						<li role="presentation" class="divider"></li>
						<li><a href="javascript:void(0);" id="clear">新建问卷</a></li>
					</ul>
				</div>
				<div class="global">
					<label for="cost" class="label">
						<span class="text">预计酬劳: </span> 
						<input type="text" class="cost" id="cost" name="cost">
						<span class="text">元</span> 
					</label>
					<label for="time" class="label">
						<span class="text">预计用时: </span> 
						<input type="text" class="time" id="time" name="time">
						<span class="text">分钟</span> 
					</label>
					<label for="num" class="label">
						<span class="text">问卷总数: </span> 
						<input type="text" class="num" id="num" name="num">
						<span class="text">份</span> 
					</label>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="pre col-md-5 col-sm-5 col-md-offset-1 col-sm-offset-1">
			<div class="iphone">
				<div class="iphone-box" id="pre_container">
					<div class="pre-wrapper" data-type="title"><h1 class="pre-title title-content">空标题</h1></div>
					<div class="pre-wrapper" data-type="des">
						<p class="pre-des title-content">
							空描述
						</p>
					</div>
				</div>
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
{% endblock %}

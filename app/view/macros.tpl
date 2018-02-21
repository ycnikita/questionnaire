{% macro active(item='list') %}
<ul class="nav" id="main-menu">
	<li>
		<a class="{% if item == 'list' %}active-menu{% endif %} waves-effect waves-dark" href="/control/list">
			<i class="fa fa-dashboard"></i>已发布列表</a>
	</li>
	<li>
		<a href="/control/edit" class="{% if item == 'edit' %}active-menu{% endif %} waves-effect waves-dark">
			<i class="fa fa-desktop"></i>问卷编辑</a>
	</li>
	<li>
		<a href="/control/analysis" class="{% if item == 'analysis' %}active-menu{% endif %} waves-effect waves-dark">
			<i class="fa fa-bar-chart-o"></i>问卷分析</a>
	</li>
	<li>
		<a href="/control/expenses" class="{% if item == 'expenses' %}active-menu{% endif %} waves-effect waves-dark">
			<i class="fa fa-qrcode"></i>问卷资费</a>
	</li>

	<li>
		<a href="/control/table" class="{% if item == 'table' %}active-menu{% endif %} waves-effect waves-dark">
			<i class="fa fa-table"></i>问卷报表</a>
	</li>
</ul>
{% endmacro %}
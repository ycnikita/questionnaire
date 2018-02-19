{% macro active(item='list') %}
<ul class="nav" id="main-menu">
	<li>
		<a class="{% if item == 'list' %}active-menu{% endif %} waves-effect waves-dark" href="index.html">
			<i class="fa fa-dashboard"></i>已发布列表</a>
	</li>
	<li>
		<a href="ui-elements.html" class="{% if item == 'edit' %}active-menu{% endif %} waves-effect waves-dark">
			<i class="fa fa-desktop"></i>问卷编辑</a>
	</li>
	<li>
		<a href="chart.html" class="{% if item == 'analysis' %}active-menu{% endif %} waves-effect waves-dark">
			<i class="fa fa-bar-chart-o"></i>问卷分析</a>
	</li>
	<li>
		<a href="tab-panel.html" class="{% if item == 'expenses' %}active-menu{% endif %} waves-effect waves-dark">
			<i class="fa fa-qrcode"></i>问卷资费</a>
	</li>

	<li>
		<a href="table.html" class="{% if item == 'table' %}active-menu{% endif %} waves-effect waves-dark">
			<i class="fa fa-table"></i>问卷报表</a>
	</li>
</ul>
{% endmacro %}
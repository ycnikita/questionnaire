{% extends "base.tpl" %}
{% block sideNav %}
{{ macros.active('list') }}
{% endblock %}
{% block innerTitle %}
问卷列表
{% endblock %}
{% block location %}
问卷列表
{% endblock %}
{% block content %}
<div class="row">
	{% for item in list %}
		{% if item.title !== undefined %}
		<div class="col-md-4 col-sm-4">
			<div class="card {{['teal white-text', 'blue-grey darken-1 white-text', '']|random}}">
				<div class="card-content">
					<span class="card-title" style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" title={{item.title}}>{{ item.title }}</span>
					<p style="height: 50px; over-flow:hidden; color: inherite">{{ item.des }}</p>
				</div>
				<div class="card-action">
					<a href="/control/edit?id={{item._id}}">编辑</a>
					<a href="javascript:void(0);" class="delete" data-title="{{item.title}}" data-id="{{item._id}}">删除</a>
				</div>
			</div>
		</div>
		{% endif %}
	{% endfor %}
</div>
{% endblock %}
{% block scripts %}
	<script src="/public/js/custom-list.js"></script>
{% endblock %}
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
	<div class="col-md-4 col-sm-4">
		<div class="card teal">
			<div class="card-content white-text">
				<span class="card-title">Card Title</span>
				<p>I am a very simple card. I am good at containing small bits of information.
				I am convenient because I require little markup to use effectively.</p>
			</div>
			<div class="card-action">
				<a href="#">This is a link</a>
				<a href="#">This is a link</a>
			</div>
			</div>
	</div>
	<div class="col-md-4 col-sm-4">
		<div class="card">
			<div class="card-content">
				<span class="card-title">Card Title</span>
				<p>I am a very simple card. I am good at containing small bits of information.
				I am convenient because I require little markup to use effectively.</p>
			</div>
			<div class="card-action">
				<a href="#">This is a link</a>
				<a href="#">This is a link</a>
			</div>
			</div>
	</div>
	<div class="col-md-4 col-sm-4">
			<div class="card blue-grey darken-1">
			<div class="card-content white-text">
				<span class="card-title">Card Title</span>
				<p>I am a very simple card. I am good at containing small bits of information.
				I am convenient because I require little markup to use effectively.</p>
			</div>
			<div class="card-action">
				<a href="#">This is a link</a>
				<a href="#">This is a link</a>
			</div>
			</div>
	</div>
</div>
{% endblock %}
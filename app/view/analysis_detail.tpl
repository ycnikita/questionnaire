{% extends "base.tpl" %}
{% block sideNav %}
{{ macros.active('analysis') }}
{% endblock %}
{% block innerTitle %}
问卷分析
{% endblock %}
{% block location %}
{{ data.title }}
{{ data|dump}}
{% endblock %}
{% block content %}
{# 所有问卷的完成度列表 #}
<p class="des" style="font-size: 18px;">{{data.des}}</p>
{% for item in data.topics %}
	<div class="row">
		{{ loop.index }}. {{item.content}}
	</div>
	{% if data.answers %}
		<div class="row">
			{% if item.type == 'radio' %}
				<div class="col-xs-12 col-sm-12 col-md-6">
					<div class="row">
						<div class="col-xs-12">
							<div class="card">
								<div class="card-image donutpad">
									<div data-topics="{{item.items|dump}}" class="mychart" id="radio_{{loop.index0}}_0"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{% elif item.type == 'checkbox' %}
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class="cirStats">
						<div class="row">
							{% set wrapIndex = loop.index0 %}
							{% for check in item.items %}
							<div class="col-xs-12 col-sm-3 col-md-3"> 
								<div class="card-panel text-center" id="check_{{wrapIndex}}_{{loop.index0}}">
									<h4>{{check.content}}</h4>
									<div class="easypiechart" id="easypiechart-{{['blue', 'red', 'teal', 'orange', 'brown', 'coral', 'cornsilk', 'DarkCyan'][loop.index0]}}" data-percent="{{(check.hot / data.hot)*100|round}}"><span class="percent">{{(check.hot|default(0) / data.hot)*100|round}}%</span>
									</div>
								</div>
							</div>
							{% endfor %}
						</div>
					</div>
				</div>
			{% elif item.type == 'text' %}

			{% else %}

			{% endif %}
		</div>
	{% else %}
		<div class="row">当前还没有人作答哟～</div>
	{% endif %}
{% endfor %}

{% endblock %}
{% block scripts %}
	<!-- Morris Chart Js -->
	<script src="/public/js/raphael-2.1.0.min.js"></script>
	<script src="/public/js/morris.js"></script>


	<script src="/public/js/easypiechart.js"></script>
	<script src="/public/js/easypiechart-data.js"></script>

	<script src="/public/js/jquery.chart.js"></script>
	{# custom #}
	<script src="/public/js/custom-analysis.js"></script>
	<script>
		window.answers = [];
		{% for answer in data.answers %}
			window.answers.push(JSON.parse('{{answer|dump}}'.replace(/&quot;/g, '"')));
		{% endfor %}
	</script>
{% endblock %}
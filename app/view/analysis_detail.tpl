{% extends "base.tpl" %}
{% block sideNav %}
{{ macros.active('analysis') }}
{% endblock %}
{% block innerTitle %}
问卷分析
{% endblock %}
{% block location %}
{{ data.title }}
{% endblock %}
{% block content %}
{# 所有问卷的完成度列表 #}
{# <div class="row">
	<div class="col-xs-12 col-sm-12 col-md-7">
		<div class="cirStats">
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6">
					<div class="card-panel text-center">
						<h4>Profit</h4>
						<div class="easypiechart" id="easypiechart-blue" data-percent="82">
							<span class="percent">82%</span>
						</div>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6">
					<div class="card-panel text-center">
						<h4>No. of Visits</h4>
						<div class="easypiechart" id="easypiechart-red" data-percent="46">
							<span class="percent">46%</span>
						</div>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6">
					<div class="card-panel text-center">
						<h4>Customers</h4>
						<div class="easypiechart" id="easypiechart-teal" data-percent="84">
							<span class="percent">84%</span>
						</div>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6">
					<div class="card-panel text-center">
						<h4>Sales</h4>
						<div class="easypiechart" id="easypiechart-orange" data-percent="55">
							<span class="percent">55%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--/.row-->
	<div class="col-xs-12 col-sm-12 col-md-5">
		<div class="row">
			<div class="col-xs-12">
				<div class="card">
					<div class="card-image donutpad">
						<div id="morris-donut-chart"></div>
					</div>
					<div class="card-action">
						<b>Donut Chart Example</b>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--/.row-->
</div> #}

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
{% endblock %}
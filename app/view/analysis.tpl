{% extends "base.tpl" %}
{% block sideNav %}
{{ macros.active('analysis') }}
{% endblock %}
{% block innerTitle %}
问卷分析
{% endblock %}
{% block location %}
问卷分析
{% endblock %}
{% block content %}
{# 所有问卷的完成度列表 #}
<!-- /. ROW  -->
<div class="row">
	<div class="col-md-12 col-sm-12 col-xs-12">
		<div class="card">
			<div class="card-action">
				<b>问卷完成度列表</b>
			</div>
			<div class="card-image">
				<ul class="collection">
					{% for item in data %}
					<li data-id="{{item._id}}" class="collection-item avatar" style="display:flex;justify-content: space-between;">
						<div style="width: 50%;">
							<i class="material-icons circle {{['green', '', 'blue', 'orange']|random}}">{{ ['track_changes', 'grade', 'folder']|random }}</i>
							<span class="title">{{item.title}}</span>
							<p title="{{item.des}}">
								{{item.des}}
							</p>
						</div>
						<a href="javascript:void(0);" style="width: 40%; display: inline-block;">
							<div >
								<div class="progress progress-striped active">
									<div class="progress-bar progress-bar-{{['success', 'info', 'warning']|random}}" role="progressbar" aria-valuenow="{{ item.percent }}"
										aria-valuemin="0" aria-valuemax="100" style="width: {{item.percent}}%">
										<span class="sr-only">{{item.percent}}% Complete (success)</span>
									</div>
								</div>
								<p>
									<span class="pull-right text-muted">{{item.percent}}% Complete</span>
								</p>
							</div>
						</a>
					</li>
					{% endfor %}
				</ul>
			</div>
		</div>
	</div>
</div>
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
<div class="row">
	<div class="col-xs-12">
		<div class="card">
			<div class="card-image">
				<div id="morris-area-chart"></div>
			</div>
			<div class="card-action">
				<b>问卷填写活跃时段</b>
			</div>
		</div>
	</div>
</div>

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
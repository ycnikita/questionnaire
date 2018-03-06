<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
{% import "macros.tpl" as macros %}
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>广发问卷</title>

	<link href="/public/css/font-icons.css" rel="stylesheet">
	<link rel="stylesheet" href="/public/css/materialize.min.css" media="screen,projection"
	/>
	<!-- Bootstrap Styles-->
	<link href="/public/css/bootstrap.css" rel="stylesheet" />
	<!-- FontAwesome Styles-->
	<link href="/public/css/font-awesome.css" rel="stylesheet" />
	<!-- Morris Chart Styles-->
	<link href="/public/css/morris-0.4.3.min.css" rel="stylesheet" />
	<!-- Custom Styles-->
	<link href="/public/css/custom-styles.css" rel="stylesheet" />

	<link rel="stylesheet" href="/public/css/cssCharts.css">
	{% block links %}{% endblock %}
</head>

<body>
	<div id="wrapper">
		<nav class="navbar navbar-default top-navbar" role="navigation">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle waves-effect waves-dark" data-toggle="collapse"
				    data-target=".sidebar-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand waves-effect waves-dark" href="index.html">
					<i class="large material-icons">track_changes</i>
					<strong>广发问卷</strong>
				</a>

				<div id="sideNav" href="">
					<i class="material-icons dp48">toc</i>
				</div>
			</div>

			<ul class="nav navbar-top-links navbar-right">
				<li>
					<a class="dropdown-button waves-effect waves-dark" href="#!" data-activates="dropdown4">
						<i class="fa fa-envelope fa-fw"></i>
						<i class="material-icons right">arrow_drop_down</i>
					</a>
				</li>
				<li>
					<a class="dropdown-button waves-effect waves-dark" href="#!" data-activates="dropdown3">
						<i class="fa fa-tasks fa-fw"></i>
						<i class="material-icons right">arrow_drop_down</i>
					</a>
				</li>
				<li>
					<a class="dropdown-button waves-effect waves-dark" href="#!" data-activates="dropdown2">
						<i class="fa fa-bell fa-fw"></i>
						<i class="material-icons right">arrow_drop_down</i>
					</a>
				</li>
				<li>
					<a class="dropdown-button waves-effect waves-dark" href="#!" data-activates="dropdown1">
						<i class="fa fa-user fa-fw"></i>
						<b>颜生</b>
						<i class="material-icons right">arrow_drop_down</i>
					</a>
				</li>
			</ul>
		</nav>
		<!-- Dropdown Structure -->
		<ul id="dropdown1" class="dropdown-content">
			<li>
				<a href="#">
					<i class="fa fa-user fa-fw"></i> 我的信息</a>
			</li>
			<li>
				<a href="#">
					<i class="fa fa-gear fa-fw"></i> 设置</a>
			</li>
			<li>
				<a href="#">
					<i class="fa fa-sign-out fa-fw"></i> 退出</a>
			</li>
		</ul>
		<ul id="dropdown2" class="dropdown-content w250">
			<li>
				<div>
					<i class="fa fa-comment fa-fw"></i> New Comment
					<span class="pull-right text-muted small">4 min</span>
				</div>
			</li>
			<li class="divider"></li>
			<li>
				<div>
					<i class="fa fa-twitter fa-fw"></i> 3 New Followers
					<span class="pull-right text-muted small">12 min</span>
				</div>
			</li>
			<li class="divider"></li>
			<li>
				<div>
					<i class="fa fa-envelope fa-fw"></i> Message Sent
					<span class="pull-right text-muted small">4 min</span>
				</div>
			</li>
			<li class="divider"></li>
			<li>
				<div>
					<i class="fa fa-tasks fa-fw"></i> New Task
					<span class="pull-right text-muted small">4 min</span>
				</div>
			</li>
			<li class="divider"></li>
			<li>
				<div>
					<i class="fa fa-upload fa-fw"></i> Server Rebooted
					<span class="pull-right text-muted small">4 min</span>
				</div>
			</li>
			<li class="divider"></li>
			<li>
				<a class="text-center" href="#">
					<strong>See All Alerts</strong>
					<i class="fa fa-angle-right"></i>
				</a>
			</li>
		</ul>
		<ul id="dropdown3" class="dropdown-content dropdown-tasks w250">
			<li>
				<a href="#">
					<div>
						<p>
							<strong>Task 1</strong>
							<span class="pull-right text-muted">60% Complete</span>
						</p>
						<div class="progress progress-striped active">
							<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
							    aria-valuemin="0" aria-valuemax="100" style="width: 60%">
								<span class="sr-only">60% Complete (success)</span>
							</div>
						</div>
					</div>
				</a>
			</li>
			<li class="divider"></li>
			<li>
				<a href="#">
					<div>
						<p>
							<strong>Task 2</strong>
							<span class="pull-right text-muted">28% Complete</span>
						</p>
						<div class="progress progress-striped active">
							<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="28"
							    aria-valuemin="0" aria-valuemax="100" style="width: 28%">
								<span class="sr-only">28% Complete</span>
							</div>
						</div>
					</div>
				</a>
			</li>
			<li class="divider"></li>
			<li>
				<a href="#">
					<div>
						<p>
							<strong>Task 3</strong>
							<span class="pull-right text-muted">60% Complete</span>
						</p>
						<div class="progress progress-striped active">
							<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60"
							    aria-valuemin="0" aria-valuemax="100" style="width: 60%">
								<span class="sr-only">60% Complete (warning)</span>
							</div>
						</div>
					</div>
				</a>
			</li>
			<li class="divider"></li>
			<li>
				<a href="#">
					<div>
						<p>
							<strong>Task 4</strong>
							<span class="pull-right text-muted">85% Complete</span>
						</p>
						<div class="progress progress-striped active">
							<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="85"
							    aria-valuemin="0" aria-valuemax="100" style="width: 85%">
								<span class="sr-only">85% Complete (danger)</span>
							</div>
						</div>
					</div>
				</a>
			</li>
			<li class="divider"></li>
			<li>
		</ul>
		<ul id="dropdown4" class="dropdown-content dropdown-tasks w250 taskList">
			<li>
				<div>
					<strong>John Doe</strong>
					<span class="pull-right text-muted">
						<em>Today</em>
					</span>
				</div>
				<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>
				</a>
			</li>
			<li class="divider"></li>
			<li>
				<div>
					<strong>John Smith</strong>
					<span class="pull-right text-muted">
						<em>Yesterday</em>
					</span>
				</div>
				<p>Lorem Ipsum has been the industry's standard dummy text ever since an kwilnw...</p>
				</a>
			</li>
			<li class="divider"></li>
			<li>
				<a href="#">
					<div>
						<strong>John Smith</strong>
						<span class="pull-right text-muted">
							<em>Yesterday</em>
						</span>
					</div>
					<p>Lorem Ipsum has been the industry's standard dummy text ever since the...</p>
				</a>
			</li>
			<li class="divider"></li>
			<li>
				<a class="text-center" href="#">
					<strong>Read All Messages</strong>
					<i class="fa fa-angle-right"></i>
				</a>
			</li>
		</ul>
		<!--/. NAV TOP  -->
		<nav class="navbar-default navbar-side" role="navigation">
			<div class="sidebar-collapse">
				{% block sideNav %}{% endblock %}
			</div>

		</nav>
		<!-- /. NAV SIDE  -->

		<div id="page-wrapper">
			<div class="header">
				<h1 class="page-header">
					{% block innerTitle %}{% endblock %}
				</h1>
				<ol class="breadcrumb">
					<li>
						<a href="/">首页</a>
					</li>
					<li>
						<a href="">{% block location %}{% endblock %}</a>
					</li>
				</ol>

			</div>
			<div id="page-inner">
				{% block content %}{% endblock %}
			</div>
			<!-- /. PAGE INNER  -->
		</div>
		<!-- /. PAGE WRAPPER  -->
	</div>
	<!-- /. WRAPPER  -->
	<!-- JS Scripts-->
	<!-- jQuery Js -->
	<script src="/public/js/jquery-1.10.2.js"></script>

	<!-- Bootstrap Js -->
	<script src="/public/js/bootstrap.min.js"></script>

	<script src="/public/js/materialize.min.js"></script>

	<!-- Metis Menu Js -->
	<script src="/public/js/jquery.metisMenu.js"></script>
	
	<!-- Custom Js -->
	<script src="/public/js/custom-scripts.js"></script>
	<script src="/public/js/custom-base.js"></script>
	{% block scripts %}{% endblock %}

</html>
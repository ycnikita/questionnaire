{% extends "base.tpl" %}
{% block content %}
This is list
{% endblock %}
{% block sideNav %}
{{ macros.active('list') }}
{% endblock %}
{% block location %}
问卷列表
{% endblock %}
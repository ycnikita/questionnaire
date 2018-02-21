{% extends "base.tpl" %}
{% block content %}
{% for item in list %}
{{ item.name }}
{% endfor %}
{% endblock %}
{% block sideNav %}
{{ macros.active('list') }}
{% endblock %}
{% block location %}
问卷列表
{% endblock %}
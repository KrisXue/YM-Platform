<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<title>银码平台</title>
<link href="css/mui.min.css" rel="stylesheet" />
<link href="css/main.css" rel="stylesheet" />
</head>
<body id="app">

	<!--<header class="mui-bar mui-bar-nav">
	    <h1 class="mui-title">{{title}}</h1>
	</header>-->

	<nav class="mui-bar mui-bar-tab"> <a v-for="item in tabbar"
		class="mui-tab-item"
		v-bind:class="{'mui-active': $index === initIndex}"
		v-bind:href="item.url" v-on:tap="tab($index)"> <!--<span class="mui-icon mui-icon-{{item.icon}}"></span>-->
		<span class="mui-tab-label">{{item.title}}</span>
	</a> </nav>

	<div class="mui-content">
		<div id="openid" style="display: none;">${openid}</div>
		<div id="merchantIdDIV" style="display: none;">${merchantId}</div>
		<div id="activeTab" style="display: none;">${activeTab}</div>
		
	</div>

	<script src="js/mui.min.js"></script>
	<script src="js/vue.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/vue-mui.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" charset="utf-8">
		var storage = window.localStorage;
		storage.clear();
		var openid = document.getElementById('openid').innerHTML;
		var merchantId = document.getElementById('merchantIdDIV').innerHTML;
		var activeTab = document.getElementById('activeTab').innerHTML;
		storage.setItem("openid",openid);
		storage.setItem("merchantId",merchantId);
		var app = new Vue({
			el : '#app',
			data : {
				initIndex : 0, //[初始化参数]
				title : '信息查询',
				activeTab : activeTab,
				tabbar : [ {
					title : '信息查询',
					url : 'commercialInfo.html'
				}, {
					title : '交易查询',
					url : 'queryTransaction.html'
				}, {
					title : '帮助中心',
					url : 'help.html'
				} ],
				subStyle : {
					top : '0px',
					bottom : '51px'
				}
			},
			ready : function() {
				mui.init();
				// Vue实例化对象
				var self = this;
				// 初始化
				if (mui.os.plus) {
					mui.plusReady(function() {
						var curWs = plus.webview.currentWebview();
						for (var i = 0; i < self.tabbar.length; i++) {
							var subUrl = self.tabbar[i].url;
							var subWs = plus.webview.create(subUrl, subUrl,
									self.subStyle);
							if (i != self.initIndex) {
								subWs.hide();
							}
							curWs.append(subWs);
						}
					})
				} else {
					createIframe('.mui-content', {
						url : self.tabbar[self.initIndex].url,
						style : self.subStyle
					})
				}
			},
			methods : {
				tab : function(index) {
					var targetTab = this.tabbar[index].url;
					// 标题切换
					this.title = this.tabbar[index].title;
					// 子页内容切换
					if (mui.os.plus) {
						// 显示目标webview
						plus.webview.show(targetTab);
						// 隐藏当前webview
						plus.webview.hide(this.activeTab);
						// 更改当前活跃的选项卡
						this.activeTab = targetTab;
					} else {
						// 创建iframe代替子页面
						createIframe('.mui-content', {
							url : targetTab,
							style : this.subStyle
						})
					}
				}
			}
		})
	</script>
</body>
</html>
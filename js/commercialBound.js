mui.init({
	swipeBack : false,
});
mui.plusReady(function() {

});
document
		.getElementById('bindBtn')
		.addEventListener(
				'tap',
				function(e) {
					mui.openWindow({
						//url : 'http://cc.odamiao.com/weixin/index.jsp?openid='+openid+"&merchantId="+commercialNum+"&activeTab=queryTransaction.html&initIndex=1",
						url:'index.jsp',
						styles : {
							top : 0, // 新页面顶部位置
							bottom : 0
						},
						show : {
							autoShow : true, // 页面loaded事件发生后自动显示，默认为true
							aniShow : "slide-in-right", // 页面显示动画，默认为”slide-in-right“；
							duration : 2000
						// 页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
						},
						waiting : {
							autoShow : true, // 自动显示等待框，默认为true
							title : '正在加载...' // 等待对话框上显示的提示内容
						},
						extras : {
							openid : openid,
							merchantId : commercialNum,
							activeTab : "queryTransaction.html",
							initIndex : "1"
						}
					})
					var openid = document.getElementById('openid').innerHTML;
					var commercialNum = document
							.getElementById("commercialNum").value;
					var adminID = document.getElementById("adminID").value;

					// var openid = document.getElementById('openid').innerHTML;
					// var commercialNum = "888290059490001";
					// var adminID = "385265273862";
					// var adminPWD =
					// "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";
					// 点击提交Button 出现loading
					// mui(this).button('loading');
					// setTimeout(function() {
					// mui(this).button('reset');
					// }.bind(this), 2000);

					if (commercialNum.length == 0) {
						document.getElementById("commercialNum").style.borderColor = "#DC7B64";
						$("#commercialNum").addClass("invalid");
						// return false;
					}
					if (adminID.length == 0) {
						document.getElementById("adminID").style.borderColor = "#DC7B64";
						$("#adminID").addClass("invalid");
						// return false;
					}
					if (document.getElementById("adminPWD").value.length != 0) {
						var adminPWD = sha256_digest(document
								.getElementById("adminPWD").value);
						// var adminPWD =
						// document.getElementById("adminPWD").value;
					}
					if (document.getElementById("adminPWD").value.length == 0) {
						document.getElementById("adminPWD").style.borderColor = "#DC7B64";
						$("#adminPWD").addClass("invalid");
						// return false;
					}
					if (commercialNum.length == 0 || adminID.length == 0
							|| adminPWD.length == 0) {
						return false;
					}
					// var jsonBody = JSON.stringify({
					// "commercialNum":
					// document.getElementById("commercialNum").value,
					// "adminID": document.getElementById("adminID").value,
					// "adminID": document.getElementById("adminPWD").value
					// });

					mui
							.ajax({
								type : 'post',
								contentType : "application/x-www-form-urlencoded; charset=utf-8",
								url : 'http://106.14.81.103:8180/mcg/cashier?openId='
										+ openid
										+ '&oprId='
										+ adminID
										+ '&passWd='
										+ adminPWD
										+ '&requestId=1486378739683&signType=MD5&type=pubBindMerc&version=1.0.0&merchantId='
										+ commercialNum,
								async : true,
								timeout : 1000,
								success : function(data) {
									var storage = window.localStorage;
									storage.clear();
									storage.setItem("openid", openid);
									storage
											.setItem("merchantId",
													commercialNum);

									// 返回值转化为JSON
									var strs = new Array();
									strs = data.split("&");
									var json = "";
									json += "{";
									for (i = 0; i < strs.length; i++) {
										var strO = new Array();
										strO = strs[i].split("=");
										for (j = 0; j < strs.length; j++) {
											var newStr = strO[0]
													+ ":"
													+ "'"
													+ decodeURIComponent(strO[1])
													+ "'";
										}
										json += newStr;
										if (i < strs.length - 1) {
											json += ",";
										}
									}
									json += "}";
									var newJson = eval("(" + json + ")");
									console.log(newJson);
									if (newJson.returnCode == "000000") {
										mui.toast('商户编号:' + newJson.merchantId
												+ '<br/>绑定成功！', {
											duration : 'long',
											type : 'div'
										});
										setTimeout(function() {
											mui.openWindow({
												url : 'queryTransaction.html',
												styles : {
													top : 0, // 新页面顶部位置
													bottom : 0
												},
												show : {
													autoShow : true, // 页面loaded事件发生后自动显示，默认为true
													aniShow : "slide-in-right", // 页面显示动画，默认为”slide-in-right“；
													duration : 2000
												// 页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
												},
												waiting : {
													autoShow : true, // 自动显示等待框，默认为true
													title : '正在加载...' // 等待对话框上显示的提示内容
												},
												extras : {
													openid : openid,
													merchantId : commercialNum
												}
											})
										}, 3000);
									}
									if (newJson.returnCode == "MCG20110") {
										mui.toast('商户编号:' + newJson.merchantId
												+ '<br/>已绑定！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG20010") {
										mui.toast('商户信息不存在！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG29999") {
										mui.toast('数据库操作错误！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG20101") {
										mui.toast('管理员不存在/该管理员不属于该商户！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG20100") {
										mui.toast('非管理员不能进行商户绑定！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG20070") {
										mui.toast('管理员密码错误！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG00036") {
										mui.toast('商户状态不正常！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG20030") {
										mui.toast('商户结算信息不存在！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG20090") {
										mui.toast('商户绑定失败！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG20009") {
										mui.toast('系统异常！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG00030") {
										mui.toast('该openId未进行商户绑定！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG20310") {
										mui.toast('管理员编号为空！', {
											duration : 'long',
											type : 'div'
										});
									}
									if (newJson.returnCode == "MCG20410") {
										mui.toast('管理员密码为空！', {
											duration : 'long',
											type : 'div'
										});
									}
									

								},
								error : function(xhr, type, errorThrown) {
									mui.toast('网络异常,请稍候再试');
								}
							});

				});

function validateVal(e) {
	if (e.value.length == 0) {
		e.style.borderColor = "#DC7B64";
		e.className = "mui-input invalid";
	} else {
		e.style.borderColor = "#c8c7cc";
		e.className = "mui-input ";
	}
}
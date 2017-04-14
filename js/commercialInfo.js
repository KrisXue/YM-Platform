mui.init({
	swipeBack: false,
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh
		}
	}
});
mui.ready(function() {
//	var openid = "<%=request.getParameter('openid')%>";
//	var merchantId = "<%=request.getParameter('merchantId')%>";
//	var storage = window.localStorage;
//	storage.clear();
//	if(storage.getItem("openid")){
//		var merchantId = storage.getItem("merchantId");
//		var openid = storage.getItem("openid");
//	}else{
//		var openid = document.getElementById('openid').innerHTML;
//		var merchantId = document.getElementById('merchantIdDIV').innerHTML;
//		
//		storage.setItem("openid",openid);
//		storage.setItem("merchantId",merchantId);
//	}
	mui.ajax({
		type: 'post',
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		url: 'http://139.196.103.157:8180/mcg/cashier?merchantId=merchantId=888290059490001&openId=oZPvswF55kzj0F-BgKGmUVFr8YNU&requestId=1486378739683&signType=MD5&type=wxPubQryMerc&version=1.0.0',
		async: true,
		timeout: 1000,
		success: function(data) {
			//返回值转化为JSON
			var strs = new Array();
			strs = data.split("&");
			var json = "";
			json += "{";
			for(i = 0; i < strs.length; i++) {
				var strO = new Array();
				strO = strs[i].split("=");
				for(j = 0; j < strs.length; j++) {
					var newStr = strO[0] + ":" + "'" + decodeURIComponent(strO[1]) + "'";
				}
				json += newStr;
				if(i < strs.length - 1) {
					json += ",";
				}
			}
			json += "}";
			var newJson = eval("(" + json + ")");
			console.log(newJson);
			//数值填写在页面
			document.getElementById("merchantId").innerHTML = newJson.merchantId;
			document.getElementById("mercNm").innerHTML = newJson.mercNm;
			document.getElementById("stlAct").innerHTML = newJson.stlAct;
			document.getElementById("stlNm").innerHTML = newJson.stlNm;
			if(newJson.phone == undefined){
				document.getElementById("phone").innerHTML = "无";
			}else{
				document.getElementById("phone").innerHTML = newJson.phone;
			}
			if(newJson.email == undefined){
				document.getElementById("email").innerHTML = "无";
			}else{
				document.getElementById("email").innerHTML = newJson.email;
			}
			if(newJson.merAddr == undefined){
				document.getElementById("merAddr").innerHTML = "无";
			}else{
				document.getElementById("merAddr").innerHTML = newJson.merAddr;
			}
			
		},
		error: function(xhr, type, errorThrown) {
			mui.toast('网络异常,请稍候再试');
		}
	});
});
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1000);
}

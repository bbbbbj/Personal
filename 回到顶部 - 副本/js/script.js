window.onload = function(){
	var btn = document.getElementById('btn');
	var oHeight = document.documentElement.clientHeight;
	var oWidth = document.documentElement.clientWidth;
	var timer = null;
	var isTop = true;
	
	//显示按钮
	function oBtn(){
		var sHeight = document.body.scrollTop || document.documentElement.scrollTop;
		if(sHeight>oHeight){
			btn.style.display = 'block';
		}else{
			btn.style.display = 'none';
		}
		if(!isTop){
			clearInterval(timer);
		}
		isTop = false;
	}
	window.onscroll = oBtn;
	btn.onclick = oClick;
	//点击事件
	function oClick(){
		timer = setInterval(function(){
			var sHeight = document.body.scrollTop || document.documentElement.scrollTop;
			var ispeed = Math.floor(-sHeight/6);
			document.documentElement.scrollTop = document.body.scrollTop = sHeight + ispeed;
			isTop = true;
			if(sHeight == 0){
				clearInterval(timer);
			}
		},30)
	}
}















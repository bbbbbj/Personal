function openNew(){
	//获取页面高度和宽度
	var sHeight = document.documentElement.scrollHeight;
	var sWidth = document.documentElement.scrollWidth;

	//可视区域的高度和宽度
	//如果页面是一个竖向的页面，那么可视区域的宽度和页面宽度是一样的
	var wHeight = document.documentElement.clientHeight;

	//遮罩层
	var oMask = document.createElement('div');
		oMask.id = 'mask';
		oMask.style.height = sHeight + 'px';
		oMask.style.width = sWidth + 'px';
		document.body.appendChild(oMask);
	var oLogin = document.createElement('div');
		oLogin.id = 'login';
		oLogin.innerHTML = '<div class = "loginCon"><div id = "close"></div></div>';
		document.body.appendChild(oLogin);

	//获取login的宽度和高度，获取元素要在插入元素之后，不然会报错，获取不到
	var dHeight = oLogin.offsetHeight;
	var dWidth = oLogin.offsetWidth;
		oLogin.style.left = (sWidth-dWidth) / 2 + 'px';
		oLogin.style.top = (wHeight-dHeight) / 2 + 'px';

		var oClose = document.getElementById('close');
			oMask.onclick = oClose.onclick = function(){
				document.body.removeChild(oMask);
				document.body.removeChild(oLogin);
			}
}

window.onload = function(){
	var oBtn = document.getElementById('btnLogin');
	oBtn.onclick = function(){
		openNew();
	}
}
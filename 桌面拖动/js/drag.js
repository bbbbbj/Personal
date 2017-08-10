

//获取元素相对于屏幕左边上边的距离
function getPosition(node){
	var left = node.offsetLeft;
	var top = node.offsetTop;
	var parent = node.offsetParent;
	while( parent != null ){
		left += parent.offsetLeft;
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return  {"left": left,"top": top};
}
window.onload = function(){
	document.onselectstart = new Function('event.returnValue=false;');//防止图片被选中
	var rightDiv = document.getElementById("right"),
		upDiv = document.getElementById("up"),
		leftDiv = document.getElementById("left"),
		downDiv = document.getElementById("down"),
		rightUpDiv = document.getElementById("right-up"),
		rightDownDiv = document.getElementById("right-down"),
		leftUpDiv = document.getElementById("left-up"),
		leftDownDiv = document.getElementById("left-down"),
		mainDiv = document.getElementById("main"),
		ifKeyDown = false,
		contact = "";//表示被按下的触点

	//鼠标按下事件
	rightDiv.onmousedown = function(){
		ifKeyDown = true;
		contact = "right";
	}
	upDiv.onmousedown = function(){
		ifKeyDown = true;
		contact = "up";
	}
	leftDiv.onmousedown = function(){
		ifKeyDown = true;
		contact = "left";
	}
	downDiv.onmousedown = function(){
		ifKeyDown = true;
		contact = "down";
	}
	rightUpDiv.onmousedown = function(){
		ifKeyDown = true;
		contact = "right-up";
	}
	rightDownDiv.onmousedown = function(){
		ifKeyDown = true;
		contact = "right-down";
	}
	leftUpDiv.onmousedown = function(){
		ifKeyDown = true;
		contact = "left-up";
	}
	leftDownDiv.onmousedown = function(){
		ifKeyDown = true;
		contact = "left-down";
	}
	//鼠标松开事件
	window.onmouseup = function(){
		ifKeyDown = false;
	}
	//鼠标移动事件
	window.onmousemove = function(e){
		if(ifKeyDown == true){
			switch(contact){
				case "right":
				rightMove(e);
				break;

				case "up":
				upMove(e);
				break;

				case "left":
				leftMove(e);
				break;

				case "down":
				downMove(e);
				break;

				case "right-up":
				rightMove(e);
				upMove(e);
				break;

				case "left-up":
				leftMove(e);
				upMove(e);
				break;

				case "left-down":
				leftMove(e);
				downMove(e);
				break;

				case "right-down":
				rightMove(e);
				downMove(e);
				break;

			}
			
		}
		setChoice();
		setPreview();
		
	}
	//上边移动
	function upMove(e){
		var y = e.clientY;//鼠标纵坐标
		var mainY = getPosition(mainDiv).top;//选取框相对于屏幕上边的距离
		var addHeight = mainY - y;//增加的高度
		var heightBefore = mainDiv.offsetHeight -2;//原来的高度
		mainDiv.style.height = heightBefore + addHeight + "px";
		mainDiv.style.top = mainDiv.offsetTop - addHeight + "px";
	}
	//右边移动
	function rightMove(e){
		var x = e.clientX;//鼠标x坐标
		var addWidth = "";//鼠标移动后选取框增加的宽度
		var widthBefore = mainDiv.offsetWidth - 2//选取框变化前的宽度
		addWidth = x - getPosition(mainDiv).left - widthBefore;//鼠标移动后增加的宽度
		mainDiv.style.width = addWidth + widthBefore + "px";//选取框变化后
	}
	//下边移动
	function downMove(e){
		var y = e.clientY;//鼠标y坐标
		var heightBefore = mainDiv.offsetHeight - 2;
		var mainY = getPosition(mainDiv).top;
		var addHeight = y - mainY -heightBefore;
		mainDiv.style.height = addHeight + heightBefore + "px";		
	}
	//左边移动
	function leftMove(e){
		var x = e.clientX;//鼠标横坐标
		var mainX = getPosition(mainDiv).left;//选取框相对于屏幕左边的距离
		var addWidth = mainX - x;//增加的宽度
		var widthBefore = mainDiv.offsetWidth - 2;//原来的宽度
		mainDiv.style.width = widthBefore + addWidth + "px";
		mainDiv.style.left = mainDiv.offsetLeft - addWidth + "px";	
	}
	//设置选区区域高亮可见
	function setChoice(){
		var top = mainDiv.offsetTop,
			right = mainDiv.offsetLeft + mainDiv.offsetWidth,
			bottom = mainDiv.offsetTop + mainDiv.offsetHeight,
			left = mainDiv.offsetLeft,
			img2 = document.getElementById("img2");

			img2.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
	}
	//预览函数
	function setPreview(){
		var top = mainDiv.offsetTop,
		right = mainDiv.offsetLeft + mainDiv.offsetWidth,
		bottom = mainDiv.offsetTop + mainDiv.offsetHeight,
		left = mainDiv.offsetLeft,
		img3 = document.getElementById("img3");

		img3.style.top = -top+"px";
		img3.style.left = -left + "px";
		img3.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
	}
}

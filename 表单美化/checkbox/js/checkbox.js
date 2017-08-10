function addLoadEvent(func){
	var oldonload = window.onload;//得到上一个onload事件的函数
	if(typeof window.onload != 'function'){//判断类型是否为‘function’，注意typeof返回的是字符串。
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();//调用之前覆盖的onload函数     
			func();//调用当前事件函数
		}
	}
}

function createTag(){//动态创建b标签
	var li = document.getElementById("checkList").getElementsByTagName("li");
	var label;
	for(var i=0;i<li.length;i++){
		label = li[i].getElementsByTagName("label");
		var bTag = document.createElement("b");
		li[i].insertBefore(bTag,label[0]);
	}
}
function checkList(){
	var li = document.getElementById("checkList").getElementsByTagName("li");
	for(var i=0;i<li.length;i++){
		li[i].onclick = function (){
			if(this.className=="selected"){
				this.className = null;
			}else{
				this.className = "selected";
		}
		}
	}
}
addLoadEvent(createTag);
addLoadEvent(checkList);

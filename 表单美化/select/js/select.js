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
function getDom(id){
	return document.getElementById(id);
}

function showProvince(){
	getDom("selectProvince").onclick = showAllProvince;
}
//显示下拉列表
function showAllProvince(){
	getDom("allProvince").style.display = "block";
	getDom("layer").style.display = "block";
	getDom("selectProvince").style.backgroundPosition = "190px -17px";
	getDom("selectProvince").style.color = "#ccc";
	getDom("layer").onclick = function(){
		hideAllProvince();
	}
	selectProvince();
}
//隐藏下拉列表
function hideAllProvince(){
	getDom("allProvince").style.display = "none";
	getDom("layer").style.display = "none";
	getDom("selectProvince").style.backgroundPosition = "190px 1px";
	getDom("selectProvince").style.color = "#000";
}
//选择省份
function selectProvince(){
	var pro = getDom("allProvince").getElementsByTagName("li");
	var links;
	for(var i=0;i<pro.length;i++){
		links = pro[i].getElementsByTagName("span");
		for(var j=0;j<links.length;j++){
			links[j].onclick = function(){
				getDom("selectProvince").innerHTML = this.innerHTML;//选择的选项赋值
				hideAllProvince();//选择之后再次隐藏菜单项
			}
		}
	}
}
addLoadEvent(showProvince);
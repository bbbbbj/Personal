
function createTag(){//动态创建b标签
	var li = document.getElementsByTagName("li");
	var label;
	for(var i=0;i<li.length;i++){
		label = li[i].getElementsByTagName("label");
		var bTag = document.createElement("b");
		li[i].insertBefore(bTag,label[0]);
	}
}
window.onload = function(){
	createTag();
	checkList();
}
function checkList(){
	var oLi = document.getElementsByTagName('li');
	for(var i=0;i<oLi.length;i++){
		oLi[i].onclick = function(){
			if(this.className.indexOf('selected')>=0){
				this.className = '';
			}else{
				this.className = 'selected';
			}
		}
	}
}

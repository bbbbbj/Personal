var oB = document.getElementsByTagName('dd');
function show(index){
	for(var i = 0;i<oB.length;i++){
		oB[i].className = '';
	}
	oB[index].className = 'selected';
}
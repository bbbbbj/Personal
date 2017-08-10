function show(index){
	var dd = document.getElementById("type").getElementsByTagName("dd");
	for(var i = 0;i<dd.length;i++){
		if(i == index){
			dd[i].className = "selected";
		}else{
			dd[i].className = null;
		}
	}
}
window.onload=function(){
	var outer=document.getElementById('subject');
	var list=outer.getElementsByTagName('li');
	for(var i=0;i<list.length;i++){
		list[i].onmouseover=function(){
			for(var i=0;i<list.length;i++){
				list[i].className='';
			}
			this.className='big';
		}
	}
}
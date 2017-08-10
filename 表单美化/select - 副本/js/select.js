var oSelectProvince = document.getElementById('selectProvince');
var oBox = document.getElementById('box');
var oProvince = document.getElementById('province');
var oAllProvince = document.getElementById('allProvince');
var oLayer = document.getElementById('layer');
var oLi = oAllProvince.getElementsByTagName('li');
var oSpan = oAllProvince.getElementsByTagName('span');
oSelectProvince.onclick = function(){
	oAllProvince.style.display = 'block';
	oLayer.style.display = 'block';
	oSelectProvince.style.backgroundPosition = '190px -17px';
}
for(var i=0;i<oSpan.length;i++){
	oSpan[i].onclick = (function(i){
		return function(){
			oSelectProvince.innerHTML = this.innerHTML;
			hiddenProvince();
		}
	})(i);
}
oLayer.onclick = function(){
	hiddenProvince();
}
function hiddenProvince(){
	oSelectProvince.style.color = '#000';
	oAllProvince.style.display = 'none';
	oSelectProvince.style.backgroundPosition = '190px 1px';
	layer.style.display = 'none';
}
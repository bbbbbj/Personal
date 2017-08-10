
//1.翻面控制
function turn (elem){
	var cls = elem.className;
	var n = elem.id.split('_')[1];

	if( !/photo_center/.test(cls) ){
		return rsort(n);
	}

	if( /photo_front/.test(cls) ){
		cls = cls.replace(/photo_front/,'photo_back');
		g('#nav_'+n).className += ' i_back ';
	}else{
		cls = cls.replace(/photo_back/,'photo_front');
		g('#nav_'+n).className = g('#nav_'+n).className.replace(/\s*i_back\s*/,' ');
	}
	return elem.className = cls;
}

//通用函数
function g(selector){
	var method = selector.substr(0,1) == '.'?'getElementsByClassName':'getElementById';
	return document[method](selector.substr(1));
}
//  随机生成一个值，支持取值范围。 random( [min,max] );
function random( range ){
	//确保max，min没有取反
	var max = Math.max( range[0],range[1] );
	var min = Math.min( range[0],range[1] );

	var diff = max-min;//差值
	var number = Math.ceil( (Math.random()*diff + min) );//先在差值里随机取一个数加上最小值再取整，就是随机生成的数

	return number;
}
//4.输出所有的海报
var data = data;
function addPhotos(){
	var template = g('#wrap').innerHTML;
	var html = [];
	var nav = [];

	for( s in data){
		var _html = template
						.replace("{{index}}",s)
						.replace("{{img}}",data[s].img)
						.replace("{{caption}}",data[s].caption)
						.replace("{{desc}}",data[s].desc);
		html.push( _html );

		nav.push('<span id="nav_'+s+'" onclick="turn(g(\'#photo_'+s+'\'))" class="i">&nbsp;</span>');
	}

	html.push('<div class="nav">'+nav.join('')+'</div>');

	g('#wrap').innerHTML = html.join('');

	rsort( random([0,data.length]));
}
addPhotos();

//计算左右分区的范围{ left:{ x:[ min,max ] ,y:[] } , right:{} }


function range(){
	var range = { left:{ x:[] , y:[] } , right:{ x:[] , y:[] } };

	var wrap = {
		w:g("#wrap").clientWidth,
		h:g("#wrap").clientHeight
	};
	var photo = {
		w:g(".photo")[0].clientWidth,
		h:g(".photo")[0].clientHeight
	};

	// range.wrap = wrap;
	// range.photo = photo;

	range.left.x = [ 0 - photo.w/2, wrap.w/2 - photo.w];
	range.left.y = [ 0 - photo.h/2,wrap.h];

	range.right.x = [wrap.w/2, wrap.w - photo.w/2 ];
	range.right.y = range.left.y;

	return range;
}


//5.排序海报
function rsort( n ){
	//_photo得到的不是一个真正的数组，它有_photo.length属性，但是没有_photo.sort属性
	var _photo = g('.photo');
	//将_photo转成一个真正的数组photo[]
	var photos = [];

	for(var s=0;s<_photo.length;s++){
		//将数组元素的classname"photo_center"替换成空字符串。正则表达式\s*是为了减少classname中的空格。
		_photo[s].className = _photo[s].className.replace(/\s*photo_center\s*/,'');
		_photo[s].className = _photo[s].className.replace(/\s*photo_front\s*/,'');
		_photo[s].className = _photo[s].className.replace(/\s*photo_back\s*/,'');

		_photo[s].className += ' photo_front ';
		_photo[s].style.left = "";
		_photo[s].style.top = "";
		_photo[s].style['-webkit-transform']="rotate(0deg) scale(1.3)";

		photos.push( _photo[s] );   
	}
	//删除并取到中间的元素
	var photo_center = photos.splice(n,1)[0];
	photo_center.className += ' photo_center';
	
	//海报分为左右两个区域
	var photos_left = photos.splice(0,Math.ceil(photos.length/2));
	var photos_right = photos;
	var ranges = range();//不能使用同名

	for(var i=0;i<photos_left.length;i++){
		var photo = photos_left[i];

		photo.style.left = random(ranges.left.x)+'px';
		photo.style.top = random(ranges.left.y)+'px';

		photo.style['-webkit-transform'] = "rotate("+random([-150,150])+"deg) scale(1)";

	}
	for(var i=0;i<photos_right.length;i++){
		var photo = photos_right[i];

		photo.style.left = random(ranges.right.x)+'px';
		photo.style.top = random(ranges.right.y)+'px';

		photo.style['-webkit-transform'] = "rotate("+random([-150,150])+"deg) scale(1)";
	}
	//控制按钮处理
	var navs = g('.i');
	for(var s = 0;s<navs.length;s++){
		navs[s].className = navs[s].className.replace(/\s*i_current\s*/,' ');
		navs[s].className = navs[s].className.replace(/\s*i_back\s*/,' ');
	}
	g('#nav_'+n).className += ' i_current ';
}
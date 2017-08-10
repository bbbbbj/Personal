window.onload = function(){
	//对于没有getElementsByClassName方法的浏览器编写该方法
	if(!document.getElementsByClassName){
		document.getElementsByClassName = function(cls){
			var ret = [];
			var els = docment.getElementsByTagName("*");
			for(var i=0;i<els.length;i++){
				if(els[i].className === cls || els[i].className.indexOf(cls) >=0
											|| els[i].className.indexOf(cls + " ") >=0
											|| els[i].className.indexOf(" " + cls) >=0
											|| els[i].className.indexOf(" " + cls + " ") >=0) {
					ret.push(els[i]);
				}
			}
			return ret;
		}
	}

	var cartTable = document.getElementById("cartTable"),//获得表格
		tr = cartTable.children[1].rows,//获得表格第二个子元素<tbody>中的所有tr元素
		checkInputs = document.getElementsByClassName("check"),//获得所有选择按钮
		checkAllInputs = document.getElementsByClassName("check-all"),//获得所有全选按钮
		selectedTotal = document.getElementById("selectedTotal"),
		priceTotal = document.getElementById("priceTotal"),
		foot = document.getElementById("foot"),
		selectedViewList = document.getElementById("selectedViewList"),
		deleteAll = document.getElementById('deleteAll'),
		checkOnes = document.getElementsByClassName('check-one');


		//计算
		function getTotal(){
			var selected = 0;
			var price = 0;
			var HTMLstr = '';
			for(var i=0;i<tr.length;i++){
				if(tr[i].getElementsByTagName("input")[0].checked){//这行是否被选中
					tr[i].className = "on";
					selected += parseInt(tr[i].getElementsByTagName("input")[1].value);//数量
					price += parseFloat(tr[i].cells[4].innerHTML);//价格
					HTMLstr += '<div><img src="'+ tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="'+i+'">取消选择</span></div>'
				}else{
					tr[i].className = null;
				}
			}
			selectedTotal.innerHTML = selected;
			priceTotal.innerHTML = price.toFixed(2);//保留两位小数
			selectedViewList.innerHTML = HTMLstr;
			if(selected == 0){
				foot.className = 'foot';
			}
		}

		//小计
		function getSubTotal(tr){
			var tds = tr.cells;
			var price = parseFloat(tds[2].innerHTML);
			var count = parseInt(tr.getElementsByTagName('input')[1].value);
			var subTotal = (price * count).toFixed(2);
			tds[4].innerHTML = subTotal;
		}

		for(var i=0;i<checkInputs.length;i++){
			checkInputs[i].onclick = function(){
				if(this.className === "check-all check"){
					for(var j=0;j<checkInputs.length;j++){
						checkInputs[j].checked = this.checked;//将所有选框状态与全选框相同
					}
				}
				if(this.checked == false){
					for(var s=0;s<checkAllInputs.length;s++){
						checkAllInputs[s].checked = false;
					}
				}
				getTotal();
			}
		}
		selected.onclick = function(){
			if (foot.className == 'foot'){
				if(selectedTotal.innerHTML != 0){
					foot.className = 'foot show';
				}
			}else{
				foot.className = 'foot';
			}
		}

		selectedViewList.onclick = function(e){//事件代理
			e = e || window.event;
			var el = e.srcElement;
			if(el.className == 'del'){
				var index = el.getAttribute('index');
				var input = tr[index].getElementsByTagName('input')[0];
				input.checked = false;
				input.onclick();
			}
		}
		for(var i=0;i<tr.length;i++){
			tr[i].onclick = function (e){
				e = e || window.event;
				var el = e.srcElement;
				var cls = el.className;
				var input = this.getElementsByTagName('input')[1];
				var val = parseInt(input.value);
				var reduce = this.getElementsByTagName('span')[1];
				switch (cls){
					case 'add':
						input.value = val + 1;
						reduce.innerHTML = '-';
						getSubTotal(this);
						break;
					case 'reduce':
						if(val > 1){
							input.value = val - 1;
						}else{
							reduce.innerHTML = '';
						}
						getSubTotal(this);
						break;
					case 'delete':
						var conf = confirm('确定要删除吗？');
						if(conf){
							this.parentNode.removeChild(this);
						}
						break;
					default:
						break;
				}
				getTotal();
			}
			tr[i].getElementsByTagName('input')[1].onkeyup = function(){
				var val = this.value;
				var tr  = this.parentNode.parentNode;
				var reduce = tr.getElementsByTagName('span')[1];
				if(isNaN(val) || val < 1){
					val = 1;
				}
				this.value = val;
				if(val = 1){
					reduce.innerHTML = '';
				}else{
					reduce.innerHTML = '-';
				}
				getSubTotal(this.parentNode.parentNode);//this的父节点的父节点
				getTotal();
			}
		}
		deleteAll.onclick = function (){
			if (selectedTotal.innerHTML != 0){
				var conf = confirm('确定要删除吗？');
				if(conf){
					for(var i=0;i<tr.length;i++){
						var input = tr[i].getElementsByTagName('input')[0];
						if(input.checked){
							tr[i].parentNode.removeChild(tr[i]);
							i--;
						}
					}
				}
			}
			
		}
		checkAllInputs[0].checked = true;
		checkAllInputs[0].onclick();
		for(i=1;i<tr.length;i++){
			tr[i].getElementsByTagName('input')[1].value = '1';
		}
		
}
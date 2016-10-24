window.onload=function(){
	waterfall('main','box');
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'}]}
	window.onscroll=function(){
		if (checkScrollSlide()) {
			var oParent=document.getElementById("main");
			//将数据块渲染到页面尾部
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement("div");
				oBox.className="box";
				oParent.appendChild(oBox);
				var oPic=document.createElement("div");
				oPic.className="pic";
				oBox.appendChild(oPic);
				var oImg=document.createElement("img");
				oImg.src="image/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
		/*checkScrollSlide();*/
	}

}

function waterfall(parent,box){
// 将main下的所有class为box的元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面显示的列数(页面宽/box宽)
	var oBoxw=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxw);
	//设置main的宽度	否则盒子列数会随着窗口缩放而变化
	oParent.style.cssText='width:'+oBoxw*cols+"px;margin:0 auto";
	var hArr=[];//存放每一列高度的数组;
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH= Math.min.apply(null,hArr);//apply的第一个参数传递作用域，第二个参数传递数组。
			//Math.min.apply(null, [1, 2, 3]) 等价于 Math.min(1, 2, 3)
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+"px";
			// oBoxs[i].style.left=oBoxw*index+"px";
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;//每一列更新后的高度=每一列原来的高度+后来添加的box元素的高度;
			//即为hArr[index]=hArr[index]+oBoxs[i].offsetHeight;
		}
	}
	//console.log(hArr)
}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr=new Array(),//用来存储获取的所有class为box的元素
	oElements=parent.getElementsByTagName("*");
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i])//push() 用来把一个值加在数组的最后的
		}
	}
	return boxArr;
}

function getMinhIndex(arr,val){
	for(var i in arr){
		if (arr[i]==val) {
			return i;
		}
	}
}

//检测是否具备了滚动条加载数据块的条件	
function checkScrollSlide(){
	var oParent=document.getElementById("main");
	var oBoxs=getByClass(oParent,"box");
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop ;//已经滚动走的页面高度
	//console.log(scrollTop);
	var height=document.body.clientHeight||document.documentElement.clientHeight;//页面高度
	return(lastBoxH<scrollTop+height)?true:false
}









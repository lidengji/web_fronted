//运动框架
function startMove(obj,json,fn){      //(传入参数:对象,对象属性,回调函数)
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){  //setInterval:每隔一段时间循环执行函数
		var bStop=true;
		for (var attr in json){  //attr判断物体的哪一个属性做值的变换,此处为opacity;
			//1,取当前的值;
			var iCur=0;
			if(attr==='opacity'){
				iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}
			//2,算速度;
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			//3,检测停止;
			if (iCur!==json[attr]) {
				bStop===false;	
			}
			if(attr==='opacity'){
				obj.style.filter='alpha:(opacity'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=iCur+iSpeed+"px";
			}
		}
	},20);
}
function getStyle(obj, attr)      //获取CSS样式
{
    if(obj.currentStyle)        //IE
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj, false)[attr];
    }
}// JavaScript Document  
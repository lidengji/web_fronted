$( window ).on( "load", function(){
	waterfall();
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'}]}
	$(window).on('scroll',function(){
		if (checkScrollSlide) {
			$.each(dataInt.data,function(key,value){      //遍历dataInt中的data属性;
				var oBox=$("<div>").addClass("box").appendTo($("#main"));//appendTo(父元素);	
				var oPic=$("<div>").addClass("pic").appendTo($(oBox));
				var oImg=$('<img>').attr('src','image/'+$(value).attr('src')).appendTo($(oPic));//attr()内有一个参数时,是获取属性;两个参数,是设置属性;
			})
			waterfall();
		}
	})
})

function waterfall(){
	var $boxs=$("#main>div");
	var w=$boxs.eq(0).outerWidth();//outerWidth包括填充和边框的宽度;
	var cols=Math.floor($(window).width()/w);
	$("#main").width(w*cols).css("margin","0 auto");//width()在获取的同时还有设置的功能;
	var hArr=[];//把前六章图片的高度放在一个数组内;
	$boxs.each(function(index,value){//index是遍历的每一个元素的索引;value是遍历的每一个元素;
		var h=$boxs.eq(index).outerHeight();
		if (index<cols) {
			hArr[index]=h;
		}else{
			var minH=Math.min.apply(null,hArr);
			var minhIndex=$.inArray(minH,hArr);//$.inArray()可以判断一个值在数组中出现的索引;
			//$.inArray(minH,hArr)表示minH在数组hArr出现的索引;
			$(value).css({        //dom对象不可以用jQuery方法;直接设成value浏览器会报错告诉你没有css这个方法
					'position':'absolute',
					'top':minH+"px",
					'left':minhIndex*w+"px"
			})
			hArr[minhIndex]+=$boxs.eq(index).outerHeight();
		}
	})
}

	function checkScrollSlide(){
		var $lastBox=$("#main>div").last();
		var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);	//在js中用offsetTop
		var scrollTop=$(window).scrollTop();
		var documentH=$(window).height();
		return(lastBoxDis<scrollTop+documentH)?true:false; 
	}



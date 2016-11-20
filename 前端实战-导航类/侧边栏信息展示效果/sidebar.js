// (function(){}) ();为立即执行函数
(function(){
	var Sidebar = function(eId,closeBarId){
		var Menubar=function(){
		this.el=document.querySelector('#sidebar ul');
		this.state='allClosed';//如果有一项被打开,就应更新为hasOpened;
		this.el.addEventListener("click",function(e){
			e.stopPropagation();//阻止事件冒泡,防止点击其他菜单项会进行打开/关闭sidebar的行为;
		});
		var self=this;
		
		this.currentOpenedMenuContent=null;//初始值设为null;
		this.menuList=document.querySelectorAll("#sidebar ul>li");
		for(var	i=0;i<this.menuList.length;i++){
			this.menuList[i].addEventListener('click',function(e){
				var menuContentEl=document.getElementById(e.currentTarget.id+'-content');
				// console.log(menuContentE1);
				if(self.state==='allClosed'){
					console.log('打开'+menuContentEl.id);
					menuContentEl.style.top='0';
					menuContentEl.style.left='-85px';//120px-35px=85px;
					menuContentEl.className='nav-content';
					menuContentEl.classList.add('menuContent-move-right');
					self.state='hasOpened';
					self.currentOpenedMenuContent=menuContentEl;
				}else{
					console.log("关闭"+self.currentOpenedMenuContent.id);
					self.currentOpenedMenuContent.className='nav-content';
					self.currentOpenedMenuContent.style.top='0';
					self.currentOpenedMenuContent.style.left='35px';
					self.currentOpenedMenuContent.classList.add('menuContent-move-left');
					console.log('打开'+menuContentEl.id);
					menuContentEl.className='nav-content';
					menuContentEl.style.top='250px';
					menuContentEl.style.left='35px';
					menuContentEl.classList.add('menuContent-move-up');
					self.state='hasOpened';
					self.currentOpenedMenuContent=menuContentEl;
				}
			});
		}
		this.menuContentList=document.querySelectorAll('.nav-content > div.nav-con-close');
		//找到关闭内容的小箭头按钮;
		for(var i=0;i<this.menuContentList.length;i++){
			this.menuContentList[i].addEventListener('click',function(e){
				var menuContent=e.currentTarget.parentNode;
				//得到菜单内容项,用变量保存;
				//parentNode是关闭按钮的上一级节点,刚好是菜单内容项;
				menuContent.className='nav-content';
				menuContent.style.top='0';
				menuContent.style.left='35px';
				menuContent.classList.add('menuContent-move-left');
				self.state='allClosed';
			});

		}
	};


	// Sidebar首字母大写,为构造函数的基本规范,不与其他函数混淆
	// console.log(this);
	
	
		this.state='opened';
		// 初始状态
		// 构造函数完成初始化
		//    ||后为防止未传参的引入
		this.el=document.getElementById(eId||'sidebar');
		this.closeBarEl=document.getElementById(closeBarId||"closebar");
		 var self=this;   
		 this.menubar=new Menubar();//将menubar作为一个属性传入;
		//闭包  解释见  http://kb.cnblogs.com/page/110782/
		// 事件响应函数
		// 监听事件
		this.el.addEventListener('click',function(event){
			if(event.target!==self.el){  
				// 说明点击关闭按钮或者菜单项,首先排除点击事件发生在sidebar本身;
				//用self代替this防止指向对象由于新定义click函数而变化,保证this指向始终是sidebar;
				console.log(this);
				self.triggerSwitch();
				// 代表打开和关闭的统一事件,名称可以随意起
			}
		});
		// 括号内第三个参数不填写默认允许冒泡
	};
	
	Sidebar.prototype.close=function(){

		console.log('关闭sidebar');
		this.el.className='sidebar-move-left';
		this.closeBarEl.className='closeBar-move-right';
		this.state='closed';
		
	};
	Sidebar.prototype.open=function(){
		console.log('打开sidebar');
		this.el.style.left='-120px';
		// 设置上次被关闭之后移动到的位置,否则以原始位置基准移动
		this.el.className='sidebar-move-right';
		this.closeBarEl.style.left='160px';
		this.closeBarEl.className='closeBar-move-left';
		this.state='opened';
	};
	Sidebar.prototype.triggerSwitch=function(){
		if(this.state==='opened'){
			this.close();
		}else{
			this.open();
		}
	};//根据状态选择打开或者关闭;
	// 原型链
	var sidebar=new Sidebar();

	
})();









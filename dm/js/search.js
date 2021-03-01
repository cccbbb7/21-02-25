//获取操作对象
var row=document.querySelector('.search-list');
var pagination1=document.querySelector('.pagination');

var sele_city = document.querySelector(".factor-selected").lastElementChild

var tags = document.querySelector(".search-factor");

var tag_search = document.querySelector("#tag").querySelector(".factor-content").querySelectorAll("span");

var cityall = document.querySelector("#city").querySelector(".all");
var tagall = document.querySelector("#tag").querySelector(".all");
var tui = document.querySelector(".tuijian");

$(".factor-city>span").addClass("factor-content-item");

//获取当前地址栏中的参数信息
var search=location.search;
// console.log(search);
for(i=0;i<1;i++){
	if(search){
    //分割search字符串
		var tag=decodeURIComponent(search.split('=')[1]);
		console.log(tag);
		for(i=0;i<tag_search.length;i++){
			tag_search[i].removeAttribute("id");
		}
		for(i=0;i<tag_search.length;i++){
			if(tag_search[i].innerHTML==tag){
				tag_search[i].setAttribute("id","selected");
			}
		}
		fresh1()
		tuijian()
	} else{
		fresh1()
		dianji()
		tuijian()
	}
}


function fresh1(){
	(async function(){
		// console.log(1);
		var city = document.querySelector("#city").querySelector("#selected");
		var tag = document.querySelector("#tag").querySelector("#selected");
		var num = document.querySelector(".search-box-top").lastElementChild;
		// console.log(city);
		// console.log(tag);
		var c1=city.innerText;
		var t1=tag.innerText;
		
		var dt=await promiseAjax({
			url:'./php/search.php',
			datatype:'json',
			data:`city=${c1}&tag=${t1}`
		})
		//创建分页器对象
		new Pagination(pagination1,{
			pageInfo:{
				pagenum:1,
				pagesize:15,
				totalsize:dt.length,
				totalpage:Math.ceil(dt.length/15)
			},
			textInfo:{
				first:'首页',
				prev:"上一页",
				next:"下一页",
				last:"尾页"
			},cb(m){
				//获取当前页需要显示的数据
				var ar1=dt.slice((m-1)*15,m*15)
				//创建拼接所有数据的字符串
				var str=''
				//遍历当前ar1数组中所有的数据
				ar1.forEach(item=>{
					str+=`
						<div class="item">
							<a href="./message.html?id=${item.id}" target="_blank">
								<img src="${item.img}" alt="">
								<span>${item.tag}</span>
							</a>
							<div class="item-text">
								<div class="item-text-title">
									<span>${item.city}</span>
									<a href="./message.html?id=${item.id}" target="_blank">${item.title}</a>
								</div>
								<div class="item-text-time">${item.address}</div>
								<div class="item-text-time">${item.time}</div>
								<div class="item-text-tags"><span>${item.change}</span></div>
								<div class="item-text-price">
									<span>${item.money}
									</span>
									售票中
								</div>
							</div>
						</div>
						`
				})
				//把当前拼接好的字符串，添加到row盒子中
				row.innerHTML=str;
				num.innerHTML = dt.length;
			}
		})
	})()
}

fresh1();

function dianji(){
	tags.onclick = function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		// console.log(target)
		//点击tag时，将当前区的全部tag的特殊样式去掉，并给点击的tag加上特殊红色样式
		if(target.className=="factor-content-item"){
			var items = target.parentNode.children;
			for(let i=0;i<items.length;i++){
				items[i].removeAttribute("id");
			}
			target.parentNode.previousElementSibling.removeAttribute("id");
			target.setAttribute("id","selected");
			
		}
		
		//点击城市区的tag时，将tag的innerhtml输出到“当前选中城市”后
		if(target.className=="factor-content-item"&&target.parentNode.parentNode.parentNode.parentNode.id=="city"){
			sele_city.innerHTML = target.innerHTML
		}
		if(target.className=="fl all"&&target.parentNode.parentNode.parentNode.id=="city"){
			sele_city.innerHTML = target.innerHTML
		}
		
		//点击全部时，“全部”tag变红，单个的tag变为原来的白色样式
		if(target.className=="fl all"){
			var items = target.nextElementSibling.children;
			for(let i=0;i<items.length;i++){
				items[i].removeAttribute("id");
			}
			target.setAttribute("id","selected");
		}
		//调用函数，使用数据库
		fresh1();
		tuijian();
	}
}
dianji()

function tuijian(){
	(async function(){
		var city = document.querySelector("#city").querySelector("#selected");
		var tag = document.querySelector("#tag").querySelector("#selected");
		var c1=city.innerText;
		var t1=tag.innerText;
		console.log(c1)
		console.log(t1)
		dt=await promiseAjax({
			url:'./php/tuijian.php',
			data:'tag='+t1+'&city='+c1,
			datatype:'json'
		})
		console.log(dt)
		
		var ar1 = dt.slice(0,3)
		//创建拼接所有内容的字符串
		
		var str1=''
		ar1.forEach(item=>{
			str1+=`
				<li>
					<a class="clear" href="message.html?id=${item.id}">
						<img src="${item.img}" alt="" class="fl">
						<div class="fl content">
							<p class="title">${item.title}</p>
							<p class="venue">${item.address}</p>
							<p class="showtime">${item.time}</p>
							<p class="price">￥<span>${item.money}</span><span></span></p>
						</div>
					</a>
				</li>
		`
		})
		tui.innerHTML=str1;
	})()
	
}
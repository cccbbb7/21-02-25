// $('.map-count').hover(function(){
// 	$(this).find(".city-header-wrap").addClass("on")
// },function(){
// 	$(this).find(".city-header-wrap").removeClass("on")
// })

$(".icon-damai").hover(function(){
	$(".damai-code").addClass("on")
},function(){
	$(".damai-code").removeClass("on")	
})

$(".login").hover(function(){
	$(".sel").addClass("on")
},function(){
	$(".sel").removeClass("on")	
})

$(".sel").find("p").each(function(){
	$(this).hover(function(){
		$(this).addClass("yanse")
	},function(){
		$(this).removeClass("yanse")
	})
})

var dt;
var tags=[];
var titles = document.querySelectorAll(".top");
var boxs = document.querySelectorAll(".box");


for(let i=0;i<titles.length;i++){
	tags[i] = titles[i].firstElementChild.innerHTML;
}

function fresh(){
	for(let i=0;i<boxs.length;i++){
		(async function(){
			var tag=tags[i];
			dt=await promiseAjax({
				url:'./php/damai.php',
				data:'tag='+tag,
				datatype:'json'
			})
			//console.log(dt)
			
			var ar1 = dt[0]
			var ar2 = dt.slice(1,7)
			//创建拼接所有内容的字符串
			var str1=`
			<div class="left fl">
				<a href="message.html?id=${dt[0].id}">
					<img src="${dt[0].img}" alt="">
					<div>
						<p class="title">${dt[0].title}</p>
						<p class="money">￥<span>${dt[0].money}</span></p>
					</div>
				</a>
			</div>
			<ul class="box-right clear fl">
			`
			var str2=''
			ar2.forEach(item=>{
				str2+=`
					<li>
						<a href="message.html?id=${item.id}">
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
			var str3 = `</ul>`
			var str=str1+str2+str3;
			boxs[i].innerHTML=str;
		})()
		
	}
}
fresh()
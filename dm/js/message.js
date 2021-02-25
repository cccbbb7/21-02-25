var test=document.querySelector(".test");


//获取当前地址栏中的参数信息
var search=location.search
//获取大盒子对象
var box=document.querySelector(".box")
var dts;
//判断当前search对象中是否有值
if(search){
    //分割search字符串
    var id=search.split('=')[1];
    (async function(){
        dts=await promiseAjax({
            url:'./php/message.php',
            data:'id='+id,
            datatype:'json'
        })
		console.log(dts);
        //创建拼接所有内容的字符串
        var str=`
        <div class="content">
        	<div class="hd clear">
        		<div class="left-img fl">
        			<img src="${dts.img}" alt="">
        		</div>
        		
        		<div class="order fr">
        			<div class="title">${dts.city}${dts.title}</div>
        			<div class="tim-addr">
        				<p class="time">时间：${dts.time}</p>
        				<p class="address">场馆：${dts.address}</p>
        			</div>
        			
        			<div class="perform-order-box">
						<div>￥：${dts.money}</div>
						<div class="perform-btn">	
							<a href="./cart.html" class="btn btn-info">购物车</a>
							<a href="javascript:;" class="btn btn-success">加入购物车</a>
						</div>
					</div>
        		</div>
        	</div>
        	
        	<div class="perform-bd">
				<div class="notice-nav-fixed" style="display: none;">
					<div class="notice-nav-fixed-wrap">
						<a href="#detail" class="notice-nav-item">项目详情</a>
						<a href="#notice0" class="notice-nav-item">购票须知</a>
						<a href="#notice1" class="notice-nav-item">观演须知</a>
					</div>
				</div>
        		<div class="notice-nav">
        			<span class="notice-nav-item">项目详情</span>
        			<span class="notice-nav-item">购票须知</span>
        			<span class="notice-nav-item">观演须知</span>
        		</div>
        		
        		<div class="notice-content">
        			<div id="detail" class="list">
        				<div>
        					<p class="title">温馨提示</p>
        					<div class="words">您知悉，因各地疫情情况，演出地或您所在地疫情防控政策可能影响您的出行安排或演出的入场验证要求。若演出受不可抗力影响延期或取消导致退票的，大麦仅支持退回票款，其它因观演发生的费用需由您自行承担。</div>
        				</div>
        				<div class="intro">
        					<p class="title">剧目介绍</p>
        					<div>${dts.intro}</div>
        				</div>
        				
        				
        			</div>
					
        			<div id="notice0" class="list">
        				<p class="title">购票须知</p>
        				<div class="words">
							<span>限购规则</span>
							<p>${dts.buy_rule}</p>
						</div>
						<div class="words">
							<span>退票/换票规则</span>
							<p>${dts.return_rule}</p>
						</div>
						<div class="words">
							<span>入场规则</span>
							<p>${dts.entrance_rule}</p>
						</div>
						<div class="words">
							<span>儿童购票</span>
							<p>${dts.child_ticket}</p>
						</div>
						<div class="words">
							<span>发票说明</span>
							<p>${dts.invoice}</p>
						</div>
						<div class="words">
							<span>实名购票规则</span>
							<p>${dts.realname_ticket}</p>
						</div>
						<div class="words">
							<span>异常排单说明</span>
							<p>${dts.err_single}</p>
						</div>
        			</div>
					
        			<div id="notice1" class="list">
        				<p class="title">观演须知</p>
        				<div class="words">
        					<div>
        						<span>演出时长</span>
        						<p>${dts.show_time}</p>
        					</div>
        					<div>
        						<span>入场时间</span>
        						<p>${dts.start_time}</p>
        					</div>
        					<div>
        						<span>主要演员</span>
        						<p>${dts.actor}</p>
        					</div>
        					<div>
        						<span>最低演出时长</span>
        						<p>${dts.time_min}</p>
        					</div>
							<div>
								<span>最低演出曲目</span>
								<p>${dts.track_min}</p>
							</div>
        					<div>
        						<span>禁止携带物品</span>
        						<p>${dts.ban_items}</p>
        					</div>
							<div>
								<span>寄存说明</span>
								<p>${dts.chat_that}</p>
							</div>
							<div>
								<span>寄存说明</span>
								<p>${dts.ticket_num}</p>
							</div>
        				</div>
        			</div>
        		</div>
        	</div>
        </div>
        
        <div class="con-right">
        	<div class="service">
        		<div class="service-note">
        			<p class="service-name"><i></i>${dts.ervice_note1}</p>
        			<div class="service-content">222</div>
        		</div>
				<div class="service-note">
					<p class="service-name"><i></i>${dts.ervice_note2}</p>
					<div class="service-content">222</div>
				</div>
				<div class="service-note">
					<p class="service-name"><i></i>${dts.ervice_note3}</p>
					<div class="service-content">222</div>
				</div>
				<div class="service-note">
					<p class="service-name"><i></i>${dts.ervice_note4}</p>
					<div class="service-content">222</div>
				</div>
        		<div class="service-note"></div>
        	</div>
        	
        	<div class="right-con-suggest">
        		<p>为你推荐</p>
        		<ul class="tuijian clear">
        		</ul>
        	</div>
        </div>
        `
		
        //把当前内容添加到大盒子中
        box.innerHTML=str;
		
	$(".words").find("span").addClass("item-title");
	$(".words").find("p").addClass("item-text");
	
	title()
	tuijian()
    })()
	
	
	box.onclick=function(e){
	    var e = e || window.event
	    //获取点击对象
	    var target=e.target || e.srcElement
	    //判断点击的对象是否为加入购物车按钮
	    if(target.innerHTML=="加入购物车"){
	        //获取localStorage中的cartList3
	        var cartList=localStorage.getItem("cartList3")
			console.log(cartList)
	        //判断当前获取的cartList是否存在
	        if(cartList){
	            //把localStorage中获取的内容转为数组对象
	            cartList=JSON.parse(cartList)
	            var a=0 //判断当前添加的商品是否在localStorage中存在
	            //遍历数组中所有元素啊
	            cartList.forEach(item=>{
	                //判断当前遍历的商品是否等于要添加的商品
	                if(item.id==dts.id){
	                    a++
	                    item.cart_number++
	                }
	            })
	            //判断a变量是否等于0
	            if(a==0){
	                //修改商品数量
	                dts.cart_number=1
	                //把当前对象追加到数组中
	                cartList.push(dts)
	            }
	            //把当前商品添加到localStorage中
	            localStorage.setItem("cartList3",JSON.stringify(cartList))
	        }else{
	            //修改当前商品数量
	            dts['cart_number']=1
	            //把当前商品添加到localStorage中
	            localStorage.setItem("cartList3",JSON.stringify([dts]))
	        }
	
	    }  
	}


}else{
    alert("你还没选中商品")
    location="./list.html"
}

//如果小标题里后的p标签里为空，则隐藏该小标题(的父级小节)
function title(){
	var texts = document.querySelectorAll(".item-text");
	for(let i=0;i<texts.length;i++){
		if(texts[i].innerHTML==""){
			// console.log(texts[i]);
			texts[i].parentNode.style.display="none";
		}
	}
}

function tuijian(){
	(async function(){
		var c1=dts.city;
		var t1=dts.tag;
		var tui = document.querySelector(".tuijian");
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

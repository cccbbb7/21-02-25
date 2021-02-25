//获取账号cookie
var name1=getCookie("user");
//获取大盒子对象
var box=document.querySelector(".cart-box");
var quan = document.getElementsByName('a0')
var tbody = document.querySelector("tbody")
var allbuy = document.querySelector(".buy4");
var inps = document.getElementsByName('a1');
var trs = document.getElementsByClassName("content")
//获取地址栏中的地址
var url=location.href
//获取localStorage中的cartList3
var cartList=localStorage.getItem("cartList3")
//把当前cartList字符串转为数组对象

cartList=JSON.parse(cartList)||[]
if(name1){
    show() 
}else{
    alert("你还没登录，请登录在进入")
    location="./login.html?pathUrl="+url
}
// console.log(cartList.length)
function show(){
    //判断当前localStorage中是否有内容
    if(cartList.length>0){
        //获取全选框是否被选中
        var aa=cartList.every(item=>{
            //判断当前商品是否被选中
            return item.is_select==1
        })
        //获取当前被选中商品的种类和价格
        var sum=total()
        var str2=`
        <ul class="msg clear">
        	<li class="c1"><input type="checkbox" name="a0" value="全选" ${aa?"checked":''}>全选</li>
        	<li class="c2">商品信息</li>
        	<li class="c3">单价（元）</li>
        	<li class="c4">数量</li>
        	<li class="c5">金额</li>
        	<li class="c6">操作</li>
        </ul>
        <table cellpadding="0" cellspacing="0">
        	<tbody>
        `
		// console.log(str2)
        //遍历数组中所有商品
        cartList.forEach(item=>{
            str2+=`
            <tr class="content"><td class="td1"><input type="checkbox" name="a1" value="1" ${item.is_select==1?"checked":''} data-id="${item.id}"></td>
			<td class="td2"><img src="${item.img}"></td>
			<td class="td3">${item.title}</td>
			<td class="td4">￥<span>${item.money}</span></td>
			<td class="td5">
			<input class="aa" type="button" value="-" data-id="${item.id}"><input class="cc" type="text" name="wenben" value="${item.cart_number}"><input class="aa" type="button" value="+" data-id="${item.id}"></td>
			<td class="td6">￥<span>${item.money*item.cart_number}</span></td>
			<td class="td7"><input value="移入收藏" data-id="${item.id}"></input><input value="删除" data-id="${item.id}"></input></td></tr>
			`
        })
        //给当前字符串拼接结束的标签
        str2+=`
			</tbody>
				<tfoot>
					<tr>
						<td class="tf1" colspan="2">合计</td>
						<td class="tf2" colspan="5">¥<span>00.00</span></td>
					</tr>
				</tfoot>
			</table>
			<ul class="buy clear">
				<li class="buy1"><input type="checkbox" name="a0" value="全选" ${aa?"checked":''}>全选</li>
				<li class="buy2"><input value="批量删除"></li>
				<li class="buy3">已选择<span>${sum[0]}</span>件商品</li>
				<li class="buy4">
					<p>总计：￥<span>${(sum[1])}</span></p>
				</li>
				<li class="buy5"><input value="结算"></input></li>
			</ul>	
		`
		// console.log(str2)
        //最后把拼接好的内容添加到box大盒子中
        box.innerHTML=str2
		
		// total()
		total2()
		//checked1()
		
    }else{
        var str1=`
              <h1>您的购物车空空如也</h1>
              <p>点击下方按钮快去选购吧! ^_^</p>
              <p><a class="btn btn-primary btn-lg" href="./search.html" role="button">赶紧去选吧</a></p>
        ` 
        //把当前内容添加到box盒子中
        box.innerHTML=str1
    }
}


box.onclick = function(e) {
	var e = e || window.event
	var target = e.target || e.srcElement
	//+
	if(target.value=="+"){
		var id=target.getAttribute("data-id")
		//遍历cartList数组对象
		cartList.forEach(item=>{
		    //判断遍历出来的商品是否为当前操作商品
		    if(item.id==id){
		        item.cart_number++
		    }
		})
		//重新把当前操作完毕的数组添加到localStorage中
		localStorage.setItem("cartList3",JSON.stringify(cartList))
		//调用show方法，重新把页面再次渲染
		show()
	}
	
	//-
	if (target.value == '-') {
		//获取当前对象中的id属性
		var id=target.getAttribute("data-id")
		//遍历cartList数组对象
		cartList.forEach(item=>{
		    //判断遍历出来的商品是否为当前操作商品
		    if(item.id==id){
				if (item.cart_number>1) {
					item.cart_number--
				}else{
					item.cart_number=1
				}
		    }
		})
		//重新把当前操作完毕的数组添加到localStorage中
		localStorage.setItem("cartList3",JSON.stringify(cartList))
		//调用show方法，重新把页面再次渲染
		show()
	}
	
	
	
	if (target.value == "删除") {
		var id=target.getAttribute("data-id")
		cartList=cartList.filter(item=>{
		    //过滤被删除的商品
		    return item.id!=id
		})
		//重新把当前操作完毕的数组添加到localStorage中
		localStorage.setItem("cartList3",JSON.stringify(cartList))
		//调用show方法，重新把页面再次渲染
		show()
	}
	
	
	if (target.value == "移入收藏") {
		var id=target.getAttribute("data-id")
		cartList=cartList.filter(item=>{
		    //过滤被删除的商品
		    return item.id!=id
		})
		//重新把当前操作完毕的数组添加到localStorage中
		localStorage.setItem("cartList3",JSON.stringify(cartList))
		//调用show方法，重新把页面再次渲染
		show()
	}
	
	if (target.value == '批量删除') {
		//遍历所有商品
		cartList=cartList.filter(item=>{
			return item.is_select==0
		})
		localStorage.setItem("cartList3",JSON.stringify(cartList))
		show()
	}
	
	if (target.value == '结算') {
		//添加确认框
		if(confirm("你确定要购买吗？")){
		    alert("你需要支付：￥"+total()[1])
		    cartList=cartList.filter(item=>{
		        return item.is_select!=1
		    })
		    //重新把当前操作完毕的数组添加到localStorage中
		    localStorage.setItem("cartList3",JSON.stringify(cartList))
		    //调用show方法，重新把页面再次渲染
		    show()
		}
	}
	
	
	if (target.value == "全选") {
		//遍历所有商品
		cartList.forEach(item=>{
		    //判断当前全选框是否被选中
		    if(target.checked){
		        item.is_select=1
		    }else{
		        item.is_select=0
		    }
		})
		//重新把当前操作完毕的数组添加到localStorage中
		localStorage.setItem("cartList3",JSON.stringify(cartList))
		//调用show方法，重新把页面再次渲染
		show()
	}


	//选中框
	if (target.value == '1') {
		var id=target.getAttribute("data-id")
		 //遍历数组中所有的商品对象
		 cartList.forEach(item=>{
		    if(item.id==id){
		     item.is_select=item.is_select==1?"0":"1"
		    }
		})
		 //重新把当前操作完毕的数组添加到localStorage中
		 localStorage.setItem("cartList3",JSON.stringify(cartList))
		 //调用show方法，重新把页面再次渲染
		 show()
	}

}

//统计所选商品种类和价格
function total(){
    var num=0 //所选商品种类
    var price=0 //所选商品总价格
    //遍历cartList数组对象
    cartList.forEach(item=>{
        //判断当前商品是否被选中
        if(item.is_select==1){
            num++
            price+=(item.cart_number*item.money)
			console.log(price)
        }
    })
	price=price.toFixed(2)
	console.log(price)
    return [num,price]
}


function total2() {
	var tfoot = document.querySelector("tfoot")
	var sum = 0 //总计
	//遍历所有商品
	for (var i = 0; i < trs.length; i++) {
		//获取当前商品中所有的子元素节点
		var sons = trs[i].children
		//获取金额
		var xiaoji = sons[sons.length - 2].lastElementChild.innerHTML
		sum += parseFloat(xiaoji)		
	}
	//把当前总计赋值
	tfoot.lastElementChild.lastElementChild.lastElementChild.innerHTML = sum.toFixed(1)
}

/* var inputs = document.getElementsByClassName('cc')
	//给每个输入框绑定一个oninput事件
for (var i = 0; i < inputs.length; i++) {
	inputs[i].oninput = function() {
		//获取当前输入框中的文本
		var val = this.value
		var reg = /^[1-9]\d{0,4}$/
		if (reg.test(val)) {
			//获取单价
			var price = this.parentNode.previousElementSibling.lastElementChild.innerHTML
			//计算金额
			var xiaoji = parseInt(val) * parseFloat(price)
			//重新给金额赋值
			this.parentNode.nextElementSibling.lastElementChild.innerHTML = xiaoji.toFixed(1)
		} else {
			alert("数量有误，请重新输入")
			this.value = 1
			//获取单价
			var price = this.parentNode.previousElementSibling.lastElementChild.innerHTML

			//重新给金额赋值
			this.parentNode.nextElementSibling.lastElementChild.innerHTML = price.toFixed(1)
		}
		total1()
		total2()
	}
} */

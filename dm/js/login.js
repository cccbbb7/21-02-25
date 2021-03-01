//获取操作对象
var btn = document.querySelector('[type="submit"]');
var user = document.querySelector('[type="text"]');
var pass = document.querySelector('[type="password"]');
//获取地址栏中的参数
var search=location.search
//给能被点击的登录按钮绑定点击事件
btn.onclick=function(){
    //获取账号输入框中的value
    var u1=user.value
    var p1=pass.value
    //调用ajax发送请求
    Ajax({
        url:'./php/login.php',
        data:`p_e=${u1}&password=${p1}`,
        success:function(dt){
            //判断当前返回值是否等于1
            if(dt==1){
				//判断当前地址栏中是否有参数
				if(search){
				    //获取参数中传入的地址
				    var new_url=search.split('=')[1]
				    location.href=new_url
				}else{
				    location.href="./damai.html"
				}
				setCookie("user",u1,{
					expires: 7,
				})
				
            }else{
                alert("登录失败")
            }
        }
    })
    return false
}
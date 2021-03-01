var btn = document.querySelector('[type="submit"]');
var user = document.querySelector('#name');
var num = document.querySelector('#number');
var email = document.querySelector('#email');
var pass = document.querySelector('[type="password"]');

//给能被点击的登录按钮绑定点击事件
btn.onclick=function(){
    //获取账号输入框中的value
    var u1=user.value
	var n1=num.value
	var e1=email.value
    var p1=pass.value
	console.log(u1)
    //调用ajax发送请求
    Ajax({
        url:'./php/register.php',
        data:`username=${u1}&password=${p1}&number=${n1}&email=${e1}`,
        success:function(dt){
            //判断当前返回值是否等于1
            if(dt==1){
				alert("注册成功")
                location.href="./login.html"
            }else{
                alert("注册失败")
            }
        }
    })
    return false
}
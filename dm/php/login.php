<?php
header("content-type:text/html;charset=utf-8");
//获取传入的参数
$p_e=$_GET['p_e'];
$p=$_GET['password'];
//连接数据库
$link=mysqli_connect("localhost",'root','123456','shop');
//设置编码
mysqli_set_charset($link,"utf8");
//SQL语句
$sql="select * from user where (phone='$p_e' or email='$p_e') and password='$p'";
/* $sql="select * from user"; */
//执行SQL语句，并返回结果集
$result=mysqli_query($link,$sql);
//判断当前结果集中是否存在数据
if(mysqli_fetch_assoc($result)){
    echo '1';
}else{
    echo '0';
}
//关闭连接
mysqli_close($link);

?>
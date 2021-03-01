<?php
header("content-type:text/html;charset=utf-8");
//获取传入的参数
$tag=$_GET['tag'];
//连接数据库
$link=mysqli_connect("localhost",'root','123456','shop');
//设置编码
mysqli_set_charset($link,"utf8");
//SQL语句
$sql="select * from goods where tag = '$tag'";
//执行SQL语句，并返回结果集
$result=mysqli_query($link,$sql);
//创建数组，存储所有数据
$ar1=[];
//遍历结果集
while($row=mysqli_fetch_assoc($result)){
    //把遍历出来的一条条数据追加到数组中
    array_push($ar1,$row);
}
//把当前ar1数组转为json字符串，并响应给浏览器
echo json_encode($ar1);

?>
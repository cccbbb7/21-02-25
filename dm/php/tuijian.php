<?php
header("content-type:text/html;charset=utf-8");
$city=$_GET['city'];
$tag=$_GET['tag'];
//连接数据库
$link=mysqli_connect("localhost",'root','123456','shop');
//设置编码
mysqli_set_charset($link,"utf8");
//SQL语句
$sql="select * from goods ORDER BY RAND()";
$sql1="select * from goods where tag = '$tag' ORDER BY RAND()";
$sql2="select * from goods where city like '%$city%' ORDER BY RAND()";
$sql3="select * from goods where (city like '%$city%' and tag = '$tag') ORDER BY RAND()";
//执行SQL语句，并返回结果集

if($city=="全部"&&$tag=="全部"){
	$result=mysqli_query($link,$sql);
} else if($city=="全部"&&$tag!="全部"){
	$result=mysqli_query($link,$sql1);
} else if($city!="全部"&&$tag=="全部"){
	$result=mysqli_query($link,$sql2);
}else{
	$result=mysqli_query($link,$sql3);
}

//创建存储所有数据的数组
$arr=[];
// $num=0;
//遍历结果集
while($row=mysqli_fetch_assoc($result)){
    //把遍历出来的数据追加到数组中
    array_push($arr,$row);
	// $num++;
}

//把当前数组转为字符串，并响应给浏览器
echo json_encode($arr);
// echo $num;
//关闭连接
mysqli_close($link);

?>
<?php
$id=$_GET["id"];
$ids = array(
"wxxw"=>"hd_inews",//无线新闻
"wxxwsd"=>"_inews",//无线新闻
"wxcj"=>"hd_finance",//无线财经
"wxcjsd"=>"_finance",//无线财经
);
$info=file_get_contents("http://news.tvb.com/ajax_call/getVideo.php?token=http%3A%2F%2Ftoken.tvb.com%2Fstream%2Flive%2Fhls%2Fmobile".$ids[$id].".smil%3Fapp%3Dnews%26feed"); 
preg_match('/"url":"(.*?)"/i',$info,$sn);
$playurl=$sn[1];
$playurl=str_replace("\/","/",$playurl); 
header('location:'.urldecode($playurl));
?>
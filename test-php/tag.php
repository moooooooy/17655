<?php
require_once(dirname(__FILE__)."/include/config_base.php");
require_once(dirname(__FILE__)."/include/inc_taglist_view.php");
$PageNo = 1;
if(isset($_SERVER["QUERY_STRING"])){
	$tag = trim($_SERVER["QUERY_STRING"]);
	$tags = explode('/',$tag);
	$tag = $tags[1];
	if(count($tags)>3) $PageNo = intval($tags[2]);
}else{ 
	$tag = "";
}
$tag = urldecode($tag);
//���û��Tag��Tag���Ϸ�����ʾ����Tag
if($tag=="" || $tag!=addslashes($tag) ){
	$dlist = new TagList($tag,'tag.htm');
}
//�����Tag����ʾ�ĵ��б�
else{
	$dlist = new TagList($tag,'taglist.htm');
}

$dlist->Display();

exit();
?>

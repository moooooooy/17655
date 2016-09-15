
<? 

$dbuser = "admin"; 

$dbhost = "localhost"; 

$dbpass = "admin"; 

$dbname = "mysql"; 

$dbtble = "db"; 

$mysql_link = mysql_connect($dbhost,$dbuser,$dbpass); 

$column = mysql_list_fields($dbname,$dbtble,$mysql_link); 

for($i=0; $i< mysql_num_fields($column); $i++ ) 

{ 

print mysql_field_name($column,$i )."<br>"; 

} 

?> 

<table bgcolor="black"> 

<tr><td> 

<table> 

</td></tr> 

</table> 

</body> 

</html> 

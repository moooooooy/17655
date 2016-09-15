<?php
memory_get_usage();

xdebug_memory_usage();
xdebug_peak_memory_usage();
/**
* Simple function to replicate PHP 5 behaviour
*/
function microtime_float()
{
     list($usec, $sec) = explode(" ", microtime());
	 return ((float)$usec + (float)$sec);
}

$time_start = microtime_float();
// Sleep for a while
usleep(100);
$time_end = microtime_float();
$time = $time_end - $time_start;
echo "Did nothing in $time seconds\n";


$arrTest=array(       "test"=>"abc",       "test2"=>"abc2");var_dump($arrTest);
testXdebug();
function testXdebug() {
	debug_backtrace();
       requireFile();     
}
function requireFile() {
       require_once('abc.php');
}
?>


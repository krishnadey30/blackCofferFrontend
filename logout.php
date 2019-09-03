
<?php 
session_start();
$_SESSION["access_token"] = "";
session_destroy();
header("Location: index.php");
?>

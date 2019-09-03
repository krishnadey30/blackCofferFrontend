<?php
require __DIR__ .'/vendor/autoload.php';
session_start();
if(!empty($_SESSION["access_token"])) {
    unset($_SESSION["registerMessage"]);
    require_once './view/dashboard.php';
} else {
    echo '<script> document.cookie = "access_token= ";</script>';
    require_once './view/login-form.php';
}
?>
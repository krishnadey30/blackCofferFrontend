<?php
namespace Phppot;

use \Phppot\Member;
if (! empty($_POST["register"])) {
    session_start();
    $username = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
    $password = filter_var($_POST["password"], FILTER_SANITIZE_STRING);
    require_once ("./class/Member.php");
    
    $member = new Member();
    $_SESSION["registerMessage"] = $member->processRegistration($username, $password);
    
    header("Location: ./register.php");
    exit();
}
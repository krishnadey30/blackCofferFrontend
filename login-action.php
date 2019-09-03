<?php
namespace Phppot;
use \Phppot\Member;
if(!empty($_SESSION["access_token"])) {
    require_once './view/dashboard.php';
}
elseif (! empty($_POST["login"])) {
    session_start();
    $username = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
    $password = filter_var($_POST["password"], FILTER_SANITIZE_STRING);
    require_once ("./class/Member.php");
    $member = new Member();
    $result = $member->processLogin($username, $password);
    echo $result['error'];
    if ($result['error']) {
        $_SESSION["errorMessage"] = $result['errorMessage'];
    }
    header("Location: ./index.php");
    exit();
}
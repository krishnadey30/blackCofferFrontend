<?php
session_start();
if(!empty($_SESSION["access_token"])) {
    header("Location: ./index.php");
} else {
    require_once './view/register-form.php';
}
?>
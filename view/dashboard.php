<?php
namespace Phppot;

use \Phppot\Member;

if (! empty($_SESSION["access_token"])) {
    require_once __DIR__ . './../class/Member.php';
    $member = new Member();
    $memberResult = $member->getBucketList();
    if (array_key_exists("message",$memberResult)) {
        header("Location: ./logout.php");
    }
}
?>
<html>
<head>
<title>User Login</title>
<link href="./view/css/style.css" rel="stylesheet" type="text/css" />
<link href="./view/css/dashboard.css" rel="stylesheet" type="text/css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
  <body>
    <div class="container">
        <center>
        <input type="button" name="logout" value="LOGOUT"
            class="btnLogin" onclick="window.location='./logout.php'"></span>
        </center>
      <p>
        <label for="new-task">Add Item</label><input id="new-task" type="text"><button>Add</button>
      </p>
      
      <h3>Bucket List</h3>
      <ul id="incomplete-tasks">
      <?php 
      foreach ($memberResult as $blist) {
       echo "<li><label>".$blist->name."</label><input class=\"input-task\" id=\"".$blist->id."\" type=\"text\"><button class=\"edit\">Edit</button><button class=\"delete\">Delete</button></li>";
       } ?>
      </ul>
      
      <!-- <h3>Completed</h3> -->
      <!-- <ul id="completed-tasks">
        <li><input type="checkbox" checked><label>See the Doctor</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>
      </ul> -->
    </div>
       <script>
        document.cookie="access_token=<?php echo $_SESSION['access_token']; ?>";
        </script>
    <script type="text/javascript" src="./view/js/script.js"></script>

  </body>
</html>
<?php
header("HTTP/1.1 200 OK");
?>
<?php
session_start();
if (!isset($_SESSION['sessthm'])) {
  header("Location: /manage.php");
}
?>

<?php
if (isset($_SESSION['sessthm'])) {
$themechoosen = $_SESSION['sessthm'];
echo "<script>console.log('%c[ChatX Time Travel]%c Theme: $themechoosen', 'color: #7289da; font-size:15px; font-weight: bold;', 'color: #000; font-size:12px;');</script>";
}
if ($themechoosen == "ChatX2015") {
     include "theme/2015.html";
    }
if ($themechoosen == "ChatX2016") {
     include "theme/2016.html";
    }
if ($themechoosen == "ChatX2017") {
     include "theme/2017.php";
    }
if ($themechoosen == "ChatX2018") {
     include "theme/2018.html";
    }
if ($themechoosen == "ChatX20190706") {
     include "theme/20190706.html";
    }
?>

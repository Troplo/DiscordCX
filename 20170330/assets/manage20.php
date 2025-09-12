<?php session_start();
if (!isset($_SESSION['sessthm'])){
    $currenttheme = "It is Not Chosen";
  }
  else {$currenttheme = $_SESSION['sessthm'];}

/* Core Logic */
if (isset($_POST['themechoiceform'])){
    $themechoiceform = strip_tags($_POST['themechoiceform']);
    if ($themechoiceform == "on") {$_SESSION['sessthm'] = "$currenttheme";} else {$_SESSION['sessthm'] = "$themechoiceform";} // If user selects same theme as is used currently, for whatever reason it becomes "on"

    header("Location: /manage.php");
  }
  ?>
<form action='manage.php' method='POST' autocomplete="off">
  <title>Manage: Choose a ChatX Version! </title>
  <h1><?php if ($currenttheme=="ChatX2015") {echo "checked";};?>Current: <?php echo "$currenttheme";?></h1>
  <input type="radio" name="themechoiceform" <?php if ($currenttheme == "ChatX2015") {echo "checked";};?> value="ChatX2015">ChatX 2015 (Testing)
  <input type="radio" name="themechoiceform" <?php if ($currenttheme == "ChatX2016") {echo "checked";};?> value="ChatX2016">ChatX 2016 (WIP)
  <input type="radio" name="themechoiceform" <?php if ($currenttheme == "ChatX2017") {echo "checked";};?> value="ChatX2017">ChatX 2017 (Limited)
  <input type="radio" name="themechoiceform" <?php if ($currenttheme == "ChatX2018") {echo "checked";};?> value="ChatX2018">ChatX 2018
  <input type="radio" name="themechoiceform" <?php if ($currenttheme == "ChatX20190706") {echo "checked";};?> value="ChatX20190706">ChatX 2019 07 06
  <br><button type="submit">Choose</button>
</form>

<h4>Legend:</h4>
<small>
<b>Testing<b> - Problematic, Buggy<br>
<b>WIP</b> - Isn't completed, or is being tested<br>
<b>Limited</b> - Some Broken or unavailable funcionality (Video Calls being disabled, Text Channels not rendering well, Newer format problems)<br><br>

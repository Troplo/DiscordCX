<?php
header("HTTP/1.1 200 OK");
?>
<!DOCTYPE html>
<html>
<head>
  <script type="text/javascript">localStorage.setItem("gatewayURL", '"wss://gateway.ChatX.gg"');</script>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" name="viewport"><link rel="stylesheet" href="/assets/698a2e2c2da29ea18204.css"><link rel="icon" href="/assets/07dca80a102d4149e9736d4b162cff6f.ico" />  <title>ChatX</title>
</head>
<body>
  <div id="app-mount"></div>
  <script>window.__require = window.require</script>
  <script>window.__OVERLAY__ = window.overlay != null</script>
  <script>!function(){if(null!=window.WebSocket){var n=function(n){try{var e=localStorage.getItem(n);return null==e?null:JSON.parse(e)}catch(n){return null}},e=n("token"),o=n("gatewayURL");if(e&&o){var t=null!=window.__require?"etf":"json",a=o+"/?encoding="+t+"&v=6";console.log("[FAST CONNECT] "+a+", encoding: "+t+", version: 6");var r=new WebSocket(a);r.binaryType="arraybuffer";var s=Date.now(),l={open:!1,gateway:a,messages:[]};r.onopen=function(){console.log("[FAST CONNECT] connected in "+(Date.now()-s)+"ms"),l.open=!0},r.onclose=r.onerror=function(){window._ws=null},r.onmessage=function(n){l.messages.push(n)},window._ws={ws:r,state:l}}}}();</script>
  <script src="/assets/2017e-1e3a58e490f0498f9c54.js"></script>
  <script src="/assets/2017e-698a2e2c2da29ea18204.js"></script>
  </body>
</html>

<?php
session_start();
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
// header('Access-Control-Allow-Origin: *');

if (isset($_SESSION["uid"]) && isset($_SESSION["retries"]) && isset($_SESSION["contract_addr"]) && isset($_SESSION["type"])) {
  if ($_SESSION["type"] == "1"){
    if (isset($_SESSION["data"])) {
      $data = array(
        'uid'=>$_SESSION['uid'],
        'retries'=>$_SESSION["retries"],
        'time'=>$_SESSION["time"],
        'contract_addr'=>$_SESSION["contract_addr"],
        'type'=>$_SESSION["type"],
        'data'=>$_SESSION["data"]
      );
      $data = json_encode($data);
      echo "data: {$data}\n\n";
      flush();
      unset($_SESSION['data']);
    }
  } else {
    $data = array(
      'uid'=>$_SESSION['uid'],
      'retries'=>$_SESSION["retries"],
      'time'=>$_SESSION["time"],
      'contract_addr'=>$_SESSION["contract_addr"],
      'type'=>$_SESSION["type"]
    );
    $data = json_encode($data);
    echo "data: {$data}\n\n";
    flush();
  }
  
  unset($_SESSION['uid']);
  unset($_SESSION['retries']);
  unset($_SESSION['contract_addr']);
  unset($_SESSION['type']);
  exit;
}
?>
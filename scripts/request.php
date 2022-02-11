<?php
session_start();
$uid = session_id();
if ($_SERVER["REQUEST_METHOD"] == "GET") {
  // collect value of input field
  if (isset($_GET['session_id'])){
    if (empty($uid)){
      throw new Exception("No session ID available");
    } elseif (strcmp($uid, 1)) {
      echo $uid;
    }
  } //elseif (isset($_GET["contract_address"]))
  exit;
}

if (isset($_POST)){
  try{
    if (isset($_POST["type"])){
      if ($_POST["type"]!=2 && $_POST["type"]!=1) {
        throw new Exception("Type invalid");
      }
      if (!isset($_POST["uid"]) || !isset($_POST["retries"]) || !isset($_POST["contract_addr"]) || !isset($_POST["type"])){
        throw new Exception("Field not found");
      }
      if ($_POST["type"]==1 && !isset($_POST["data"])){
        throw new Exception("Data not presented");
      }
      if ($_POST["type"]==2 && isset($_POST["data"])){
        throw new Exception("Invalid parameter");
      }
    }
    if (isset($_POST["uid"])){
      $_SESSION["uid"] = $_POST["uid"];
      $_SESSION["retries"] = $_POST["retries"];
      $_SESSION["contract_addr"] = $_POST["contract_addr"];
      $_SESSION["type"] = $_POST["type"];

      if ($_POST["type"]=="1"){
        if (isset($_POST["data"])) {
          $_SESSION["data"] = $_POST["data"];
        }
      }
      session_write_close();
      echo "Success";
      exit;
    } 
  } catch(Exception $e) {
    echo "Exception: " .$e->getMessage();
    exit;
  }
}

// if (isset($_POST)) {
//   echo json_encode($_POST);
// }

?>
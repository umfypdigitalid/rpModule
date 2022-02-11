<!DOCTYPE html>
<html lang="en">
<head>
    <title>Dummy website</title>
    <link rel="icon" href="img/title-image.ico">
    <link rel="stylesheet" href="resources/styles.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="scripts/login2.min.js"></script>
    <script type="text/javascript" src="scripts/qrcode.vid.js"></script>
    <script type="text/javascript" src="scripts/jquery.qrcode.js"></script>
    <script type="text/javascript">
    <?php 
    session_start();
    session_regenerate_id();
    ?>
    </script>
    
    <script type='module'>
        import {start, getRetries, getSessionID} from "./scripts/qr.js";
        $(document).ready(function(){
            $('#login-form').show();
            $('#not-verified').hide();
            $('#verified').hide();
            $("#IC").hide();
            $("#name").hide();
            $("#dob").hide();
            $("#gender").hide();
            $("#addr").hide();
        });
        $(function(){
            $("#type").change(function(){
                let value = $("#type").val();
                if (2==value){
                    $("#IC").hide();
                    $("#name").hide();
                    $("#dob").hide();
                    $("#gender").hide();
                    $("#addr").hide();
                } else if (1==value){
                    $("#IC").show();
                    $("#name").show();
                    $("#dob").show();
                    $("#gender").show();
                    $("#addr").show();
                }
            });
            $("#digital_sign_in").click(function(){
                $('#qr-scan').show();
                $('#login-form').hide();
                start(1, 11011);
            });
            $("#back").click(function(){
                window.location.href = "http://localhost/rpModule/login.php";
            });
            $("#sign-in").click(function(){
                let username = $('#login_field').val();
                let password = $('#password').val();
                if(validate(username, password)){
                    $('#qr-scan').hide();
                    $('#login-form').hide();
                    $('#verified').show();
                } else {
                    $('#qr-scan').hide();
                    $('#login-form').hide();
                    $('#not-verified').show();
                }
            });
            $("#scan-correct").click(function(){
                var post_data = {};
                post_data.uid = getSessionID();
                post_data.retries = getRetries();
                post_data.contract_addr = $("#contract_addr_input").val();
                post_data.type = $("#type").val();
                if ($("#type").val() == 1){
                    post_data.data = {};
                    if ($("#IC_input").val() !== "")
                        post_data.data.IC = $("#IC_input").val();
                    if ($("#name_input").val() !== "")
                        post_data.data.Name = $("#name_input").val();
                    if ($("#dob_input").val() !== "")
                        post_data.data.DOB = $("#dob_input").val();
                    if ($("#gender_input").val() !== "")
                        post_data.data.Gender = $("#gender_input").val();
                    if ($("#addr_input").val() !== "")
                        post_data.data.Address = $("#addr_input").val();
                }
                $.ajax({
                    type: "POST",
                    url: 'http://localhost/rpModule/scripts/request.php',
                    data: post_data,
                    success: function(data) {
                        console.log(data);
                    }
                });
            });
            var hexedData = web3.utils.asciiToHex(name);
            var hashedData = web3.utils.sha3(hexedData);
            $("#scan-wrong").click(function(){
                var post_data = {};
                post_data.uid = getSessionID();
                post_data.retries = getRetries();
                post_data.contract_addr = $("#contract_addr_input").val();
                post_data.type = 1;
                if ($("#type").val() == 2){
                    post_data.data = {};
                    if ($("#IC_input").val() !== "")
                        post_data.data.IC = $("#IC_input").val();
                    if ($("#name_input").val() !== "")
                        post_data.data.Name = $("#name_input").val();
                    if ($("#dob_input").val() !== "")
                        post_data.data.DOB = $("#dob_input").val();
                    if ($("#gender_input").val() !== "")
                        post_data.data.Gender = $("#gender_input").val();
                    if ($("#addr_input").val() !== "")
                        post_data.data.Address = $("#addr_input").val();
                }
                $.ajax({
                    type: "POST",
                    url: 'http://localhost/rpModule/scripts/request.php',
                    data: post_data,
                    success: function(data) {
                        console.log(data);
                    }
                });
            });
        
            $("#scan-wrong").click(function(){
                $('#not-verified').show();
            });
        });
        
    </script>
</head>

<body>
    <div class="header">
        <h1>Dummy website</h1>
        <p>Design to demonstrate the implementation of <b>Digital ID platform</b> for FYP.</p>
    </div>

    <div class="navbar">
        <a href="index.php">Home</a>
        <a href="payment.html">Payment</a>
        <a href="contract.html">Contract</a>
        <a href="login.php" class="right active">Login</a>
    </div>

    <div id = "login">
        <h1 id='not-verified' style = 'color: white;'>Not Verified!</h1>
        <h1 id='verified' style = 'color: white;'>Verified!!</h1>
        <div id='qr-scan' style = 'padding: 15px; margin: 10px; background-color: white;'>
            <div id = 'qr' class="qrcanvas">
                <div id="qrcodeCanvas"></div>
            </div>
            <div style='right: auto;'><button type='button' id='back' >Back</button></div>
            <button type='button' id='refresh'>Refresh</button>
            <button type='button' id='scan-correct'>Scan</button><button type='button' id='scan-wrong'>Scan customized</button>
            <div id="countdown"></div>
        </div>
    </div>
    <div id="contract_addr">
        <label class="d">
            Identity Contract
        </label>
        <input type="text" id="contract_addr_input" value="0xBE5371d0eDAa1e4ac08423806970BFD04e4d3a27" autofocus="autofocus"  style="width: 400px; margin-bottom: 10px;" >
    </div>
    <div id="type_input">
        <label class="d">
            Type
        </label>
        <select id="type" style="width: 400px; margin-bottom: 10px;">
            <option value=2>Verify identity</option>
            <option value=1>Verify identity by data</option>
        </select>
    </div>
    <div id="IC">
        <label class="d">
            IC
        </label>
        <input type="text" id="IC_input"  autofocus="autofocus" value="550106125821" style="width: 400px; margin-bottom: 10px;" >
    </div>
    <div id="name">
        <label class="d">
            Name
        </label>
        <input type="text" id="name_input"  autofocus="autofocus" value="Rowan Sebastian Atkinson"  style="width: 400px; margin-bottom: 10px;" >
    </div>
    <div id="dob">
        <label class="d">
            DOB
        </label>
        <input type="text" id="dob_input"  autofocus="autofocus" value="1955-01-06" style="width: 400px; margin-bottom: 10px;" >
    </div>
    <div id="gender">
        <label class="d">
            Gender
        </label>
        <select id="gender_input" style="width: 400px; margin-bottom: 10px;">
            <option value="">-- Not Selected --</option>
            <option value="M" default>Male</option>
            <option value="F">Female</option>
        </select>
    </div>
    <div id="addr">
        <label class="d">
            Address
        </label>
        <input type="text" id="addr_input"  autofocus="autofocus" value="GDW Kampung Bayangan 80000 Keningau Sabah" style="width: 400px; margin-bottom: 10px;" >
    </div>

    <div style="margin-left: 20px;">
    </div>
    <div class="footer">
        <h2>Footer</h2>
    </div>
    
</body>
</html>
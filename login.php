<!DOCTYPE html>
<html lang="en">
<head>
    <title>Dummy website</title>
    <link rel="icon" href="img/title-image.ico">
    <link rel="stylesheet" href="resources/styles.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript">
    </script>
    <script type='module'>
        const user = ['user', 'tester'];
        const pass = ['pass1234', 'test1234'];

        $(document).ready(function(){
            $('#qr-scan').hide();
            $('#login-form').show();
            $('#not-verified').hide();
            $('#verified').hide();
        });
        function validate(username, password){
            for(i=0; i<user.length; i++){
                console.log(user[i]+" compare to "+username);
                if (user[i]===username){
                    if (pass[i]===password){
                        return true;
                    }
                }
            }
            return false;
        }
        $(function(){
            $("#digital_sign_in").click(function(){
                window.location.href = "http://localhost/rpModule/digital_login.php";
            });
            $("#back").click(function(){
                $('#qr-scan').hide();
                $('#login-form').show();
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
                $('#verified').show();
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

    <div class = "main login" id = "login">
        <h1 id='not-verified' style = 'color: white;'>Not Verified!</h1>
        <h1 id='verified' style = 'color: white;'>Verified!!</h1>
        <div id='qr-scan' style = 'padding: 15px; margin: 10px; background-color: white;'>
            <div id = 'qr' class="qrcanvas">
                <div id="qrcodeCanvas"></div>
            </div>
            <div style='right: auto;'><button type='button' id='back'>Back</button></div>
            <button type='button' id='refresh'>Refresh</button>
            <button type='button' id='scan-correct'>Scan</button><button type='button' id='scan-wrong'>Scan</button>
            <div id="countdown"></div>
        </div>
        <div class="form" id='login-form'>
            <div>
                <label for="login_field">
                    Username or email
                </label>
                <input type="text" class="input_block" name="login" id="login_field" autofocus="autofocus"  style="background-color: blanchedalmond" >
            </div>
            <div style="position: relative !important;">
                <label for="password">
                    Password
                </label>
                <br/>
                <input type="password" class="input_block" name="password" id="password" autofocus="autofocus" autocomplete="nope">
            </div>
            <div class="forgot"><a href="#">Forgot passowrd?</a></div>
            <div class="submit-btn">
                <input type="submit" class="sign-btn" id='sign-in' name="sign_in" value="Sign In">
                <button type="button" class="sign-btn" id="digital_sign_in">Digital sign in</button>
            </div>
        </div>
    </div>
    <div style="margin-left: 20px;">
    </div>
    <div class="footer">
        <h2>Footer</h2>
    </div>
    
</body>
</html>
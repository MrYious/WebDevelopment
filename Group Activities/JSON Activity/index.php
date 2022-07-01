<!doctype HTML>
<html>
	<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Mark Edison Rosario">
        <title>User Login</title>
        <link rel="stylesheet" href="./css/style.css">
	</head>
	<body>
        <div id="mainContainer">
            <form action='verifyLogin.php' method='post'>
                <h2 id="title">Login Form</h2>
                <div id="inputs">
                    <input type="text" name="username" placeholder="Enter username"/>
                    <input type="password" name="password" placeholder="Enter password"/>
                </div>
                <input id="submit" type="submit" name="submit" value="Login"/>
            </form>
        </div>
	</body>
</html>

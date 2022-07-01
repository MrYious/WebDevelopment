<?php
	session_start();
	if(!isset($_SESSION['username']) && !isset($_SESSION['password'])){
		header('location:index.php');
	}else{
        $file = "users.json";
        $json_object = json_decode(file_get_contents($file));
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Mark Edison Rosario">
    <title>USER LIST</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <div id="tableContainer">
        <h2>List of Users</h2>
        <div>
            <table id="userTable">
                <tr>
                    <th id="user">Username</th>
                    <th id="pass">Password</th>
                </tr>
                <?php
                    foreach ($json_object as $key => $value) {
                        echo "
                            <tr>
                                <td>$value->username</td>
                                <td>$value->password</td>
                            </tr>
                        ";
                    };
                ?>
            </table>
        </div>
    </div>
    <script>
        var json_object = <?php echo json_encode($json_object) ?>;
        console.log("JSON FILE : ", json_object);
    </script>
    <script src="./js/script.js"></script>
</body>
</html>
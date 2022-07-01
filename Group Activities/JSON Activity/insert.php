<?php
    session_start();
	if(!isset($_SESSION['username']) && !isset($_SESSION['password'])){
		header('location:index.php');
	}else{
        // Database Connection and Queries
        $conn = mysqli_connect('localhost','root','','dbmain');

        $user = $_SESSION['username'];
        $pass = $_SESSION['password'];

        if(mysqli_connect_errno()){
            echo 'Failed to connect to MySQL server: ' . mysqli_connect_error();
        }else {
            // INSERT TO DB
            $query = "INSERT INTO logins (username, password) VALUES ('$user','$pass')";
            mysqli_query($conn,$query);
        }
        mysqli_close($conn);
        $file = "users.json";
        $json_object = json_decode(file_get_contents($file));

        class User{
            public $username;
            public $password;
        }
        $new_user_object = new User();
        $new_user_object->username = $user;
        $new_user_object->password = $pass;
        array_push($json_object, $new_user_object);
        // INSERT TO JSON FILE
        file_put_contents($file, json_encode($json_object));

    }
?>

<script>
    window.open('users.php', '_self');
</script>
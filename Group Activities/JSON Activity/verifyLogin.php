<?php
    session_start();
    $_SESSION['username'] = $_REQUEST['username'];
    $_SESSION['password'] = $_REQUEST['password'];


    if(isset($_POST['submit'])) {
        // Database Connection and Queries
        $conn = mysqli_connect('localhost','root','','dbmain');

        if(mysqli_connect_errno()){
            echo 'Failed to connect to MySQL server: ' . mysqli_connect_error();
        }else {
            $query = "SELECT * FROM logins";
            $results = mysqli_query($conn,$query);
            if($results){
                // GET LIST OF USERS
                $listOfUser = mysqli_fetch_all($results);
            }
        }
        mysqli_close($conn);

        // FORM values
        $username = $_REQUEST['username'];
        $password = $_REQUEST['password'];
    }
?>

<script>
    var listOfUser = <?php echo json_encode($listOfUser) ?>;
    var username = "<?php echo $username ?>";
    var password = "<?php echo $password ?>";
    console.log("RAW: " + listOfUser);
    console.log("User: " + username);
    console.log("PW: " + password);

    // JSON
    var usersJSON = [];

    // MYSQL ARRAY TO JSON
    listOfUser.forEach(users => {
        // OBJECT
        let user = {
            username: users[1],
            password: users[2]
        }
        usersJSON.push(user);
    });

    console.log("JSON ARRAY: " + usersJSON);

    var check = false;

    for (let i = 0; i < usersJSON.length; i++) {
        const user = usersJSON[i];
        console.log("DB User #" + i + " : " + user.username + " | " + user.password);
        if(user.username === username){
            if(user.password === password){
                // LOGIN SUCCESS
                window.open('users.php', '_self');
                alert("LOGIN SUCCESS ");
            }else{
                // USER FOUND BUT INCORRECT PASSWORD
                window.open('index.php', '_self');
                alert("USER FOUND BUT INCORRECT PASSWORD");
            }
            check = true;
        }
    }

    if(!check){
        // USER INSERTED TO DATABASE
        window.open('insert.php', '_self');
        alert("USER INSERTED TO DATABASE");
    }
</script>

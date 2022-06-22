<?php
    session_start();
	if (!isset($_SESSION['username']) && !isset($_SESSION['password'])){
		echo "<script>window.location.href='login.php'</script>";
	} else {
		session_destroy();
		echo "<script> alert('Logoff Successful!');</script>";
		echo "<script>window.location.href='login.php'</script>";
	}
?>


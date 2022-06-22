<?php
	session_start();
	if($_REQUEST['username']=='MrYious' && $_REQUEST['password']=='1234'){
		$_SESSION['username']='MrYious';
		$_SESSION['password']='1234';
		echo "<script>alert('Login Successful!');</script>";
		echo "<script>window.location.href='index.php'</script>";
	}else{
		echo "<script>alert('Unauthorized Login!');</script>";
		echo "<script>window.location.href='login.php'</script>";
	}
?>
<?php
    // INSERT DATA TO ORDER_FORM_DB ON THREE TABLES
    $conn = mysqli_connect('localhost','root','','order_form_db');

    if(mysqli_connect_errno()){
        echo 'Failed to connect to MySQL server: ' . mysqli_connect_error();
    }else {
        // Insert to Customer Table
        $query1 = "INSERT INTO `customer_tbl` (`id`, `name`, `address`, `contact_name`, `phone`, `mobile`, `email`)
        VALUES ('$_POST[c_ID]' , '$_POST[c_Name]', '$_POST[c_Address]', '$_POST[c_ContactName]', '$_POST[c_Phone]', '$_POST[c_Mobile]', '$_POST[c_EmailAdd]');";
        //  Insert to OrderList Table
        $query2 = "INSERT INTO `order_list_tbl` (`order_number`, `customer_id`, `total_amount`) VALUES ('$_POST[order_number]' , '$_POST[c_ID]', '$_POST[p_TotalAmount]');";
        if(mysqli_query($conn,$query1) && mysqli_query($conn,$query2)){
            //  Insert to Orders Table
            $p_code = $_POST['p_code'];
            $p_qty = $_POST['p_qty'];
            $p_t_price = $_POST['p_t_price'];
            $p_name = $_POST['p_name'];
            for($idx = 0; $idx < count($p_code); $idx++) {
                if($p_name[$idx] != "default"){
                    $query = "INSERT INTO `orders_tbl` (`order_number`, `product_code`, `quantity`, `total_price`)
                    VALUES ('$_POST[order_number]', '$p_code[$idx]', '$p_qty[$idx]', '$p_t_price[$idx]')";
                    mysqli_query($conn,$query);
                }
            }
            echo 'Order was recorded successfully';
        }else{
            echo 'Error record not added.';
        }
    }
?>
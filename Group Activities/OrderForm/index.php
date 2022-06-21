<?php
    // Database Connection and Queries
    $conn = mysqli_connect('localhost','root','','order_form_db');

    if(mysqli_connect_errno()){
        echo 'Failed to connect to MySQL server: ' . mysqli_connect_error();
    }else {
        $query1 = "SELECT max(id) FROM customer_tbl";
        $result = mysqli_query($conn,$query1);
        if($result){
            while($row = mysqli_fetch_row($result)){
                $c_ID_Next = $row[0] + 1;
            }
        }
        $query2 = "SELECT max(order_number) FROM order_list_tbl";
        $result = mysqli_query($conn,$query2);
        if($result){
            while($row = mysqli_fetch_row($result)){
                $o_Num_Next = $row[0] + 1;
            }
        }
        $current_date = date('m/d/Y');
        $query3 = "SELECT * FROM product_tbl";
        $result = mysqli_query($conn,$query3);
        if($result){
            $listOfProducts = mysqli_fetch_all($result);
        }
        // DO SELECT ALL ORDER LIST TABLE
        $query4 = "SELECT ol.order_number, c.name, ol.total_amount, ol.status, ol.order_date
            FROM order_list_tbl AS ol
            LEFT JOIN customer_tbl AS c
            ON ol.customer_id = c.id";
        $result = mysqli_query($conn,$query4);
        if($result){
            $listOfOrders = mysqli_fetch_all($result);
        }
    }
    mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Mark Edison Rosario">
    <title>Order Form</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <!-- The Order List Modal -->
    <div id="Modal_OrderList" class="modal">
        <div class="modal-container" id="orderList">
            <div class="title">
                <span>List of Orders</span>
                <span class="close">✖</span>
            </div>
            <div class="modal-content">
                <div class="content-body">
                    <table>
                        <tr>
                            <th>Order Number</th>
                            <th>Customer Name</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                        <?php
                            foreach ($listOfOrders as $order) {
                                echo "<tr>
                                    <td>{$order[0]}</td>
                                    <td>{$order[1]}</td>
                                    <td>{$order[2]}</td>
                                    <td>{$order[3]}</td>
                                    <td>{$order[4]}</td>
                                </tr>";
                            }
                        ?>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div id="mainContainer">
        <!-- Header -->
        <header>
            <h3>Order Form</h3>
            <button id="viewOrderListBtn" type="button">View Order List</button>
        </header>

        <!-- Main Content -->
        <main>
            <form action="./insert.php" method="post">
                <!-- Order Details -->
                <section id="orderDetails">
                    <div>
                        <label for="order_date">Order Date:</label>
                        <?php
                            echo "<input type='text' id='order_date' name='order_date' value='$current_date' readonly required size='11'>";
                        ?>
                    </div>
                    <div>
                        <label for="order_number">Order Number: </label>
                        <?php
                            echo "<input type='text' id='order_number' name='order_number' value='$o_Num_Next' readonly required size='11'>";
                        ?>
                    </div>
                </section>

                <!-- Customer Information -->
                <section>
                    <div class="title">
                        <h3>Customer Information</h3>
                    </div>
                    <div id="customer">
                        <div id="label_div">
                            <label for="c_ID">ID:</label>
                            <label for="c_Name">Name:</label>
                            <label for="c_Address">Address:</label>
                            <label for="c_ContactName">Contact Name:</label>
                            <label for="c_Phone">Phone:</label>
                            <label for="c_Mobile">Mobile:</label>
                            <label for="c_EmailAdd">Email Address:</label>
                        </div>
                        <div id="input_div">
                            <?php
                                echo "<input type='text' name='c_ID' value='$c_ID_Next' id='c_ID' readonly required size='10' placeholder='Required'>";
                            ?>
                            <input type="text" name="c_Name" id="c_Name" required size="25" placeholder="Required">
                            <input type="text" name="c_Address" id="c_Address" required size="50" placeholder="Required">
                            <input type="text" name="c_ContactName" id="c_ContactName" required  size="25" placeholder="Required">
                            <input type="tel" name="c_Phone" id="c_Phone" size="15"  >
                            <input type="text" name="c_Mobile" id="c_Mobile"  size="15"  >
                            <input type="email" name="c_EmailAdd" id="c_EmailAdd"  size="25" required placeholder="Required">
                        </div>
                    </div>
                </section>

                <!-- Ordered Product List -->
                <section>
                    <div class="title">
                        <h3>Products to Order</h3>
                        <button type="button" id="btn_addRow">Add new row</button>
                    </div>
                    <div id="order">
                        <table id="orders_table">
                            <tr>
                                <th id="unit">Unit</th>
                                <th id="qty">Quantity</th>
                                <th id="code">Product Code</th>
                                <th id="name">Product Name</th>
                                <th id="price">Unit Price</th>
                                <th id="t_price">Total Price</th>
                            </tr>
                            <tr>
                                <td><input type="text" name="p_unit[]" class="p_unit" readonly required/></td>
                                <td><input type="number" name="p_qty[]" class="p_qty" step="1" min="1"/></td>
                                <td><input type="text" name="p_code[]" class="p_code" readonly required/></td>
                                <td>
                                    <select name="p_name[]" class="p_name">
                                        <option value="default">Select product</option>
                                        <?php
                                            foreach($listOfProducts as $product){
                                                echo "<option value='$product[1]'>$product[1]</option>";
                                            }
                                        ?>
                                    </select>
                                </td>
                                <td><input type="number" name="p_price[]" class="p_price" readonly required/></td>
                                <td><input type="number" name="p_t_price[]" class="p_t_price" readonly required/></td>
                            </tr>
                        </table>
                        <div id="total">
                            <label for="p_TotalAmount">Total Amount: </label>
                            <input type="text" name="p_TotalAmount" id="c_TotalAmount" required size="15" readonly/>
                        </div>
                        <div id="actions">
                            <input type="submit" value="Submit" name="Submit">
                            <input type="reset" value="Reset" name="Reset">
                        </div>
                    </div>
                </section>
            </form>
        </main>
    </div>
    <script type="text/javascript">
        var listOfProducts = <?php echo json_encode($listOfProducts) ?>;
    </script>
    <script src="./js/script.js"></script>
</body>
</html>
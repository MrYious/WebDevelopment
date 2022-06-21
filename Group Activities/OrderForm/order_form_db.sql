-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2022 at 04:42 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `order_form_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_tbl`
--

CREATE TABLE `customer_tbl` (
  `id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `contact_name` varchar(50) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `date_of_creation` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_tbl`
--

INSERT INTO `customer_tbl` (`id`, `name`, `address`, `contact_name`, `phone`, `mobile`, `email`, `date_of_creation`) VALUES
(1, 'Mark Edison P. Rosario', 'B9 L19 P2 Villa Rosa, Brgy. Estrella, San Pedro, Laguna', 'Mark Rosario', NULL, '09322831860', 'rosariomark37@gmail.com', '2022-06-19'),
(2, 'Tessia Eralith', 'Elvin Kingdom', 'Tess', NULL, NULL, 'tess@gmail.com', '2022-06-19'),
(3, 'Arthur Leywin', 'Cyrus Academy, Dicathen', 'King Grey', '', '', 'arthur@gmail.com', '2022-06-19'),
(4, 'Luxanna Crownguard', 'Demacia', 'Lux', '', '093228654812', 'lux@yahoo.com', '2022-06-19'),
(5, 'Juan Dela Cruz', 'Sta. Mesa, Manila', 'Juan', '', '09322845162', 'juan.dela.cruz@gmail.com', '2022-06-19');

-- --------------------------------------------------------

--
-- Table structure for table `orders_tbl`
--

CREATE TABLE `orders_tbl` (
  `id` int(5) NOT NULL,
  `order_number` int(10) NOT NULL,
  `product_code` int(10) NOT NULL,
  `quantity` int(5) NOT NULL,
  `total_price` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders_tbl`
--

INSERT INTO `orders_tbl` (`id`, `order_number`, `product_code`, `quantity`, `total_price`) VALUES
(31, 1, 10056, 1, 52),
(32, 1, 10059, 2, 2551),
(33, 1, 10063, 1, 71),
(34, 2, 10063, 1, 71),
(35, 2, 10056, 2, 104),
(36, 3, 10056, 1, 52),
(37, 3, 10059, 2, 2551),
(38, 3, 10060, 2, 61),
(39, 3, 10063, 4, 282);

-- --------------------------------------------------------

--
-- Table structure for table `order_list_tbl`
--

CREATE TABLE `order_list_tbl` (
  `order_number` int(5) NOT NULL,
  `customer_id` int(5) NOT NULL,
  `total_amount` varchar(20) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'ON PROCESS',
  `order_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_list_tbl`
--

INSERT INTO `order_list_tbl` (`order_number`, `customer_id`, `total_amount`, `status`, `order_date`) VALUES
(1, 3, '2,673', 'ON PROCESS', '2022-06-19'),
(2, 4, '174', 'ON PROCESS', '2022-06-19'),
(3, 5, '2,946', 'ON PROCESS', '2022-06-19');

-- --------------------------------------------------------

--
-- Table structure for table `product_tbl`
--

CREATE TABLE `product_tbl` (
  `product_code` int(10) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `unit` varchar(10) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_tbl`
--

INSERT INTO `product_tbl` (`product_code`, `product_name`, `unit`, `unit_price`) VALUES
(10054, 'Carolino Rice', 'kg', '60.00'),
(10056, 'Jasmine Rice', 'kg', '52.00'),
(10057, 'Cooking Oil', 'bottle', '30.00'),
(10059, 'M-gas', 'pc', '1275.70'),
(10060, 'Dishwashing Soap', 'pc', '30.50'),
(10062, 'Egg', 'dozen', '79.99'),
(10063, 'Soy Sauce', 'bottle', '70.59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_tbl`
--
ALTER TABLE `customer_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders_tbl`
--
ALTER TABLE `orders_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_list_tbl`
--
ALTER TABLE `order_list_tbl`
  ADD PRIMARY KEY (`order_number`);

--
-- Indexes for table `product_tbl`
--
ALTER TABLE `product_tbl`
  ADD PRIMARY KEY (`product_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_tbl`
--
ALTER TABLE `customer_tbl`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders_tbl`
--
ALTER TABLE `orders_tbl`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `order_list_tbl`
--
ALTER TABLE `order_list_tbl`
  MODIFY `order_number` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_tbl`
--
ALTER TABLE `product_tbl`
  MODIFY `product_code` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10064;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

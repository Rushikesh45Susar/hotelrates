-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2022 at 09:41 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adwait`
--

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `Id` int(11) NOT NULL,
  `City_Name` varchar(100) NOT NULL,
  `State_Id` int(11) NOT NULL,
  `State_Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`Id`, `City_Name`, `State_Id`, `State_Name`) VALUES
(1, 'Shimla', 1, 'Himachal Pradesh'),
(2, 'Manali', 1, 'Himachal Pradesh'),
(3, 'Dharamshala', 1, 'Himachal Pradesh'),
(4, 'Dalhousie', 1, 'Himachal Pradesh'),
(5, 'Amritsar', 2, 'Punjab'),
(6, 'Chandigarh', 3, 'Hariyana');

-- --------------------------------------------------------

--
-- Table structure for table `hotel`
--

CREATE TABLE `hotel` (
  `Id` int(11) NOT NULL,
  `City_Id` int(11) NOT NULL,
  `CP_double` int(10) NOT NULL DEFAULT 4000,
  `MAP_double` int(10) NOT NULL DEFAULT 3000,
  `Adult_CP` int(10) NOT NULL DEFAULT 1500,
  `Adult_MAP` int(10) NOT NULL DEFAULT 1200,
  `Child_CP` int(10) NOT NULL DEFAULT 1000,
  `Child_MAP` int(25) NOT NULL DEFAULT 800,
  `Hotel_Name` varchar(100) NOT NULL,
  `Rating` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hotel`
--

INSERT INTO `hotel` (`Id`, `City_Id`, `CP_double`, `MAP_double`, `Adult_CP`, `Adult_MAP`, `Child_CP`, `Child_MAP`, `Hotel_Name`, `Rating`) VALUES
(1, 1, 1800, 2200, 700, 800, 700, 800, 'Narayan Palace', 2),
(2, 1, 1800, 2200, 500, 700, 500, 700, 'Shining Star', 2),
(3, 1, 2300, 2800, 700, 900, 700, 900, 'Shining Star', 3),
(4, 1, 3500, 4000, 900, 1200, 900, 1200, 'Hotel CK International', 3),
(5, 1, 3200, 3800, 1000, 1200, 1000, 1200, 'Snow Lotus', 3),
(6, 1, 2900, 3200, 1000, 1200, 1000, 1200, 'Royal Regency', 3),
(7, 1, 4800, 5800, 1400, 1750, 1400, 1750, 'Zion', 4),
(8, 2, 1500, 1800, 600, 800, 600, 800, 'Phalguni Regency', 3),
(9, 2, 2300, 2600, 800, 1000, 800, 1000, 'Manali Grand', 3),
(10, 2, 3500, 4000, 1250, 1500, 1250, 1500, 'White Stone', 4),
(11, 2, 3500, 4000, 1000, 1250, 1000, 1250, 'Grand Krisa', 4),
(12, 2, 3500, 4000, 1000, 1250, 1000, 1250, 'Mastiff Grand', 4),
(13, 2, 1400, 1800, 700, 900, 700, 900, 'Chamunda Heavens', 3),
(14, 3, 2300, 2800, 700, 900, 700, 900, 'Hotel Seven Seas', 3),
(15, 3, 3000, 3500, 800, 1000, 800, 1000, 'AK Continental', 3),
(16, 3, 3000, 3500, 800, 1000, 800, 1000, 'Classic Hill', 3),
(17, 3, 2800, 3200, 1000, 1200, 1000, 1200, 'Triund Heights', 3),
(18, 3, 4000, 4500, 1300, 1800, 1300, 1800, 'Hotel Inclover', 4),
(19, 3, 4000, 4500, 1100, 1400, 1100, 1400, 'GK Conifer', 4),
(20, 4, 2700, 3000, 1000, 1200, 1000, 1200, 'Hotel Ark', 3),
(21, 4, 2000, 2300, 800, 1000, 800, 1000, 'Grace Mount ', 3),
(22, 4, 2200, 2600, 700, 900, 700, 900, 'Namaskar Heights', 3),
(23, 4, 2300, 2600, 700, 900, 700, 900, 'Hotel Rock Villa', 3),
(24, 4, 4000, 4800, 1100, 1500, 1100, 1500, 'Nature Valley', 4),
(25, 4, 3700, 4200, 1250, 1750, 1250, 1750, 'Mount View', 3),
(26, 4, 3200, 3700, 1000, 1200, 1000, 1200, 'SS International', 4),
(27, 5, 1800, 2200, 800, 1000, 800, 1000, 'Hotel Kingsway', 3),
(28, 5, 1800, 2200, 1500, 800, 800, 1000, 'Aura Grand', 3),
(29, 5, 2200, 2800, 800, 1000, 800, 1000, 'Amritsar Grand', 3),
(30, 6, 2400, 2800, 800, 1000, 800, 1000, 'Hotel Swan - Chandigarh', 3),
(31, 6, 2200, 2500, 800, 1000, 800, 1000, 'Erica Royal Crown - Zirakpur', 3),
(32, 6, 2500, 3000, 800, 1000, 800, 1000, 'Corbett View Resort – Jim Corbett', 3),
(33, 3, 5500, 6500, 1500, 2000, 500, 1000, 'Indraprastha Resort & Spa', 4),
(34, 4, 3400, 4500, 900, 1500, 400, 1000, 'Indraprastha Resort\r\nDalhousie\r\n', 4),
(35, 4, 3400, 4200, 800, 1200, 300, 700, 'SS Resorts', 4),
(36, 2, 4300, 5300, 1000, 1500, 900, 1300, 'Hotel Grand View  Manali', 4),
(37, 4, 2000, 2500, 1000, 1200, 750, 950, 'Amara Blue Magnet', 3),
(38, 2, 1800, 2200, 800, 1000, 600, 800, 'Amara Resorts', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `REF_ID` (`City_Id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hotel`
--
ALTER TABLE `hotel`
  ADD CONSTRAINT `hotel_ibfk_1` FOREIGN KEY (`City_Id`) REFERENCES `city` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

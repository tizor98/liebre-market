-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: liebre_market
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(90) COLLATE utf8mb4_bin NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (1,'Electronics','2022-12-11 01:02:06','2022-12-11 01:02:06',NULL),(2,'Computers','2022-12-11 01:02:06','2022-12-11 01:02:06',NULL),(3,'Home','2022-12-11 01:02:06','2022-12-11 01:02:06',NULL),(4,'Sports and fitness','2022-12-11 01:02:06','2022-12-11 01:02:06',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` (`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (1,'Anguilla','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(2,'Antigua and Barbuda','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(3,'Aruba','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(4,'Bahamas','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(5,'Barbados','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(6,'Belize','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(7,'Bermuda','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(8,'Bonaire, Sint Eustatius and Saba','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(9,'Canada','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(10,'Cayman Islands','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(11,'Costa Rica','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(12,'Cuba','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(13,'Curacao','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(14,'Dominica','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(15,'Dominican Republic','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(16,'El Salvador','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(17,'Greenland','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(18,'Grenada','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(19,'Guadeloupe','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(20,'Guatemala','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(21,'Haiti','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(22,'Honduras','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(23,'Jamaica','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(24,'Martinique','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(25,'Mexico','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(26,'Montserrat','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(27,'Netherlands Antilles','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(28,'Nicaragua','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(29,'Panama','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(30,'Puerto Rico','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(31,'Saint Barthelemy','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(32,'Saint Kitts and Nevis','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(33,'Saint Lucia','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(34,'Saint Martin','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(35,'Saint Pierre and Miquelon','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(36,'Saint Vincent and the Grenadines','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(37,'Sint Maarten','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(38,'Trinidad and Tobago','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(39,'Turks and Caicos Islands','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(40,'United States','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(41,'United States Minor Outlying Islands','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(42,'Virgin Islands, British','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(43,'Virgin Islands, U.s.','2022-12-10 20:26:41','2022-12-10 20:26:41',NULL),(44,'Argentina','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(45,'Bolivia','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(46,'Brazil','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(47,'Chile','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(48,'Colombia','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(49,'Ecuador','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(50,'Falkland Islands (Malvinas)','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(51,'French Guiana','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(52,'Guyana','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(53,'Paraguay','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(54,'Peru','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(55,'Suriname','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(56,'Uruguay','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL),(57,'Venezuela','2022-12-10 20:27:27','2022-12-10 20:27:27',NULL);
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `buyer_id` bigint DEFAULT NULL,
  `buyer_full_name` varchar(96) COLLATE utf8mb4_bin DEFAULT NULL,
  `buyer_email` varchar(96) COLLATE utf8mb4_bin DEFAULT NULL,
  `buyer_dni` text COLLATE utf8mb4_bin,
  `buyer_address` varchar(56) COLLATE utf8mb4_bin DEFAULT NULL,
  `card_type` varchar(2) COLLATE utf8mb4_bin DEFAULT NULL,
  `card_number` bigint DEFAULT NULL,
  `card_exp` varchar(8) COLLATE utf8mb4_bin DEFAULT NULL,
  `card_cvv` varchar(3) COLLATE utf8mb4_bin DEFAULT NULL,
  `total` float DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoices_buyer_fk` (`buyer_id`),
  CONSTRAINT `invoices_buyer_fk` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `invoices_products`
--

DROP TABLE IF EXISTS `invoices_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices_products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  `selling_price` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoices_products_invoices_fk` (`invoice_id`),
  KEY `invoices_products_products_fk` (`product_id`),
  CONSTRAINT `invoices_products_invoices_fk` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `invoices_products_products_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_img`
--

DROP TABLE IF EXISTS `product_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_img` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `img` varchar(90) COLLATE utf8mb4_bin NOT NULL,
  `main_img` tinyint DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `imgs_products_fk` (`product_id`),
  CONSTRAINT `imgs_products_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `description` text COLLATE utf8mb4_bin NOT NULL,
  `price` float NOT NULL,
  `discount` float DEFAULT NULL,
  `seller_id` bigint NOT NULL,
  `category_id` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_fk` (`category_id`),
  KEY `products_users_fk` (`seller_id`),
  CONSTRAINT `products_category_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_users_fk` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(96) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(56) COLLATE utf8mb4_bin NOT NULL,
  `surname` varchar(56) COLLATE utf8mb4_bin NOT NULL,
  `dni` varchar(56) COLLATE utf8mb4_bin NOT NULL,
  `password` text COLLATE utf8mb4_bin NOT NULL,
  `address` varchar(56) COLLATE utf8mb4_bin DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `country_id` smallint DEFAULT NULL,
  `img_profile` varchar(90) COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_username` (`email`),
  KEY `users_countries_fk` (`country_id`),
  CONSTRAINT `users_countries_fk` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users_categories`
--

DROP TABLE IF EXISTS `users_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `category_id` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_categories_categories` (`category_id`),
  KEY `users_categories_users` (`user_id`),
  CONSTRAINT `users_categories_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_categories_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-13 19:01:57

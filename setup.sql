CREATE DATABASE pokemon;
use pokemon;
#grant privledges to access db to your user account and password and then add them to database.php


CREATE TABLE IF NOT EXISTS `user` (
`Id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`Name` varchar(255) NOT NULL,
`Multiplier` FLOAT(3) UNSIGNED DEFAULT 1,
`Level` SMALLINT UNSIGNED Default 1,
`Image` varchar(255) NOT NULL);
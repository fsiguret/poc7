CREATE database MANIA CHARACTER SET 'utf8';

USE MANIA;

CREATE TABLE IF NOT EXISTS `Articles` (
	`id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`userId` INT(20) NOT NULL,
	`text` CHAR(255),
	`date` DATETIME NOT NULL,
	`imageUrl` VARCHAR(255),
	`likes` INT DEFAULT 0,
	`dislikes` INT DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `UserLikes` (
	`articleId` INT NOT NULL,
	`usersLike` INT(20),
	`usersDislike` INT(20),
	PRIMARY KEY (articleId, usersLike, usersDislike)
);

CREATE TABLE IF NOT EXISTS `Users` (
	`userId` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`firstName` VARCHAR(40) NOT NULL,
	`lastName` VARCHAR(40) NOT NULL,
	`email` VARCHAR(50) NOT NULL,
	`password` VARCHAR(40) NOT NULL,
	`nbMessage` INT DEFAULT 0,
	`rank` TINYINT DEFAULT 0,
	PRIMARY KEY (userId),
	UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS `Commentary`(
	`userId` INT(20) NOT NULL,
	`articleId` INT NOT NULL,
	`com` CHAR NOT NULL,
	PRIMARY KEY (userId, articleId)
);

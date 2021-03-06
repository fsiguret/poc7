CREATE DATABASE MANIA CHARACTER SET 'utf8';

USE MANIA;

CREATE TABLE IF NOT EXISTS `Articles` (
	`id` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`userId` INT(20) UNSIGNED NOT NULL,
	`titleArticle` VARCHAR(255) NOT NULL,
	`content` TEXT NOT NULL,
	`createAt` DATETIME NOT NULL,
	`imageUrl` VARCHAR(255),
	`likes` INT DEFAULT 0,
	`dislikes` INT DEFAULT 0,
	PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS `Users` (
	`userId` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`firstName` VARCHAR(70) NOT NULL,
	`lastName` VARCHAR(70) NOT NULL,
	`email` VARCHAR(200) NOT NULL,
	`password` VARCHAR(100) NOT NULL,
	`rank` TINYINT DEFAULT 0,
	PRIMARY KEY (userId),
	UNIQUE (email)
)
ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS `UserLikes` (
    `idLike` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`idArticle` INT(20) UNSIGNED NOT NULL,
	`idUser` INT(20) UNSIGNED NOT NULL,
	`isLike` TINYINT DEFAULT 0,
	PRIMARY KEY (idLike)
)
ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS `Commentary`(
    `id` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`userId` INT(20) UNSIGNED NOT NULL,
	`articleId` INT(20) UNSIGNED NOT NULL,
	`createAt` DATETIME NOT NULL,
	`com` TEXT NOT NULL,
	PRIMARY KEY (id)
)
ENGINE = INNODB;

ALTER TABLE Articles
ADD CONSTRAINT fk_user_id
	    FOREIGN KEY (userId)
	    REFERENCES Users(userId)
	    ON DELETE CASCADE;

ALTER TABLE UserLikes
ADD CONSTRAINT fk_article_id
	    FOREIGN KEY (idArticle)
	    REFERENCES Articles(id)
	    ON DELETE CASCADE;

ALTER TABLE UserLikes
ADD CONSTRAINT fk_user_like_id
	    FOREIGN KEY (idUser)
	    REFERENCES Users(userId)
	    ON DELETE CASCADE;

ALTER TABLE Commentary
ADD CONSTRAINT fk_article_com_id
        FOREIGN KEY (articleId)
        REFERENCES Articles(id)
        ON DELETE CASCADE;

ALTER TABLE Commentary
ADD CONSTRAINT fk_user_com_id
        FOREIGN KEY (userId)
        REFERENCES Users(userId)
        ON DELETE CASCADE;

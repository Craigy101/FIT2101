-- MySQL Script generated by MySQL Workbench
-- Mon Sep 14 17:12:28 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- ----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`HEAD_OF_DEP`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`HEAD_OF_DEP` (
  `headID` INT NOT NULL,
  `givenName` VARCHAR(45) NOT NULL,
  `familyName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`headID`),
  UNIQUE INDEX `headID_UNIQUE` (`headID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CLASS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CLASS` (
  `classCode` INT NOT NULL,
  `className` VARCHAR(45) NOT NULL,
  `HEAD_OF_DEP_headID` INT NOT NULL,
  PRIMARY KEY (`classCode`, `HEAD_OF_DEP_headID`),
  UNIQUE INDEX `classCode_UNIQUE` (`classCode` ASC) VISIBLE,
  INDEX `fk_CLASS_HEAD_OF_DEP_idx` (`HEAD_OF_DEP_headID` ASC) VISIBLE,
  CONSTRAINT `fk_CLASS_HEAD_OF_DEP`
    FOREIGN KEY (`HEAD_OF_DEP_headID`)
    REFERENCES `mydb`.`HEAD_OF_DEP` (`headID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TUTOR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TUTOR` (
  `staffID` INT NOT NULL,
  `givenName` VARCHAR(45) NOT NULL,
  `familyName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`staffID`),
  UNIQUE INDEX `staffID_UNIQUE` (`staffID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TUTOR_has_CLASS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TUTOR_has_CLASS` (
  `TUTOR_staffID` INT NOT NULL,
  `CLASS_classCode` INT NOT NULL,
  `CLASS_HEAD_OF_DEP_headID` INT NOT NULL,
  PRIMARY KEY (`TUTOR_staffID`, `CLASS_classCode`, `CLASS_HEAD_OF_DEP_headID`),
  INDEX `fk_TUTOR_has_CLASS_CLASS1_idx` (`CLASS_classCode` ASC, `CLASS_HEAD_OF_DEP_headID` ASC) VISIBLE,
  INDEX `fk_TUTOR_has_CLASS_TUTOR1_idx` (`TUTOR_staffID` ASC) VISIBLE,
  CONSTRAINT `fk_TUTOR_has_CLASS_TUTOR1`
    FOREIGN KEY (`TUTOR_staffID`)
    REFERENCES `mydb`.`TUTOR` (`staffID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TUTOR_has_CLASS_CLASS1`
    FOREIGN KEY (`CLASS_classCode` , `CLASS_HEAD_OF_DEP_headID`)
    REFERENCES `mydb`.`CLASS` (`classCode` , `HEAD_OF_DEP_headID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`STUDENT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`STUDENT` (
  `studentID` INT NOT NULL,
  `givenName` VARCHAR(45) NOT NULL,
  `familyName` VARCHAR(45) NOT NULL,
  `studentEmail` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`studentID`),
  UNIQUE INDEX `studentID_UNIQUE` (`studentID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PARENT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`PARENT` (
  `studentID` INT NOT NULL,
  `givenName` VARCHAR(45) NOT NULL,
  `familyName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`studentID`, `givenName`),
  UNIQUE INDEX `studentID_UNIQUE` (`studentID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`STUDENT_has_CLASS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`STUDENT_has_CLASS` (
  `STUDENT_studentID` INT NULL,
  `CLASS_classCode` INT NOT NULL,
  `CLASS_HEAD_OF_DEP_headID` INT NOT NULL,
  PRIMARY KEY (`STUDENT_studentID`, `CLASS_classCode`, `CLASS_HEAD_OF_DEP_headID`),
  INDEX `fk_STUDENT_has_CLASS_CLASS1_idx` (`CLASS_classCode` ASC, `CLASS_HEAD_OF_DEP_headID` ASC) VISIBLE,
  INDEX `fk_STUDENT_has_CLASS_STUDENT1_idx` (`STUDENT_studentID` ASC) VISIBLE,
  CONSTRAINT `fk_STUDENT_has_CLASS_STUDENT1`
    FOREIGN KEY (`STUDENT_studentID`)
    REFERENCES `mydb`.`STUDENT` (`studentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_STUDENT_has_CLASS_CLASS1`
    FOREIGN KEY (`CLASS_classCode` , `CLASS_HEAD_OF_DEP_headID`)
    REFERENCES `mydb`.`CLASS` (`classCode` , `HEAD_OF_DEP_headID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PARENT_has_STUDENT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`PARENT_has_STUDENT` (
  `PARENT_studentID` INT NULL,
  `PARENT_givenName` VARCHAR(45) NULL,
  `STUDENT_studentID` INT NOT NULL,
  PRIMARY KEY (`PARENT_studentID`, `PARENT_givenName`, `STUDENT_studentID`),
  INDEX `fk_PARENT_has_STUDENT_STUDENT1_idx` (`STUDENT_studentID` ASC) VISIBLE,
  INDEX `fk_PARENT_has_STUDENT_PARENT1_idx` (`PARENT_studentID` ASC, `PARENT_givenName` ASC) VISIBLE,
  CONSTRAINT `fk_PARENT_has_STUDENT_PARENT1`
    FOREIGN KEY (`PARENT_studentID` , `PARENT_givenName`)
    REFERENCES `mydb`.`PARENT` (`studentID` , `givenName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PARENT_has_STUDENT_STUDENT1`
    FOREIGN KEY (`STUDENT_studentID`)
    REFERENCES `mydb`.`STUDENT` (`studentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`GROUP`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`GROUP` (
  `groupID` INT NOT NULL,
  `classCode` INT NOT NULL,
  `groupName` VARCHAR(45) NOT NULL,
  `TUTOR_staffID` INT NOT NULL,
  PRIMARY KEY (`groupID`),
  UNIQUE INDEX `groupID_UNIQUE` (`groupID` ASC) VISIBLE,
  INDEX `fk_GROUP_TUTOR1_idx` (`TUTOR_staffID` ASC) VISIBLE,
  CONSTRAINT `fk_GROUP_TUTOR1`
    FOREIGN KEY (`TUTOR_staffID`)
    REFERENCES `mydb`.`TUTOR` (`staffID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`STUDENT_has_GROUP`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`STUDENT_has_GROUP` (
  `STUDENT_studentID` INT NOT NULL,
  `GROUP_groupID` INT NOT NULL,
  PRIMARY KEY (`STUDENT_studentID`, `GROUP_groupID`),
  INDEX `fk_STUDENT_has_GROUP_GROUP1_idx` (`GROUP_groupID` ASC) VISIBLE,
  INDEX `fk_STUDENT_has_GROUP_STUDENT1_idx` (`STUDENT_studentID` ASC) VISIBLE,
  CONSTRAINT `fk_STUDENT_has_GROUP_STUDENT1`
    FOREIGN KEY (`STUDENT_studentID`)
    REFERENCES `mydb`.`STUDENT` (`studentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_STUDENT_has_GROUP_GROUP1`
    FOREIGN KEY (`GROUP_groupID`)
    REFERENCES `mydb`.`GROUP` (`groupID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`FILE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`FILE` (
  `file` VARCHAR(100) NOT NULL,
  `GROUP_groupID` INT NOT NULL,
  PRIMARY KEY (`file`, `GROUP_groupID`),
  INDEX `fk_FILE_GROUP1_idx` (`GROUP_groupID` ASC) VISIBLE,
  CONSTRAINT `fk_FILE_GROUP1`
    FOREIGN KEY (`GROUP_groupID`)
    REFERENCES `mydb`.`GROUP` (`groupID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

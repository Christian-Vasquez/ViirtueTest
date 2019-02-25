CREATE DATABASE viirtue_db;
USE viirtue_db;

-- Created the table "authMerch" 
CREATE TABLE authMerch
(
  snumb int,
  confNumb int NOT NULL AUTO_INCREMENT,
  retAddress VARCHAR(30) NOT NULL DEFAULT "1091 E 24TH ST",
  PRIMARY KEY (confNumb)
);

INSERT INTO authMerch ( snumb, confNumb, retAddress ) VALUES
( 123, 1, '1091 E 24TH ST' );

CREATE DATABASE cocktails; 
USE cocktails;

CREATE TABLE cocktails(
id int auto_increment primary key,
nombre varchar(255) not null,
ingredientes varchar(255) not null,
autor varchar(255) not null,
precio int not null
);


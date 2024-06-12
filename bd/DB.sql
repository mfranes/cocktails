CREATE DATABASE cocktails; 
USE cocktails;

CREATE TABLE cocktails(
id int auto_increment primary key,
nombre varchar(255) not null,
ingredientes varchar(255) not null,
autor varchar(255) not null,
precio int not null
);

INSERT INTO cocktails (nombre, ingredientes, autor, precio) VALUES ('Vermut casero', '2 hielos,2 tiras de piel de naranja (sin la parte blanca),150 ml de vermut rojo frío,2 aceitunas verdes sin hueso', 'Antonio y Beneditto Carpano', 5);
INSERT INTO cocktails (nombre, ingredientes, autor, precio) VALUES ('BLOODY MARY', '4.5 cl de Vodka,9 cl de Zumo de tomate,1.5 cl de Zumo de limón,2 Dashes (golpes) de Salsa Perrins (Worchestershire),1 Dash (golpe) de Tabasco', 'Fernand Petiot', 8);


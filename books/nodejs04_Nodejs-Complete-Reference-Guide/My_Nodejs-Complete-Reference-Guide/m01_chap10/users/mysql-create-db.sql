CREATE DATABASE userauth;
CREATE USER 'userauth'@'localhost' IDENTIFIED BY 'userauth123';
GRANT ALL PRIVILEGES ON userauth.* TO 'userauth'@'localhost' WITH GRANT OPTION;

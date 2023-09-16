CREATE DATABASE notes;
CREATE USER 'notes'@'localhost' IDENTIFIED BY 'notes123';
GRANT ALL PRIVILEGES ON notes.* TO 'notes'@'localhost' WITH GRANT OPTION;

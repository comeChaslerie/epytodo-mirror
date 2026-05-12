CREATE DATABASE IF  NOT EXISTS epytodo;
USE epytodo;

CREATE TABLE IF NOT EXISTS user
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    firstname TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todo
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  due_time DATETIME NOT NULL,
  status ENUM('not started', 'todo', 'in progress', 'done') DEFAULT 'not started',
  user_id INT
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS user
(
    id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    firstname TEXT NOT NULL,
    created_at DATE
);

CREATE TABLE IF NOT EXISTS todo
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at DATE,
  due_time DATE NOT NULL,
  status ENUM(not started, todo, in progress, done),
  user_id INT
);

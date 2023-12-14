-- Users taulukko luominen
```sql
DROP DATABASE IF EXISTS Hodaripuoti;
CREATE DATABASE Hodaripuoti;
USE Hodaripuoti;
```
```sql
CREATE TABLE Users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(300) NOT NULL,
    password varchar(300) NOT NULL,
    email VARCHAR(300) NOT NULL,
    role INT NOT NULL DEFAULT 0,
    points INT NOT NULL DEFAULT 0
);
```

-- Orders taulukko luominen
```sql
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT DEFAULT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL DEFAULT 0,
    total_price DECIMAL(8, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
```

-- Toppings taulukko luominen
```sql
CREATE TABLE Toppings (
    topping_id INT PRIMARY KEY AUTO_INCREMENT,
    topping_name VARCHAR(300) NOT NULL,
    topping_type VARCHAR(300) NOT NULL,
    topping_price DECIMAL(8, 2) NOT NULL DEFAULT 0.00
);
```
-- Custom Hotdogs Taulukko luominen
```sql
CREATE TABLE Hotdogs (
    hotdog_id INT PRIMARY KEY AUTO_INCREMENT,
    hotdog_name VARCHAR(300) NOT NULL,
    base_price DECIMAL(8, 2) NOT NULL
);
```
```sql
CREATE TABLE Orders_hotdogs
(
  order_id INT NOT NULL,
  hotdog_id INT NOT NULL,
  amount INT NOT NULL DEFAULT 0,
  PRIMARY KEY (order_id, hotdog_id),
  FOREIGN KEY (order_id) REFERENCES Orders(order_id),
  FOREIGN KEY (hotdog_id) REFERENCES Hotdogs(hotdog_id)
);
```
```sql
CREATE TABLE Hotdog_toppings
(
  hotdog_id INT NOT NULL,
  topping_id INT NOT NULL,
  PRIMARY KEY (hotdog_id, topping_id),
  FOREIGN KEY (hotdog_id) REFERENCES Hotdogs(hotdog_id),
  FOREIGN KEY (topping_id) REFERENCES Toppings(topping_id)
);
```
```sql
INSERT INTO `Toppings` (`topping_id`, `topping_name`, `topping_type`, `topping_price`) VALUES
(1, 'Ketsuppi', 'kastike', '0.50'),
(2, 'Sinappi', 'kastike', '0.50'),
(3, 'Tulinen kastike', 'kastike', '0.50'),
(4, 'Relish', 'kastike', '0.50'),
(5, 'Vegaaninen honey mustard', 'kastike', '0.50'),
(6, 'Siracha-majoneesi', 'kastike', '0.50'),
(7, 'Hummus', 'kastike', '0.50'),
(8, 'Guacamole', 'kastike', '0.50'),
(9, 'Tomaattisalsa', 'kastike', '0.50'),
(10, 'Tulinen makkara', 'makkara', '1.00'),
(11, 'Kana makkara', 'makkara', '1.00'),
(12, 'Juusto makkara', 'makkara', '1.00'),
(13, 'Liha makkara', 'makkara', '1.00'),
(14, 'Tulinen soijamakkara', 'makkara', '1.00'),
(15, 'Soijamakkara', 'makkara', '1.00'),
(16, 'Tulinen kasvismakkara', 'makkara', '1.00'),
(17, 'Kasvismakkara', 'makkara', '1.00'),
(18, 'Pikkelöidyt Sipuli', 'täyte', '0.50'),
(19, 'Sipuli', 'täyte', '0.50'),
(20, 'Paahdettu sipuli', 'täyte', '0.50'),
(21, 'Kurkkusalaatti', 'täyte', '0.50'),
(22, 'Chili', 'täyte', '0.50'),
(23, 'Jalapenos', 'täyte', '0.50'),
(24, 'Avacados', 'täyte', '0.50'),
(25, 'Juusto raaste', 'täyte', '0.50'),
(26, 'Vegaaninen juusto raaste', 'täyte', '0.50'),
(27, 'Vehnä sämpylä', 'sämpylä', '1.00'),
(28, 'Pretzel-sämpylä', 'sämpylä', '1.00'),
(29, 'Täysjyvä sämpylä', 'sämpylä', '1.00'),
(30, 'Gluteeniton sämpylä', 'sämpylä', '1.00'),
(31, 'Kaura sämpylä', 'sämpylä', '1.00');
```
```sql
INSERT INTO `Users` (`user_id`, `username`, `password`, `email`, `role`, `points`) VALUES
(1, 'Veetiso', '$2a$10$upws5TmYp/sAM5NZ5UIWAOBVgef9bJfpwv.5U07Xp2j3rpvm0hgvy', 'veetiso@mail.com', 2, 0),
(2, 'Admin 1', '$2a$10$upws5TmYp/sAM5NZ5UIWAOBVgef9bJfpwv.5U07Xp2j3rpvm0hgvy', 'user1@mail.com', 1, 0),
(3, 'Admin 2', '$2a$10$upws5TmYp/sAM5NZ5UIWAOBVgef9bJfpwv.5U07Xp2j3rpvm0hgvy', 'user2@mail.com', 2, 0),
(4, 'User 1', '$2a$10$upws5TmYp/sAM5NZ5UIWAOBVgef9bJfpwv.5U07Xp2j3rpvm0hgvy', 'user0@mail.com', 0, 0);
```
```sql
INSERT INTO `Hotdogs` (`hotdog_id`, `hotdog_name`, `base_price`) VALUES
(1, 'Tulinen vegedog', '3.50'),
(2, 'Gluteeniton vegedog', '3.50'),
(3, 'Vegedog', '3.50'),
(4, 'Tulinen pretzelvege', '3.50'),
(5, 'Pretzeldog', '3.50'),
(6, 'Tulinen kana dog', '3.50'),
(7, 'Kana dog', '3.50'),
(8, 'Tulinen dog', '3.50'),
(9, 'Nirso dog', '2.50');
```
```sql
INSERT INTO `Hotdog_toppings` (`hotdog_id`, `topping_id`) VALUES
(1, 3),
(1, 14),
(1, 23),
(1, 24),
(1, 29),
(2, 5),
(2, 15),
(2, 20),
(2, 24),
(2, 30),
(3, 8),
(3, 17),
(3, 19),
(3, 26),
(3, 27),
(4, 6),
(4, 16),
(4, 21),
(4, 22),
(4, 28),
(5, 6),
(5, 13),
(5, 19),
(5, 22),
(5, 28),
(6, 11),
(6, 23),
(6, 24),
(6, 29),
(7, 3),
(7, 12),
(7, 19),
(7, 25),
(7, 30),
(8, 6),
(8, 10),
(8, 20),
(8, 22),
(8, 23),
(8, 27),
(9, 13),
(9, 27),
(9, 1);
```

# hodaripuoti

# SQL luontikoodit
-- Users taulukko luominen

CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role INT NOT NULL
);

-- Orders taulukko luominen

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL,
    info VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Toppings taulukko luominen

CREATE TABLE Toppings (
    topping_id INT PRIMARY KEY,
    topping_name VARCHAR(50) NOT NULL,
    topping_type INT NOT NULL,
    price INT NOT NULL
);

-- Custom Hotdogs Taulukko luominen

CREATE TABLE Custom (
    hotdog_id INT PRIMARY KEY,
    order_id INT,
    hotdog_name VARCHAR(50) NOT NULL,
    toppings VARCHAR(255),
    base_price INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Esimerkki lisäys komennot

-- Käyttäjän lisäys

INSERT INTO Users (user_id, username, email) VALUES (1, 'Testi', 'Testi@mail.com');

-- Tilauksen lisäys

INSERT INTO Orders (order_id, user_id) VALUES (1, 1);

-- Täytteen lisäys

INSERT INTO Toppings (topping_id, topping_name) VALUES
(1, 'Sinappi'),
(2, 'Ketsuppi'),
(3, 'Sipuli');

-- Custom hotdogin lisäys monella täytteillä

INSERT INTO Custom (hotdog_id, order_id, hotdog_name, toppings) VALUES (1, 1, 'Classic Hotdog', '1,2,3'); -- Numerot vastaa tyätteiden id

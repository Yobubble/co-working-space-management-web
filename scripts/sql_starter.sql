CREATE DATABASE IF NOT EXISTS `co-working-space`;
USE `co-working-space`;

DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS rooms;

-- Create customers table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    membership VARCHAR(50) NOT NULL
);

-- Create rooms table
CREATE TABLE rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    desk_num INT NOT NULL,
    chair_num INT NOT NULL
);

-- Create reservations table
CREATE TABLE reservations (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT NOT NULL,
    customer_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Insert customer data
INSERT INTO customers
VALUES
(1, "user", "user", "NONE"),
(2, "admin", "admin", "YEARLY");

-- Insert room data
INSERT INTO rooms
VALUES
(1, 3, 10),
(2, 20, 40),
(3, 10, 20);

-- insert reservations data
INSERT INTO reservations
VALUES
(1, 3, 2, '2024-11-15', '2024-12-15', "IN-PROGRESS");

CREATE DATABASE mcdowells;

CREATE TABLE staffs(
    uuid_staff VARCHAR(255) UNIQUE,
    rol VARCHAR(255) NOT NULL,
    statuss VARCHAR(255) NOT NULL,
    names VARCHAR(255) NOT NULL,

    PRIMARY KEY (uuid_staff)
);

CREATE TABLE menus(
    menu_num INT not NULL,
    menu_name VARCHAR(255) UNIQUE,
    price FLOAT,
    time_process INT,

    PRIMARY KEY (menu_num)
);

CREATE TABLE orders(
    serial_order SERIAL,
    order_day INT,
    uuid_menu uuid UNIQUE,
    uuid_user uuid UNIQUE,
    menu_num SERIAL,
    statuss VARCHAR(255),
    chef VARCHAR(255),
    waiter VARCHAR(255),
    order_notes TEXT,
    date_order DATE,

    PRIMARY KEY (serial_order),

    CONSTRAINT fk_orders
        FOREIGN KEY (chef) REFERENCES staffs(uuid_staff),
    CONSTRAINT fk_orders2
        FOREIGN KEY (waiter) REFERENCES staffs(uuid_staff),
    CONSTRAINT fk_menu
        FOREIGN KEY (menu_num) REFERENCES menus(menu_num)

);

INSERT INTO menus(menu_num, menu_name, price, time_process) VALUES
(1, 'Menu McDowells', 6.95, 3),
(2, 'Menu McDowells Junior', 5.99, 3);

INSERT INTO staffs(uuid_staff, statuss, rol, names) VALUES
('d341ef72-0702-4072-be0d-0ceaa32e369f','absent','waiter', 'Fer-chimichanga'),
('85d8d9ba-c6a0-4adb-acf9-4d011a4762e4', 'absent', 'cook', 'Alfredo'),
('62cbad01-09b4-401d-8c17-a09f755c8558', 'absent', 'admin', 'Marco');

CREATE DATABASE mcdowells;

CREATE TABLE staffs(
    uuid_staff VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwords VARCHAR(255) NOT NULL,
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
    uuid_user VARCHAR(255),
    menu_num INT,
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
(2, 'Menu McDowells Junior', 5.99, 2);

INSERT INTO staffs(uuid_staff, email, passwords, statuss, rol, names) VALUES
('d341ef72-0702-4072-be0d-0ceaa32e369f', 'fernandocieri@gmail.com', '123a123A', 'absent','waiter', 'Fer-chimichanga'),
('85d8d9ba-c6a0-4adb-acf9-4d011a4762e4', 'maestre7@gmail.com', '123a123A', 'absent', 'cook', 'Alfredo'),
('62cbad01-09b4-401d-8c17-a09f755c8558', 'marcorooksp@gmail.com', '123a123A', 'absent', 'admin', 'Marco');

INSERT INTO order(serial_orde,
    order_day,
    uuid_menu uuid,
    uuid_user,
    menu_num,
    statuss,
    chef,
    waiter,
    order_notes,
    date_order) VALUES(10;2;8637c204-bca3-48f2-b6a3-369113f24836;e25fb671-356d-40a0-aef8-3c7bf26ea2c0;2;processing;;;;2022-05-20),(11;2;df8a4979-393c-4ff1-a0af-ba96abe9154a;e25fb671-356d-40a0-aef8-3c7bf26ea2c0;2;processing;;;;2022-05-20),
(12;2;fe58eeae-d05d-4c24-8b07-f10525156f80;e25fb671-356d-40a0-aef8-3c7bf26ea2c0;2;processing;;;;2022-05-20),
(13;2;194770a4-bd9e-4bac-a276-a2ac026413d1;e25fb671-356d-40a0-aef8-3c7bf26ea2c0;1;processing;;;;2022-05-20),
(14;2;8f4795b8-3733-477e-9fa2-51cfebbee167;e25fb671-356d-40a0-aef8-3c7bf26ea2c0;1;processing;;;;2022-05-20),
(15;2;3755dcd6-5559-4eba-b20f-2d470098cc33;e25fb671-356d-40a0-aef8-3c7bf26ea2c0;1;processing;;;;2022-05-20),
(1;1;9afe4a48-dbdc-4b7b-94b7-e9244744f0e7;d4b83be9-090a-4964-922e-0665086ff23e;1;delivering;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4;;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4,1653059220169;2022-05-20),
(2;1;4309abec-abf5-4506-9717-0b7479e458d2;d4b83be9-090a-4964-922e-0665086ff23e;1;delivering;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4;;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4,1653059830144;2022-05-20),
(3;1;8978e693-8d2d-4cfb-a897-1d39bbaa49f8;d4b83be9-090a-4964-922e-0665086ff23e;1;delivering;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4;;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4,1653060579118;2022-05-20),
(4;1;c810d860-5441-43e4-a75a-d7d45a2cd639;d4b83be9-090a-4964-922e-0665086ff23e;2;delivering;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4;;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4,1653060789127;2022-05-20),
(5;1;d3c17f0e-c37c-40ec-be1f-0220d7405255;d4b83be9-090a-4964-922e-0665086ff23e;2;delivering;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4;;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4,1653060999137;2022-05-20),
(6;1;2c2a671c-ca5f-4a1e-b985-cb7e7afc76f1;d4b83be9-090a-4964-922e-0665086ff23e;2;delivering;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4;;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4,1653061209151;2022-05-20),
(7;1;783fd6fb-90bb-4556-a705-c275146fb555;d4b83be9-090a-4964-922e-0665086ff23e;2;delivering;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4;;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4,1653061419095;2022-05-20),
(8;2;ded5ef35-970a-4a99-9e72-31521ecf73d9;e25fb671-356d-40a0-aef8-3c7bf26ea2c0;1;delivering;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4;;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4,1653061629140;2022-05-20),
(9;2;a1e480c2-c4ac-42af-b235-de216189bdf2;e25fb671-356d-40a0-aef8-3c7bf26ea2c0;1;kitchen;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4;;85d8d9ba-c6a0-4adb-acf9-4d011a4762e4,1653061839085;2022-05-20);
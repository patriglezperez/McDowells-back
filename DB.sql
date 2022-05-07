CREATE DATABASE mcdowells;

CREATE TABLE staffs(
    uuid_staff uuid UNIQUE DEFAULT uuid_generate_v4(),
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
    order_day DATE,
    uuid_menu uuid UNIQUE DEFAULT uuid_generate_v4(),
    uuid_user uuid UNIQUE DEFAULT uuid_generate_v4(),
    menu_num SERIAL,
    statuss VARCHAR(255),
    chef uuid UNIQUE DEFAULT uuid_generate_v4(),
    waiter uuid UNIQUE DEFAULT uuid_generate_v4(),
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

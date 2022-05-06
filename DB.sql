CREATE DATABASE mcdowells;

CREATE TABLE staffs(
    uuid_staff uuid UNIQUE DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    passwords VARCHAR(255) NOT NULL,
    rol VARCHAR(255) NOT NULL,
    statuss VARCHAR(255) NOT NULL,

    PRIMARY KEY (uuid_staff)
);

CREATE TABLE menus(
    menu_num SERIAL,
    menu_name VARCHAR(255),
    price FLOAT,
    time_process TIME,

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
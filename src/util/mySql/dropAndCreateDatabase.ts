import { mySqlConfig } from "../../../mySqlConfig";

const DB_NAME = mySqlConfig.database;

export const dropAndCreateDatabase = `
    drop DATABASE IF EXISTS ${DB_NAME};
    create DATABASE ${DB_NAME};
    use ${DB_NAME};

    create TABLE employee_type(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) not null
    );

    create TABLE employee(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        photo VARCHAR(1000),
        fullname VARCHAR(255) not null,
        email VARCHAR(255) UNIQUE not null,
        start_date DATETIME default CURRENT_TIMESTAMP,
        employee_type_id INT UNSIGNED not null,
        description VARCHAR(3000),
        phone VARCHAR(255) not null,
        employee_status ENUM('Active', 'Inactive') default 'Inactive',
        password VARCHAR(255) not null,
        createdAt TIMESTAMP default CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
        CONSTRAINT fk_employee_type
            FOREIGN KEY (employee_type_id) REFERENCES employee_type(id) ON UPDATE CASCADE
    );

    create TABLE message(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) not null,
        email VARCHAR(255) not null,
        phone VARCHAR(255),
        subject VARCHAR(255) not null,
        message VARCHAR(3000) not null,
        stars TINYINT not null,
        read_status BOOLEAN default false,
        archived BOOLEAN default false,
        photo VARCHAR(1000) default "photourl",
        createdAt TIMESTAMP default CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
    );

    create TABLE room_type(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) not null
    );

    create TABLE amenity(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    create TABLE room(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        photo VARCHAR(3000),
        room_type_id INT UNSIGNED not null,
        room_number INT not null,
        description VARCHAR(3000),
        offer BOOLEAN default false,
        price INT UNSIGNED not null,
        cancellation VARCHAR(3000) default 'Cancelation policy',
        discount TINYINT default 0,
        status ENUM('Available', 'Booked') default 'Available',
        createdAt TIMESTAMP default CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
        CONSTRAINT fk_room_type
            FOREIGN KEY (room_type_id) REFERENCES room_type(id) ON UPDATE CASCADE
    );

    create TABLE room_amenities(
        room_id INT UNSIGNED,
        amenity_id INT UNSIGNED,
        PRIMARY KEY (room_id, amenity_id),
        FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE,
        FOREIGN KEY (amenity_id) REFERENCES amenity(id) ON DELETE CASCADE
    );

    create TABLE booking(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) not null,
        email VARCHAR(255) not null,
        phone VARCHAR(255) not null,
        check_in DATETIME not null,
        check_out DATETIME not null,
        order_date DATETIME default CURRENT_TIMESTAMP,
        special_request TEXT,
        discount TINYINT default 0,
        status ENUM('In Progress', 'Check In', 'Check Out') default 'In Progress',
        room_id INT UNSIGNED not null,
        createdAt TIMESTAMP default CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
        CONSTRAINT fk_booking_room_info_id
            FOREIGN KEY (room_id) REFERENCES room(id)
    );
`;
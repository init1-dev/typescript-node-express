import { mySqlConfig } from "./mySqlConfig";

const DB_NAME = mySqlConfig.database;

export const dropQuery = `
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
            FOREIGN KEY (employee_type_id) REFERENCES employee_type(id)
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
            FOREIGN KEY (room_type_id) REFERENCES room_type(id)
    );

    create TABLE room_amenities(
        room_id INT UNSIGNED,
        amenity_id INT UNSIGNED,
        PRIMARY KEY (room_id, amenity_id),
        FOREIGN KEY (room_id) REFERENCES room(id),
        FOREIGN KEY (amenity_id) REFERENCES amenity(id)
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

// rooms

export const selectRoomsQuery = `
    SELECT
        room.id as _id,
        room.name,
        room.photo,
        room_type.name AS room_type,
        room.room_number,
        room.description,
        room.offer,
        room.price,
        room.cancellation,
        group_concat(amenity.name) as amenities,
        room.discount,
        room.status,
        room.createdAt,
        room.updatedAt
        FROM
        room
    INNER JOIN
        room_type ON room.room_type_id = room_type.id
    LEFT JOIN
        room_amenities ON room.id = room_amenities.room_id
    LEFT JOIN
        amenity ON room_amenities.amenity_id = amenity.id
    GROUP BY
        room.id;
`;

export const selectOneRoomQuery = `
    SELECT
        room.id as _id,
        room.name,
        room.photo,
        room_type.name AS room_type,
        room.room_number,
        room.description,
        room.offer,
        room.price,
        room.cancellation,
        group_concat(amenity.name) as amenities,
        room.discount,
        room.status,
        room.createdAt,
        room.updatedAt
        FROM
        room
    INNER JOIN
        room_type ON room.room_type_id = room_type.id
    LEFT JOIN
        room_amenities ON room.id = room_amenities.room_id
    LEFT JOIN
        amenity ON room_amenities.amenity_id = amenity.id
    WHERE
        id = ?
    GROUP BY
        room.id
    LIMIT 1;
`;

export const AddRoomQuery = `

`;

export const EditRoomQuery = `

`;

export const DeleteRoomQuery = `
    DELETE FROM room WHERE id = ?;
`;

// bookings

export const selectBookingsQuery = `
    SELECT
        booking.id as _id,
        booking.full_name,
        booking.email,
        booking.phone,
        booking.check_in,
        booking.check_out,
        booking.order_date,
        booking.special_request,
        booking.discount,
        booking.status,
        JSON_OBJECT(
            '_id', room.id,
            'name', room.name,
            'photo', room.photo,
            'room_type', room_type.name,
            'room_number', room.room_number,
            'description', room.description,
            'offer', room.offer,
            'price', room.price,
            'cancellation', room.cancellation,
            'amenities', group_concat(amenity.name),
            'discount', room.discount,
            'status', room.status,
            'createdAt', room.createdAt,
            'updatedAt', room.updatedAt
        ) as roomInfo
    FROM
        booking
    INNER JOIN
        room ON booking.room_id = room.id
    LEFT JOIN room_type ON room.room_type_id = room_type.id
    LEFT JOIN room_amenities ON room.id = room_amenities.room_id
    LEFT JOIN amenity ON room_amenities.amenity_id = amenity.id
    GROUP BY booking.id;
`;

export const selectOneBookingQuery = `
    SELECT
        booking.id as _id,
        booking.full_name,
        booking.email,
        booking.phone,
        booking.check_in,
        booking.check_out,
        booking.order_date,
        booking.special_request,
        booking.discount,
        booking.status,
        JSON_OBJECT(
            '_id', room.id,
            'name', room.name,
            'photo', room.photo,
            'room_type', room_type.name,
            'room_number', room.room_number,
            'description', room.description,
            'offer', room.offer,
            'price', room.price,
            'cancellation', room.cancellation,
            'amenities', group_concat(amenity.name),
            'discount', room.discount,
            'status', room.status,
            'createdAt', room.createdAt,
            'updatedAt', room.updatedAt
        ) as roomInfo
    FROM
        booking
    INNER JOIN
        room ON booking.room_id = room.id
    LEFT JOIN room_type ON room.room_type_id = room_type.id
    LEFT JOIN room_amenities ON room.id = room_amenities.room_id
    LEFT JOIN amenity ON room_amenities.amenity_id = amenity.id
    WHERE
        id = ?
    GROUP BY
        booking.id
    LIMIT 1;
`;

export const AddBookingQuery = `

`;

export const EditBookingQuery = `

`;

export const DeleteBookingQuery = `
    DELETE FROM booking WHERE id = ?;
`;

// employees

export const selectEmployeesQuery = `
    SELECT
        employee.id as _id,
        employee.photo,
        employee.fullname,
        employee.email,
        employee.start_date,
        employee_type.name as employee_type,
        employee.description,
        employee.phone,
        employee.employee_status as status,
        employee.password,
        employee.createdAt,
        employee.updatedAt
    FROM
        employee
    INNER JOIN
        employee_type ON employee.employee_type_id = employee_type.id;
`;

export const selectOneEmployeeQuery = `
    SELECT
        employee.id as _id,
        employee.photo,
        employee.fullname,
        employee.email,
        employee.start_date,
        employee_type.name as employee_type,
        employee.description,
        employee.phone,
        employee.employee_status as status,
        employee.password,
        employee.createdAt,
        employee.updatedAt
    FROM
        employee
    INNER JOIN
        employee_type ON employee.employee_type_id = employee_type.id
    WHERE
        id = ?
    LIMIT 1;
`;

export const AddEmployeeQuery = `
    INSERT INTO employee (
        photo, 
        fullname, 
        email, 
        employee_type_id, 
        description, 
        phone, 
        password
    )
    VALUES (
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?
    );
`;

export const EditEmployeeQuery = `

`;

export const DeleteEmployeeQuery = `
    DELETE FROM employee WHERE id = ?;
`;

// messages

export const selectMessagesQuery = `
    SELECT
        id as _id,
        full_name,
        email,
        phone,
        subject,
        message,
        stars,
        read_status as status,
        archived,
        photo,
        createdAt,
        updatedAt
    FROM 
        message;
`;

export const selectOneMessageQuery = `
    SELECT
        id as _id,
        full_name,
        email,
        phone,
        subject,
        message,
        stars,
        read_status as status,
        archived,
        photo,
        createdAt,
        updatedAt
    FROM
        message
    WHERE
        id = ?
    LIMIT 1;
`;

export const AddMessageQuery = `

`;

export const EditMessageQuery = `

`;

export const DeleteMessageQuery = `
    DELETE FROM message WHERE id = ?;
`;

// others

export const selectAmenitiesList = `
    SELECT * FROM amenity;
`;

export const selectRoomTypesList = `
    SELECT * FROM room_type;
`;

export const selectEmployeeTypesList = `
    SELECT * FROM employee_type;
`;

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
            'amenities', json_arrayagg(amenity.name),
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
            'amenities', json_arrayagg(amenity.name),
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
        booking.id = ?
    GROUP BY
        booking.id
    LIMIT 1;
`;

export const AddBookingQuery = `
    INSERT INTO booking (
        full_name, 
        email, 
        phone, 
        check_in, 
        check_out, 
        special_request, 
        discount,
        room_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`;

export const EditBookingQuery = `
    UPDATE booking
    SET 
        full_name = ?,
        email = ?,
        phone = ?,
        check_in = ?,
        check_out = ?,
        special_request = ?,
        discount = ?,
        room_id = ?
    WHERE id = ?;
`;

export const DeleteBookingQuery = `
    DELETE FROM booking WHERE id = ?;
`;
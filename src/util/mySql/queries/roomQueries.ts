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
        json_arrayagg(amenity.name) as amenities,
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
        json_arrayagg(amenity.name) as amenities,
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
        room.id = ?
    GROUP BY
        room.id
    LIMIT 1;
`;

export const selectOneRoomByNumberQuery = `
    SELECT
        room.name
        FROM
        room
    INNER JOIN
        room_type ON room.room_type_id = room_type.id
    LEFT JOIN
        room_amenities ON room.id = room_amenities.room_id
    LEFT JOIN
        amenity ON room_amenities.amenity_id = amenity.id
    WHERE
        room.room_number = ?
    GROUP BY
        room.id
    LIMIT 1;
`;

export const addRoomAmenities = (id: number, amenities: number[]) => {
    let amenity_list = "";
    const lastIndex = amenities.length - 1;
    for (let i = 0; i <= lastIndex; i++) {
        if(i < lastIndex){
            amenity_list += `(${id}, ${amenities[i]}),`;
        } else {
            amenity_list += `(${id}, ${amenities[i]})`;
        };
    };

    return `
        INSERT INTO room_amenities(room_id, amenity_id)
        VALUES ${amenity_list};
    `;
};

export const AddRoomQuery = `
    INSERT INTO room(
        name, 
        photo, 
        room_type_id, 
        room_number, 
        description, 
        offer, 
        price, 
        cancellation, 
        discount, 
        status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const EditRoomQuery = `
    UPDATE room
    SET 
        name = ?,
        photo = ?,
        room_type_id = ?,
        room_number = ?,
        description = ?,
        offer = ?,
        price = ?,
        cancellation = ?,
        discount = ?,
        status = ?
    WHERE id = ?;
`;

export const DeleteRoomQuery = `
    DELETE FROM room WHERE id = ?;
`;

export const selectAmenitiesList = `
    SELECT * FROM amenity;
`;

export const selectRoomTypesList = `
    SELECT * FROM room_type;
`;
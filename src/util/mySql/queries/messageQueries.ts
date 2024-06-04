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
    INSERT INTO message (
        full_name, 
        email, 
        phone, 
        subject, 
        message, 
        stars
    ) VALUES (?, ?, ?, ?, ?, ?);
`;

export const EditMessageQuery = `
    UPDATE message
    SET 
        full_name = ?, 
        email = ?, 
        phone = ?, 
        subject = ?, 
        message = ?, 
        stars = ?
    WHERE id = ?;
`;

export const DeleteMessageQuery = `
    DELETE FROM message WHERE id = ?;
`;
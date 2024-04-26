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
        employee.id = ?
    LIMIT 1;
`;

export const AddEmployeeQuery = `
    INSERT INTO employee (
        photo, 
        fullname, 
        email, 
        start_date,
        employee_type_id, 
        description, 
        phone, 
        password,
        employee_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const EditEmployeeQuery = `
    UPDATE employee
    SET 
        photo = ?,
        fullname = ?,
        email = ?,
        start_date = ?,
        employee_type_id = ?,
        description = ?,
        phone = ?,
        employee_status = ?,
        password = ?
    WHERE id = ?;
`;

export const DeleteEmployeeQuery = `
    DELETE FROM employee WHERE id = ?;
`;

export const LoginUser = `
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
    FROM employee
    INNER JOIN
        employee_type ON employee.employee_type_id = employee_type.id
    WHERE
        employee.email = ?
    LIMIT 1;
`;

export const selectEmployeeTypesList = `
    SELECT * FROM employee_type;
`;
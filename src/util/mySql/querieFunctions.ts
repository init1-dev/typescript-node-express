import { Connection } from "mysql2/promise";

export const executeQuery = async(
    query: string,
    currentConnection: Connection,
    message?: string
): Promise<void> => {
    const queries = query.split(";").filter(query => query.trim() !== '');

    if(message){
        console.log(message);
    }

    for (const query of queries){
        await currentConnection.query(query + ";");
    }

    console.log(`Done!\n`);
}

export const insertIntoTableFromArray = async(
    table: string,
    array: Array<string>,
    currentConnection: Connection
): Promise<void> => {
    console.log(`Inserting ${array.length} entries into ${table} table...`);

    let queryElementFromArray;
    for (let i = 0; i < array.length; i++) {
        queryElementFromArray = `INSERT INTO ${table}(
            name
        ) VALUES (
            '${array[i]}'
        )`;
        await currentConnection.query(queryElementFromArray);
    }

    console.log('Done!\n');
};

const stringFromArrayReduce = (array: Array<any>, format = false) => {
    const result = array.reduce((previousValue, currentValue, currentIndex) => {
        let isLastIndex = currentIndex === (array.length - 1);
        if(isLastIndex){
            return format
                ? previousValue + `${formatValue(currentValue)}`
                : previousValue + `${currentValue}`
        } else {
            return format
                ? previousValue + `${formatValue(currentValue)}, `
                : previousValue + `${currentValue}, `
        }
    }, '')
    return result;
};

const formatValue = (value: any): string | number | boolean => {
    return typeof value === 'string'
        ? `"${value}"`
        : `${value}`;
};

export const insertIntoTable = async(
    table: string,
    columns: Array<string>,
    values: Array<any>,
    number: number,
    currentConnection: Connection
): Promise<void> => {
    console.log(`Inserting ${number} entries into ${table} table...`);

    const queryColumns = await stringFromArrayReduce(columns);

    const queryValues = values.map((value) => {
        return `(${stringFromArrayReduce(value, true)})`;
    }).join(',')

    await currentConnection.query(`INSERT INTO ${table}(
        ${queryColumns}
    ) VALUES ${queryValues};`);

    // console.log(`${table} data:\n` + queryValues + "\n");
    console.log('Done!\n');
};

export const formatDateToSql = (date: Date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}
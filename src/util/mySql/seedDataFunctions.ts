import { Connection } from "mysql2/promise";

export const runMultipleQueries = async(
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

export const insertMultipleIntoTable = async(
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

    console.log('Done!\n');
};
export type ParsedResponse = {
    status: number;
    message: string;
}

export const parseResponse = (message: string, status = 404): ParsedResponse => {
    return {
        status: status,
        message: message
    }
}
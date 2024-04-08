// import { faker } from '@faker-js/faker';
import { MessagesModel } from '../interfaces/Messages';

export const insertMessagesData = async() => {
    try {
        for (let i = 0; i < 30; i++) {
            const newData = new MessagesModel({
                
            })
            console.log(newData);
            
        }
    } catch (error) {
        console.error('Error during insertion:', error);
    }
}
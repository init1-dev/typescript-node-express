// import { faker } from '@faker-js/faker';
import { faker } from '@faker-js/faker';
import { MessagesModel } from '../interfaces/Messages';

export const insertMessagesData = async() => {
    try {
        for (let i = 0; i < 30; i++) {
            const newData = new MessagesModel({
                full_name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                subject: faker.lorem.paragraph(),
                message: faker.lorem.paragraphs(2),
                stars: faker.number.int({min: 1, max: 5}),
                read: faker.datatype.boolean({probability: 0.5}),
                archived: faker.datatype.boolean({probability: 0.5}),
                foto: faker.image.avatar()
            })
            await newData.save();
        }
    } catch (error) {
        console.error('Error during insertion:', error);
    }
}
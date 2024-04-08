import mongoose from "mongoose";

export const dropAndCreateCollection = async(collectionName: string, currentConnection: mongoose.Connection | undefined ): Promise<void> => {
    const collectionsToArray = await mongoose.connection.db.listCollections().toArray();
    const isCollectionExists = collectionsToArray.findIndex(collection => collection.name === collectionName);

    if(isCollectionExists !== -1){
        await currentConnection?.dropCollection(collectionName);
    }
    
    await currentConnection?.createCollection(collectionName);
}
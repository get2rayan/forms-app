import dotenv from 'dotenv';
//import { client, getDb, getCollection } from './lib/mongoClient';

dotenv.config(); // Load environment variables from .env file

type User = {
  id: number;
  name: string;
}

const createTupleWithGeneric = <X, Y>(param1: X, param2: Y): [X, Y] => {
  return [param1, param2];
};

const res4 = createTupleWithGeneric<string, number>("Bangladesh", 1);
const res5 = createTupleWithGeneric<number, User>(123, {
  id: 222,
  name: "Nissso",
});
// try {

console.log(res4)
console.log(res5);
//   const db = getDb();
//   const collectionName : string | undefined= process.env.COLLECTION_NAME;
//   if (!collectionName) {
//       throw new Error('COLLECTION_NAME environment variable is not defined');
//   }
  
//   const   = getCollection(collectionName)
//   db.collection(collectionName).insertOne({ message: 'Hello, MongoDB!' })
//     .then(() => {
//       console.log('Test document inserted successfully');
//     })
//     .catch((error) => {
//       console.error('Error inserting test document:', error);
//     }); 
// }catch (error) {
//   console.error('Error during MongoDB operations:', error);
// }

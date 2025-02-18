import { doc, setDoc } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';
import { db } from "../config/firebase-config";

async function addDataToFirestore<T>(collectionName: string, data: T | T[]): Promise<void> {
  try { 

    if (Array.isArray(data)) {
      for (const item of data) {
        const id = uuidv4();
        await setDoc(doc(db, collectionName, id), { ...item, id }); 
        console.log(`Document added to ${collectionName} successfully.`);
      }
    } else {
      const id = uuidv4();
      await setDoc(doc(db, collectionName, id), { ...data, id });  
      console.log(`Document added to ${collectionName} successfully.`);
    }
    console.log(`Data added to ${collectionName} successfully.`);
  } catch (error) {
    console.error(`Error adding data to ${collectionName}:`, error);
    throw error;
  }
}

export default addDataToFirestore;
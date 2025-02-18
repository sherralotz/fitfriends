import { collection, getDocs, query, QueryConstraint } from "firebase/firestore";
import { db } from "../config/firebase-config";


async function GetDataFromFirestore<T>(collectionName: string, queryConstraints?: QueryConstraint[] ):
Promise<T[]> {
    const dataCollection = collection(db, collectionName);
    const q = query(dataCollection, ...(queryConstraints || [])); // Apply query constraints if provided
  
    try {
      const querySnapshot = await getDocs(q);
      const data: T[] = [];
  
      querySnapshot.forEach((doc) => {
        const item = doc.data() as T;
        data.push(item);
      });
  
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${collectionName}:`, error);
      throw error; // Re-throw the error for the calling function to handle
    }
}

export default GetDataFromFirestore
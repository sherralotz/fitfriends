import React, { createContext, useState, useEffect, useContext } from "react";

import { onAuthStateChanged, User } from "firebase/auth"; // Import User type

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";

interface UserData {  // Define an interface for your user data
    uid: string; 
    displayName: string; 
    email: string; 
    photoURL: string; 
    role: string; 
    created_at: string; 
    lastSignIn: string; 
  }

interface AuthContextType {
  user: User | null; // Firebase User object
  userDocData: UserData | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userDocData: null,
  loading: true,
  error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userDocData, setUserDocData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);
      setError(null);

      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            setUserDocData(userData);
          } else {
            setError("User document not found.");
          }
        } catch (err: any) {
          // Type the error as needed
          setError("Error fetching user data: " + err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setUserDocData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = { user, userDocData, loading, error }; // Type the value

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

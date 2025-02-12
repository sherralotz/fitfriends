// src/components/SignIn.tsx
import React, { useEffect, useState } from "react";
import { auth, provider, signInWithPopup, db } from "../../config/firebase-config";
import { UserCredential, onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async (): Promise<void> => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      console.log("User Info:", loggedInUser); // Log user details

      // Check if the user already exists in Firestore
      const userRef = doc(db, "users", loggedInUser.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // If the user doesn't exist, create a new document
        await setDoc(userRef, {
          uid: loggedInUser.uid,
          displayName: loggedInUser.displayName,
          email: loggedInUser.email,
          photoURL: loggedInUser.photoURL,
          role: "Client",
          created_at: new Date(),
        });
        console.log(`Welcome, ${loggedInUser.displayName}!`);
      } else {
        // If the user exists, optionally update user info or last sign-in time
        await updateDoc(userRef, {
          lastSignIn: new Date(),
        });
        console.log(`Welcome back, ${loggedInUser.displayName}!`);
      }
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Hi, {user.displayName}!</h2>
          <button onClick={() => auth.signOut()} style={styles.button}>
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <h2>Sign In</h2>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button
            onClick={handleGoogleSignIn}
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign in with Google"}
          </button>
        </div>
      )}
    </div> 

  );
};

const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SignIn;

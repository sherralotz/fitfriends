import React, { useEffect, useState } from "react"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom"; 
import Calendar from "../../components/Calendar/Calendar";
import "./Home.css"; 

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login"); // Redirect to login if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return ( 
    <>
        <Calendar /> 
    </>
  );
};

export default Home;

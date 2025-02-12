import React from "react";
import "./Profile.css";
import { useAuth } from "../../utils/authContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { user, userDocData, loading, error } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error message
  }

  if (!user || !userDocData) {
    return <div>Please log in or create a profile.</div>; // Handle the case where the user is not logged in or data is not available
  }

  const handleSignOut = () => {
    // Renamed for clarity
    auth
      .signOut()
      .then(() => {
        // Handle the promise from auth.signOut()
        navigate("/login");
      })
      .catch((error) => {
        // Handle any errors during sign-out
        console.error("Sign out error:", error);
      });
  };

  return (
    <>
      {userDocData && (
        <div className="d-flex justify-content-between align-items-center">
          <div className="profile-container">
            <div className="profile-header d-flex">
              <div className="profile-picture">
                <img
                  src="https://dummyimage.com/150" // Placeholder image URL
                  alt="Profile"
                />
              </div>
              <div className="profile-info">
                <div className="profile-name">{userDocData.displayName}</div>
                <div className="profile-gym">Crossfit Dagit</div>
              </div>

              <div className="btn-group ms-auto">
                <button
                  type="button"
                  className="btn  btn-outline-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faBars} size="xs" />
                </button>
                <ul className="dropdown-menu">
                  {/* <li>
          <a className="dropdown-item" href="#">
            Settings
          </a>
        </li> */}
                  <li>
                    <a className="dropdown-item" onClick={handleSignOut}>
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="profile-content">
              {/* Your content goes here */}
              <div className="content-grid">
                <img src="https://dummyimage.com/900x200" alt="Post" />
                <img src="https://dummyimage.com/900x200" alt="Post" />
                <img src="https://dummyimage.com/900x200" alt="Post" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

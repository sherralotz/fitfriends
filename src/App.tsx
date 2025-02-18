import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";  
import Home from "./pages/Home/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Profile from "./pages/Profile/Profile";
import { AuthProvider } from "./utils/authContext";
import CreateWorkout from "./pages/CreateWorkout/CreateWorkout";
import AdminManage from "./pages/AdminManage/AdminManage";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Layout><Profile /></Layout>}/>
        <Route path="/create-workout" element={<Layout><CreateWorkout /></Layout>}/>
        <Route path="/admin-manage" element={<Layout><AdminManage /></Layout>}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Profile from "./pages/Profile/Profile";
import { AuthProvider } from "./utils/authContext";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Layout><Profile /></Layout>}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;

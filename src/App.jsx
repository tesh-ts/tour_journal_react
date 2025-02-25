import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./Login";
import Register from "./Register";
import MainContent from "./MainContent";
import Nav from "./Nav"; // Добавляем шапку

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav /> 
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
    
  );
}

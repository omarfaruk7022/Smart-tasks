import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import Navbar from "./Components/Shared/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

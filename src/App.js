import React, { useEffect } from "react";
import './App.css';
import NavBar from "./Components/NavBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Reservation from "./Pages/Reservation";
import { current } from "./JS/Actions/user";
import { useDispatch } from "react-redux";
import Offre from "./Pages/Offre";
import Profile from "./Pages/Profile";
import Add from "./Pages/Add";
import Edit from "./Pages/Edit"; // Assurez-vous que le chemin est correct
import Edit1 from "./Pages/Edit1"; // Assurez-vous que le chemin est correct
import Add1 from "./Pages/Add1";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(current()); // Si un token est trouvé, récupérer les infos utilisateur
    } else {
      // Si aucun token, redirige vers login
      // navigate("/login");
    }
  }, [dispatch, token, navigate]);

  return (
    <div className="App">
      <NavBar /> {/* Navbar avec la gestion de navigation */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route vers Home */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Route vers Login */}
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/offre" element={<Offre />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add1" element={<Add1 />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/edit1/:id" element={<Edit1 />} />

      </Routes>
    </div>
  );
}

export default App;

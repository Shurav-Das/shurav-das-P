// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Protfolio from "./pages/Protfolio";
export default function App() {
  // Get user data from localStorage - FIXED
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = localStorage.getItem('userId') || userData.userID || null;
  const userName = userData.name || 'Student';

  return (
    <Routes>
      <Route path="/" element={<Protfolio />} />
    </Routes>
  );
}
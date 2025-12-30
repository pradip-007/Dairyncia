import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./components/pages/Home";
import { Layout } from './components/Layouts/Layout';
import Admin from "../src/components/pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin-dashboard" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App

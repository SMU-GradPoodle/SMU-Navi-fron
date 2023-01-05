import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';

//main page
import Main from './pages/Main/Main';

//map page
import MapMain from "./pages/MapMain/Map_Main";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/map_main" element={<MapMain />}></Route>
      </Routes>
  </Router>
);


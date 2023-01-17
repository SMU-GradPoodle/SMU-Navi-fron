import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';

//main page
import Main from './pages/Main/Main';

//member page
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import FindPw from "./pages/FindPw/FindPw";

import Menu from "./component/MenuBar/MenuBar";
import Modal from "./component/Modal/Modal";

//map page
import MapMain from "./pages/MapMain/Map_Main";
document.cookie = "crossCookie=bar; SameSite=None; Secure";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/findpw" element={<FindPw />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/map_main" element={<MapMain />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/modal" element={<Modal content={"가입 완료 되었습니다"} btName={"로그인"} />}></Route>
        </Routes>
    </Router>
);


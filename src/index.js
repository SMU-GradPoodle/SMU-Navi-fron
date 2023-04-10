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
import Mypage from "./pages/Mypage/Mypage";

//Sub page
import CheckDemon from "./pages/CheckDemon/CheckDemon";

import ReportTraffic from "./pages/ReportTraffic/ReportTraffic";
import Write_ReportTraffic from "./pages/ReportTraffic/Write_traffic";
import Detail_traffic from "./pages/ReportTraffic/Detail_traffic";

import TakeTaxi from "./pages/TakeTaxi/TakeTaxi";

import Notice from "./pages/Notice/Notice";
import Write_Notice from './pages/Notice/Write_notice';
import Detail_Notice from './pages/Notice/Detail_notice';

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
            <Route path="/mypage" element={<Mypage />}></Route>

            <Route path="/main" element={<Main />}></Route>
            <Route path="/map_main" element={<MapMain />}></Route>

            <Route path="/check_demon" element={<CheckDemon />}></Route>

            <Route path="/report_traffic" element={<ReportTraffic />}></Route>
            <Route path="/write_traffic" element={<Write_ReportTraffic />}></Route>
            <Route path="/detail_traffic/:id" element={<Detail_traffic />}></Route>

            <Route path="/take_taxi" element={<TakeTaxi />}></Route>

            {/*공지사항*/}
            <Route path="/notice" element={<Notice />}></Route>
            <Route path="/write_notice" element={<Write_Notice />}></Route>
            <Route path="/detail_notice/:id" element={<Detail_Notice />}></Route>
        </Routes>
    </Router>
);


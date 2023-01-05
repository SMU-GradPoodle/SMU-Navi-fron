import React, { useEffect } from 'react';
import MainLogo from './../../component/MainLogo/Main_Logo';
import SearchBox from './../../component/SearchBox/Search_Box';
import NavBar from './../../component/NavBar/Nav_Bar';
import Footer from './../../component/Footer/Footer';
import MainBack from './../../img/schoolBackGround.png';
import noticeIcon from './../../img/확성기.png';
import './Main.css';

export default function Main() {
    return(
        <div>
            <MainLogo />
            <div className={"Main_body_wrap"} style={{backgroundImage: `url(${MainBack})` }}>
                <NavBar />
                <div className={"Main_body_box"}>
                    <div id={"MainBodyNotice"}>
                        <img src={noticeIcon} />
                        <p>[ 공지사항 ] ㅂㅐ가 고프다!!!! </p>
                    </div>
                    <div id={"MainBodySearch"}>
                        <p>빠른 길 찾기</p>
                        <input id={"inputAddress"} type={"text"} />
                    </div>
                    <div id={"numberAccident"}>
                        <div id={"demonNumber"}>
                            <p>현재 발생 시위</p>
                            <div>0 건</div>
                        </div>
                        <div id={"accNumber"}>
                            <p>현재 발생 사고</p>
                            <div>0 건</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
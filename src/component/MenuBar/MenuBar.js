import './MenuBar.css';
import React from 'react';
import { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function MenuBar(){

    const [isTrafficClicked, setIsTrafficClicked] = useState('');
    const [isTaxiClicked, setIsTaxiClicked] = useState('');
    const [isNoticeClicked, setIsNoticeClicked] = useState('');

    function onClickReport(){
        setIsTrafficClicked('click');
    }

    function onClickTaxi(){
        setIsTaxiClicked('click');
    }

    function onClickNotice(){
        setIsNoticeClicked('click');
    }

    return(
        <div className={"MenuBarWrap"}>
            <div className={"MenuBarLineWrap"}>
                <p className={"BarMenu"}>Menu</p>
            </div>
            <div className={"MenuBarLineWrap"}>
                <Link to={'/map_main'} id={isTrafficClicked} onClick={onClickReport} style={{textDecoration: 'none', color: 'black'}}>
                    <p className={"BarTraffic"}>대중교통 지도</p>
                </Link>
            </div>
            <div className={"MenuBarLineWrap"}>
                <Link to={'/report_traffic'} id={isTrafficClicked} onClick={onClickReport} style={{textDecoration: 'none', color: 'black'}}>
                    <p className={"BarTraffic"}>교통 제보하기</p>
                </Link>
            </div>
            <div className={"MenuBarLineWrap"}>
                <Link to={'/take_taxi'} id={isTaxiClicked} onClick={onClickTaxi} style={{textDecoration: 'none', color: 'black'}}>
                    <p className={"BarTaxi"}>택시 같이 타기</p>
                </Link>
            </div>
            <div className={"MenuBarLineWrap"}>
                <Link to={'/notice'} id={isNoticeClicked} onClick={onClickNotice} style={{textDecoration: 'none', color: 'black'}}>
                    <p className={"BarNotice"}>공지사항</p>
                </Link>
            </div>
        </div>
    )
}

export default MenuBar;
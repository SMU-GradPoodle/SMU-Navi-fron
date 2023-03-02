import './MenuBar.css';
import React from 'react';
import {Link} from 'react-router-dom';

function MenuBar(){

    return(
        <div className={"MenuBarWrap"}>
            <div className={"MenuBarLineWrap"}>
                <p className={"BarMenu"}>Menu</p>
            </div>
            <div className={"MenuBarLineWrap"}>
                <Link to={'/check_demon'} style={{textDecoration: 'none', color: 'black'}}>
                    <p className={"BarCheck"}>시위 확인하기</p>
                </Link>
            </div>
            <div className={"MenuBarLineWrap"}>
                <Link to={'/report_traffic'} style={{textDecoration: 'none', color: 'black'}}>
                    <p className={"BarTraffic"}>교통 제보하기</p>
                </Link>
            </div>
            <div className={"MenuBarLineWrap"}>
                <Link to={'/take_taxi'} style={{textDecoration: 'none', color: 'black'}}>
                    <p className={"BarTaxi"}>택시 같이 타기</p>
                </Link>
            </div>
            <div className={"MenuBarLineWrap"}>
                <Link to={'/notice'} style={{textDecoration: 'none', color: 'black'}}>
                    <p className={"BarNotice"}>공지사항</p>
                </Link>
            </div>
        </div>
    )
}

export default MenuBar;
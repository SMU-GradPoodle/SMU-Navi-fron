import React, { useEffect } from 'react';
import MainLogo from './../../component/MainLogo/Main_Logo';
import Map from "./../../component/Map/Map.js";
import SearchBox from './../../component/SearchBox/Search_Box';
import './Main.css';

export default function MapMain() {

    useEffect(() => {
        Map();
    }, []);

    return (
        <div className={"Main_wrap"}>
            <MainLogo />
            <div id='map' ></div>
            <SearchBox />
        </div>
    );
}
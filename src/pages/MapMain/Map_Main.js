import React, { useEffect } from 'react';
import MainLogo from './../../component/MainLogo/Main_Logo';
import Map from "./../../component/Map/Map.js";
import SearchBox from './../../component/SearchBox/Search_Box';
import './Map_Main.css';

export default function Map_Main() {
    useEffect(()=>{
        Map();
    })
    // useEffect(() => {
    //     var startAddress = localStorage.getItem('startLoc');
    //     if(startAddress != ''){
    //         Map(startAddress);
    //     }
    // }, []);

    return (
        <div className={"Main_wrap"}>
            <MainLogo />
            <div id='map' ></div>
            <SearchBox />
        </div>
    );
}
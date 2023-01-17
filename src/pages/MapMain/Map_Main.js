import React, {useEffect, useState} from 'react';
import MainLogo from './../../component/MainLogo/Main_Logo';
import Map from "./../../component/Map/Map.js";
import SearchBox from './../../component/SearchBox/Search_Box';
import './Map_Main.css';
import Search from './../../component/SearchPlaces/Search';
import axios from 'axios';

export default function Map_Main() {

    var location = localStorage.getItem('searchLoc');
    useEffect(()=>{
        Map(location);
    })

    return (
        <div className={"Main_wrap"}>

            <MainLogo />
            <div id='map' ></div>
            <SearchBox />
        </div>
    );
}
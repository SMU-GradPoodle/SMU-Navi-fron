import React, {useEffect, useState} from 'react';
import MainLogo from '../../component/MainLogo/Main_Logo';
import Map from "../../component/Map/Map.js";
import SearchBox from '../../component/SearchBox/Search_Box';
import './Map_Main.css';
import Search from '../../component/SearchPlaces/Search';
import axios from 'axios';
import Address from '../../component/SearchPlaces/Address';
import {useLocation} from "react-router-dom";

const Map_Main = ({linePath}) => {
    const selectData = useLocation();
    const location = selectData.state.value;
    console.log(location);

    return (
        <div className={"Main_wrap"}>

            <MainLogo />
            <div id='map' ></div>
            <SearchBox location={location} />
        </div>
    );
}
export default Map_Main
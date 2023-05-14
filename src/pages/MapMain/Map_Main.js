import React, {useEffect, useState} from 'react';
import MainLogo from '../../component/MainLogo/Main_Logo';
import Map from "../../component/Map/Map.js";
import SearchBox from '../../component/SearchBox/Search_Box';
import './Map_Main.css';
import Search from '../../component/SearchPlaces/Search';
import axios from 'axios';
import Address from '../../component/SearchPlaces/Address';
import {useLocation} from "react-router-dom";
import Footer from "../../component/Footer/Footer";
import MenuBar from "../../component/MenuBar/MenuBar";
const Map_Main = ({linePath}) => {

    return (
        <div className={"Main_wrap"}>
            <MainLogo className={"mainlogo"}/>
            <hr id={"greenLine"}/>
            <MenuBar />
            <div id='map' ></div>
            <SearchBox />
            <Footer />
        </div>
    );
}
export default Map_Main
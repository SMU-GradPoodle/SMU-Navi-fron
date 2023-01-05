import React, {useEffect} from 'react';
import $ from 'jquery';
import Map from "./../../component/Map/Map.js";
import './Search_Box.css';
import folder from './../../img/접기버튼.png';

export default function Search_Box(){
    // useEffect(() => {
    //     localStorage.clear();
    //     var startAddress = localStorage.getItem('startLoc');
    //     if(startAddress != ''){
    //         Map(startAddress);
    //     }
    // }, []);

    function start(){
        const startLoc = $('#startLoc').val();
        localStorage.setItem('startLoc', startLoc);
        var startAddress = localStorage.getItem('startLoc');
        if(startAddress != ''){
            Map(startAddress);
        }
    }

    return(
        <div className={"Search_box_wrap"}>
            <div className={"Search_box_title"}>
                <h3>빠른 길 찾기</h3>
                <input id={"startLoc"} type={"text"} />
                <div className={"SearchBtWrap"}>
                    <button id={"searchStartLocBt"} type={'button'} onClick={start}>길찾기  ></button>
                </div>
            </div>
            <img id={"folderBoxTrue"} src={folder} />
            <div id={"underBar"} />
        </div>
    )
}

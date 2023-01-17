import React from 'react';
import './Search_Box.css';
import Address from './../../component/SearchPlaces/Address';
import folder from './../../img/접기버튼.png';
import Search from './../../component/SearchPlaces/Search';
import axios from 'axios';

export default function Search_Box(props){

    function searchStart(props) {
        var x = document.getElementById("folderBoxTrue").value;
        var y = document.getElementById("searchStartLocBt").value;
        console.log(x);
        console.log(y);
    }

        return(
        <>
            <div className={"Search_box_wrap"}>
                <div className={"Search_box_title"}>
                    <h3>빠른 길 찾기</h3>
                    <Search />
                    <div className={"SearchBtWrap"}>
                        <button id={"searchStartLocBt"} value={""} type={'button'} onClick={searchStart}>길찾기  </button>
                    </div>
                </div>
                <img id={"folderBoxTrue"} src={folder} value={""} />
                <div id={"underBar"} />
            </div>
        </>
    )
}

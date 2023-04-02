import React, {useState, useEffect} from 'react';
import './Search_Box.css';
import Address from '../SearchPlaces/Address';
import folder from '../../img/접기버튼.png';
import Search from '../SearchPlaces/Search';
import axios from 'axios';
import Map from  '../Map/Map';
import qe from "styled-components";
import {render} from "react-dom";
import produce from "immer";

const { kakao } = window;
const Search_Box = ({selecWays}) => {
    const baseUrl = "http://localhost:8080/api/map/transit?";
    const [ways, setWays] = useState([null]);
    const transfer = [];
    const point = [{La: "", Ma: ""}];
    const [linePath, setLinePath] = useState([]);
    const [map, setMap] = useState();
    const testArr = [{name: "ㅇㅇ", time: 11}, {name: "ㄴㄴ", time: 22}, {name: "ㄷㄷ", time: 33}, {name: "ㄹㄹ", time: 44}];
    var moveLatLon = new kakao.maps.LatLng(37.6026, 126.9553);
    var removCnt = 0;
    var myCnt = 5;

    let [polyline1, setPoly1] = useState(null);
    let [polyline2, setPoly2] = useState(null);
    let [polyline3, setPoly3] = useState(null);
    let [polyline4, setPoly4] = useState(null);
    let [polyline5, setPoly5] = useState(null);



    useEffect(() => {
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567),
                level: 7 // 지도의 확대 레벨
            };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption);
        setMap(map);

        const cnt = selecWays.length;
            for (var i = 0; i < cnt; i++) {
            ways[i] = selecWays[i];
        };


        for (var i = 0; i < ways[0].subPathList.length; i++) {
            transfer.length = ways[0].subPathList.length;
            transfer[i] = ways[0].subPathList[i];

            for (var j = 0; j < transfer[i].stationList.length; j++) {
                point.length = transfer[i].stationList.length;
                point[j] = {La: transfer[i].stationList[j].gpsX, Ma: transfer[i].stationList[j].gpsY}
            }

            linePath.length = point.length;
            const elements = point.map((item, index) => {
                linePath[index] = new kakao.maps.LatLng(item.Ma, item.La);
            })


            if(removCnt == 0) {
                setPoly1(
                    polyline1 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                }))
            }
            else if(removCnt == 1) {
                setPoly2(
                    polyline2 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                }))
            }
            else if(removCnt == 2) {
                setPoly3(
                    polyline3 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                }))
            }
            else if(removCnt == 3) {
                setPoly4(
                    polyline4 = new kakao.maps.Polyline({
                        path: linePath, // 선을 구성하는 좌표배열
                        strokeWeight: 4, // 선의 두께
                        strokeColor: 'red', // 선의 색깔
                        strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                        strokeStyle: 'solid' // 선의 스타일
                    }))
            }
            else if(removCnt == 4) {
                setPoly5(
                    polyline5 = new kakao.maps.Polyline({
                        path: linePath, // 선을 구성하는 좌표배열
                        strokeWeight: 4, // 선의 두께
                        strokeColor: 'red', // 선의 색깔
                        strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                        strokeStyle: 'solid' // 선의 스타일
                    }))
            }
            removCnt++;
            myCnt++;
            console.log(polyline1);
            console.log(polyline2);
            console.log(polyline3);
        }
        for(var i = 0; i <myCnt; i++ ) {
            if(i == 0) {
                if (polyline1 != null)
                    polyline1.setMap(map);
            }
            else if(i == 1) {
                if (polyline2 != null)
                    polyline2.setMap(map);
            }
            else if(i == 2) {
                if (polyline3 != null)
                    polyline3.setMap(map);
            }
            else if(i == 3) {
                if (polyline4 != null)
                    polyline4.setMap(map);
            }
            else if(i == 4) {
                if (polyline5 != null)
                    polyline5.setMap(map);
            }
        }
        removCnt = 0;
console.log(ways);
    }, []);

    async function getData(startPoint) {
        await axios
            .get(baseUrl + startPoint)
            .then((response) => {
                console.log(baseUrl+startPoint);
                const cnt = response.data.pathInfoList.length;
                for (var i = 0; i < cnt; i++) {
                    ways[i] = response.data.pathInfoList[i];

                }
                console.log(response.data);
                drawPoly(0);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    function moveCenter() {

        var transCnt = ways[0].subPathList.length
        var center = ways[0].subPathList[transCnt-1];
        var centerStation = center.stationList.length;
        var centerPoint = {La: center.stationList[centerStation-1].gpsX, Ma: center.stationList[centerStation-1].gpsY};
        var centerGps = new kakao.maps.LatLng(centerPoint.Ma, centerPoint.La);
        console.log(centerGps);
        //map.panTo(moveLatLon);
    }
    function getRemove() {
        console.log(polyline1);
        console.log(polyline2);
        console.log(polyline3);
       for(var i = 0; i < myCnt; i++) {
           if(i == 0) {
               if (polyline1 != null)
                   polyline1.setMap(null);
           }
           else if(i == 1) {
               if (polyline2 != null)
                   polyline2.setMap(null);
           }
           else if(i == 2) {
               if (polyline3 != null)
                   polyline3.setMap(null);
           }
           else if(i == 3) {
               if (polyline4 != null)
                   polyline4.setMap(null);
           }
           else if(i == 4) {
               if (polyline5 != null)
                   polyline5.setMap(null);
           }
        }
        polyline1 = "";
        polyline2 = "";
        polyline3 = "";
        myCnt = 0;
    }


    function drawPoly(w) {
        console.log(ways[0]);
        console.log(ways[0].subPathList.length);

        for (var i = 0; i < ways[w].subPathList.length; i++) {
            transfer.length = ways[w].subPathList.length;
            transfer[i] = ways[w].subPathList[i];


            for (var j = 0; j < transfer[i].stationList.length; j++) {
                point.length = transfer[i].stationList.length;
                point[j] = {La: transfer[i].stationList[j].gpsX, Ma: transfer[i].stationList[j].gpsY}
            }

            linePath.length = point.length;
            const elements = point.map((item, index) => {
                linePath[index] = new kakao.maps.LatLng(item.Ma, item.La);
            })

            if(removCnt == 0) {
                polyline1 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                });
            }
            else if(removCnt == 1) {
                polyline2 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                });
            }
            else if(removCnt == 2) {
                polyline3 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                });
            }
            else if(removCnt == 3) {
                polyline4 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                });
            }
            else if(removCnt == 4) {
                polyline5 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                });
            }
            removCnt++;
            myCnt++;
        }
        for(var k = 0; k <myCnt; k++ ) {
            if(k == 0) {
                if (polyline1 != null)
                    polyline1.setMap(map);
            }
            else if(k == 1) {
                if (polyline2 != null)
                    polyline2.setMap(map);
            }
            else if(k == 2) {
                if (polyline3 != null)
                    polyline3.setMap(map);
            }
            else if(k == 3) {
                if (polyline4 != null)
                    polyline4.setMap(map);
            }
            else if(k == 4) {
                if (polyline5 != null)
                    polyline5.setMap(map);
            }
        }
        removCnt = 0;
    }

    const handleOnClick = (e, i) => {
        getRemove();
        drawPoly(i);
        console.log(ways);
    };


    function selectLoc() {
        var x = document.getElementById("folderBoxTrue").value;
        var y = document.getElementById("searchStartLocBt").value;
        const startPoint = "startX=" + x + "&" + "startY=" + y;
        searchStart(startPoint);
        console.log(ways);
    }

    async function searchStart(props) {
        const loc = props;
        getRemove();
        getData(loc);

        document.getElementById("ways-list").style.display = 'block';

        //setWays(({...ways}));
    }


        return (
            <>
                <div className={"Search_box_wrap"}>
                    <div className={"Search_box_title"}>
                        <h3>빠른 길 찾기</h3>
                        <Search/>
                        <div className={"SearchBtWrap"} value={" "}>
                            <button id={"searchStartLocBt"} value={""} type={'button'} onClick={() => {
                                selectLoc();
                            }}>길찾기
                            </button>
                        </div>

                    </div>
                    <img id={"folderBoxTrue"} src={folder} value={""}/>
                    <div id={"underBar"}/>
                    <div id="ways-list-wrapper">
                        <div id="ways-list" >
                            {ways.map((obj, index) => (
                                <div  key={index} >
                                    <div  onClick={e => handleOnClick(e, index)} >
                                        <h5>{index + 1}.&nbsp;&nbsp; {ways.time}</h5>
                                        <div >
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id={"map2"}></div>
                </div>

            </>
        )
    }


export default Search_Box
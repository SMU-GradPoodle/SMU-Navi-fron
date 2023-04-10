import React, {useState, useEffect} from 'react';
import './Search_Box.css';
import NavBar from '../../component/NavBar/Nav_Bar';
import Address from '../SearchPlaces/Address';
import folder from '../../img/접기버튼.png';
import Search from '../SearchPlaces/Search';
import axios from 'axios';
import Map from  '../Map/Map';
import qe from "styled-components";
import {render} from "react-dom";
import produce from "immer";
import ReactDOM  from "react-dom/client";
import Nav_Bar from "../NavBar/Nav_Bar";

const { kakao } = window;
function Search_Box () {
    const baseUrl = "http://localhost:8080/api/map/transit?";
    const [ways, setWays] = useState([0]);
    const [removeWays, setRemoveWays] = useState([0]);
    const transfer = [];
    const point = [{La: "", Ma: ""}];
    const [linePath, setLinePath] = useState([]);
    const [transferName, setTransferName] = useState([null]);
    const [wayTime, setWayTime] = useState([]);
    const [map, setMap] = useState();

    var removCnt = 0;
    var myCnt = 5;

    let [polyline1, setPoly1] = useState(null);
    let [polyline2, setPoly2] = useState(null);
    let [polyline3, setPoly3] = useState(null);
    let [polyline4, setPoly4] = useState(null);
    let [polyline5, setPoly5] = useState(null);

    var position = [
        {
            title: "경복궁역",
            latlng: new kakao.maps.LatLng(37.5796, 126.9770),
            x: 126.9770,
            y: 37.5796
        },
        {
            title: "홍제역",
            latlng: new kakao.maps.LatLng(37.5888, 126.9441),
            x: 126.9441,
            y: 37.5888
        }
    ];


    useEffect(async () => {
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567),
                level: 7 // 지도의 확대 레벨
            };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption);
        setMap(map);

        position.map((p, idx) => {
            var imageSize = new kakao.maps.Size(20, 25);
            var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            var marker = new kakao.maps.Marker({
                map: map,
                position: p.latlng,
                title: p.title,
                image: markerImage,
                clickable: true
            });
            marker.setMap(map);
            kakao.maps.event.addListener(marker, 'click', async function Click ()  {
                console.log(polyline1);
                console.log(polyline2);
                var x = p.x;
                var y = p.y;
                const startPoint = "startX=" + x + "&" + "startY=" + y;
                getRemove();
                for (var i = 0; i < myCnt; i++) {
                    if (i === 0) {
                        if (polyline1 != null)
                            polyline1.setMap(null);
                    } else if (i === 1) {
                        if (polyline2 != null)
                            polyline2.setMap(null);
                    } else if (i === 2) {
                        if (polyline3 != null)
                            polyline3.setMap(null);
                    } else if (i === 3) {
                        if (polyline4 != null)
                            polyline4.setMap(null);
                    } else if (i === 4) {
                        if (polyline5 != null)
                            polyline5.setMap(null);
                    }
                }
                polyline1 = null;
                polyline2 = null;
                polyline3 = null;
                polyline4 = null;
                polyline5 = null;
                myCnt = 0;
                await getData(startPoint);
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
                    console.log(polyline2);
                    if (removCnt === 0) {
                        setPoly1(polyline1 = new kakao.maps.Polyline({
                            path: linePath, // 선을 구성하는 좌표배열
                            strokeWeight: 4, // 선의 두께
                            strokeColor: 'red', // 선의 색깔
                            strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                            strokeStyle: 'solid' // 선의 스타일
                        }));

                    } else if (removCnt === 1) {
                        setPoly2(polyline2 = new kakao.maps.Polyline({
                            path: linePath, // 선을 구성하는 좌표배열
                            strokeWeight: 4, // 선의 두께
                            strokeColor: 'red', // 선의 색깔
                            strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                            strokeStyle: 'solid' // 선의 스타일
                        }));
                    } else if (removCnt === 2) {
                        setPoly3( polyline3 = new kakao.maps.Polyline({
                            path: linePath, // 선을 구성하는 좌표배열
                            strokeWeight: 4, // 선의 두께
                            strokeColor: 'red', // 선의 색깔
                            strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                            strokeStyle: 'solid' // 선의 스타일
                        }));
                    } else if (removCnt === 3) {
                        setPoly4(polyline4 = new kakao.maps.Polyline({
                            path: linePath, // 선을 구성하는 좌표배열
                            strokeWeight: 4, // 선의 두께
                            strokeColor: 'red', // 선의 색깔
                            strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                            strokeStyle: 'solid' // 선의 스타일
                        }));
                    } else if (removCnt === 4) {
                        setPoly5(polyline5 = new kakao.maps.Polyline({
                            path: linePath, // 선을 구성하는 좌표배열
                            strokeWeight: 4, // 선의 두께
                            strokeColor: 'red', // 선의 색깔
                            strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                            strokeStyle: 'solid' // 선의 스타일
                        }));
                    }
                    removCnt++;
                    myCnt++;
                }
                for (var k = 0; k < myCnt; k++) {
                    if (k === 0) {
                        if (polyline1 != null)
                            polyline1.setMap(map);
                    } else if (k === 1) {
                        if (polyline2 != null)
                            polyline2.setMap(map);
                    } else if (k === 2) {
                        if (polyline3 != null)
                            polyline3.setMap(map);
                    } else if (k === 3) {
                        if (polyline4 != null)
                            polyline4.setMap(map);
                    } else if (k === 4) {
                        if (polyline5 != null)
                            polyline5.setMap(map);
                    }
                }
                removCnt = 0;
            });
        });

    }, []);

    async function getData(startPoint) {
        await axios
            .get(baseUrl + startPoint)
            .then((response) => {
                console.log(baseUrl + startPoint);

                for (var i = 0; i < ways.length; i++) {
                    ways[i] = [];
                    transferName[i] = [];
                    wayTime[i] = [];
                }
                const cnt = response.data.pathInfoList.length;
                ways.length = response.data.pathInfoList.length;
                transferName.length = response.data.pathInfoList.length;
                wayTime.length = response.data.pathInfoList.length;
                for (var i = 0; i < cnt; i++) {
                    ways[i] = response.data.pathInfoList[i]
                    for (var j = 0; j < ways[i].subPathList.length; j++) {
                        transferName[i] = ways[i].subPathList;
                    }
                    wayTime[i] =  ways[i].time;
                }

                setWays(ways);
                console.log(response.data);
                drawPoly(0);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    function getRemove() {
        for (var i = 0; i < myCnt; i++) {
            if (i === 0) {
                if (polyline1 != null)
                    polyline1.setMap(null);
            } else if (i === 1) {
                if (polyline2 != null)
                    polyline2.setMap(null);
            } else if (i === 2) {
                if (polyline3 != null)
                    polyline3.setMap(null);
            } else if (i === 3) {
                if (polyline4 != null)
                    polyline4.setMap(null);
            } else if (i === 4) {
                if (polyline5 != null)
                    polyline5.setMap(null);
            }
        }
        polyline1 = null;
        polyline2 = null;
        polyline3 = null;
        polyline4 = null;
        polyline5 = null;
        myCnt = 0;
    }


    function drawPoly(w) {
        console.log(ways);
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
            console.log(polyline2);
            if (removCnt === 0) {
                setPoly1(polyline1 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                }));

            } else if (removCnt === 1) {
                setPoly2(polyline2 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                }));
            } else if (removCnt === 2) {
                setPoly3( polyline3 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                }));
            } else if (removCnt === 3) {
                setPoly4(polyline4 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                }));
            } else if (removCnt === 4) {
                setPoly5(polyline5 = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: 'red', // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                }));
            }
            removCnt++;
            myCnt++;
        }
        for (var k = 0; k < myCnt; k++) {
            if (k === 0) {
                if (polyline1 != null)
                    polyline1.setMap(map);
            } else if (k === 1) {
                if (polyline2 != null)
                    polyline2.setMap(map);
            } else if (k === 2) {
                if (polyline3 != null)
                    polyline3.setMap(map);
            } else if (k === 3) {
                if (polyline4 != null)
                    polyline4.setMap(map);
            } else if (k === 4) {
                if (polyline5 != null)
                    polyline5.setMap(map);
            }
        }
        removCnt = 0;
    }

    async function handleOnClick (e, i) {
        getRemove();
        drawPoly(i);
        console.log(ways[i]);

    };

    function buttonSelect(e, i){
        getRemove();
        console.log(position[i]);
        const startPoint = "startX=" + position[i].x + "&" + "startY=" + position[i].y;
        getData(startPoint);

    }

    return(
    <div>
        <div className={"search-wrapper"}>
            <div id={"Search_box_title"}><h3>상세경로</h3></div>
            <div id={"underBar"}/>
            <div id="ways-list-wrapper">
                <div id="ways-list">
                    {wayTime.map((data, index) => (
                        <div key={index}>
                            <div onClick={e => handleOnClick(e, index)}>
                                <h5>{index+1} . </h5>
                                {transferName[index].map((obj, index) => (
                                    <h5>  {obj.type} : {obj.laneName} &nbsp;소요시간: {obj.sectionTime}분</h5>
                                ))}
                                <h5>총소요시간 : {data}분</h5>
                                <hr/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div id={"button_list"}>
            {position.map((obj, index) => (
                <div key={index}>
                    <button onClick={e => buttonSelect(e, index)}>{obj.title}</button>

                </div>
            ))}

        </div>
    </div>
    )
}

export default Search_Box
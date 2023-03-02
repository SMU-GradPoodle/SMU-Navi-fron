import React, {useState, useEffect} from 'react';
import './Search_Box.css';
import Address from '../SearchPlaces/Address';
import folder from '../../img/접기버튼.png';
import Search from '../SearchPlaces/Search';
import axios from 'axios';
import Map from  '../Map/Map';
import qe from "styled-components";
import {render} from "react-dom";
const { kakao } = window;

const Search_Box = ({location}) => {
    const baseUrl = "http://localhost:8080/api/map/transit?";
    const [ways, setWays] = useState([]);
    const transfer = [];
    const point = [{La: "", Ma: ""}];
    const delPoint = [{La: "", Ma: ""}];
    const [linePath, setLinePath] = useState([]);
    const [map, setMap] = useState(null);
    var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
    });
    var myCnt = [];
    const testArr = [{name: "ㅇㅇ", time: 11}, {name: "ㄴㄴ", time: 22}, {name: "ㄷㄷ", time: 33}, {name: "ㄹㄹ", time: 44}];
    var before=0;


    useEffect(() => {
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567),
                level: 7 // 지도의 확대 레벨
            };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption);
        setMap(map);
        searchStart(location);

    }, []);

    async function getData(startPoint) {
        await axios
            .get(baseUrl + startPoint)
            .then((response) => {
                console.log(baseUrl + startPoint);
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
        removeCnt = 0;
    }

    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    function getRemove() {
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

            polyline = new kakao.maps.Polyline({
                path: linePath, // 선을 구성하는 좌표배열
                strokeWeight: 4, // 선의 두께
                strokeColor: getRandomColor(), // 선의 색깔
                strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                strokeStyle: 'solid' // 선의 스타일
            });

            polyline.setMap(null);
        }
    }
        var removeCnt = 0;

        function change(i) {
            before = i;
            getRemove(i);
        }

        function drawPoly(w) {
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
                /*console.log(point);
                for(var k = 0; k < linePath.length; k++) {
                    linePath[k] = new kakao.maps.LatLng(point[k].Ma, point[k].La);
                    }*/

                //list.assign({}, )

                // 지도에 표시할 선을 생성합니다
                polyline = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열
                    strokeWeight: 4, // 선의 두께
                    strokeColor: getRandomColor(), // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
                    strokeStyle: 'solid' // 선의 스타일
                });

                polyline.setMap(map);
                console.log(linePath);
            }
            myCnt.length = transfer.length;
            var delCnt = 0;
            for (var m = 0; m < transfer.length; m++) {
                for (var p = 0; p < transfer[m].gpsDetail.length; p++) {
                    delCnt += 1;
                }
                myCnt[0] = 0;
                myCnt[m + 1] = delCnt;
            }
            delPoint.length = delCnt;
            linePath.length = delCnt;

            var testJ = 0;
            for (var testI = 0; testI < transfer.length; testI++) {
                for (var testP = 0; testP < transfer[testI].gpsDetail.length; testP++) {
                    delPoint[testJ] = {
                        La: transfer[testI].gpsDetail[testP].gpsX,
                        Ma: transfer[testI].gpsDetail[testP].gpsY
                    }
                    testJ += 1;
                }
            }
            /* console.log(delCnt, testJ);
             console.log(delPoint);
             console.log(myCnt);
             console.log(linePath);
             console.log(ways);
             console.log(testArr);*/
            document.getElementsByClassName("SearchBtWrap").value = linePath;
            document.getElementById("map").value = linePath;
        }

        const handleOnClick = (e, i) => {
            getRemove()
            drawPoly(i);
            console.log(ways);
        };

        function render() {
            setWays({...ways});
        }

        function selectLoc() {
            var x = document.getElementById("folderBoxTrue").value;
            var y = document.getElementById("searchStartLocBt").value;
            const startPoint = "startX=" + x + "&" + "startY=" + y;
            searchStart(startPoint);
            console.log(ways);
        }

        function searchStart(props) {
            const loc = props;
            getData(loc);
            //getRemove();
            //document.getElementById("ways-list").style.display = 'block';

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
                                render();
                                selectLoc();
                            }}>길찾기
                            </button>
                        </div>

                    </div>
                    <img id={"folderBoxTrue"} src={folder} value={""}/>
                    <div id={"underBar"}/>


                    <div id={"map2"}></div>
                </div>

            </>
        )
    }


export default Search_Box
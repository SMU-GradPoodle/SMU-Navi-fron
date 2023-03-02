import React, { useEffect, useState } from 'react'
import './Address.css';
import Search from './Search';
import axios from 'axios';

const { kakao } = window

const Address = ({ searchPlace }, {option, changeOptin}) => {

    // 검색결과 배열에 담아줌
    const [Places, setPlaces] = useState([])

    useEffect(() => {
        const container = document.getElementById('myMap')
        const ps = new kakao.maps.services.Places()
        ps.keywordSearch(searchPlace, placesSearchCB)

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                // 페이지 목록 보여주는 displayPagination() 추가
                displayPagination(pagination)
                setPlaces(data)
            }
        }

        // 검색결과 목록 하단에 페이지 번호 표시
        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i

            // 기존에 추가된 페이지 번호 삭제
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild)
            }

            for (i = 1; i <= pagination.last; i++) {
                var el = document.createElement('a')
                el.href = '#'
                el.innerHTML = i

                if (i === pagination.current) {
                    el.className = 'on'
                } else {
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i)
                        }
                    })(i)
                }
                fragment.appendChild(el)
            }
            paginationEl.appendChild(fragment)
        }
    }, [searchPlace])

    const [countIndex, setCountIndex] = useState(0);

    var geocoder = new kakao.maps.services.Geocoder();

   const handleOnClick = (e, i) => {
        const addr = Places[i].address_name;
        console.log(addr);
        geocoder.addressSearch(addr, function(result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                var startX = coords.Ma;
                var startY = coords.La;
                document.getElementById("searchStartLocBt").value = startX;
                document.getElementById("folderBoxTrue").value = startY;
        }})
        document.getElementById("result-list").style.display = 'none';

        document.getElementById("input").value = addr;

    };
    return (
        <div id="list-wrapper">
            <div id="result-list" >
                {Places.map((item, i) => (
                    <div  key={i} >
                        <div id={"road_list_box"}  onClick={e => handleOnClick(e, i)} >
                            <h4>{i + 1}.&nbsp;&nbsp;{item.place_name}</h4>
                            {item.road_address_name ? (
                                <div >
                                    <span id={"road_address_name"}>(도로명) {item.road_address_name}</span><br/>
                                    <span>(지번주소) {item.address_name}</span>
                                </div>
                            ) : (
                                <span>(지번주소) {item.address_name}</span>
                            )}
                            {/*<span>{item.phone}</span>*/}
                        </div>

                        <hr />
                    </div>
                ))}
                <div id="pagination"></div>
            </div>
        </div>
    )
}
export default Address
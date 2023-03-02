import './Map.css';
import { React, useState } from 'react';
import MainLogo from "../MainLogo/Main_Logo";
import SearchBox from "../SearchBox/Search_Box";
const { kakao } = window;


const Map = ({location}, {linePath}) => {
    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 8 // 지도의 확대 레벨
        };

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(location, placesSearchCB);
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();

            for (var i=0; i<data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }
    }

// 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {

        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x)
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
    // var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    //     mapOption = {
    //         center: new kakao.maps.LatLng(37.6086555139,126.9265165396), // 지도의 중심좌표
    //         level: 6 // 지도의 확대 레벨
    //     };
    //
    // // 지도를 생성합니다
    // var map = new kakao.maps.Map(mapContainer, mapOption);
    //
    // // 주소-좌표 변환 객체를 생성합니다
    // var geocoder = new kakao.maps.services.Geocoder();
    //
    // // (출발지) 주소로 좌표를 검색합니다
    // geocoder.addressSearch('서울특별시 은평구 역촌동 52-25', function(result, status) {
    //
    //     // 정상적으로 검색이 완료됐으면
    //     if (status === kakao.maps.services.Status.OK) {
    //
    //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //
    //         // 결과값으로 받은 위치를 마커로 표시합니다
    //         var marker = new kakao.maps.Marker({
    //             map: map,
    //             position: coords
    //         });
    //
    //         // 인포윈도우로 장소에 대한 설명을 표시합니다
    //         var infowindow = new kakao.maps.InfoWindow({
    //             content: '<div style="width: 150px;text-align:center;padding:6px 0;">출발지</div>'
    //         });
    //         infowindow.open(map, marker);
    //     }
    // });
    //
    // var geocoder = new kakao.maps.services.Geocoder();
    //
    // // (도착지) 주소로 좌표를 검색합니다
    // geocoder.addressSearch('서울특별시 종로구 홍지문2길 20', function(result, status) {
    //
    //     // 정상적으로 검색이 완료됐으면
    //     if (status === kakao.maps.services.Status.OK) {
    //
    //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //         alert(coords);
    //         // 결과값으로 받은 위치를 마커로 표시합니다
    //         var marker = new kakao.maps.Marker({
    //             map: map,
    //             position: coords
    //         });
    //
    //         // 인포윈도우로 장소에 대한 설명을 표시합니다
    //         var infowindow = new kakao.maps.InfoWindow({
    //             content: '<div style="width: 150px;text-align:center;padding:6px 0;">도착지</div>'
    //         });
    //         infowindow.open(map, marker);
    //     }
    // });
    //
    // // 선 그리기 (일단 가상 좌표들)
    // // 선 구성 좌표 배열



    // // 지도 띄우기
    // const container = document.getElementById('map');
    // const options = {
    //     // center: new kakao.maps.LatLng(37.6023150146934, 126.9553455012552),
    //     center: new kakao.maps.LatLng(37.5987592495, 126.9149894161),
    //     level: 6
    // };
    // const map = new kakao.maps.Map(container, options);
    //
    // var markerPosition  = new kakao.maps.LatLng(37.6023150146934, 126.9553455012552);
    //
    // // 마커 생성 및 표시하기 (상명대 정문)
    // var marker = new kakao.maps.Marker({
    //     position: markerPosition
    // });
    //
    // marker.setMap(map);

}
export default Map
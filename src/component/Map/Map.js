import './Map.css';
import React from 'react';
const { kakao } = window;


export default function Map() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(37.6086555139,126.9265165396), // 지도의 중심좌표
            level: 6 // 지도의 확대 레벨
        };

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // (출발지) 주소로 좌표를 검색합니다
    geocoder.addressSearch('서울특별시 은평구 역촌동 52-25', function(result, status) {

        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {

            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width: 150px;text-align:center;padding:6px 0;">출발지</div>'
            });
            infowindow.open(map, marker);
        }
    });

    var geocoder = new kakao.maps.services.Geocoder();

    // (도착지) 주소로 좌표를 검색합니다
    geocoder.addressSearch('서울특별시 종로구 홍지문2길 20', function(result, status) {

        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {

            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            alert(coords);
            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width: 150px;text-align:center;padding:6px 0;">도착지</div>'
            });
            infowindow.open(map, marker);
        }
    });

    // 선 그리기 (일단 가상 좌표들)
    // 선 구성 좌표 배열
    var linePath = [
        new kakao.maps.LatLng(37.6060168573,126.9104597465),
        new kakao.maps.LatLng(37.6020320757,126.9102266857),
        new kakao.maps.LatLng(37.5997666658,126.9101252157),
        new kakao.maps.LatLng(37.5986006142,126.9100665956),
        new kakao.maps.LatLng(37.5987592495, 126.9149894161),
        new kakao.maps.LatLng(37.6086555139,126.9265165396),
        new kakao.maps.LatLng(37.6084619409,126.9322904306),
        new kakao.maps.LatLng(37.6103568403, 126.944843955),
        new kakao.maps.LatLng(37.6083054034,126.9564166508),
        new kakao.maps.LatLng(37.6069644475,126.9585297928),
        new kakao.maps.LatLng(37.6046629766, 126.9608880061),
        new kakao.maps.LatLng(37.604108905882, 126.955159496571)
    ];

    //선 그리기
    var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열
        strokeWeight: 4, // 선의 두께
        strokeColor: '#FF7A00', // 선의 색깔
        strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
        strokeStyle: 'solid' // 선의 스타일
    });

    polyline.setMap(map);


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

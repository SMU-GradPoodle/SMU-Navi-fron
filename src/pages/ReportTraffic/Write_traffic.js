import React from 'react';
import './ReportTraffic.css';
import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Board_list from '../../component/Board_list/Board_list';
import Catebory_btn from '../../component/Category_btn/Catebory_btn';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Write_traffic(){

    const navigate = useNavigate();
    const [trafficTitle, setTrafficTitle] = useState("");
    const [trafficContent, setTrafficContent] = useState("");

    const onTrafficTitleHandler = (event) => {
        setTrafficTitle(event.currentTarget.value);
    }
    const onTrafficContentHandler = (event) => {
        setTrafficContent(event.currentTarget.value);
    }


    const onSubmitTraffic = (event) => {
        // 버튼만 누르면 리로드 되는것을 막아줌
        event.preventDefault();

        // POST 요청으로 로그인
        axios({
            method: "post",
            url: "http://localhost:8080/api/info",
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                "title": trafficTitle,
                "content": trafficContent,
                "kind" : decidedAccident,
                "location" : decidedSubway
            },

        })
            .then((res) => {
                alert('교통 제보 완료');
                navigate('/report_traffic');
            })
            .catch((error) => {
                alert('교통 제보 실패');
            });
    }

    //사용자가 선택할 카테고리 저장
    const accidentArr = ['시위', '사고', '버스만석', '우회', '그외'];
    const subwayArr = ['광화문', '경복궁', '시청역', '지하철', '그외'];

    const [selectedAccident, setSelectedAccident] = useState('');
    const [selectedSubway, setSelectedSubway] = useState('');

    const [selectedAccidentType, setSelectedAccidentType] = useState(true);
    const [selectedSubwayType, setSelectedSubwayType] = useState(true);

    const [decidedAccident, setDecidedAccident] = useState('');
    const [decidedSubway, setDecidedSubway] = useState('');


    function onChangeType(){
        if(selectedAccident === '시위'){
            setDecidedAccident('demo');
        }
    }
    const accidentCategoryClick = idx => {
        setSelectedAccident(
            idx === 0 ? '시위' : idx === 1 ? '사고' : idx === 2 ? '버스만석' : idx === 3 ? '우회' : idx === 4 ? '그외' : '',
        );
        setDecidedAccident(
            idx === 0 ? 'demo' : idx === 1 ? 'accident' : idx === 2 ? 'bus_full' : idx === 3 ? 'bypass' : idx === 4 ? 'category_etc' : '',
        );
    }

    const subwayCategoryClick = idx => {
        setSelectedSubway(
            idx === 0 ? '광화문' : idx === 1 ? '경복궁' : idx === 2 ? '시청역' : idx === 3 ? '지하철' : idx === 4 ? '그외' : '',
        );
        setDecidedSubway(
            idx === 0 ? 'Gwanghwamun' : idx === 1 ? 'Gyeongbokgung' : idx === 2 ? 'CityHall' : idx === 3 ? 'subway' : idx === 4 ? 'location_etc' : '',
        );
    }

    return(
        <div>
            <MainLogo />
            <MenuBar />
            <div className={"Report_big_wrap"}>
                <h2>제보하기</h2>
                <div>
                    <div className={"Notice_write_title_wrap"}>
                        <input type={"text"} placeholder="제목을 입력하세요" onChange={onTrafficTitleHandler} />
                    </div>
                    <div className={"Traffic_category_wrap"}>
                        <p>종류</p>
                        {accidentArr.map((elm, index) => (
                            <Catebory_btn
                                key={index}
                                isSelected={selectedAccident === elm}
                                handleClick={accidentCategoryClick}
                                elementIndex={index}
                                content={elm}
                                backColor="#FFB800"/>
                        ))}
                    </div>
                    <div className={"Location_category_wrap"}>
                        <p>위치</p>
                        {subwayArr.map((elm, index) => (
                            <Catebory_btn
                                key={index}
                                isSelected={selectedSubway === elm}
                                handleClick={subwayCategoryClick}
                                elementIndex={index}
                                content={elm}
                                backColor="#89B8FF"/>
                        ))}
                    </div>
                    <div className={"picture_category_wrap"}>
                        <p>사진</p>
                        <Catebory_btn
                            content="등록하기"
                            backColor="#B1B1B1"/>
                    </div>
                    <div className={"content_category_wrap"}>
                        <p>내용</p>
                        <textarea type={"text"} placeholder={"허위 제보가 누락되면 강제 탈퇴당할 수 있습니다"} onChange={onTrafficContentHandler} ></textarea>
                    </div>
                </div>
                <div className={"submitTrafficBtWrap"}>
                    <button type={"button"} onClick={onSubmitTraffic}>등록하기</button>
                </div>
            </div>
        </div>
    )
}

export default Write_traffic;
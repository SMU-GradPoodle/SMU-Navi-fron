import React from 'react';
import './ReportTraffic.css';
import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Board_list from '../../component/Board_list/Board_list';
import heartLike from '../../img/heartTrue.png';
import heartHate from '../../img/heartFalse.png';
import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Detail_traffic(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState([]);

    useEffect( () => {
        axios({
            method: 'get',
            url: 'http://localhost:8093/api/info/' + id,
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => {
            setContent(res.data);
            console.log(content);
        }).catch((error) => {
            alert("글을 확인할 수 없습니다. 관리자에게 문의하세요.");
        });
    }, [])

    let date = content.regDate + '';

    return(
        <div className={"Report_big_wrap"}>
            <MainLogo />
            <MenuBar />
            <div className={"Report_title_wrap"}>
                <h2>교통 제보하기</h2>
                <p>당일 교통 제보를 제공합니다. 허위 사실 제보는 페널티를 받을 수 있습니다. 교통 제보에 동의 하시면 동의하기를, 제보 관련
                    사건이 종료되었거나 발생하지 않은 제보라면 반대하기를 눌러주세요</p>
            </div>
            <div className={"Report_wrap"}>
                <div className={"Report_wrap_title"}>
                    <h3>{content.title}</h3>
                    <div>
                        <p>작성자 : 깐따삐아</p>
                        <p>작성일 : {date.substr(0,10)}</p>
                    </div>
                </div>
                <div className={"Report_wrap_content"}>
                    <p>{content.content}</p>
                    <div className={"Report_wrap_content_heart"}>
                        <div>
                            <p>동의하기</p>
                            <img src={heartLike}/>
                            <p>{content.likes}</p>
                        </div>
                        <div>
                            <p>반대하기</p>
                            <img src={heartHate}/>
                            <p>{content.hates}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail_traffic;

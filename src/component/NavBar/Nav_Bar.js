import React from 'react';
import './Nav_Bar.css';

export default function Nav_Bar() {
    return(
        <div className={"Nav_bar_wrap"}>
            <div>시위 확인하기</div>
            <div>교통 제보하기</div>
            <div>택시 같이타기</div>
            <div>공지사항</div>
        </div>
    )
}
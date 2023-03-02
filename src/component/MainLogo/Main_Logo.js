import React from 'react';
import './Main_Logo.css';
import Logo from '../../img/SmuNaviLogo.png';

export default function Main_Logo(){
    return(
        <div className={"Main_logo_title_wrap"}>
            <div id={"MainLogo"}><img src={Logo} /></div>
            <div id={"userName"}><p>이혜린 님</p></div>
        </div>
    )
}

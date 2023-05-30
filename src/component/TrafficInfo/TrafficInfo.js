import React, {useEffect, useState} from 'react';
import MainLogo from '../../component/MainLogo/Main_Logo';
import './TrafficInfo.css';
import pngwing from '../../img/pngwing.png';

const TrafficInfo = ({traffic_data}) => {   //traffic_data = 받아 올 시위 정보
    return (
       <div>
           <div id={"traffic"}>
               <span><img id={"pngwing"} src={pngwing} /></span>
               <h4 id={"traffic_title"}>교통정보</h4>
           </div>

       </div>
    );
}
export default TrafficInfo
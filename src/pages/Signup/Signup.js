import './Signup.css';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Input from './../../component/Input/Input';
import Footer from './../../component/Footer/Footer';
import MainLogo from './../../img/SmuNaviLogo2.png';
import Button from './../../component/Button/Button';
import Modal from './../../component/Modal/Modal';
import SignupInput from './../../component/Input/SignupInput';
function Signup(){
    //페이지 이동을 위한 navigate 설정
    const navigate = useNavigate();

    //회원가입 정보 입력 후 성공할 시 띄워줄 모달창(초기값 false)
    const [modalOpen, setModalOpen] = useState(false);

    //모달창 노출 함수
    const showModal = () => {
        setModalOpen(true);
    };

    //모달 노출 시키고, 2000 후 login 페이지로 이동
    const signUpCompleteModal = () => {
        alert('clicked');
        setModalOpen(true);
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }

    // 정규식 검사
    const [password, setPassword] = React.useState("");
    const [passwordChk, setPasswordChk] = React.useState("");
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/


    return(
        <div className={"signupWrap"}>
            <img src={MainLogo} className={"signupWrapMainLogo"}/>
            <SignupInput />

            <div>
                { modalOpen == true ? <Modal content={"가입 완료되었습니다."} btName={"로그인"} url={"/login"}/> : null }
            </div>

            <Footer />
        </div>
    )
}

export default Signup;
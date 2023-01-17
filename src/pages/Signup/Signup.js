import './Signup.css';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Input from './../../component/Input/Input';
import Footer from './../../component/Footer/Footer';
import MainLogo from './../../img/SmuNaviLogo2.png';
import Button from './../../component/Button/Button';
import Modal from './../../component/Modal/Modal';

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
    return(
        <div className={"signupWrap"}>
            <img src={MainLogo} className={"signupWrapMainLogo"}/>
            <div className={"signupBox"}>
                <div className={"signupInputBoxWrap"}>
                    <p className={"signupInputName"}>닉네임</p>
                    <div className={"signupInputNameBox"}>
                        <Input type="text" id="nameSignupInput"/>
                        <Button name="중복확인" id="sameNameCheckBt"/>
                        <p id={"redNameTitle"}>이미 등록된 닉네임입니다.</p>
                    </div>
                </div>
                <div className={"signupInputBoxWrap"}>
                    <p className={"signupInputName"}>비밀번호</p>
                    <div>
                        <Input type="text" id="pwSignupInput"/>
                    </div>
                </div>
                <div className={"signupInputBoxWrap"}>
                    <p className={"signupInputName"}>비밀번호 재확인</p>
                    <div>
                        <Input type="text" id="pwSignupInput"/>
                        <p id={"redPwTitle"}>비밀번호가 일치하지 않습니다.</p>
                    </div>
                </div>
                <div className={"signupInputBoxWrap"}>
                    <p className={"signupInputName"}>학번</p>
                    <div className={"signupMailInputBox"}>
                        <Input type="text" id="mailSignupInput"/>
                        <p style={{margin: 'auto 5px auto 5px'}}>@</p>
                        <Input type="text" id="mailSignupInput"/>
                        <Button name="전송" id="sameNameCheckBt"/>
                    </div>
                </div>
                <div className={"signupInputBoxWrap"}>
                    <p className={"signupInputName"}>인증번호 입력</p>
                    <div>
                        <Input type="text" id="certifyNumInput"/>
                        <Button name="확인" id="sameNameCheckBt" onClick={signUpCompleteModal}/>
                    </div>
                    <p id={"redNumTitle"} onClick={signUpCompleteModal}>잘못된 인증번호입니다.</p>
                </div>
                <Button name="가입하기" id="signupBt" onClick={signUpCompleteModal}/>
            </div>

            <div>
                { modalOpen == true ? <Modal content={"가입 완료되었습니다."} btName={"로그인"} url={"/login"}/> : null }
            </div>

            <Footer />
        </div>
    )
}

export default Signup;
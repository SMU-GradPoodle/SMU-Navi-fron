import './Login.css';
import React from 'react';
import {Link} from 'react-router-dom';
import Input from './../../component/Input/Input';
import Footer from './../../component/Footer/Footer';
import MainLogo from './../../img/SmuNaviLogo2.png';
import Button from './../../component/Button/Button';

function Login(){
    return(
        <div className={"loginWrap"}>
            <img src={MainLogo} className={"loginWrapMainLogo"}/>
            <div className={"loginBox"}>
                <h3>LOGIN</h3>
                <div className={"inputBoxWrap"}>
                    <p>id</p>
                    <Input type="text" id="loginInput"/>
                </div>
                <div className={"inputBoxWrap"} style={{marginTop: '15px'}}>
                    <p>password</p>
                    <Input type="password" id="loginInput"/>
                </div>
                <Button name="로그인" id={"loginBt"}/>
                <div className={"memberBoxWrap"}>
                    <Link to={'/signup'} style={{textDecoration: 'none', color: 'black'}}>
                        <p>회원가입</p>
                    </Link>
                    <Link to={'/findpw'} style={{textDecoration: 'none', color: 'black'}}>
                        <p>비밀번호 찾기</p>
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Login;
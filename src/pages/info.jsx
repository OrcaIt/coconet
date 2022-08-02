import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { removeUser } from "../utils/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import style from "../css/info.module.css";
import ModifyInfo from "./compornt/user/modifyInfo";
import Department from "./compornt/user/Department";
import ChangePwd from "./compornt/user/changePwd";
import axios from "axios";
import { useEffect } from "react";

const Info = () =>
{

    const [tap, setTap] = useState(1);
    const [info, setInfo] = useState({
        email : "whitefox@kakao.com", 
        phone : "01065597556", 
        department : "개발팀",
        position : "대리",
        birthday : "2001-05-31"
        });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = useSelector((state) => { return state.user });

    const getInfo = () => {
        axios.get(`URL?user=${user.name}`)
        .then((res) => {
            setInfo(res.data);
        })
        .catch(() => {
            setInfo({
                email : "whitefox@kakao.com", 
                phone : "01065597556", 
                department : "개발팀",
                position : "대리",
                birthday : "2001-05-31"
                })
        })
    }

    useEffect(() => {
        getInfo();
    }, []);

    return(
        <>
            <header className={style.header}>
                <img src="/logo_text.png" className={style.logo} onClick={() => navigate('/main')}/>
           </header>
                <div className={style.userProfile}>
                    <div className={style.imgBox}>
                        <img className={style.userImg} src="/logo.png"/>
                        <div className={style.addImg} />
                    </div>
                    <div className={style.userBox}>
                        <p className={style.userName}>{user.name}</p>
                        <p className={style.userEmail}>{info.email}</p>
                    </div>
                </div>
            <div className = {style.bodyArea}>
                <div className ={style.aside}>
                        <nav className={style.nav}>
                            <ul className={style.menu}>
                                <li className={tap == 1 ? style.selectMenuItem : style.menuItem} onClick = {() => {setTap(1)}}>기본 정보</li>
                                <li className={tap == 2 ? style.selectMenuItem : style.menuItem} onClick = {() => {setTap(2)}}>조직 정보</li>
                                <li className={tap == 3 ? style.selectMenuItem : style.menuItem} onClick = {() => {setTap(3)}}>비밀번호 변경</li>
                            </ul>
                        </nav>
                </div>
                <main className={style.main}>
                    {
                        tap == 1 ? <ModifyInfo user = {user} info={info} /> : null
                    }
                    {
                        tap == 2 ? <Department user = {user} info={info} /> : null
                    }
                    {
                        tap == 3 ? <ChangePwd user = {user} info={info} /> : null
                    }
                </main>
           </div>
           <FontAwesomeIcon icon ={faRightFromBracket} className={style.logout} onClick={()=> {
                dispatch(removeUser());
                navigate('/');
            }}/>
        </>
    )
}

export default Info;
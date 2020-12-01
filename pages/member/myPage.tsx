import {Col, Row} from "antd";
import RocketFontLogin from "../../components/member/RocketFontLogin";
import RocketFontSignUp from "../../components/member/RocketFontSignUp";
import RocketFontLayout from "../../components/RocketFontLayout";
import {useEffect, useState} from "react";
import {PlayBackOfficeAxios} from "../../components/ajax/backofficeBackend";

const Member = function () {
    const [message, setMessage] = useState('로그아웃 중입니다.');
    useEffect(() => {
        (async () => {
        const ajax = await PlayBackOfficeAxios.get('/api/v1/member/logout')
            if(ajax.status === 200) {
                setMessage("성공적으로 로그아웃 했습니다")
            }
        })();
    },[])
    return (
        <RocketFontLayout>
            <h1>{message}</h1>
        </RocketFontLayout>
    );
}

export default Member;
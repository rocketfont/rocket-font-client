import {Col, Row} from "antd";
import {useRouter} from "next/router";
import {strict} from "assert";
import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import JsonResponse from "../../../../components/ajax/JsonResponse";
import RocketFontLayout from "../../../../components/RocketFontLayout";
import {PlayBackOfficeAxios} from "../../../../components/ajax/backofficeBackend";
import {typeCastExpression} from "@babel/types";

const Member = function () {

    const [message, setMessage] = useState('잠시만 기다려 주세요.');
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const {memberSrl, token}: { memberSrl: number, token: string } = router.query as any
            if(memberSrl === undefined || token === undefined) return;
            const ajax: AxiosResponse<JsonResponse<null>> = await PlayBackOfficeAxios.get<JsonResponse<null>>(`/api/v1/member/verifyEmail/${memberSrl}/${token}`)
            setMessage(ajax.data.message);
        })();

    },[router])

    return (
        <RocketFontLayout>
            <h1>{message}</h1>
        </RocketFontLayout>
    );
}

export default Member;
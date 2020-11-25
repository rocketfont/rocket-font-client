import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, notification, Row} from "antd";
import RocketFontLayout from "../../components/RocketFontLayout";
import {PlayBackOfficeAxios} from "../../components/ajax/backofficeBackend";
import {AxiosResponse} from "axios";
import {useRouter} from "next/router";
import is403GoToLogin from "../../components/ajax/is403GoToLogin";
import JsonResponse from "../../components/ajax/JsonResponse";

interface CardResponse {
    creditCardSrl: number,
    cardNickname: string,
}

const Card = () => {

    const router = useRouter();

    const [registeredCardNickname, setRegisteredCardNickname] = useState('');
    const [registeredCardSrl, setRegisteredCardSrl]  = useState(-1);

    const [creditCardForm] = Form.useForm();

    const [regiterCardViewrForceUpdate, setRegiterCardViewrForceUpdate] = useState({})
    useEffect(() => {
        (async () => {
            const ajax = await PlayBackOfficeAxios.get<JsonResponse<CardResponse[]>>('/api/v1/billing/card')
            if (is403GoToLogin(ajax, router)) return;
            const data = ajax.data.data
            if(data.length > 0){
                setRegisteredCardNickname(ajax.data.data[0].cardNickname);
                setRegisteredCardSrl(ajax.data.data[0].creditCardSrl);
            }
        })();
    }, [regiterCardViewrForceUpdate])

    const onFormComplete = async ({cardNickname, cardNumber, cardExpiry, birthday6, cardPassword2}: any) => {
        const ajax = await PlayBackOfficeAxios.post<JsonResponse<any>>("/api/v1/billing/card", {
            cardNickname,
            cardNumber,
            cardExpiry,
            birthday6,
            cardPassword2
        });
        if (is403GoToLogin(ajax, router)) return;
        if(ajax.status === 201){
            notification.open({
                message : '카드 등록 성공',
                description  : '카드 등록이 성공했습니다.'
            })
            setRegiterCardViewrForceUpdate({});
            creditCardForm.resetFields();
        }
        else if(ajax.status === 400){
            notification.open({
                message : '카드 등록 실패',
                description  : `카드 등록이 실패했습니다. 사유 : ${ajax.data.message}`
            })
        }
    }

    const onDeleteFormComplete = async () => {
        const ajax = await PlayBackOfficeAxios.delete("/api/v1/billing/card", {
            data : {
                creditCardSrl : registeredCardSrl
            }
        });
        if (is403GoToLogin(ajax, router)) return;
    }

    const cardNoLayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 17}
    }
    const cardExtraLayout = {
        labelCol: {span: 14},
        wrapperCol: {span: 10},
    }

    return (
        <RocketFontLayout>
            <div style={{width: '450px'}}>
                <Form labelAlign="left" onFinish={onDeleteFormComplete}>
                    <Form.Item name="cardNickNameForDelete" label="등록된 카드 닉네임" {...cardNoLayout}>
                        <Input  readOnly value={registeredCardNickname} />
                        <></>
                    </Form.Item>
                    <Form.Item name="registeredCardSrl"  hidden>
                        <Input type="hidden"  name="registeredCardSrl" value={registeredCardSrl}/>
                        <></>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">삭제하기</Button>
                </Form>
                <hr/>
                <Form form={creditCardForm} labelAlign="left" onFinish={onFormComplete}>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="cardNickname" label="카드 닉네임" {...cardNoLayout}>
                                <Input maxLength={12}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="cardNumber" label="카드번호" {...cardNoLayout}>
                                <Input maxLength={16}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{display: 'flex'}} gutter={10}>
                        <Col span="12">
                            <Form.Item name="cardExpiry" label="유효기간(YYYYMM)" {...cardExtraLayout} >
                                <Input maxLength={6}/>
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item name="birthday6" label="생년월일(YYMMDD)" {...cardExtraLayout}>
                                <Input type="password" maxLength={6}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item name="cardPassword2" label="비밀번호 앞 2자리"  {...cardExtraLayout}>
                                <Input type="password" maxLength={2}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit">신용카드 등록/업데이트 하기</Button>
                    <p>카드 정보는 서버에 저장 되지 않으며, PG사를 통화 토큰화 되어 저장되어 관리자도 알 수 없습니다.</p>
                </Form>
            </div>
        </RocketFontLayout>)
}

export default Card
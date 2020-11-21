import React, {useEffect} from "react";
import {Button, Col, Form, Input, Row} from "antd";
import RocketFontLayout from "../../components/RocketFontLayout";
import {PlayBackOfficeAxios} from "../../components/ajax/backofficeBackend";

const Card = () => {

    const onFormComplete = ({cardNumber, cardExpiry, birthday8, cardPassword2}: any) => {
        PlayBackOfficeAxios.post("/api/v1/billing/card", {
            cardNumber,
            cardExpiry,
            birthday8,
            cardPassword2
        });
    }

    const cardNoLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 20}
    }
    const cardExtraLayout = {
        labelCol: {span: 14},
        wrapperCol: {span: 10},
    }

    return (
        <RocketFontLayout>
            <div style={{width: '450px'}}>
                {/*<script src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script>*/}
                {/*<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>*/}
                <Form labelAlign="left" onFinish={onFormComplete}>
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
                            <Form.Item name="birthday8" label="생년월일(6자리)" {...cardExtraLayout}>
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
                </Form>
            </div>
        </RocketFontLayout>)
}

export default Card
import RocketFontLayout from "../RocketFontLayout";
import {Button, Checkbox, Col, Form, Input, notification, Row} from 'antd';
import {PlayBackOfficeAxios} from "../ajax/backofficeBackend";
import {useRouter} from "next/router";
import JsonResponse from "../ajax/JsonResponse";
import Link from "next/link";


interface LoginFormParam  {
    email: string,
    password: string,
}

interface LoginResponse {
    memberSrl : number
}
const RocketFontLogin = function () {
    const router = useRouter();

    // const [memberSrl, setMemberSrl] = useSessionStorageStateNotNull('memberSrl', '');
    // if(!Number.isInteger(Number.isInteger(sessionStorage.getItem('memberSrl')))){
    //     notification.open({
    //         message: '이미 로그인',
    //         description:
    //             '이미 로그인 되어 있습니다.',
    //     });
    // }
    //


    const onLoginFormFinish = async function ({email, password} : LoginFormParam){
        const ajax = await PlayBackOfficeAxios.post<JsonResponse<LoginResponse>>('/api/v1/member/login',
            {
                email,
                password
            }
        )
        if(ajax.status === 200){
            sessionStorage.setItem('memberSrl',ajax.data.data.memberSrl.toString());
            notification.open({
                message: '로그인 성공',
                description:
                    '로그인을 성공하였습니다.',
            });
            router.push('/fonts')
        }
        else{
            notification.open({
                message: '로그인 실패',
                description:
                    `로그인 실패하였습니다. ${ajax.data.message}`,
            });
        }
    }

    const layout = {
        labelCol: {span: 4},
        wrapperCol: {
            span: 24,
        },
        labelAlign: 'left' as const
    };

    const tailLayout = {
        wrapperCol: {offset: 4, span: 24}
    }

    return (
            <Form name="login" {...layout} style={{width:'100%'}}
                  onFinish={onLoginFormFinish}
            >
                <Form.Item label="e-mail"
                           name="email"
                           rules={[{required: true, message: '이메일을 입력해주세요.'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item label="password"
                           name="password"
                           rules={[{required: true, message: '비밀번호를 입력해주세요'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item label="Help">
                        <Link href="/member/findPassword">비밀번호를 분실하셨나요?</Link>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
    )


}

export default RocketFontLogin;
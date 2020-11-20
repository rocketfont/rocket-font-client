import RocketFontLayout from "../RocketFontLayout";
import {Button, Checkbox, Form, Input, notification} from 'antd';
import {PlayBackOfficeAxios} from "../ajax/backofficeBackend";
import {AxiosError} from "axios";
import {useRouter} from "next/router";
import JsonResponse from "../ajax/JsonResponse";


interface SignUpFormParam  {
    email: string,
    password: string,
}

const RocketFontSignUp = function () {
    // const [form] = Form.useForm();

    const layout = {
        labelCol: {span: 5},
        wrapperCol: {
            span: 24,
        },
        labelAlign: 'left' as const
    };


    const tailLayout = {
        wrapperCol: {offset: 5, span: 24}
    }
    const router = useRouter();

    const onLoginFormFinish = async function ({email, password}: SignUpFormParam) {
        const ajax = await PlayBackOfficeAxios.post<JsonResponse<null>>('/api/v1/member/signUp',
            {
                email,
                password
            }
        )
        if (ajax.status === 201) {
            notification.open({
                message: '회원가입 성공',
                description:
                    '회원가입에 성공하였습니다.',
            });
            router.push('/member/login')
        } else {
            notification.open({
                message: '회원가입 실패',
                description:
                    `회원가입에 실패 했습니다. 실패 사유 : ${ajax.data.message}`,
            });
        }
    }

    return (
        <Form name="login-form"
            // form={form}
              onFinish={onLoginFormFinish}
              {...layout}
              style={{
                  width: '100%'
              }}
        >
            <Form.Item label="e-mail"
                       name="email"
                       rules={[{required: true, message: '이메일을 입력해주세요.'}]}
            >
                <Input type="email"/>
            </Form.Item>
            <Form.Item label="password"
                       name="password"
                       rules={[{required: true, message: '비밀번호를 입력해주세요'}]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item label="password 재입력"
                       name="password2"
                       rules={[{required: true, message: '비밀번호를 입력해주세요'},
                           (form) => ({
                               validator(rule, value) {
                                   if (value !== form.getFieldValue('password')) {
                                       return Promise.reject("비밀번호 가 서로 상이합니다.")
                                   }
                                   return Promise.resolve();
                               }
                           }),
                       ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="terms"
                valuePropName="checked"
                {...tailLayout}
                rules={[
                    {
                        validator: (rule, value) => {
                            if (!value) {
                                return Promise.reject('약관에 동의하셔야 합니다.')
                            }
                            return Promise.resolve();
                        }
                    }
                ]}>
                <Checkbox>
                    <a target="_blank" href="/docs/terms">약관</a>에 동의합니다.
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout} >
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                    회원가입 하기
                </Button>
            </Form.Item>
        </Form>
    )


}

export default RocketFontSignUp;
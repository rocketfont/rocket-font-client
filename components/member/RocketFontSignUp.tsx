import RocketFontLayout from "../RocketFontLayout";
import {Button, Checkbox, Form, Input} from 'antd';
import backOfficeAxios from "../ajax/backofficeBackend";


type SignUpFormParam = {
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

    const onLoginFormFinish = function ({email, password} : SignUpFormParam) {
        backOfficeAxios.post('/api/v1/member',
            {
                data: {
                    email,
                    password
                }
            }
        )

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
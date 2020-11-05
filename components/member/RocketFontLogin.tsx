import RocketFontLayout from "../RocketFontLayout";
import {Button, Form, Input} from 'antd';

const RocketFontLogin = function () {

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
            <Form name="login" {...layout} style={{width:'100%'}} >
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
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
    )


}

export default RocketFontLogin;
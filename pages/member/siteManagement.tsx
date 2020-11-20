import RocketFontLayout from "../../components/RocketFontLayout";
import {Button, Form, Input, notification} from "antd";
import {Rule} from "rc-field-form/es/interface";
import {PlayBackOfficeAxios} from "../../components/ajax/backofficeBackend";
import JsonResponse from "../../components/ajax/JsonResponse";

const siteManagement = function () {
    const onFinishEvent = async (values: any) => {
        const hosts = values.hosts
        const ajax = await PlayBackOfficeAxios.post('/api/v1/member/site', {
            hostsText: hosts
        });
        if(ajax.status === 201){
            notification.open({
                description :'hostname을 성공적으로 등록했습니다.',
                message : 'hostname 등록 성공'
            })
        }
    };


    const checkValidHosts = (values: string) => {
        const hosts = values.trim().split('\n').map(t => t.trim())
        const hostRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
        return hosts.map(a => [hostRegex.test(a), a])
            .filter(t => t[0] === false)
    }


    const rules: Rule[] = [
        {
            required: true,
            message: '도메인을 입력해 주세요.',
        },
        () => ({
            validator(rule, value) {
                const errorHosts = checkValidHosts(value);
                if (errorHosts.length === 0) {
                    return Promise.resolve()
                } else {
                    return Promise.reject(`올바른 도메인을 입력해 주세요. 에러 : ${errorHosts.map(t => t[1]).join(',')}`)
                }
            }
        })
    ]


    return (<RocketFontLayout>
        <>
            <Form onFinish={onFinishEvent}>
                <Form.Item
                    name="hosts"
                    label="추가할 hosts"
                    rules={rules}>
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        도메인 입력하기
                    </Button>
                </Form.Item>
            </Form>
            <Form>

            </Form>
        </>
    </RocketFontLayout>);
}

export default siteManagement;
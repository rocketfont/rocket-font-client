import RocketFontLayout from "../../components/RocketFontLayout";
import {Button, Form, Input, notification, Space, Table} from "antd";
import {Rule} from "rc-field-form/es/interface";
import {PlayBackOfficeAxios} from "../../components/ajax/backofficeBackend";
import JsonResponse from "../../components/ajax/JsonResponse";
import {MouseEventHandler, useEffect, useState} from "react";
import {useRouter} from "next/router";
const Column  = Table.Column;

interface HostnameResponse{
    registeredHostSrl : number,
    hostname : string,
    created : string,
}
interface HostnameRow extends HostnameResponse{
    key :number
}
const hostnameManagement = function () {
    const onFinishEvent = async (values: any) => {
        const hosts = values.hosts
        const ajax = await PlayBackOfficeAxios.post('/api/v1/member/hostname', {
            hostsText: hosts
        });
        if(ajax.status === 201){
            notification.open({
                description :'hostname을 성공적으로 등록했습니다.',
                message : 'hostname 등록 성공'
            })
            setRerenderBate({});
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

    const router = useRouter();
    const [hostInsertForm] = Form.useForm();
    const [tableData, setTableData] = useState([] as HostnameRow[]);
    const [rerenderBate, setRerenderBate] = useState({});
    useEffect(() => {
        (async () =>{
            const ajax = await PlayBackOfficeAxios.get<JsonResponse<HostnameResponse[]>>('/api/v1/member/hostname')
            if(ajax.status === 403){
                router.push('/member/login')
            }
            else if(ajax.status === 200){
                const tableData = ajax.data.data.map(t => {
                    const newObj : HostnameRow = {...t,
                        key : t.registeredHostSrl
                    }
                    newObj.created = newObj.created.replaceAll('T', '')
                    return newObj
                })
                setTableData(tableData);
            }
        })();
    },[rerenderBate])


    const clickToDeleteHostname = async (e : React.MouseEvent<HTMLAnchorElement>, registeredHostSrl : number ) => {
        const ajax = await PlayBackOfficeAxios.request({
            url: '/api/v1/member/hostname',
            method: 'delete',
            data : {
                registeredHostSrl
            }
        });
        if(ajax.status === 200){
            notification.open({
                message:'삭제성공',
                description : '해당 호스트네임 삭제에 성공했습니다.'
            })
            setRerenderBate({});
            hostInsertForm.resetFields();
        }
    }


    return (<RocketFontLayout>
        <>
            <Table dataSource={tableData}>
                <Column title="hostname" dataIndex="hostname"/>
                <Column title="등록일" dataIndex="created"/>
                <Column
                    title="삭제"
                    key="delete"
                    render={(text, record : any) => (
                        <Space size="middle">
                            <a onClick={(e) => clickToDeleteHostname(e, record.registeredHostSrl)}>Delete</a>
                        </Space>
                    )}
                />
            </Table>
            <Form onFinish={onFinishEvent} form={hostInsertForm}>
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
        </>
    </RocketFontLayout>);
}

export default hostnameManagement;
import RocketFontLayout from "../../components/RocketFontLayout";
import {Button, Form, Input, notification, Space, Table} from "antd";
import {Rule} from "rc-field-form/es/interface";
import {PlayBackOfficeAxios} from "../../components/ajax/backofficeBackend";
import JsonResponse from "../../components/ajax/JsonResponse";
import {MouseEventHandler, useEffect, useState} from "react";
import {useRouter} from "next/router";
import * as React from "react";

const Column = Table.Column;

interface HostnameResponse {
    registeredHostSrl: number,
    hostname: string,
    created: string,
}

interface HostnameTableRow extends HostnameResponse {
    key: number,
}

interface HostnameResponsePending {
    pendingHostnameSrl: number,
    hostname: string,
    dnsTXTRecord: string,
    expires: string,
}

interface HostnameResponsePendingTableRow extends HostnameResponsePending {
    key: number,
}

const hostnameManagement = function () {
    const onFinishEvent = async (values: any) => {
        const hosts = values.hosts
        const ajax = await PlayBackOfficeAxios.post('/api/v1/member/pendingHostname', {
            hostsText: hosts
        });
        if (ajax.status === 201) {
            notification.open({
                description: 'hostname을 성공적으로 등록했습니다.',
                message: 'hostname 등록 성공'
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
    const [hostnameTableData, setHostnameTableData] = useState([] as HostnameTableRow[]);
    const [pendingHostnameTableData, setPendingHostnameTableData] = useState([] as HostnameResponsePendingTableRow[]);
    const [rerenderBate, setRerenderBate] = useState({});


    useEffect(() => {
        (async () => {
            const pendingHostNameAjaxPromise = PlayBackOfficeAxios.get<JsonResponse<HostnameResponsePending[]>>('/api/v1/member/pendingHostname')
            const hostsAjaxPromise = PlayBackOfficeAxios.get<JsonResponse<HostnameResponse[]>>('/api/v1/member/hostname')
            const pendingHostnameAjax = await pendingHostNameAjaxPromise
            const hostsAjax = await hostsAjaxPromise

            if (hostsAjax.status === 403) {
                router.push('/member/login')
            } else if (hostsAjax.status === 200) {
                const tableData: HostnameTableRow[] = hostsAjax.data.data.map(row => {
                    const newObj: HostnameTableRow = {
                        ...row,
                        key: row.registeredHostSrl
                    }
                    newObj.created = newObj.created.replaceAll('T', ' ')
                    return newObj
                })
                setHostnameTableData(tableData);
            }


            if (pendingHostnameAjax.status === 200) {
                const hostnameResponsePendingTableRow: HostnameResponsePendingTableRow[] = pendingHostnameAjax.data.data.map(row => {
                    const newObj: HostnameResponsePendingTableRow = {
                        ...row,
                        key: row.pendingHostnameSrl,
                    };
                    newObj.expires = newObj.expires.replaceAll('T', ' ')
                    return newObj
                })
                setPendingHostnameTableData(hostnameResponsePendingTableRow);
            }
        })();
    }, [rerenderBate])


    const clickToDeleteHostname = async (e: React.MouseEvent<HTMLAnchorElement>, registeredHostSrl: number) => {
        const ajax = await PlayBackOfficeAxios.request({
            url: '/api/v1/member/hostname',
            method: 'delete',
            data: {
                registeredHostSrl
            }
        });
        if (ajax.status === 200) {
            notification.open({
                message: '삭제성공',
                description: '해당 호스트네임 삭제에 성공했습니다.'
            })
            setRerenderBate({});
            hostInsertForm.resetFields();
        }
    }

    const verifyPendingHostname = async (e: React.MouseEvent<HTMLAnchorElement>, pendingHostnameSrl: number) => {
        const ajax = await PlayBackOfficeAxios.put<JsonResponse<any>>(`/api/v1/member/hostname/${pendingHostnameSrl}`)
            if(ajax.status === 201){
                notification.open({
                    message: '인증성공',
                    description: '호스트네임 인증에 성공하였습니다.'
                })
            }
            else{
                notification.open({
                    message: '인증실패',
                    description: `호스트네임 인증에 실패하였습니다. 상세 사유 : ${ajax.data.message}`
                })
            }
        setRerenderBate({});

    }
    const deletePendingHostname = async (e: React.MouseEvent<HTMLAnchorElement>, pendingHostnameSrl: number) => {
        const ajax = await PlayBackOfficeAxios.delete(`/api/v1/member/pendingHostname/${pendingHostnameSrl}`)
        if(ajax.status === 200){
            notification.open({
                message: '삭제 성공',
                description: '호스트네임 삭제에 성공하였습니다.'
            })
        }
        setRerenderBate({});
    }


    const displayCSS: React.CSSProperties = {}
    if (pendingHostnameTableData.length === 0) {
        displayCSS.display = 'none';
    }

    return (<RocketFontLayout>
        <>
            <Table dataSource={pendingHostnameTableData} style={displayCSS}>
                <Column title="hostname" dataIndex="hostname"/>
                <Column title="DNS TXT record" dataIndex="dnsTXTRecord"/>
                <Column title="인증 만료일" dataIndex="expires"/>
                <Column
                    title="액션"
                    key="액션"
                    render={(text, record: any) => (
                        <Space size="middle">
                            <a onClick={(e) => verifyPendingHostname(e, record.pendingHostnameSrl)}>Verify</a>
                            <a onClick={(e) => deletePendingHostname(e, record.pendingHostnameSrl)}>Delete</a>
                        </Space>
                    )}
                />
            </Table>
            <Table dataSource={hostnameTableData}>
                <Column title="hostname" dataIndex="hostname"/>
                <Column title="등록일" dataIndex="created"/>
                <Column
                    title="삭제"
                    key="delete"
                    render={(text, record: any) => (
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
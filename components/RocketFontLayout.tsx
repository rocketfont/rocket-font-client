import {Breadcrumb, Layout, Menu} from "antd";
import React, {useState} from "react";
import Link from "next/link";

const {Sider, Content, Header, Footer} = Layout;
const {SubMenu} = Menu;
import {useRouter} from 'next/router'
import Head from "next/head";


type LayoutContent = {
    children: JSX.Element
}

const RocketFontLayout = function ({children}: LayoutContent) {
    const router = useRouter();

    const urlPath = router.pathname;
    const [memberSrl, setMemberSrl] = useState(-1);

    return (
        <>
            <Head>
                <title>Rocket Font</title>
            </Head>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible>
                    <div className="logo">
                        <Link href="/fonts">
                            <h1 style={{color: 'white', margin: '16px',}}>
                                <a>Rocket Font</a>
                            </h1>
                        </Link>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={[urlPath]} mode="inline" defaultOpenKeys={['/member']}>
                        <Menu.Item key="/fonts">
                            <Link href="/fonts">
                                폰트 보기
                            </Link>
                        </Menu.Item>
                        <SubMenu key="/member" title="마이페이지">
                            <Menu.Item key="/member/login">
                                <Link href="/member/login">
                                    로그인
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/member/signUp">
                                <Link href="/member/signUp">
                                    회원가입
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/member/logout">
                                <Link href="/member/logout">
                                    로그아웃
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/member/hostnameManagement">
                                <Link href="/member/hostnameManagement">
                                    호스트 네임 관리하기
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title="결제/정산">
                            <Menu.Item key="/billing/card">
                                <Link href="/billing/card">
                                    신용카드 등록하기
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="6">사용료 결제하기</Menu.Item>
                            <Menu.Item key="/billing/monthlyBill">
                                <Link href="/billing/monthlyBill">
                                    매월 사용료 확인하기
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*    <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                        {/*</Breadcrumb>*/}
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}/>
                </Layout>
            </Layout>
        </>
    );

//
//     return (
//         <Layout style={{minHeight: '100vh'}}>
//             <Sider collapsible>
//                 <div className="logo"/>
//                 <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
//                     <Menu.Item key="1">
//                         Option 1
//                     </Menu.Item>
//                     <Menu.Item key="2">
//                         Option 2
//                     </Menu.Item>
//                     <SubMenu key="sub1" title="User">
//                         <Menu.Item key="3">Tom</Menu.Item>
//                         <Menu.Item key="4">Bill</Menu.Item>
//                         <Menu.Item key="5">Alex</Menu.Item>
//                     </SubMenu>
//                     <SubMenu key="sub2" title="Team">
//                         <Menu.Item key="6">Team 1</Menu.Item>
//                         <Menu.Item key="8">Team 2</Menu.Item>
//                     </SubMenu>
//                     <Menu.Item key="9">
//                         Files
//                     </Menu.Item>
//                 </Menu>
//             </Sider>
//             {/*<Header className="header">*/}
//             {/*    <div className="logo">*/}
//             {/*    </div>*/}
//             {/*    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>*/}
//             {/*        <Menu.Item key="1"><Link href="/fonts">폰트 보기</Link> </Menu.Item>*/}
//             {/*        <Menu.Item key="2"><Link href="/member">로그인/마이페이지</Link></Menu.Item>*/}
//             {/*    </Menu>*/}
//             {/*</Header>*/}
//         </Layout>
//     <Layout className="site-layout">
//         <Header className="site-layout-background" style={{padding: 0}}/>
//         <Content style={{margin: '0 16px'}}>
//             <Breadcrumb style={{margin: '16px 0'}}>
//                 <Breadcrumb.Item>User</Breadcrumb.Item>
//                 <Breadcrumb.Item>Bill</Breadcrumb.Item>
//             </Breadcrumb>
//             <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
//                 Bill is a cat.
//             </div>
//         </Content>
//         <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
//     </Layout>
// </Layout>
}

export default RocketFontLayout;

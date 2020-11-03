import {Breadcrumb, Layout, Menu} from "antd";
import React from "react";
import Link from "next/link";

const {Sider, Content, Header, Footer} = Layout;
const {SubMenu} = Menu;


interface LayoutContent {
    children: JSX.Element
}

const RocketFontLayout = function ({children}: LayoutContent) {

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible>
                <div className="logo">
                    <h1 style={{color:'white', margin : '16px',}}>Rocket Font</h1>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link href="/fonts">
                            폰트 보기
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title="마이페이지">
                        <Menu.Item key="3">
                            <Link href="/member/login">
                                로그인
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link href="/member/signUp">
                                회원가입
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        Files
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}>
                </Header>
                <Content style={{margin: '0 16px'}}>
                    {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                        {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        {children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
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

import Head from 'next/head'
import Link from 'next/link'
import {siteTitle} from "../components/layout";
import React from "react";
import {useRouter} from "next/router";
import {PlayBackOfficeAxios} from "../components/ajax/backofficeBackend";
import isLogged from "../components/member/getMemberSrlFromServer";
import getMemberSrlFromServer from "../components/member/getMemberSrlFromServer";
//
//
// const Home = function () {
//     return (
//         // <Layout home>
//         <>
//             <Head>
//                 <title>{siteTitle}</title>
//             </Head>
//             <Link href="/fonts"> View Fonts</Link>
//             <h1>dddffdfdfdf</h1>
//         </>
//     );
// }
//

export default  function WebRoot() {

    return (<></>);
}


import 'antd/dist/antd.css';
import getMemberSrlFromServer from "../components/member/getMemberSrlFromServer";
import {useRouter} from "next/router";
import Head from "next/head";
// @ts-ignore

function MyApp({ Component, pageProps }) {


    // const router = useRouter();
    // if(process.browser) {
    //     getMemberSrlFromServer()
    //         .then(t => {
    //             if (t === null) {
    //                 if (!router.pathname.startsWith('/member')) {
    //                     router.push('/member/login')
    //                 }
    //             }
    //         })
    // }

    return (<Component {...pageProps} >

    </Component>);
}
export default MyApp

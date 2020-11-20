import axios, {AxiosResponse} from 'axios';
import SiteConfig from "../config/SiteConfig";
import {notification} from "antd";
import {useRouter, withRouter} from "next/router";

const PlayBackOfficeAxios = axios.create({
        baseURL: SiteConfig.playApiBackend,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials : true,
        validateStatus: (status) => status >= 200 && status < 500,
    }
);


export {PlayBackOfficeAxios};
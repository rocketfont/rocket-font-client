import {AxiosResponse} from "axios";
import {NextRouter, useRouter} from "next/router";

export default function is403GoToLogin<T>(response : AxiosResponse<T>, router : NextRouter){
    const is403 = response.status === 403;
    if(is403){
        router.push('/member/login');
    }
    return is403;
}
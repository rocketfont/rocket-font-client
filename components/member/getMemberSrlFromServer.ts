import {PlayBackOfficeAxios} from "../ajax/backofficeBackend";
import JsonResponse from "../ajax/JsonResponse";

interface IIsLogged {
    memberSrl : number
}
const getMemberSrlFromServer =  async function () {
    const isLoggedAjax = await PlayBackOfficeAxios.get<JsonResponse<IIsLogged>>('/api/v1/member/isLogged')
    if (isLoggedAjax.data.data.memberSrl === null) {
        return null;
    }
    else {
        return isLoggedAjax.data.data.memberSrl;
    }
}

export default getMemberSrlFromServer
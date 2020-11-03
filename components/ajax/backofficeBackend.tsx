import axios from 'axios';

const backOfficeAxios = axios.create({
        baseURL: 'https://backoffice.rocketfont.net',
        headers: {
            'content-type': 'application/json'
        }
    }
);

export default backOfficeAxios;
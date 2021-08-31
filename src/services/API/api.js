import axios from 'axios'

const instance = axios.create({
    baseURL: "https://proxyapp.correios.com.br/v1/sro-rastro/"
});

export default instance;
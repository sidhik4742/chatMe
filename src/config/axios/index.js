import Axios, {AxiosInstance} from 'axios';

const instance = Axios.create({
  baseURL: 'http://192.168.31.136:3000/',
  timeout: 5000,
});

export default instance;

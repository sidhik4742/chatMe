import Axios, {AxiosInstance} from 'axios';

const instance = Axios.create({
  baseURL: 'https://chatme-server.herokuapp.com',
  timeout: 5000,
});

export default instance;

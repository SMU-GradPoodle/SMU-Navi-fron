import axios from 'axios';
const API_URL = "http://localhost:8080//api/map/transit?";

class ApiService {
    fetchInfo() {
        return axios.get(API_URL + 'startX=126.971171&startY=37.540597');
    }
}

export default new ApiService();

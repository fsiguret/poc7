import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = "http://localhost:3000/api/auth/";

class AuthService {

    login(user) {
        return axios
            .post(API_URL + "login", {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if(response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response;

            })
            .catch(error => {
                return error.response.data;
            });
    }

    signup(user) {
        return axios
            .post(API_URL + "signup", {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            })
            .then(res => {
                return res;
            })
            .catch(error => {
                return error.response.data;
            });
    }

    getUser(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }

    deleteUser(data) {
        return axios({
            method: "DELETE",
            url: API_URL + "delete",
            headers: authHeader(),
            data: data
        });
    }

    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();

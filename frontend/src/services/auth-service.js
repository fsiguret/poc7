import axios from "axios";

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

    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();

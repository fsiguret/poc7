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
                return response.data;
            })
            .catch(() => {
                return "Veuillez rentrer un compte valide ou vous inscrire.";
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
            .then(() => {
                return "L'utilisateur a bien été créé.";
            })
            .catch(() => {
                return "L'utilisateur n'a pas pu être enregistré ou existe déjà.";
            });
    }

    logOut() {
        localStorage.removeItem('user');
        return this.$router.push(API_URL + "login");
    }
}

export default new AuthService();

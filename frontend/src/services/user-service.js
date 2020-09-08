import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = "http://localhost:3000/api/articles/";

class UserService {
    getAllArticles() {
        return axios.get(API_URL, { headers : authHeader() });
    }

    getOneArticle(id) {
        return axios.get(API_URL + id, { headers : authHeader() });
    }

    getComment(id) {
        return axios.get(API_URL + id + "/comment", { headers : authHeader() });
    }

    postArticle(data) {
        return axios.post(API_URL, { headers : authHeader(), data });
    }

    postComment(id, data) {
        return axios.post(API_URL + id + "/comment", { headers : authHeader(), data });
    }

    putLikeOrDislike(id, data) {
        return axios.put(API_URL + id + "/like", { headers : authHeader(), data});
    }

    putArticle(id, data) {
        return axios.put(API_URL + id, { headers : authHeader(), data });
    }

    deleteArticle(id) {
        return axios.delete(API_URL + id, { headers : authHeader() });
    }

    deleteComment(id) {
        return axios.delete(API_URL + id + "/delcom", { headers : authHeader() });
    }
}

export default new UserService();

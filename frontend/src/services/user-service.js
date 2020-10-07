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

    getOneComment(id) {
        return axios.get(API_URL + "comment/" + id, { headers: authHeader() });
    }

    getAllLikes() {
        return axios.get(API_URL + 'articlesLiked', { headers: authHeader() });
    }

    postArticle(data) {
        return axios({
            method: "POST",
            url: API_URL,
            headers: authHeader(),
            data: data
        });
    }

    postComment(id, data) {
        return axios({
            method: "POST",
            url: API_URL + id + "/comment",
            headers: authHeader(),
            data: data
        });
    }

    putLikeOrDislike(id, data) {
        return axios({
            method: 'PUT',
            url: API_URL + id + "/like",
            headers: authHeader(),
            data: data
        });
    }

    putArticle(id, data) {
        return axios({
            method: 'PUT',
            url: API_URL + id,
            headers : authHeader(),
            data: data
        });
    }

    putCommentary(id, data) {
        return axios({
           method: 'PUT',
           url: API_URL + "comment/" + id,
           headers: authHeader(),
           data: data
        });
    }

    deleteArticle(id, user) {
        return axios({
            method: 'DELETE',
            url: API_URL + id,
            headers: authHeader(),
            data: { userId: user}
        });
    }

    deleteComment(id, user) {
        return axios({
            method: 'DELETE',
            url: API_URL + id + "/delcom",
            headers: authHeader(),
            data: { userId: user }
        })
    }
}

export default new UserService();

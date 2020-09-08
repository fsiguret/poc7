export default class Article {
    constructor(id, userId, titleArticle, content, createAt, imageUrl, likes, dislikes) {
        this.id = id;
        this.userId = userId;
        this.titleArticle = titleArticle;
        this.content = content;
        this.createAt = createAt;
        this.imageUrl = imageUrl;
        this.likes = likes;
        this.dislikes = dislikes;
    }
}

export default class Commentary {
    constructor(id, userId, articleId, createAt, com) {
        this.id = id;
        this.userId = userId;
        this.articleId = articleId;
        this.createAt = createAt;
        this.com = com;
    }
}

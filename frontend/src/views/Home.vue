<template>
  <section v-if="!showDetail" class="home">
    <h1>Derniers Articles</h1>
    <div v-if="articles.length === 0">
      <p>Il n'y a pas d'articles pour le moment !</p>
    </div>
    <ListArticle v-else v-for="article in articlesSorted.slice().reverse()" :key="article.id" v-bind:article="article" v-bind:isLike="isLike" v-bind:articlesLiked="articlesLiked" @showingDetail="detailArticle(article.id)"/>
    <AddArticle/>
  </section>
  <section v-else-if="showDetail">
    <h1>{{article.titleArticle}}</h1>
    <DetailArticle v-bind:article="article" v-bind:isLike="isLike"/>
  </section>
</template>
<script>
import ListArticle from "@/components/ListArticle";
import UserService from "@/services/user-service";
import Article from "@/models/Article";
import AddArticle from "@/components/AddArticle";
import DetailArticle from "@/components/DetailArticle";

export  default  {
  name: "Home",
  components: {
    ListArticle,
    AddArticle,
    DetailArticle
  },
  data() {
    return {
      showDetail: false,
      articles: [],
      articlesSorted: [],
      article: '',
      commentary: [],
      articlesLiked: [],
      isLike: ''
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem('user'));

    UserService.getAllLikes()
        .then(response => {
          response.data.results.forEach(article => {
            if(article.idUser === user.userId) {
              this.articlesLiked.push({
                userId: article.idUser,
                articleId: article.idArticle,
                isLike: article.isLike
              });
            }
          });
        })
        .catch(error => {
          this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        });

    UserService.getAllArticles()
        .then(response => {
          response.data.results.forEach(article => {
            this.articles.push( new Article(article.id, article.userId, article.titleArticle, article.content, article.createAt, article.imageUrl, article.likes, article.dislikes));
            this.articlesSorted = this.articles.sort((a,b) => new Date(a.createAt) - new Date(b.createAt));
          });
        })
        .catch(error => {
          this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        });





  },
  methods: {
    detailArticle(id) {
      let user = JSON.parse(localStorage.getItem('user'));

      if(!this.showDetail) {
        UserService.getOneArticle(id)
            .then(response => {
              this.article = new Article(response.data.results[0].id, response.data.results[0].userId, response.data.results[0].titleArticle, response.data.results[0].content, response.data.results[0].createAt, response.data.results[0].imageUrl, response.data.results[0].likes, response.data.results[0].dislikes);

              response.data.results.forEach(data => {
                if(data.idUser === user.userId) {
                  this.isLike = data.isLike;
                }
              });

              this.showDetail = true;
            })
            .catch(error => {
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            });
      } else {
        this.showDetail = false;
      }
    }
  }
}
</script>

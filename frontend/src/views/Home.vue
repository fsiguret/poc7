<template>
  <section v-if="!showDetail" class="home">
    <h1>Derniers Articles</h1>
    <ListArticle v-for="article in articles" :key="article.id" v-bind:article="article" @showingDetail="detailArticle(article.id)"/>
    <AddArticle/>
  </section>
  <section v-else-if="showDetail">
    <h1>{{article.titleArticle}}</h1>
    <DetailArticle v-bind:article="article" @closeDetail="detailArticle()"/>
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
      article: '',
      commentary: []
    };
  },
  created() {
    UserService.getAllArticles()
        .then(response => {
          response.data.results.forEach(article => {
            this.articles.push( new Article(article.id, article.userId, article.titleArticle, article.content, article.createAt, article.imageUrl, article.likes, article.dislikes));
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
      if(!this.showDetail) {
        UserService.getOneArticle(id)
            .then(response => {
              this.article = new Article(response.data.results[0].id, response.data.results[0].userId, response.data.results[0].titleArticle, response.data.results[0].content, response.data.results[0].createAt, response.data.results[0].imageUrl, response.data.results[0].likes, response.data.results[0].dislikes);
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
<style>

</style>

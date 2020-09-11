<template>
  <section>
    <div v-if="showDetail">
      <h1>{{article.titleArticle}}</h1>
      <button @click="detailArticle">Fermer</button>
      <button v-if="ifSameUser" @click="deleteArticle(article.id)" type="button">Supprimer</button>
      <article>
        <h2>{{article.titleArticle}}</h2>
        <div>
          <p>{{article.content}}</p>
          <img v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="">
        </div>
        <div>
          <p>créé le : {{article.createAt}}</p>
          <ul>
            <li>{{article.likes}}</li>
            <li>{{article.dislikes}}</li>
          </ul>
        </div>
      </article>
      <aside>
        <h2>Commentaires</h2>
        <p v-if="message">{{message}}</p>
        <div v-for="com in commentary" :key="com.id">
          <p>{{com.com}}</p>
          <p>{{com.createAt}}</p>
          <button v-if="ifSameUser" @click="deleteCommentary(com.id)" type="button">Supprimer</button>
        </div>
        <AddCommentary v-bind:articleId="article.id"/>
      </aside>
    </div>
    <div v-else-if="!showDetail">
      <h1>Derniers Articles</h1>
      <article v-for="article in articles" :key="article.id" @click="detailArticle(article.id)" class="listArticle">
        <h2>{{article.titleArticle}}</h2>
        <p>{{article.createAt}}</p>
        <p>{{article.content}}</p>
        <img v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="">
      </article>
    </div>
    <AddArticle v-if="!showDetail"/>
  </section>
</template>

<script>
import moment from "moment";
import AddArticle from "@/components/AddArticle";
import AddCommentary from "@/components/AddCommentary";
import Article from "@/models/Article";
import Comment from "@/models/Commentary";
import UserService from '@/services/user-service';

export default {
  name: 'Main',
  components: {
    AddArticle,
    AddCommentary
  },
  data() {
    return {
      showDetail: false,
      ifSameUser: false,
      article: '',
      articles: [],
      commentary: [],
      message: ''
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem('user'));

    UserService.getAllArticles()
        .then(response => {
          response.data.results.forEach(article => {
            if(user.userId === article.userId) {
              this.ifSameUser = true;
            } else {
              this.ifSameUser = false;
            }

            article.createAt = moment(String(article.createAt)).format('DD/MM/YYYY HH:mm');

            this.articles.push( new Article(article.id, article.userId, article.titleArticle, article.content, article.createAt, article.imageUrl, article.likes, article.dislikes));
          });
        })
        .catch(error => {
          this.message = error;
        });
  },
  updated() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.userId === this.article.userId) {
      this.ifSameUser = true;
    } else {
      this.ifSameUser = false;
    }
  },
  methods: {
    detailArticle(id) {
      if(!this.showDetail) {
        UserService.getOneArticle(id)
            .then(response => {
              response.data.results[0].createAt = moment(String(response.data.results[0].createAt)).format('DD/MM/YYYY HH:mm');

              this.article = new Article(response.data.results[0].id, response.data.results[0].userId, response.data.results[0].titleArticle, response.data.results[0].content, response.data.results[0].createAt, response.data.results[0].imageUrl, response.data.results[0].likes, response.data.results[0].dislikes);
              this.showDetail = true;

              UserService.getComment(id)
                .then(response => {
                  response.data.resultsSelect.forEach(comment => {
                    comment.createAt = moment(String(comment.createAt)).format('DD/MM/YYYY HH:MM');
                    this.message = '';
                    this.commentary.push(new Comment(comment.id, comment.userId, comment.articleId, comment.createAt, comment.com));
                  });
                })
                .catch(error => {
                  this.message = error.response.data;
                });
            })
            .catch(error => {
              this.message = error.response.data;
            });
      } else {
        this.showDetail = false;
      }
    },
    deleteArticle(id) {
      let user = JSON.parse(localStorage.getItem('user'));
     this.message= user.userId
      UserService.deleteArticle(id, user.userId)
          .then(response => {
            this.message = response.data;
            this.$router.push('/');
          })
          .catch(error => {
            this.message = error.response.data;
          });
    }
  }
}
</script>

<style scoped lang="scss">
.listArticle {
  cursor: pointer;
}
</style>

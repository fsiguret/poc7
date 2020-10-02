<template>
    <section>
      <h1>Modifiez votre article !</h1>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(editArticle(articleId))">
          <ValidationProvider name="titre" rules="required|alpha_spaces" v-slot="{ errors }">
            <label for="titleArticle">Titre</label>
            <input type="text"  name="titleArticle" id="titleArticle" placeholder="Titre..." v-model.lazy:value="article.titleArticle">
            <div v-if="errors[0] !== undefined">
              <p>{{errors[0]}}</p>
            </div>
          </ValidationProvider>
          <ValidationProvider name="contenu" rules="required" v-slot="{ errors }">
            <label for="content">Contenu</label>
            <textarea  name="content" id="content" placeholder="Ecrivez quelque chose à vos collègues !" v-model.lazy:value="article.content"></textarea>
            <div v-if="errors[0] !== undefined">
              <p>{{errors[0]}}</p>
            </div>
          </ValidationProvider>
          <ValidationProvider name="fichier" rules="image" ref="provider" v-slot="{ validate, errors }">
            <label for="file">Ajouter un fichier.</label>
            <input type="file" @change="processFile" name="file" id="file">
            <div v-if="errors[0] !== undefined">
              <p>{{errors[0]}}</p>
            </div>
          </ValidationProvider>
          <input class="button" type="submit" value="Envoyer">
          <p>{{message}}</p>
        </form>
      </ValidationObserver>
    </section>
</template>

<script>
import UserService from '@/services/user-service';
import Article from "@/models/Article";

export default {
name: "EditArticle",
  data() {
    return {
      message: '',
      file: null,
      articleId: this.$route.params.id,
      article: ''
    };
  },
  created() {
    UserService.getOneArticle(this.articleId)
        .then(response => {
          this.article = new Article(response.data.results[0].id, response.data.results[0].userId, response.data.results[0].titleArticle, response.data.results[0].content, response.data.results[0].createAt, response.data.results[0].imageUrl, response.data.results[0].likes, response.data.results[0].dislikes);
        })
        .catch(error => {
          this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        });
  },
  methods: {
    async processFile(event) {
      const { valid } = await this.$refs.provider.validate(event);

      if (valid) {
        this.file = event.target.files[0];
      }
    },
    editArticle(id) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.article.userId = user.userId;

      if (this.file !== null) {

        console.log(this.file)
        let formData = new FormData();
        formData.append('article', JSON.stringify(this.article));
        formData.append('image', this.file);

        UserService.putArticle(id, formData)
            .then(response => {
              this.message = response.data;
              this.$router.push('/');
            })
            .catch(error => {
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            });

      } else {

        UserService.putArticle(id, this.article)
            .then(response => {
              this.message = response.data;
              this.$router.push('/');
            })
            .catch(error => {
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/scss/button";
@import "src/scss/form";
textarea {
  width: 100%;
  border: solid darkgrey 2px;
  border-radius: 0.3rem;
  resize: vertical;
  margin: 1rem 0;

  &:focus {
    border-color: #a0a0f8;
  }
}
</style>

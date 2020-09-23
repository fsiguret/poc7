<template>
  <section>
    <h1>Créez votre article !</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(addNewArticle)">
        <ValidationProvider name="titre" rules="required|alpha_num" v-slot="{ errors }">
          <label for="titleArticle">Titre</label>
          <input type="text" v-model="article.titleArticle" name="titleArticle" id="titleArticle" placeholder="Titre...">
          <div v-if="errors[0] !== undefined">
            <p>{{errors[0]}}</p>
          </div>
        </ValidationProvider>
        <ValidationProvider name="contenu" rules="required|alpha_num" v-slot="{ errors }">
          <label for="content">Contenu</label>
          <textarea v-model="article.content" name="content" id="content" placeholder="Ecrivez quelque chose à vos collègues !"></textarea>
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
import Article from "@/models/Article";
import UserService from "@/services/user-service";

export default {
name: "CreateArticle",
  data() {
    return {
      article: new Article('','','','','','','',''),
      file: null,
      message: ''
    };
  },
  methods:{
     async processFile(event) {
       const { valid } = await this.$refs.provider.validate(event);

       if (valid) {
         this.file = event.target.files[0];
       }
    },
    addNewArticle() {
      let user = JSON.parse(localStorage.getItem('user'));
      this.article.userId = user.userId;

      if(this.file !== null) {
        let formData = new FormData();
        formData.append('article', JSON.stringify(this.article));
        formData.append('image', this.file);

        UserService.postArticle(formData)
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
        UserService.postArticle(this.article)
            .then(response =>{
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

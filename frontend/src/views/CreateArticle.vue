<template>
  <section>
    <h1>Créez votre article !</h1>
    <form @submit.prevent="addNewArticle">
      <div>
        <label for="titleArticle">Titre</label>
        <input type="text" v-model="article.titleArticle" v-validate="'required'" name="titleArticle" id="titleArticle" placeholder="Titre...">
        <div v-if="errors.has('titleArticle')">
          <p>Le titre de l'article est obligatoire !</p>
        </div>
      </div>
      <div>
        <label for="content">Contenu</label>
        <textarea v-model="article.content" v-validate="'required'" name="content" id="content" placeholder="Ecrivez quelque chose à vos collègues !"></textarea>
        <div v-if="errors.has('content')">
          <p>Un contenu est obligatoire !</p>
        </div>
      </div>
      <div>
        <label for="file">Ajouter un fichier.</label>
        <input type="file" @change="processFile" name="file" id="file">
      </div>
      <input type="submit" value="Envoyer">
    </form>
    <p>{{message}}</p>
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
    processFile(event) {
      this.file = event.target.files[0];
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

<style scoped>

</style>

<template>
  <div>
    <section>
      <h1>Créez votre article !</h1>
      <form @submit.prevent="editArticle(article.id)">
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
  </div>
</template>

<script>
export default {
name: "EditArticle",
  methods: {
    editArticle() {

    }
  }
}
</script>

<style scoped>

</style>

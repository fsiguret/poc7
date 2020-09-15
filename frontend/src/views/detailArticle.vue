<template>
  <div>
    <h1>{{article.titleArticle}}</h1>
    <button @click="detailArticle">Fermer</button>
    <button v-if="ifSameUserArticle" @click="deleteArticle(article.id)" type="button">Supprimer</button>
    <article>
      <h2>{{article.titleArticle}}</h2>
      <div>
        <p>{{article.content}}</p>
        <img v-if="article.imageUrl" v-bind:src="article.imageUrl" alt="">
      </div>
      <div>
        <p>créé {{article.createAt}}</p>
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
        <button v-if="ifUserSameCom(com.userId)" @click="deleteCommentary(com.id)" type="button">Supprimer</button>
      </div>
      <AddCommentary v-bind:articleId="article.id"/>
    </aside>
  </div>
</template>

<script>
export default {
name: "detailArticle"
}
</script>

<style scoped>

</style>

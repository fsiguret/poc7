<template>
  <p class="createAt">{{ dateFormNow(createAt) }}</p>
</template>

<script>
import moment from "moment";
export default {
name: "DisplayHours",
  props: [
    "createAt"
  ],
  created() {
    moment.locale('fr', {
      relativeTime: {
        past: 'il y a %s',
        s: 'quelques secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
      }
    });
  },
  methods: {
    dateFormNow(date) {
      return moment(date).fromNow();
    }
  }
}
</script>

<style lang="scss" scoped>
.createAt {
  font-size: 0.8rem;
}
</style>

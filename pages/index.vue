<template>
  <article class="container-centered">
    <Player />
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import Player from '~/components/Player/index.vue'

export default Vue.extend({
  components: { Player },
})
</script>

<template>
  <section class="controls">
    <button class="btn" @click="prev">prev</button>
    <button class="btn" @click="play">play</button>
    <button class="btn" @click="next">next</button>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Controls",
  methods: {
    ...mapActions({
      next: "player/nextTrack",
      prev: "player/prevTrack",
      play: "player/togglePlay",
    }),
  },
};
</script>

<style scoped>
.controls {
  @apply flex items-center justify-center
  space-x-4 min-h-120px mt-auto;
}
</style>

<template>
  <section class="controls">
    <button class="btn" @click="prev">
      <img
        src="/icons/prev.svg"
        width="32"
        height="32"
        alt="previous track arrow"
        title="previous track"
      />
    </button>
    <button class="btn" @click="play">
      <img
        :src="`/icons/${type}.svg`"
        width="32"
        height="32"
        :alt="`${type} track`"
        :title="`${type} track`"
      />
    </button>
    <button class="btn" @click="next">
      <img
        src="/icons/next.svg"
        width="32"
        height="32"
        alt="next track arrow"
        title="next track"
      />
    </button>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Controls",
  computed: {
    ...mapGetters({
      isPlaying: "player/isPlaying",
    }),
    type() {
      return this.isPlaying ? "pause" : "play";
    },
  },
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

.btn {
  @apply max-w-24 w-full flex items-center justify-center rounded-md bg-black text-white px-2 py-4;
}
img {
  height: 32px;
}
</style>

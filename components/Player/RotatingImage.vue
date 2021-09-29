<template>
  <section class="py-8">
    <img
      class="animation"
      :class="{ 'animation-running': isPlaying }"
      width="320"
      height="320"
      src="/images/vinil.png"
      alt="Vinil record"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RotatingImage",
  computed: {
    ...mapGetters({ isPlaying: "player/isPlaying" }),
  },
};
</script>

<style scoped>
section {
  @apply flex items-center justify-center;
}

.animation {
  animation: spin 7s linear infinite;
  animation-play-state: paused;
}
.animation-running {
  animation-play-state: running;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>

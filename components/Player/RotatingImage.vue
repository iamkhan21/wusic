<template>
  <section class="py-8">
    <img
      class="animation"
      :class="{ 'animation-running': isPlaying }"
      width="320"
      height="320"
      src="https://ouch-cdn2.icons8.com/wR2Ry1fHeBAkGmzl8ucFS7HFGodOtlGuy9q0rqz5AGM/rs:fit:910:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTc0/LzMxZDY1ZThlLWY5/NzEtNDNjOS05OTQz/LWJmYWJiMzE1ZDFi/NS5zdmc.png"
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

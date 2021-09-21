<template>
  <section class="text-center py-4">
    <h3 class="font-bold">{{ track.name }}</h3>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TrackInfo",
  computed: {
    ...mapGetters({
      track: "player/currentTrack",
    }),
  },
};
</script>

<style scoped></style>

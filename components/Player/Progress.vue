<template>
  <section class="text-center">{{ duration }}</section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Progress",
  computed: {
    ...mapGetters({
      duration: "player/durationHR",
    }),
  },
};
</script>

<style scoped>
section {
  //@apply flex flex-col items-center py-4 space-y-4;
}
</style>

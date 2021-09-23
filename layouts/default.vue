<template>
  <Nuxt />
</template>

<script>
import { createSnackbar } from "@snackbar/core";
import "@snackbar/core/dist/snackbar.css";
import { player } from "../domain";
import { throttle } from "../utils/timings";

export default {
  mounted() {
    this.checkUpdates();
    const updateDuration = throttle(
      (duration) => this.$store.commit("player/setDuration", duration),
      1000
    );
    player.on("duration", updateDuration);
    player.on("trackchanged", () => this.$store.commit("player/changeTrack"));
  },
  methods: {
    async checkUpdates() {
      const workbox = await window.$workbox;

      if (workbox) {
        workbox.addEventListener("installed", (event) => {
          if (event.isUpdate) {
            this.showMessage();
          }
        });
      }
    },
    showMessage() {
      const message = document.createElement("div");
      message.innerHTML = `We have new updates!<br/>  Reload page to see it :)`;

      createSnackbar(message, {
        timeout: 30_000,
        actions: [
          {
            text: "Reload",
            callback(_, snackbar) {
              snackbar.destroy();
              location.reload();
            },
          },
        ],
      });
    },
  },
};
</script>

<style>
.snackbar--container {
  font-size: 1rem;
}
</style>

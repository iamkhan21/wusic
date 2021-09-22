<template>
  <Nuxt />
</template>

<script>
import { createSnackbar } from "@snackbar/core";
import "@snackbar/core/dist/snackbar.css";

export default {
  async mounted() {
    const workbox = await window.$workbox;

    if (workbox) {
      workbox.addEventListener("installed", (event) => {
        if (event.isUpdate) {
          this.showMessage();
        }
      });
    }
  },
  methods: {
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

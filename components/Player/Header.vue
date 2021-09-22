<template>
  <Fragment>
    <header>
      <h1 class="text-3xl font-black">Wusic</h1>
      <button
        aria-controls="playlist"
        aria-expanded="false"
        aria-label="Open playlist"
        class="close-btn"
        type="button"
        @click="isOpen = true"
      >
        &#9776;
      </button>
    </header>
    <section
      :aria-hidden="!isOpen"
      :class="{ open: isOpen }"
      class="sidebar"
      @click.self="isOpen = false"
    >
      <aside class="menu">
        <button
          id="close"
          aria-label="Close playlist"
          class="close-btn"
          type="button"
          @click="isOpen = false"
        >
          &times;
        </button>

        <ul id="playlist" class="">
          <li
            v-for="track in playlist"
            :key="track.uid"
            :class="{ active: track.uid === currentTrack.uid }"
            class="track"
            @click="selectTrack(track.uid)"
          >
            {{ track.name }}
          </li>
        </ul>
      </aside>
    </section>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  components: { Fragment },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      playlist: "player/playlist",
      currentTrack: "player/currentTrack",
    }),
  },
  methods: {
    selectTrack(uid) {
      this.isOpen = false;
      this.select(uid);
    },
    ...mapActions({
      select: "player/selectTrack",
    }),
  },
};
</script>

<style lang="postcss" scoped>
header {
  @apply flex items-center justify-between;
}

.close-btn {
  @apply text-4xl px-2 py-0.5;
}

.sidebar {
  transform: translateX(100%);
  transition: transform 300ms ease-in-out;
  background-color: rgba(0, 0, 0, 0.1);

  @apply absolute inset-0 z-1;

  &.open {
    transform: translateX(0);
  }
}

.menu {
  @apply w-2/3 px-4 py-2 bg-warm-gray-50 space-y-8 ml-auto h-full;
}

.track {
  @apply text-base px-4 cursor-pointer hover:bg-light-blue-200;

  &.active {
    @apply font-bold;
  }
}
</style>

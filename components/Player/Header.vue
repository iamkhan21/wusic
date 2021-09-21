<template>
  <Fragment>
    <header>
      <h1 class="text-3xl font-black">Wusic</h1>
      <button
        aria-controls="playlist"
        aria-expanded="false"
        aria-label="Open playlist"
        class="py-2 px-1"
        type="button"
        @click="isOpen = true"
      >
        &#9776;
      </button>
    </header>
    <section
      class="sidebar"
      :class="{ open: isOpen }"
      :aria-hidden="!isOpen"
      @click.self="isOpen = false"
    >
      <aside>
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
          <li v-for="track in playlist" :key="track.uid">
            {{ track.name }}
          </li>
        </ul>
      </aside>
    </section>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  components: { Fragment },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapGetters({
      playlist: 'player/playlist',
    }),
  },
}
</script>

<style scoped>
header {
  @apply flex items-center justify-between;
}

.sidebar {
  transform: translateX(100%);
  transition: transform 300ms ease-in-out;
  background-color: rgba(0, 0, 0, 0.1);

  @apply absolute inset-0;
}

aside {
  @apply w-2/3 px-4 py-2 bg-gray-100 space-y-8 ml-auto h-full;
}
.open {
  transform: translateX(0);
}
</style>

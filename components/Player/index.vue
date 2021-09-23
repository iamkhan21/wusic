<template>
  <section class="card glass">
    <Header />
    <RotatingImage />
    <Progress />
    <TrackInfo />
    <Controls />
    <Footer />
  </section>
</template>

<script>
import Controls from "~/components/Player/Controls";
import Footer from "~/components/Player/Footer";
import Header from "~/components/Player/Header";
import Progress from "~/components/Player/Progress";
import RotatingImage from "~/components/Player/RotatingImage";
import TrackInfo from "~/components/Player/TrackInfo";

export default {
  name: "Player",
  components: { RotatingImage, Footer, Controls, TrackInfo, Progress, Header },
};
</script>

<style scoped>
.card {
  @apply flex flex-col max-w-lg w-full max-h-3xl h-full z-0  px-4 py-2 rounded-2xl relative overflow-hidden;
}

.glass {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 30px 0 rgba(120, 150, 120, 0.5);
  backdrop-filter: blur(4px);
}
</style>

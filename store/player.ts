import Player, { Track } from "~/domain/Player";
import tracks from "~/content/tracks.json";

interface State {
  playlist: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
}
const player = new Player(tracks);

export const state = (): State => ({
  playlist: player.playlist,
  isPlaying: player.isPlaying,
  currentTrack: player.currentTrack,
});

export const mutations = {
  changeTrack(state: State) {
    state.currentTrack = player.currentTrack;
  },
  togglePlay(state: State) {
    state.isPlaying = player.isPlaying;
  },
};

export const actions = {
  nextTrack(context: any) {
    player.nextTrack();
    context.commit("changeTrack");
  },
  prevTrack(context: any) {
    player.prevTrack();
    context.commit("changeTrack");
  },
  selectTrack(context: any, trackUid: string) {
    player.selectTrack(trackUid);
    context.commit("changeTrack");
  },
  async togglePlay(context: any) {
    if (player.isPlaying) {
      player.pause();
    } else {
      await player.play();
    }

    context.commit("togglePlay");
  },
};

export const getters = {
  playlist(state: State) {
    return state.playlist;
  },
  currentTrack(state: State) {
    return state.currentTrack;
  },
  isPlaying(state: State) {
    return state.isPlaying;
  },
};

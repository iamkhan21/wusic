import { player } from "~/domain";
import { secondsToHRtime } from "~/utils/timings";
import { Track } from "~/domain/Player";

interface State {
  playlist: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  duration: number;
}

export const state = (): State => ({
  playlist: player.playlist,
  isPlaying: player.isPlaying,
  currentTrack: player.currentTrack,
  duration: player.duration,
});

export const mutations = {
  changeTrack(state: State) {
    state.currentTrack = player.currentTrack;
  },
  togglePlay(state: State) {
    state.isPlaying = player.isPlaying;
  },
  setDuration(state: State, duration: number) {
    state.duration = duration;
  },
};

export const actions = {
  nextTrack(_: any) {
    player.nextTrack();
  },
  prevTrack(_: any) {
    player.prevTrack();
  },
  selectTrack(_: any, trackUid: string) {
    player.selectTrack(trackUid);
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
  // HR - human readable
  durationHR(state: State) {
    return secondsToHRtime(state.duration);
  },
};

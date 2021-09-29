import { PlayerErrors } from "~/domain";
import Player from "~/domain/Player";
import "./__mocks__/audio";
import "./__mocks__/localStorage";
import tracks from "./__mocks__/tracks.json";

describe("Player", function () {
  afterEach(function () {
    window.localStorage.clear();
  });

  it("should throw error if playlist is empty or not set at all", function () {
    expect(() => new Player()).toThrow(PlayerErrors.EMPTY_PLAYLIST);

    expect(() => new Player([])).toThrow(PlayerErrors.EMPTY_PLAYLIST);
  });
  it("should create player instance with playlist", function () {
    const player = new Player(tracks);

    expect(player instanceof Player).toBeTruthy();
    expect(player.playlist).toEqual(tracks);
  });
  it("playlist should be equal to passed tracks", function () {
    const player = new Player(tracks);
    expect(player.playlist).toEqual(tracks);
  });
  it("should select first track from playlist if no one track in localStorage (mean player was launched first time)", function () {
    const player = new Player(tracks);
    expect(player.currentTrack).toEqual(tracks[0]);
  });
  it("should set track from local storage as current track", function () {
    window.localStorage.setItem("track", "02");

    const player = new Player(tracks);
    expect(player.currentTrack).toEqual(tracks[1]);
  });
  it("should change a track to next or previous", function () {
    const player = new Player(tracks);
    expect(player.currentTrack).toEqual(tracks[0]);
    player.prevTrack();
    expect(player.currentTrack).toEqual(tracks[2]);
    player.nextTrack();
    expect(player.currentTrack).toEqual(tracks[0]);
  });
  it("should set current track on select", async function () {
    const player = new Player(tracks);

    await player.selectTrack("03");
    expect(player.currentTrack).toEqual(tracks[2]);
  });
  it("should return true on isPlaying if track is playing", async () => {
    const player = new Player(tracks);
    await player.play();

    expect(player.isPlaying).toBeTruthy();
  });
  it("should return false on isPlaying if track is paused", async function () {
    const player = new Player(tracks);

    await player.play();
    expect(player.isPlaying).toBeTruthy();

    player.pause();
    expect(player.isPlaying).toBeFalsy();
  });
});

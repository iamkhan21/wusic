export type Track = {
  uid: string;
  name: string;
  url: string;
};

export default class Player {
  private _audio: HTMLAudioElement | null = null;

  constructor(private readonly _playlist: Track[]) {
    const track = this.getLastPlayedTrack();
    this._currentTrack = track || _playlist[0];
  }

  private _currentTrack: Track;

  get currentTrack(): Track {
    return this._currentTrack;
  }

  private set currentTrack(value: Track) {
    localStorage.setItem("track", value.uid);

    const isPlaying = this.isPlaying;

    this.destroyAudio();

    this._currentTrack = value;

    if (isPlaying) this.play();
  }

  get playlist(): Track[] {
    return this._playlist;
  }

  get isPlaying(): boolean {
    return !(this._audio?.paused ?? true);
  }

  public nextTrack() {
    const currentIndex = this.getIndexOfCurrentTrack();

    let nextIndex = currentIndex + 1;
    if (nextIndex >= this.playlist.length) nextIndex = 0;

    this.currentTrack = this.playlist[nextIndex];
  }

  public prevTrack() {
    const currentIndex = this.getIndexOfCurrentTrack();

    let nextIndex = currentIndex - 1;
    if (nextIndex < 0) nextIndex = this.playlist.length - 1;

    this.currentTrack = this.playlist[nextIndex];
  }

  public async play() {
    if (!this._audio) this._audio = new Audio(this.currentTrack.url);

    await this._audio.play();
  }

  public pause() {
    this._audio?.pause();
  }

  public selectTrack(trackUid: string) {
    if (!trackUid) return;

    const selectedTrack = this.searchTrack(trackUid);
    if (!selectedTrack) return;

    this.currentTrack = selectedTrack;
  }

  private destroyAudio() {
    this._audio?.pause();
    this._audio = null;
  }

  private searchTrack(trackUid: string): Track | undefined {
    return this._playlist.find(({ uid }) => uid === trackUid);
  }

  private getLastPlayedTrack(): Track | undefined {
    const trackUid: string | null = localStorage.getItem("track");
    if (trackUid) {
      const track = this.searchTrack(trackUid);
      if (track) return track;
    }
  }

  private getIndexOfCurrentTrack() {
    return this._playlist.findIndex(
      ({ uid }) => uid === this._currentTrack.uid
    );
  }
}

export type Track = {
  uid: string;
  name: string;
  url: string;
};

export default class Player {
  private _audio: HTMLAudioElement | null = null;
  private _isPlaying = false;

  constructor(private readonly _playlist: Track[]) {
    const track = this.searchPlayedTrack();
    this._currentTrack = track || _playlist[0];
  }

  private _currentTrack: Track;

  get currentTrack(): Track {
    return this._currentTrack;
  }

  private set currentTrack(value: Track) {
    localStorage.setItem("track", value.uid);
    this._currentTrack = value;
  }

  get playlist(): Track[] {
    return this._playlist;
  }

  get isPlaying(): boolean {
    return this._isPlaying;
  }

  public nextTrack() {
    this.destroyAudio();
    const currentIndex = this.getIndexOfCurrentTrack();

    let nextIndex = currentIndex + 1;
    if (nextIndex >= this.playlist.length) nextIndex = 0;

    this.currentTrack = this.playlist[nextIndex];

    if (this._isPlaying) this.play();
  }

  public prevTrack() {
    this.destroyAudio();

    const currentIndex = this.getIndexOfCurrentTrack();

    let nextIndex = currentIndex - 1;
    if (nextIndex < 0) nextIndex = this.playlist.length - 1;

    this.currentTrack = this.playlist[nextIndex];

    if (this._isPlaying) this.play();
  }

  public async play() {
    if (!this._audio) this._audio = new Audio(this.currentTrack.url);

    await this._audio.play();

    this._isPlaying = true;
  }

  public pause() {
    this._audio?.pause();
    this._isPlaying = false;
  }

  private destroyAudio() {
    this._audio?.pause();
    this._audio = null;
  }

  private searchPlayedTrack(): Track | undefined {
    const trackUid: string | null = localStorage.getItem("track");
    if (trackUid) {
      return this._playlist.find(({ uid }) => uid === trackUid);
    }
  }

  private getIndexOfCurrentTrack() {
    return this._playlist.findIndex(
      ({ uid }) => uid === this._currentTrack.uid
    );
  }
}

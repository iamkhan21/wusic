export type Track = {
  uid: string;
  name: string;
  url: string;
};

export default class Player {
  private eventHandlers = new Map();
  private _audio: HTMLAudioElement;
  private _isPlaying = false;

  constructor(private readonly _playlist: Track[]) {
    const track = this.getLastPlayedTrack();
    this._currentTrack = track || _playlist[0];

    this._audio = new Audio(this._currentTrack.url);
    this._audio.onloadedmetadata = this.onLoadMetadata;
    this._audio.ontimeupdate = this.onLoadMetadata;
    this._audio.onended = () => this.nextTrack();
  }

  private _currentTrack: Track;

  get currentTrack(): Track {
    return this._currentTrack;
  }

  private set currentTrack(value: Track) {
    localStorage.setItem("track", value.uid);

    const isPlaying = this._isPlaying;

    this.destroyAudio();

    this._currentTrack = value;

    this.emit("trackchanged");

    this._audio.src = value.url;

    if (isPlaying) this.play();
  }

  get playlist(): Track[] {
    return this._playlist;
  }

  get isPlaying(): boolean {
    return this._isPlaying;
  }

  public on(event: string, handler: (...arg: any[]) => void): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event).add(handler);
  }

  public off(event: string, handler: (...arg: any[]) => void): void {
    const handlers = this.eventHandlers.get(event);
    if (!handlers) return;

    handlers.delete(handler);
    if (handlers.size === 0) this.eventHandlers.delete(event);
  }

  public once(event: string, handler: (...arg: any[]) => void): void {
    const listener_ = (...args: any[]) => {
      this.off(event, listener_);
      handler(...args);
    };
    this.on(event, listener_);
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
    this._isPlaying = true;
    await this._audio.play();
  }

  public pause() {
    this._isPlaying = false;
    this._audio?.pause();
  }

  public selectTrack(trackUid: string) {
    if (!trackUid) return;

    const selectedTrack = this.searchTrack(trackUid);
    if (!selectedTrack) return;

    this.currentTrack = selectedTrack;
  }

  private destroyAudio() {
    this._audio.pause();
  }

  private onLoadMetadata = () => {
    if (!this._audio) return;

    const data = this._audio.duration - this._audio.currentTime;
    this.emit("duration", data);
  };

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

  private emit(event: string, ...data: unknown[]): void {
    if (!this.eventHandlers.has(event)) return;

    const handlers = this.eventHandlers.get(event);
    for (const handler of handlers) {
      try {
        handler(...data);
      } catch (err) {
        console.error(err);
      }
    }
  }

  private getIndexOfCurrentTrack() {
    return this._playlist.findIndex(
      ({ uid }) => uid === this._currentTrack.uid
    );
  }
}

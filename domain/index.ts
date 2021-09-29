import Player from "./Player";
import tracks from "~/data/tracks.json";

export * from "./errors";

export const player = new Player(tracks);

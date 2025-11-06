import { createDefine } from "fresh";
import type { Player } from "./types/player.ts";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  shared: string;
  player?: Player;
}

export const define = createDefine<State>();

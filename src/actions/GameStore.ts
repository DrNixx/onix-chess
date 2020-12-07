import { Store } from "redux";
import { GameState } from './GameState';
import { GameAction } from './GameReducer';

export interface GameRelatedState {
    game: GameState,
}

export type GameRelatedStore = Store<GameRelatedState, GameAction>;
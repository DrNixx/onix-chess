import { Store } from "redux";
import { GameState } from './GameState';
import { GameActions } from './GameActions';

export interface GameRelatedState {
    game: GameState,
}

export type GameStore = Store<GameState, GameActions.GameAction>;
export type GameRelatedStore = Store<GameRelatedState, GameActions.GameAction>;
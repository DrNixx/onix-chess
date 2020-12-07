import { Reducer } from 'redux';
import { Logger } from 'onix-core';
import { GameActions as ga } from './GameActions';
import { GameState, getGameState } from './GameState';
import { Chess as ChessEngine } from '../chess/Chess';

const INITIAL_STATE: GameState = {
    engine: new ChessEngine(),
    fen: "",
    isCheck: false,
};

export const gameReducer: Reducer<GameState, ga.GameAction> = (state: GameState = INITIAL_STATE, action: ga.GameAction) => {
    Logger.debug('Try game action', action);
    switch (action.type) {
        case ga.NAVIGATE_TO_PLY: {
            const { engine } = state;

            if (engine) {
                engine.moveToPly(action.ply);

                return {
                    ...state,
                    ...getGameState(engine)
                }
            }
            
            return {
                ...state
            };
        }

        case ga.NAVIGATE_TO_MOVE: {
            const { engine } = state;

            if (engine) {
                engine.moveToPly(action.move.PlyCount);

                return {
                    ...state,
                    ...getGameState(engine)
                }
            }
            
            return {
                ...state
            };
        }

        case ga.NAVIGATE_TO_KEY: {
            const { engine } = state;

            if (engine) {
                engine.moveToKey(action.move);
                return {
                    ...state,
                    ...getGameState(engine)
                }
            }
            
            return {
                ...state
            };
        }

        case ga.GAME_ADD_MOVE: {
            const { engine } = state;

            if (engine) {
                engine.decodeMove(action.move);
                engine.moveLast();
                return {
                    ...state,
                    ...getGameState(engine)
                }
            }
            
            return {
                ...state
            };
        }

        case ga.GAME_LOAD_FULL: {
            const engine = new ChessEngine(action.game);
            engine.moveLast();
            return {
                engine,
                ...getGameState(engine)
            }
        }

        default:
            return state;
    }
}

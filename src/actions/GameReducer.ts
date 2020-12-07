import { Reducer } from 'redux';
import { Logger } from 'onix-core';
import * as cg from 'chessground/types';
import * as chessActions from './ChessActions';
import { GameState } from './GameState';
import { Move } from '../chess/Move';
import { Square } from '../chess/Square';
import { Color } from '../chess/Color';
import { Chess as ChessEngine } from '../chess/Chess';
import { FenString } from '../chess/FenString';

export type GameAction = 
    chessActions.GameNavigateToPlyAction | 
    chessActions.GameNavigateToKeyAction |
    chessActions.GameNavigateToMoveAction;
    

const INITIAL_STATE: GameState = {
    engine: new ChessEngine(),
    fen: "",
    isCheck: false,
};

const getLastMove = (move: Move) => {
    let lastMove: cg.Key[]|undefined = undefined;

    if (!move.isBegin()) {
        const { sm } = move.Prev!;
        lastMove = [<cg.Key>Square.name(sm!.from!), <cg.Key>Square.name(sm!.to!)];
    }

    return lastMove;
}

const getGameState = (engine: ChessEngine) => {
    return {
        lastMove: getLastMove(engine.CurrentMove),
        fen: FenString.fromPosition(engine.CurrentPos),
        isCheck: engine.CurrentPos.isKingInCheck() ? Color.toName(engine.CurrentPos.WhoMove) : false,
    };
}

export const gameReducer: Reducer<GameState, GameAction> = (state: GameState = INITIAL_STATE, action: GameAction) => {
    Logger.debug('Try game action', action);
    switch (action.type) {
        case chessActions.NAVIGATE_TO_PLY: {
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

        case chessActions.NAVIGATE_TO_MOVE: {
            const { engine, fen } = state;

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

        case chessActions.NAVIGATE_TO_KEY: {
            const { engine, fen } = state;

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

        default:
            return state;
    }
}

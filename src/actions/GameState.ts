import * as cg from 'chessground/types';
import { Chess as ChessEngine } from '../chess/Chess';
import { Color } from '../chess/Color';
import { FenString } from '../chess/FenString';
import { Move } from '../chess/Move';
import { Square } from '../chess/Square';
import { IGameData } from '../types/Interfaces';

export interface GameState {
    engine: ChessEngine;
    fen: string;
    lastMove?: cg.Key[];
    isCheck?: cg.Color|boolean;
}

const getLastMove = (move: Move) => {
    let lastMove: cg.Key[]|undefined = undefined;

    if (!move.isBegin()) {
        const { sm } = move.Prev!;
        lastMove = [<cg.Key>Square.name(sm!.from!), <cg.Key>Square.name(sm!.to!)];
    }

    return lastMove;
}

export const getGameState = (engine: ChessEngine) => {
    return {
        lastMove: getLastMove(engine.CurrentMove),
        fen: engine.CurrentMove.fen ?? FenString.fromPosition(engine.CurrentPos),
        isCheck: engine.CurrentPos.isKingInCheck() ? Color.toName(engine.CurrentPos.WhoMove) : false,
    };
}

export const createGameState = (settings: IGameData): GameState => {
    const engine = new ChessEngine(settings);
    engine.moveLast();

    return {
        engine: engine,
        ...getGameState(engine)
    }
}
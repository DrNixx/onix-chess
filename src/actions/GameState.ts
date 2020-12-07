import * as cg from 'chessground/types';
import { Chess as ChessEngine } from '../chess/Chess';
import { Color } from '../chess/Color';
import { FenString } from '../chess/FenString';
import { Square } from '../chess/Square';
import { IGameData } from '../types/Interfaces';

export interface GameState {
    engine: ChessEngine;
    fen: string;
    lastMove?: cg.Key[];
    isCheck?: cg.Color|boolean;
}

export const createGameState = (settings: IGameData): GameState => {
    const engine = new ChessEngine(settings);
    engine.moveLast();

    const fen = FenString.fromPosition(engine.CurrentPos);
    let lastMove: cg.Key[]|undefined = undefined;

    const move = engine.CurrentMove;
    if (!move.isBegin()) {
        const { sm } = move.Prev!;
        lastMove = [<cg.Key>Square.name(sm!.from!), <cg.Key>Square.name(sm!.to!)];
    }

    return {
        engine: engine,
        fen: move.fen!,
        lastMove: lastMove,
        isCheck: engine.CurrentPos.isKingInCheck() ? Color.toName(engine.CurrentPos.WhoMove) : false,
    }
}
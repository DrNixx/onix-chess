import repeat from 'lodash/repeat';
import toSafeInteger from 'lodash/toSafeInteger';
import { Hashtable } from 'onix-core/dist/Hashtable';
import { Colors, Squares, Pieces } from '../types/Types';
import { Piece } from './Piece';
import { Position } from './Position';
import { Square } from './Square';
import { Color } from './Color';
import { Castling, CastlingSide, CastlingStr } from './Castling';
import { turnToPly } from './Common';

// Forsite to piece map
const fenPieces: Hashtable<Pieces.Piece> = {
    "P": Piece.WPawn,
    "K": Piece.WKing,
    "Q": Piece.WQueen,
    "R": Piece.WRook,
    "N": Piece.WKnight,
    "B": Piece.WBishop,
    "p": Piece.BPawn,
    "k": Piece.BKing,
    "q": Piece.BQueen,
    "r": Piece.BRook,
    "n": Piece.BKnight,
    "b": Piece.BBishop
};

// Piece to Forsite map
const FP_p2f: string[] = [];
FP_p2f[Piece.WPawn] = "P";
FP_p2f[Piece.WKing] = "K";
FP_p2f[Piece.WQueen] = "Q";
FP_p2f[Piece.WRook] = "R";
FP_p2f[Piece.WKnight] = "N";
FP_p2f[Piece.WBishop] = "B";
FP_p2f[Piece.BPawn] = "p";
FP_p2f[Piece.BKing] = "k";
FP_p2f[Piece.BQueen] = "q";
FP_p2f[Piece.BRook] = "r";
FP_p2f[Piece.BKnight] = "n";
FP_p2f[Piece.BBishop] = "b";

const fenEmptyBoardStd = "8/8/8/8/8/8/8/8 w KQkq - 0 1";

function fen2Piece(fenCharacter: string): Pieces.Piece | Pieces.Empty
{
    return (fenPieces[fenCharacter]) ? fenPieces[fenCharacter] : Piece.None;
}

function fenToSquare(sq: number): Squares.Square
{
    return ((7 - Math.floor(sq / 8)) * 8 + (sq % 8)) as Squares.Square;
}

function normalizeFen(fen: string): string {
    if (!fen) {
        return fenEmptyBoardStd;
    }

    while (fen.indexOf("  ") >= 0) {
        fen = fen.replace("  ", " ");
    }

    return fen;
}

/** Flags **/
export enum FenFormat {
    board = 0,
    color = 1,
    castlingEp = 2,
    complete = 3
}
 
export interface PositionDef {
    board: string;
    color: Colors.BW;
    castling: Castling;
    castlingSet: Boolean;
    eptarget?: Squares.Square;
    halfMoves: number;
    moveNo: number;
}

export class FenString {
    public static standartStart = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    public static emptyBoard = fenEmptyBoardStd;

    public static trim(fen: string, flag: FenFormat) {
        fen = normalizeFen(fen);

        const tok = fen.split(/\s+/);
        let result = String(tok[0]);

        if (flag >= FenFormat.color) {
            if (tok.length > 1) {
                //  color
                result += " " + (Color.isChar(tok[1]) ? tok[1] : "w");

                if (flag >= FenFormat.castlingEp) {
                    if (tok.length > 2) {
                        // castling
                        result += " " + tok[2];
                        
                        if (tok.length > 3) {
                            // enpassant
                            result += " " + tok[3];

                            if (flag >= FenFormat.complete) {
                                if (tok.length > 4) {
                                    // half-move count
                                    result += " " + tok[4];

                                    if (tok.length > 5) {
                                        // move number
                                        result += " " + tok[5];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return result;
    }

    public static toDefenition(fen: string): PositionDef {
        const result: PositionDef = {
            board: "8/8/8/8/8/8/8/8",
            color: Color.White,
            castling: new Castling(),
            castlingSet: false,
            eptarget: Square.NullSquare,
            halfMoves: 0,
            moveNo: 1
        }

        fen = normalizeFen(fen);

        const tok = fen.split(/\s+/);
        result.board = String(tok[0]);
        
        if (tok.length > 1) {
            // now the side to move:
            result.color = Color.isChar(tok[1]) ? Color.fromChar(tok[1]) : Color.White;
        }
        
        if (tok.length > 2) {
            result.castlingSet = result.castling.fromFen(tok[2]);
        }

        if (tok.length > 3) {
            if (tok[3].charAt(0) !== "-") {
                const fylec = tok[3].charAt(0);
                if (fylec >= "a" && fylec <= "h") {
                    const rankc = tok[3].charAt(1);
                    if (rankc === "3" || rankc === "6") {
                        const f = Square.fyleFromChar(fylec);
                        const r = Square.rankFromChar(rankc);
                        if (Square.isFyle(f) && Square.isRank(r)) {
                            result.eptarget = Square.create(f, r);
                        }        
                    }
                }
            }
        }

        if (tok.length > 4) {
            result.halfMoves = toSafeInteger(tok[4]);
        }

        if (tok.length > 5) {
            const m = toSafeInteger(tok[5]);
            if (m >= 1) {
                result.moveNo = m;
            }
        }

        return result;
    }

    public static toPosition(pos: Position, fen: string, forceCastling: boolean = true) {
        const def = FenString.toDefenition(fen);
        
        let i: number = 0;
        let sq: number = 0;

        // replace NOPIECE square with repeated "1" string
        for (i = 2; i <= 8; i++) {
            const re = new RegExp(String(i), "g");
            def.board = def.board.replace(re,  repeat("1", i));
        }

        // remove slashes
        def.board = def.board.replace(/\//g, "");
        if (def.board.length !== 64) {
            return false;
        }

        pos.clear();

        for (sq = 0; sq < 64; sq++) {
            const p = fen2Piece(def.board.charAt(sq));
            if (p !== Piece.None) {
                pos.addPiece(p, fenToSquare(sq));
            }
        }

        pos.WhoMove = def.color;

        pos.Castling.assign(def.castling);
        if (!def.castlingSet && forceCastling) {
            const board = pos.Board;
            // the FEN has no castling field, so just guess that
            // castling is possible whenever a king and rook are
            // still on their starting squares:
            if (board[4] === Piece.WKing) {
                if (board[0] === Piece.WRook) {
                    pos.Castling.set(Color.White, CastlingSide.Queen, true);
                }

                if (board[7] === Piece.WRook) {
                    pos.Castling.set(Color.White, CastlingSide.King, true);
                }
            }
            if (board[60] === Piece.BKing) {
                if (board[56] === Piece.BRook) {
                    pos.Castling.set(Color.Black, CastlingSide.Queen, true);
                }

                if (board[63] === Piece.BRook) {
                    pos.Castling.set(Color.Black, CastlingSide.King, true);
                }
            }   
        }
        
        pos.EpTarget = def.eptarget;
        pos.HalfMoveCount = def.halfMoves;
        pos.PlyCount = turnToPly(def.moveNo, pos.WhoMove) - 1;

        return true;
    }

    public static fromPosition(pos: Position, flag: FenFormat = FenFormat.complete) {
        let fen = "";
        let pB: Pieces.Piece | Pieces.Empty;

        const board = pos.Board;
        for (let rank = 7; rank >= 0; rank--) {
            let NOPIECERun = 0;
            if (rank !== 7) { fen += "/"; }
            for (let fyle: Squares.Fyle = 0; fyle <= 7; fyle++) {
                pB = board[Square.create(fyle as Squares.Fyle, rank as Squares.Rank)];
                if (pB !== Piece.None) {
                    if (NOPIECERun > 0) { fen += NOPIECERun.toString(); }
                    NOPIECERun = 0;
                    fen += FP_p2f[pB];
                } else {
                    NOPIECERun++;
                }
            }
            if (NOPIECERun) { fen += NOPIECERun.toString(); }
        }

        if (flag >= FenFormat.color) {
            fen += " " + Color.toChar(pos.WhoMove);

            if (flag >= FenFormat.castlingEp) {
                fen += " " + pos.Castling.asFen();
        
                if (pos.EpTarget === Square.NullSquare) {
                    fen += " -";
                } else {
                    fen += " ";
                    fen += Square.name(pos.EpTarget);
                }

                if (flag >= FenFormat.complete) {
                    fen += " " + pos.HalfMoveCount.toString();
                    fen += " " + (Math.floor(pos.PlyCount / 2) + 1).toString();
                }
            }
        }

        return fen;
    }
}
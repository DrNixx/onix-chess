import repeat from 'lodash-es/repeat';
import toSafeInteger from 'lodash-es/toSafeInteger';
import { Hashtable } from 'onix-core/dist/Hashtable';
import { Piece } from './Piece';
import { Position } from './Position';
import { Square } from './Square';
import { Color } from './Color';
import { Castle } from './Castle';

// Forsite to piece map
const fenPieces: Hashtable<number> = {
    "1": Piece.NoPiece,
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
FP_p2f[Piece.NoPiece] = "1";
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

function fen2Piece(fenCharacter: string): number
{
    return (fenPieces[fenCharacter]) ? fenPieces[fenCharacter] : Piece.NoPiece;
}

function fenToSquare(sq: number): number
{
    return ((7 - Math.floor(sq / 8)) * 8 + (sq % 8));
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
    complete = 3,
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
                result += (tok[1] === "b") ? " b" : " w";

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

    public static toPosition(pos: Position, fen: string, forceCastling: boolean = true) {
        fen = normalizeFen(fen);

        const tok = fen.split(/\s+/);
        let board_text = String(tok[0]);
        let i: number = 0;
        let sq: number = 0;

        // replace NOPIECE square with repeated "1" string
        for (i = 2; i <= 8; i++) {
            const re = new RegExp(String(i), "g");
            board_text = board_text.replace(re,  repeat("1", i));
        }

        // remove slashes
        board_text = board_text.replace(/\//g, "");
        if (board_text.length !== 64) {
            return false;
        }

        pos.clear();

        for (sq = 0; sq < 64; sq++) {
            const p = fen2Piece(board_text.charAt(sq));
            if (p !== Piece.NoPiece) {
                pos.addPiece(p, fenToSquare(sq));
            }
        }

        if (tok.length > 1) {
            // now the side to move:
            pos.WhoMove = (tok[1] === "b") ? Color.Black : Color.White;
        }
        
        const board = pos.Board;

        pos.Castling = 0;
        if ((tok.length > 2) || forceCastling) {
            if (tok[2] === "-") {
                // do nothing
            } else if (!tok[2] || (tok[2] === " ")) {
                // the FEN has no castling field, so just guess that
                // castling is possible whenever a king and rook are
                // still on their starting squares:
                if (board[4] === Piece.WKing) {
                    if (board[0] === Piece.WRook) {
                        pos.setCastling(Color.White, Castle.QSide, true);
                    }
    
                    if (board[7] === Piece.WRook) {
                        pos.setCastling(Color.White, Castle.KSide, true);
                    }
                }
                if (board[60] === Piece.BKing) {
                    if (board[56] === Piece.BRook) {
                        pos.setCastling(Color.Black, Castle.QSide, true);
                    }
    
                    if (board[63] === Piece.BRook) {
                        pos.setCastling(Color.Black, Castle.KSide, true);
                    }
                }
            } else {
                for (i = 0; i < tok[2].length; i++) {
                    if (tok[2].charAt(i) === "K") {
                        pos.setCastling(Color.White, Castle.KSide, true);
                    }
    
                    if (tok[2].charAt(i) === "Q") {
                        pos.setCastling(Color.White, Castle.QSide, true);
                    }
    
                    if (tok[2].charAt(i) === "k") {
                        pos.setCastling(Color.Black, Castle.KSide, true);
                    }
    
                    if (tok[2].charAt(i) === "q") {
                        pos.setCastling(Color.Black, Castle.QSide, true);
                    }
                }
            }    
        }
        
        if (tok.length > 3) {
            if (tok[3].charAt(0) === "-") {
                pos.EpTarget = Square.NullSquare;
            } else {
                const fylec = tok[3].charAt(0);
                if (fylec < "a" || fylec > "h") {
                    return false;
                }
                const rankc = tok[3].charAt(1);
                if (rankc !== "3" && rankc !== "6") {
                    return false;
                }
                pos.EpTarget = Square.create(Square.fyleFromChar(fylec), Square.rankFromChar(rankc));
            }
        }

        pos.HalfMoveCount = (tok.length > 4) ? toSafeInteger(tok[4]) : 0;

        if (tok.length > 5) {
            i = toSafeInteger(tok[5]);
            if (i >= 1) {
                pos.setMoveNo(i);
            }
        }

        return true;
    }

    public static fromPosition(pos: Position, flag: FenFormat = FenFormat.complete) {
        let fen = "";
        let pB: number;

        const board = pos.Board;
        for (let rank = 7; rank >= 0; rank--) {
            let NOPIECERun = 0;
            if (rank !== 7) { fen += "/"; }
            for (let fyle = 0; fyle <= 7; fyle++) {
                pB = board[Square.create(fyle, rank)];
                if (pB !== Piece.NoPiece) {
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
            fen += (pos.WhoMove == Color.Black ? " b" : " w");

            if (flag >= FenFormat.castlingEp) {
                if (pos.Castling === 0) {
                    fen += " -";
                } else {
                    fen += " ";
                    if (pos.getCastling(Color.White, Castle.KSide)) {
                        fen += "K";
                    }
        
                    if (pos.getCastling(Color.White, Castle.QSide)) {
                        fen += "Q";
                    }
        
                    if (pos.getCastling(Color.Black, Castle.KSide)) {
                        fen += "k";
                    }
        
                    if (pos.getCastling(Color.Black, Castle.QSide)) {
                        fen += "q";
                    }
                }
        
                if (pos.EpTarget === Square.NullSquare) {
                    fen += " -";
                } else {
                    fen += " ";
                    fen += Square.squareName(pos.EpTarget);
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
import { Color } from './Color';

/**
 * Zero (empty) piece
 */
const noPiece: number = 0x07;

const PIECE_IS_SLIDER: boolean[] = [false, false, true, true, true, false, false, false];
const PIECE_CHARS: string[] = ["x", "K", "Q", "R", "B", "N", "P", ".", "x", "k", "q", "r", "b", "n", "p", "x"];
const PIECE_NAMES: string[] = ["xx", "wk", "wq", "wr", "wb", "wn", "wp", "xx", "xx", "bk", "bq", "br", "bb", "bn", "bp"];

/**
 * Chess piece
 */
export class Piece {
    /* tslint:disable:no-bitwise */

    // Piece types (without color): ============
    public static King: number = 0x01;
    public static Queen: number = 0x02;
    public static Rook: number = 0x03;
    public static Bishop: number = 0x04;
    public static Knight: number = 0x05;
    public static Pawn: number = 0x06;
    public static NoPiece: number = noPiece;

    // White pieces: ============
    public static WKing: number = 0x01;
    public static WQueen: number = 0x02;
    public static WRook: number = 0x03;
    public static WBishop: number = 0x04;
    public static WKnight: number = 0x05;
    public static WPawn: number = 0x06;

    // Black pieces: ============
    public static BKing: number = 0x09;
    public static BQueen: number = 0x0A;
    public static BRook: number = 0x0B;
    public static BBishop: number = 0x0C;
    public static BKnight: number = 0x0D;
    public static BPawn: number = 0x0E;

    public static Score = [9999, 10, 6, 3, 3, 1];

    /**
     * Return piece type.
     */
    public static type(p: number): number {
        return (p & 0x07);
    }

    /**
     * Return piece color.
     * If piece is invalid or empty return [[Color.NoColor]].
     */
    public static color(p: number): number {
        return (p === noPiece) ? Color.NoColor : ((p & 0x08) >> 3);
    }

    /**
     * Return piece color for valid piece
     */
    public static colorNotEmpty(p: number): number {
        return ((p & 0x08) >> 3);
    }

    /**
     * Make colored piece.
     * @param c piece color
     * @param p piece type
     */
    public static create(c: number, p: number): number {
        return (p === noPiece) ? noPiece : ((c << 3) | (p & 0x07));
    }

    /**
     * Return true, if piece can slide moves.
     */
    public static isSlider(p: number): boolean {
        return PIECE_IS_SLIDER[Piece.type(p)];
    }

    /**
     * Return piece type from piece char.
     */
    public static typeFromChar(pc: string): number {
        switch (pc) {
            case "k": return Piece.King;
            case "q": return Piece.Queen;
            case "r": return Piece.Rook;
            case "n": return Piece.Knight;
            case "b": return Piece.Bishop;
            case "p": return Piece.Pawn;
            default: return noPiece;
        }
    }

    /**
     * Return piece char.
     * White pieces will be returns uppercased, black lowercased.
     */
    public static toChar(p: number): string {
        return PIECE_CHARS[p];
    }

    /**
     * Return uppercased piece char.
     */
    public static toUpperChar(p: number): string {
        var pt = Piece.type(p);
        switch (pt) {
            case Piece.King: return "K";
            case Piece.Queen: return "Q";
            case Piece.Rook: return "R";
            case Piece.Knight: return "N";
            case Piece.Bishop: return "B";
            case Piece.Pawn: return "P";
            default: return "";
        }
    }

    public static pieceName(p: number): string {
        return PIECE_NAMES[p];
    }

    /* tslint:enable:no-bitwise */
}
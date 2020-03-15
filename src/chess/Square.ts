import { Color } from './Color';
import { Direction } from './Direction';

/**
 * Zero (invalid) square
 */
const ns: number = 65;

/**
 * Fyle's names
 */
const hqs: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

/**
 * Conver square number to name
 */
function notation_Pos2Note(pos: number): string {
    return hqs[pos % 8] + Math.ceil((pos + 1) / 8).toString();
}

/**
 * Last square for moves.
 */
const __squareLast: number[][] = [
    [ns, 56, 0, ns, 0, 0, 0, ns, 7, 63, 0],
    [ns, 57, 1, ns, 0, 8, 1, ns, 7, 55, 1],
    [ns, 58, 2, ns, 0, 16, 2, ns, 7, 47, 2],
    [ns, 59, 3, ns, 0, 24, 3, ns, 7, 39, 3],
    [ns, 60, 4, ns, 0, 32, 4, ns, 7, 31, 4],
    [ns, 61, 5, ns, 0, 40, 5, ns, 7, 23, 5],
    [ns, 62, 6, ns, 0, 48, 6, ns, 7, 15, 6],
    [ns, 63, 7, ns, 0, 56, 7, ns, 7, 7, 7],
    [ns, 56, 0, ns, 8, 8, 8, ns, 15, 62, 1],
    [ns, 57, 1, ns, 8, 16, 0, ns, 15, 63, 2],
    [ns, 58, 2, ns, 8, 24, 1, ns, 15, 55, 3],
    [ns, 59, 3, ns, 8, 32, 2, ns, 15, 47, 4],
    [ns, 60, 4, ns, 8, 40, 3, ns, 15, 39, 5],
    [ns, 61, 5, ns, 8, 48, 4, ns, 15, 31, 6],
    [ns, 62, 6, ns, 8, 56, 5, ns, 15, 23, 7],
    [ns, 63, 7, ns, 8, 57, 6, ns, 15, 15, 15],
    [ns, 56, 0, ns, 16, 16, 16, ns, 23, 61, 2],
    [ns, 57, 1, ns, 16, 24, 8, ns, 23, 62, 3],
    [ns, 58, 2, ns, 16, 32, 0, ns, 23, 63, 4],
    [ns, 59, 3, ns, 16, 40, 1, ns, 23, 55, 5],
    [ns, 60, 4, ns, 16, 48, 2, ns, 23, 47, 6],
    [ns, 61, 5, ns, 16, 56, 3, ns, 23, 39, 7],
    [ns, 62, 6, ns, 16, 57, 4, ns, 23, 31, 15],
    [ns, 63, 7, ns, 16, 58, 5, ns, 23, 23, 23],
    [ns, 56, 0, ns, 24, 24, 24, ns, 31, 60, 3],
    [ns, 57, 1, ns, 24, 32, 16, ns, 31, 61, 4],
    [ns, 58, 2, ns, 24, 40, 8, ns, 31, 62, 5],
    [ns, 59, 3, ns, 24, 48, 0, ns, 31, 63, 6],
    [ns, 60, 4, ns, 24, 56, 1, ns, 31, 55, 7],
    [ns, 61, 5, ns, 24, 57, 2, ns, 31, 47, 15],
    [ns, 62, 6, ns, 24, 58, 3, ns, 31, 39, 23],
    [ns, 63, 7, ns, 24, 59, 4, ns, 31, 31, 31],
    [ns, 56, 0, ns, 32, 32, 32, ns, 39, 59, 4],
    [ns, 57, 1, ns, 32, 40, 24, ns, 39, 60, 5],
    [ns, 58, 2, ns, 32, 48, 16, ns, 39, 61, 6],
    [ns, 59, 3, ns, 32, 56, 8, ns, 39, 62, 7],
    [ns, 60, 4, ns, 32, 57, 0, ns, 39, 63, 15],
    [ns, 61, 5, ns, 32, 58, 1, ns, 39, 55, 23],
    [ns, 62, 6, ns, 32, 59, 2, ns, 39, 47, 31],
    [ns, 63, 7, ns, 32, 60, 3, ns, 39, 39, 39],
    [ns, 56, 0, ns, 40, 40, 40, ns, 47, 58, 5],
    [ns, 57, 1, ns, 40, 48, 32, ns, 47, 59, 6],
    [ns, 58, 2, ns, 40, 56, 24, ns, 47, 60, 7],
    [ns, 59, 3, ns, 40, 57, 16, ns, 47, 61, 15],
    [ns, 60, 4, ns, 40, 58, 8, ns, 47, 62, 23],
    [ns, 61, 5, ns, 40, 59, 0, ns, 47, 63, 31],
    [ns, 62, 6, ns, 40, 60, 1, ns, 47, 55, 39],
    [ns, 63, 7, ns, 40, 61, 2, ns, 47, 47, 47],
    [ns, 56, 0, ns, 48, 48, 48, ns, 55, 57, 6],
    [ns, 57, 1, ns, 48, 56, 40, ns, 55, 58, 7],
    [ns, 58, 2, ns, 48, 57, 32, ns, 55, 59, 15],
    [ns, 59, 3, ns, 48, 58, 24, ns, 55, 60, 23],
    [ns, 60, 4, ns, 48, 59, 16, ns, 55, 61, 31],
    [ns, 61, 5, ns, 48, 60, 8, ns, 55, 62, 39],
    [ns, 62, 6, ns, 48, 61, 0, ns, 55, 63, 47],
    [ns, 63, 7, ns, 48, 62, 1, ns, 55, 55, 55],
    [ns, 56, 0, ns, 56, 56, 56, ns, 63, 56, 7],
    [ns, 57, 1, ns, 56, 57, 48, ns, 63, 57, 15],
    [ns, 58, 2, ns, 56, 58, 40, ns, 63, 58, 23],
    [ns, 59, 3, ns, 56, 59, 32, ns, 63, 59, 31],
    [ns, 60, 4, ns, 56, 60, 24, ns, 63, 60, 39],
    [ns, 61, 5, ns, 56, 61, 16, ns, 63, 61, 47],
    [ns, 62, 6, ns, 56, 62, 8, ns, 63, 62, 55],
    [ns, 63, 7, ns, 56, 63, 0, ns, 63, 63, 63],
    [ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns],
    [ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns]];

/**
 * Knight moves
 */
const __knightAttacks: number[][] = [
    [10, 17, ns, ns, ns, ns, ns, ns, ns],
    [11, 16, 18, ns, ns, ns, ns, ns, ns],
    [8, 12, 17, 19, ns, ns, ns, ns, ns],
    [9, 13, 18, 20, ns, ns, ns, ns, ns],
    [10, 14, 19, 21, ns, ns, ns, ns, ns],
    [11, 15, 20, 22, ns, ns, ns, ns, ns],
    [12, 21, 23, ns, ns, ns, ns, ns, ns],
    [13, 22, ns, ns, ns, ns, ns, ns, ns],
    [2, 18, 25, ns, ns, ns, ns, ns, ns],
    [3, 19, 24, 26, ns, ns, ns, ns, ns],
    [0, 4, 16, 20, 25, 27, ns, ns, ns],
    [1, 5, 17, 21, 26, 28, ns, ns, ns],
    [2, 6, 18, 22, 27, 29, ns, ns, ns],
    [3, 7, 19, 23, 28, 30, ns, ns, ns],
    [4, 20, 29, 31, ns, ns, ns, ns, ns],
    [5, 21, 30, ns, ns, ns, ns, ns, ns],
    [1, 10, 26, 33, ns, ns, ns, ns, ns],
    [0, 2, 11, 27, 32, 34, ns, ns, ns],
    [1, 3, 8, 12, 24, 28, 33, 35, ns],
    [2, 4, 9, 13, 25, 29, 34, 36, ns],
    [3, 5, 10, 14, 26, 30, 35, 37, ns],
    [4, 6, 11, 15, 27, 31, 36, 38, ns],
    [5, 7, 12, 28, 37, 39, ns, ns, ns],
    [6, 13, 29, 38, ns, ns, ns, ns, ns],
    [9, 18, 34, 41, ns, ns, ns, ns, ns],
    [8, 10, 19, 35, 40, 42, ns, ns, ns],
    [9, 11, 16, 20, 32, 36, 41, 43, ns],
    [10, 12, 17, 21, 33, 37, 42, 44, ns],
    [11, 13, 18, 22, 34, 38, 43, 45, ns],
    [12, 14, 19, 23, 35, 39, 44, 46, ns],
    [13, 15, 20, 36, 45, 47, ns, ns, ns],
    [14, 21, 37, 46, ns, ns, ns, ns, ns],
    [17, 26, 42, 49, ns, ns, ns, ns, ns],
    [16, 18, 27, 43, 48, 50, ns, ns, ns],
    [17, 19, 24, 28, 40, 44, 49, 51, ns],
    [18, 20, 25, 29, 41, 45, 50, 52, ns],
    [19, 21, 26, 30, 42, 46, 51, 53, ns],
    [20, 22, 27, 31, 43, 47, 52, 54, ns],
    [21, 23, 28, 44, 53, 55, ns, ns, ns],
    [22, 29, 45, 54, ns, ns, ns, ns, ns],
    [25, 34, 50, 57, ns, ns, ns, ns, ns],
    [24, 26, 35, 51, 56, 58, ns, ns, ns],
    [25, 27, 32, 36, 48, 52, 57, 59, ns],
    [26, 28, 33, 37, 49, 53, 58, 60, ns],
    [27, 29, 34, 38, 50, 54, 59, 61, ns],
    [28, 30, 35, 39, 51, 55, 60, 62, ns],
    [29, 31, 36, 52, 61, 63, ns, ns, ns],
    [30, 37, 53, 62, ns, ns, ns, ns, ns],
    [33, 42, 58, ns, ns, ns, ns, ns, ns],
    [32, 34, 43, 59, ns, ns, ns, ns, ns],
    [33, 35, 40, 44, 56, 60, ns, ns, ns],
    [34, 36, 41, 45, 57, 61, ns, ns, ns],
    [35, 37, 42, 46, 58, 62, ns, ns, ns],
    [36, 38, 43, 47, 59, 63, ns, ns, ns],
    [37, 39, 44, 60, ns, ns, ns, ns, ns],
    [38, 45, 61, ns, ns, ns, ns, ns, ns],
    [41, 50, ns, ns, ns, ns, ns, ns, ns],
    [40, 42, 51, ns, ns, ns, ns, ns, ns],
    [41, 43, 48, 52, ns, ns, ns, ns, ns],
    [42, 44, 49, 53, ns, ns, ns, ns, ns],
    [43, 45, 50, 54, ns, ns, ns, ns, ns],
    [44, 46, 51, 55, ns, ns, ns, ns, ns],
    [45, 47, 52, ns, ns, ns, ns, ns, ns],
    [46, 53, ns, ns, ns, ns, ns, ns, ns],
    [ns, ns, ns, ns, ns, ns, ns, ns, ns],
    [ns, ns, ns, ns, ns, ns, ns, ns, ns]];

/**
 * King moves
 */
const __kingAttacks: number[][] = [
    [1, 8, 9, ns, ns, ns, ns, ns, ns],
    [0, 2, 8, 9, 10, ns, ns, ns, ns],
    [1, 3, 9, 10, 11, ns, ns, ns, ns],
    [2, 4, 10, 11, 12, ns, ns, ns, ns],
    [3, 5, 11, 12, 13, ns, ns, ns, ns],
    [4, 6, 12, 13, 14, ns, ns, ns, ns],
    [5, 7, 13, 14, 15, ns, ns, ns, ns],
    [6, 14, 15, ns, ns, ns, ns, ns, ns],
    [0, 1, 9, 16, 17, ns, ns, ns, ns],
    [0, 1, 2, 8, 10, 16, 17, 18, ns],
    [1, 2, 3, 9, 11, 17, 18, 19, ns],
    [2, 3, 4, 10, 12, 18, 19, 20, ns],
    [3, 4, 5, 11, 13, 19, 20, 21, ns],
    [4, 5, 6, 12, 14, 20, 21, 22, ns],
    [5, 6, 7, 13, 15, 21, 22, 23, ns],
    [6, 7, 14, 22, 23, ns, ns, ns, ns],
    [8, 9, 17, 24, 25, ns, ns, ns, ns],
    [8, 9, 10, 16, 18, 24, 25, 26, ns],
    [9, 10, 11, 17, 19, 25, 26, 27, ns],
    [10, 11, 12, 18, 20, 26, 27, 28, ns],
    [11, 12, 13, 19, 21, 27, 28, 29, ns],
    [12, 13, 14, 20, 22, 28, 29, 30, ns],
    [13, 14, 15, 21, 23, 29, 30, 31, ns],
    [14, 15, 22, 30, 31, ns, ns, ns, ns],
    [16, 17, 25, 32, 33, ns, ns, ns, ns],
    [16, 17, 18, 24, 26, 32, 33, 34, ns],
    [17, 18, 19, 25, 27, 33, 34, 35, ns],
    [18, 19, 20, 26, 28, 34, 35, 36, ns],
    [19, 20, 21, 27, 29, 35, 36, 37, ns],
    [20, 21, 22, 28, 30, 36, 37, 38, ns],
    [21, 22, 23, 29, 31, 37, 38, 39, ns],
    [22, 23, 30, 38, 39, ns, ns, ns, ns],
    [24, 25, 33, 40, 41, ns, ns, ns, ns],
    [24, 25, 26, 32, 34, 40, 41, 42, ns],
    [25, 26, 27, 33, 35, 41, 42, 43, ns],
    [26, 27, 28, 34, 36, 42, 43, 44, ns],
    [27, 28, 29, 35, 37, 43, 44, 45, ns],
    [28, 29, 30, 36, 38, 44, 45, 46, ns],
    [29, 30, 31, 37, 39, 45, 46, 47, ns],
    [30, 31, 38, 46, 47, ns, ns, ns, ns],
    [32, 33, 41, 48, 49, ns, ns, ns, ns],
    [32, 33, 34, 40, 42, 48, 49, 50, ns],
    [33, 34, 35, 41, 43, 49, 50, 51, ns],
    [34, 35, 36, 42, 44, 50, 51, 52, ns],
    [35, 36, 37, 43, 45, 51, 52, 53, ns],
    [36, 37, 38, 44, 46, 52, 53, 54, ns],
    [37, 38, 39, 45, 47, 53, 54, 55, ns],
    [38, 39, 46, 54, 55, ns, ns, ns, ns],
    [40, 41, 49, 56, 57, ns, ns, ns, ns],
    [40, 41, 42, 48, 50, 56, 57, 58, ns],
    [41, 42, 43, 49, 51, 57, 58, 59, ns],
    [42, 43, 44, 50, 52, 58, 59, 60, ns],
    [43, 44, 45, 51, 53, 59, 60, 61, ns],
    [44, 45, 46, 52, 54, 60, 61, 62, ns],
    [45, 46, 47, 53, 55, 61, 62, 63, ns],
    [46, 47, 54, 62, 63, ns, ns, ns, ns],
    [48, 49, 57, ns, ns, ns, ns, ns, ns],
    [48, 49, 50, 56, 58, ns, ns, ns, ns],
    [49, 50, 51, 57, 59, ns, ns, ns, ns],
    [50, 51, 52, 58, 60, ns, ns, ns, ns],
    [51, 52, 53, 59, 61, ns, ns, ns, ns],
    [52, 53, 54, 60, 62, ns, ns, ns, ns],
    [53, 54, 55, 61, 63, ns, ns, ns, ns],
    [54, 55, 62, ns, ns, ns, ns, ns, ns],
    [ns, ns, ns, ns, ns, ns, ns, ns, ns],
    [ns, ns, ns, ns, ns, ns, ns, ns, ns]];

const __rankFyleDist: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7,
    1, 0, 1, 2, 3, 4, 5, 6,
    2, 1, 0, 1, 2, 3, 4, 5,
    3, 2, 1, 0, 1, 2, 3, 4,
    4, 3, 2, 1, 0, 1, 2, 3,
    5, 4, 3, 2, 1, 0, 1, 2,
    6, 5, 4, 3, 2, 1, 0, 1,
    7, 6, 5, 4, 3, 2, 1, 0];

const squareLast = (sq: number, dir: number) => {
    return __squareLast[sq][dir];
};

/**
 * Chess board squares.
 * A1 = 0, B1 = 1, C1 = 2, ... G8 =62, H8 =63, 
 * COLOR_SQUARE = 64, NULL_SQUARE = 65
 */
export class Square {
    /* tslint:disable:no-bitwise */

    public static NullSquare: number = ns;

    public static fyle(sq: number): number {
        return (sq & 0x7);
    }

    public static rank(sq: number): number {
        return ((sq >> 3) & 0x7);
    }

    public static create(f: number, r: number): number {
        return ((r << 3) | f);
    }

    public static rankFromChar(c: string): number {
        /* tslint:disable:no-eval */
        return (c < "1" || c > "8") ? ns : (eval(c) - 1);
        /* tslint:enable:no-eval */
    }

    public static fyleFromChar(c: string): number {
        return (c < "a" || c > "h") ? ns : (c.charCodeAt(0) - "a".charCodeAt(0));
    }

    public static leftDiag(sq: number): number {
        return Square.rank(sq) + Square.fyle(sq);
    }

    public static rightDiag(sq: number): number {
        return (7 + Square.rank(sq) - Square.fyle(sq));
    }

    public static color(sq: number): number {
        return 1 - (Square.leftDiag(sq) & 1);
    }

    public static colorChar(sq: number): string {
        return (Square.color(sq) === Color.Black) ? Color.BlackChar : Color.WhiteChar;
    }

    public static rankChar(sq: number): string {
        return (Square.rank(sq) + 1).toString();
    }

    public static fyleChar(sq: number) {
        return hqs[Square.fyle(sq)];
    }

    public static parse(sq: string) {
        if (sq && sq.length === 2) {
            return Square.create(Square.fyleFromChar(sq[0]), Square.rankFromChar(sq[1]));
        }

        return ns;
    }

    public static squareName(s: number) {
        return notation_Pos2Note(s);
    }

    /**
     * returns true if the two squares are adjacent. 
     * Note that diagonal adjacency is included: a1 and b2 are adjacent. 
     * Also note that a square is adjacent to itself.
     */
    public static adjacent(from: number, to: number): boolean {
        const fromRank = Square.rank(from);
        const toRank = Square.rank(to);
        const rdist = fromRank - toRank;
        if (rdist < -1 || rdist > 1) {
            return false;
        }

        const fromFyle = Square.fyle(from);
        const toFyle = Square.fyle(to);
        const fdist = fromFyle - toFyle;
        if (fdist < -1 || fdist > 1) {
            return false;
        }

        return true;
    }

    /**
     * Get direction for move from square @fr to square @to.
     */
    public static direction(fr: number, to: number): number {
        return Direction.squareDirection(fr, to);
    }

    public static move(sq: number, dir: number) {
        return Direction.squareMove(sq, dir);
    }

    public static last(sq: number, dir: number) {
        return squareLast(sq, dir);
    }

    public static isKnightHop(from: number, to: number) {
        const rdist = __rankFyleDist[(Square.rank(from) << 3) | Square.rank(to)];
        const fdist = __rankFyleDist[(Square.fyle(from) << 3) | Square.fyle(to)];
        // it is a knight hop only if one distance is two squares and the
        // other is one square -- that is, only if their product equals two.
        return ((rdist * fdist) === 2);
    }

    public static knightAttack(from: number, to: number) {
        return __knightAttacks[from][to];
    }

    public static knightAttacks(from: number): number[] {
        return __knightAttacks[from];
    }

    public static kingAttack(from: number, to: number): number {
        return __kingAttacks[from][to];
    }

    public static kingAttacks(from: number) {
        return __kingAttacks[from];
    }

    /* tslint:enable:no-bitwise */
}
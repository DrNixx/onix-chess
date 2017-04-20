/**
 * Zero (invalid) square
 */
const ns: number = 65;

// None
const NULL_DIR: number = 0;
// Up
const UP: number = 1;
// Down
const DOWN: number = 2;
// Left
const LEFT: number = 4;
// Right
const RIGHT: number = 8;

/* tslint:disable:no-bitwise */

// Up/Left
const UP_LEFT: number = (UP | LEFT);
// Up/Right
const UP_RIGHT: number = (UP | RIGHT);
// Down/Left
const DOWN_LEFT: number = (DOWN | LEFT);
// Down/Right
const DOWN_RIGHT: number = (DOWN | RIGHT);

/* tslint:enable:no-bitwise */

/**
 * Opposite move's directions.
 */
const __dirOpposite: number[] = [
    NULL_DIR,
    DOWN,        // opposite of UP (1)
    UP,          // opposite of DOWN (2)
    NULL_DIR,
    RIGHT,       // opposite of LEFT (4)
    DOWN_RIGHT,  // opposite of UP_LEFT (5)
    UP_RIGHT,    // opposite of DOWN_LEFT (6)
    NULL_DIR,
    LEFT,        // opposite of RIGHT (8)
    DOWN_LEFT,   // opposite of UP_RIGHT (9)
    UP_LEFT      // opposite of DOWN_RIGHT (10)
];

/**
 * Slider moves flags.
 */
const __dirIsDiagonal: boolean[] = [
    false,   //  0 = for NULL_DIR
    false,   //  1 = for UP
    false,   //  2 = for DOWN
    false,   //  3 = invalid
    false,   //  4 = for LEFT
    true,    //  5 = for UP_LEFT
    true,    //  6 = for DOWN_LEFT
    false,   //  7 = invalid
    false,   //  8 = for RIGHT
    true,    //  9 = for UP_RIGHT
    true     // 10 = for DOWN_RIGHT
];

/**
 * Movment distance
 */
const __dirDelta: number[] = [
    0,     // delta for NULL_DIR
    8,     // delta for UP
    -8,    // delta for DOWN
    0,     // invalid
    -1,    // delta for LEFT
    7,     // delta for UP_LEFT
    -9,    // delta for DOWN_LEFT
    0,     // invalid
    1,     // delta for RIGHT
    9,     // delta for UP_RIGHT
    -7     // delta for DOWN_RIGHT
];

/**
 * Allowed moves for squares.
 */
const __squareMoves: number[][] = [
    [ns, 8, ns, ns, ns, ns, ns, ns, 1, 9, ns],  // A1
    [ns, 9, ns, ns, 0, 8, ns, ns, 2, 10, ns],   // A2
    [ns, 10, ns, ns, 1, 9, ns, ns, 3, 11, ns],  // A3
    [ns, 11, ns, ns, 2, 10, ns, ns, 4, 12, ns],
    [ns, 12, ns, ns, 3, 11, ns, ns, 5, 13, ns],
    [ns, 13, ns, ns, 4, 12, ns, ns, 6, 14, ns],
    [ns, 14, ns, ns, 5, 13, ns, ns, 7, 15, ns],
    [ns, 15, ns, ns, 6, 14, ns, ns, ns, ns, ns],
    [ns, 16, 0, ns, ns, ns, ns, ns, 9, 17, 1],
    [ns, 17, 1, ns, 8, 16, 0, ns, 10, 18, 2],
    [ns, 18, 2, ns, 9, 17, 1, ns, 11, 19, 3],
    [ns, 19, 3, ns, 10, 18, 2, ns, 12, 20, 4],
    [ns, 20, 4, ns, 11, 19, 3, ns, 13, 21, 5],
    [ns, 21, 5, ns, 12, 20, 4, ns, 14, 22, 6],
    [ns, 22, 6, ns, 13, 21, 5, ns, 15, 23, 7],
    [ns, 23, 7, ns, 14, 22, 6, ns, ns, ns, ns],
    [ns, 24, 8, ns, ns, ns, ns, ns, 17, 25, 9],
    [ns, 25, 9, ns, 16, 24, 8, ns, 18, 26, 10],
    [ns, 26, 10, ns, 17, 25, 9, ns, 19, 27, 11],
    [ns, 27, 11, ns, 18, 26, 10, ns, 20, 28, 12],
    [ns, 28, 12, ns, 19, 27, 11, ns, 21, 29, 13],
    [ns, 29, 13, ns, 20, 28, 12, ns, 22, 30, 14],
    [ns, 30, 14, ns, 21, 29, 13, ns, 23, 31, 15],
    [ns, 31, 15, ns, 22, 30, 14, ns, ns, ns, ns],
    [ns, 32, 16, ns, ns, ns, ns, ns, 25, 33, 17],
    [ns, 33, 17, ns, 24, 32, 16, ns, 26, 34, 18],
    [ns, 34, 18, ns, 25, 33, 17, ns, 27, 35, 19],
    [ns, 35, 19, ns, 26, 34, 18, ns, 28, 36, 20],
    [ns, 36, 20, ns, 27, 35, 19, ns, 29, 37, 21],
    [ns, 37, 21, ns, 28, 36, 20, ns, 30, 38, 22],
    [ns, 38, 22, ns, 29, 37, 21, ns, 31, 39, 23],
    [ns, 39, 23, ns, 30, 38, 22, ns, ns, ns, ns],
    [ns, 40, 24, ns, ns, ns, ns, ns, 33, 41, 25],
    [ns, 41, 25, ns, 32, 40, 24, ns, 34, 42, 26],
    [ns, 42, 26, ns, 33, 41, 25, ns, 35, 43, 27],
    [ns, 43, 27, ns, 34, 42, 26, ns, 36, 44, 28],
    [ns, 44, 28, ns, 35, 43, 27, ns, 37, 45, 29],
    [ns, 45, 29, ns, 36, 44, 28, ns, 38, 46, 30],
    [ns, 46, 30, ns, 37, 45, 29, ns, 39, 47, 31],
    [ns, 47, 31, ns, 38, 46, 30, ns, ns, ns, ns],
    [ns, 48, 32, ns, ns, ns, ns, ns, 41, 49, 33],
    [ns, 49, 33, ns, 40, 48, 32, ns, 42, 50, 34],
    [ns, 50, 34, ns, 41, 49, 33, ns, 43, 51, 35],
    [ns, 51, 35, ns, 42, 50, 34, ns, 44, 52, 36],
    [ns, 52, 36, ns, 43, 51, 35, ns, 45, 53, 37],
    [ns, 53, 37, ns, 44, 52, 36, ns, 46, 54, 38],
    [ns, 54, 38, ns, 45, 53, 37, ns, 47, 55, 39],
    [ns, 55, 39, ns, 46, 54, 38, ns, ns, ns, ns],
    [ns, 56, 40, ns, ns, ns, ns, ns, 49, 57, 41],
    [ns, 57, 41, ns, 48, 56, 40, ns, 50, 58, 42],
    [ns, 58, 42, ns, 49, 57, 41, ns, 51, 59, 43],
    [ns, 59, 43, ns, 50, 58, 42, ns, 52, 60, 44],
    [ns, 60, 44, ns, 51, 59, 43, ns, 53, 61, 45],
    [ns, 61, 45, ns, 52, 60, 44, ns, 54, 62, 46],
    [ns, 62, 46, ns, 53, 61, 45, ns, 55, 63, 47],
    [ns, 63, 47, ns, 54, 62, 46, ns, ns, ns, ns],
    [ns, ns, 48, ns, ns, ns, ns, ns, 57, ns, 49],
    [ns, ns, 49, ns, 56, ns, 48, ns, 58, ns, 50],
    [ns, ns, 50, ns, 57, ns, 49, ns, 59, ns, 51],
    [ns, ns, 51, ns, 58, ns, 50, ns, 60, ns, 52],
    [ns, ns, 52, ns, 59, ns, 51, ns, 61, ns, 53],
    [ns, ns, 53, ns, 60, ns, 52, ns, 62, ns, 54],
    [ns, ns, 54, ns, 61, ns, 53, ns, 63, ns, 55],
    [ns, ns, 55, ns, 62, ns, 54, ns, ns, ns, ns],
    [ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns],
    [ns, ns, ns, ns, ns, ns, ns, ns, ns, ns, ns]]; // H8

const squareMove = (sq: number, dir: number) => {
    return __squareMoves[sq][dir];
};

/**
 * Matrix for movment.
 */
var __sqDir: number[][];

/**
 * Initialize matrix.
 */
function initializeDirections(): void {
    __sqDir = [];
    var i: number,
        j: number,
        __dirArray = [
            UP,
            DOWN,
            LEFT,
            RIGHT,
            UP_LEFT,
            UP_RIGHT,
            DOWN_LEFT,
            DOWN_RIGHT,
            NULL_DIR
        ];

    // Fill matrix with null direction
    for (i = 0; i <= ns; i++) {
        __sqDir[i] = [];
        for (j = 0; j <= ns; j++) {
            __sqDir[i][j] = NULL_DIR;
        }
    }

    // Make allowed movment now
    for (i = 0; i <= 63; i++) {
        var x = 0;
        while (__dirArray[x] !== NULL_DIR) {
            j = squareMove(i, __dirArray[x]);
            while (j !== ns) {
                __sqDir[i][j] = __dirArray[x];
                j = squareMove(j, __dirArray[x]);
            }

            x++;
        }
    }
}

// вызов инициализации матрицы перемещений.
(function () {
    initializeDirections();
})();

/**
 * Piece movment
 */
export class Direction {
    // None
    public static Null: number = NULL_DIR;
    // Up
    public static Up: number = UP;
    // Down
    public static Down: number = DOWN;
    // Left
    public static Left: number = LEFT;
    // Right
    public static Right: number = RIGHT;

    // Up/Left
    public static UpLeft: number = UP_LEFT;
    // Up/Right
    public static UpRight: number = UP_RIGHT;
    // Down/Left
    public static DownLeft: number = DOWN_LEFT;
    // Down/Right
    public static DownRight: number = DOWN_RIGHT;

    /**
     * Return opposite movment
     */
    public static opposite(d: number): number {
        return __dirOpposite[d];
    }

    /**
     * Return true, if movment is diagonal
     */
    public static isDiagonal(d: number) {
        return __dirIsDiagonal[d];
    }

    /**
     * Return distance for movment.
     */
    public static delta(d: number) {
        return __dirDelta[d];
    }

    public static squareDirection(fr: number, to: number): number {
        return __sqDir[fr][to];
    }

    public static squareMove(sq: number, dir: number): number {
        return squareMove(sq, dir);
    }
}
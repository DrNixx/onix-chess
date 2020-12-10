import cloneDeep from 'lodash-es/cloneDeep';
import indexOf from 'lodash-es/indexOf';
import { Colors, Pieces, Squares, Directions } from '../types/Types';
import { Color } from './Color';
import { Castling, CastlingSide } from './Castling';
import { Direction } from './Direction';
import { Piece } from './Piece';
import { Square } from './Square';
import { SimpleMove } from './SimpleMove';
import { FenString } from './FenString';

/** Short aliases */
const ns = Square.NullSquare;
const noPiece = Piece.None;
const { 
    Null: NULL_DIR, Up: UP,  Down: DOWN, Left: LEFT, Right: RIGHT, 
    UpLeft: UP_LEFT, UpRight: UP_RIGHT, DownLeft: DOWN_LEFT, DownRight: DOWN_RIGHT } = Direction;

function is_valid_dest(dest: Squares.Square, sqset?: Squares.Square[]) {
    return ((sqset === undefined) || indexOf(sqset, dest) !== -1);
}

export enum SanCheckLevel
{
    NoCheckTest = 0,
    CheckText = 1,
    MateTest = 2,
}

export enum GenerateMode
{
    Captures = 1,
    NonCaptures = 2,
    All = 3
}

/**
 * Chess position
 */
export class Position {
    private brd: (Pieces.Piece | Pieces.Empty)[] = [];
    private capt: number[] = [];
    private plyCnt: number = 0;
    private strictCastling: boolean = false;
    private pinned: Directions.Direction[] = [];
    private list: Squares.Square[][] = []; // list of piece squares for each side
    private listPos: number[] = []; // ListPos stores the position in list[][] for the piece on square x.
    private pieceCount: number[] = [];
    private material: number[] = [];
    private numOnRank: number[][] = [];
    private numOnFyle: number[][] = [];
    private numOnLeftDiag: number[][] = [];
    private numOnRightDiag: number[][] = [];
    private numOnSquareColor: number[][] = [];
    private wm: Colors.BW = Color.White;
    private castling: Castling = new Castling();

    public EpTarget?: Squares.Square = ns;
    public HalfMoveCount: number = 0;
    

    /**
     * @constructor
     */
    constructor(fen?: string) {
        this.clear();

        if (fen) {
            FenString.toPosition(this, fen);
        }
    }

    public clear(): void {
        this.wm = Color.White;
        this.capt = [];
        this.EpTarget = ns;
        this.castling.clear();
        this.HalfMoveCount = 0;
        this.plyCnt = 0;

        this.pieceCount[Color.White] = 0;
        this.pieceCount[Color.Black] = 0;
        this.list[Color.White] = [];
        this.list[Color.Black] = [];
        this.listPos = [];

        let i: number;
        let j: number;

        for (i = 0; i <= 64; i++) {
            this.brd[i] = noPiece;
        }

        for (i = Piece.WKing; i <= Piece.BPawn; i++) {
            this.material[i] = 0;
            this.numOnRank[i] = [];
            this.numOnFyle[i] = [];
            this.numOnLeftDiag[i] = [];
            this.numOnRightDiag[i] = [];
            this.numOnSquareColor[i] = [];

            for (j = 0; j < 8; j++) {
                this.numOnRank[i][j] = 0;
                this.numOnFyle[i][j] = 0;
            }

            for (j = 0; j < 15; j++) {
                this.numOnLeftDiag[i][j] = 0;
                this.numOnRightDiag[i][j] = 0;
            }

            this.numOnSquareColor[i][Color.White] = 0;
            this.numOnSquareColor[i][Color.Black] = 0;
        }
    }

    /**
     * Copy position
     * @param source {Position}
     */
    public copyFrom(source: Position) {
        this.brd = cloneDeep(source.brd);
        this.pieceCount = cloneDeep(source.pieceCount);
        this.listPos = cloneDeep(source.listPos);
        this.list = cloneDeep(source.list);
        this.material = cloneDeep(source.material);
        this.numOnFyle = cloneDeep(source.numOnFyle);
        this.numOnRank = cloneDeep(source.numOnRank);
        this.numOnLeftDiag = cloneDeep(source.numOnLeftDiag);
        this.numOnRightDiag = cloneDeep(source.numOnRightDiag);
        this.numOnSquareColor = cloneDeep(source.numOnSquareColor);
        this.numOnSquareColor = cloneDeep(source.numOnSquareColor);

        this.EpTarget = source.EpTarget;
        this.wm = source.wm;
        this.plyCnt = source.plyCnt;
        this.HalfMoveCount = source.HalfMoveCount;
        this.castling = source.castling.clone();
    }

    /**
     * Clone position object
     * @returns ChessPosition
     */
    public clone() {
        const sp = new Position();
        sp.copyFrom(this);
        return sp;
    }

    public get WhoMove(): Colors.BW {
        return this.wm;
    }

    public set WhoMove(value: Colors.BW) {
        this.wm = value;
    }

    /**
     * Byte board
     */
    public get Board(): (Pieces.Piece | Pieces.Empty)[] {
        return this.brd;
    }

    public get Captured(): number[] {
        return this.capt;
    }

    /**
     * Castling
     */
    public get Castling(): Castling {
        return this.castling;
    }

    /**
     * Get piece on square
     */
    getPiece = (sq: number): (Pieces.Piece | Pieces.Empty) => {
        return this.brd[sq];
    }

    /**
     * 
     */
    getPieceNum = (sq: number): number => {
        return this.listPos[sq];
    }

    /**
     * Return true if count of specified piece great than zero.
     */
    public hasPiece(p: number) {
        return this.material[p] > 0;
    }

    /**
     * Return count of specified piece.
     */
    public getPieceCount(p: number) {
        return this.material[p];
    }

    /**
     * Add piece to square
     * @param p 
     * @param sq
     * @returns Boolean
     */
    public addPiece(p: Pieces.Piece, sq: Squares.Square): boolean {
        const c = Piece.color(p);
        if (this.pieceCount[c] === 16) { return false; }

        if (Piece.type(p) === Piece.King) {
            // check there is not already a King:
            if (this.material[p] > 0) { return false; }

            // king is always at the start of the piece list, so move the piece
            // already at location 0 if there is one:
            if (this.pieceCount[c] > 0) {
                const oldsq = this.list[c][0];
                this.list[c][this.pieceCount[c]] = oldsq;
                this.listPos[oldsq] = this.pieceCount[c];
            }

            this.list[c][0] = sq;
            this.listPos[sq] = 0;
        } else {
            this.listPos[sq] = this.pieceCount[c];
            this.list[c][this.pieceCount[c]] = sq;
        }

        this.pieceCount[c]++;
        this.material[p]++;
        this.addToBoard(p, sq);
        return true;
    }

    /**
     * Remove piece from square
     * @param p
     * @param sq
     * @returns Boolean
     */
    public removePiece(p: Pieces.Piece, sq: Squares.Square): boolean {
        // TODO: check method
        const c = Piece.color(p);
        if (this.pieceCount[c] === 0) { return false; }
        if (this.material[p] === 0) { return false; }

        this.removeFromBoard(p, sq);
        this.material[p]--;
        this.pieceCount[c]--;

        if (Piece.type(p) === Piece.King) {
            this.list[c][0] = 0;
            this.listPos[sq] = 0;
        } else {
            this.listPos[sq] = this.pieceCount[c];
            this.list[c][this.pieceCount[c]] = sq;
        }

        return true;
    }

    /**
     * Return current halfmove humber
     */
    public get PlyCount(): number {
        return this.plyCnt;
    }

    /**
     * Return current halfmove humber
     */
    public set PlyCount(val: number) {
        this.plyCnt = val;
    }

    /**
     * Make the move on the board and update all the necessary 
     * fields in the simpleMove structure so it can be undone.
     * @param sm {SimpleMove}
     */
    public doSimpleMove(sm: SimpleMove): void {
        const from = Square.notEmpty(sm.from);
        const to = Square.notEmpty(sm.to);
        let piece = Piece.notEmpty(this.brd[from]);

        const ptype = Piece.type(piece);
        const enemy = Color.flip(this.wm);

        sm.pieceNum = this.listPos[from];
        sm.capturedPiece = this.brd[to];
        sm.capturedSquare = to;
        sm.castleFlags = this.castling.Flag;
        sm.epSquare = this.EpTarget;
        sm.oldHalfMoveClock = this.HalfMoveCount;

        this.HalfMoveCount++;
        this.plyCnt++;

        // handle enpassant capture:
        if ((ptype === Piece.Pawn) &&
            (sm.capturedPiece === noPiece) &&
            (Square.fyle(from) !== Square.fyle(to))) {
            // this was an EP capture. We do not need to check it was a capture
            // since if a pawn lands on EPTarget it must capture to get there.
            const enemyPawn = Piece.create(enemy, Piece.Pawn);
            sm.capturedSquare = (this.wm === Color.White ? (to - 8) as Squares.Square : (to + 8)) as Squares.Square;
            sm.capturedPiece = enemyPawn;
        }

        // handle captures:
        if (Piece.isPiece(sm.capturedPiece) && Square.isSquare(sm.capturedSquare)) {
            sm.capturedNum = this.listPos[sm.capturedSquare];
            // update opponents List of pieces
            this.pieceCount[enemy]--;
            this.listPos[this.list[enemy][this.pieceCount[enemy]]] = sm.capturedNum;
            this.list[enemy][sm.capturedNum] = this.list[enemy][this.pieceCount[enemy]];
            this.material[sm.capturedPiece]--;
            this.HalfMoveCount = 0;
            this.removeFromBoard(sm.capturedPiece, sm.capturedSquare);
            this.capt[this.plyCnt] = sm.capturedPiece;
        }

        // handle promotion:
        if (sm.promote !== noPiece) {
            this.material[piece]--;
            this.removeFromBoard(piece, from);
            piece = Piece.create(this.wm, sm.promote);
            this.material[piece]++;
            this.addToBoard(piece, from);
        }

        // now make the move:
        this.list[this.wm][sm.pieceNum] = to;
        this.listPos[to] = sm.pieceNum;
        this.removeFromBoard(piece, from);
        this.addToBoard(piece, to);

        // handle Castling:
        if ((ptype === Piece.King) &&
            (Square.fyle(from) === 4) &&
            (Square.fyle(to) === 2 || Square.fyle(to) === 6)) {
            let rook = Piece.create(this.wm, Piece.Rook);
            let rookfrom: Squares.Square;
            let rookto: Squares.Square;
            if (Square.fyle(to) === 2) {
                rookfrom = (to - 2) as Squares.Square;
                rookto = (to + 1) as Squares.Square;
            } else {
                rookfrom = (to + 1) as Squares.Square;
                rookto = (to - 1) as Squares.Square;
            }

            this.listPos[rookto] = this.listPos[rookfrom];
            this.list[this.wm][this.listPos[rookto]] = rookto;
            this.removeFromBoard(rook, rookfrom);
            this.addToBoard(rook, rookto);
        }

        // handle clearing of castling flags:
        if (this.castling) {
            if (ptype === Piece.King) {   // the king moved.
                this.castling.set(this.wm, CastlingSide.Queen, false);
                this.castling.set(this.wm, CastlingSide.King, false);
            }

            // see if a rook moved or was captured:
            if (this.wm === Color.White) {
                if (from === 0) { this.castling.set(Color.White, CastlingSide.Queen, false); }
                if (from === 7) { this.castling.set(Color.White, CastlingSide.King, false); }
                if (to === 56) { this.castling.set(Color.Black, CastlingSide.Queen, false); }
                if (to === 63) { this.castling.set(Color.Black, CastlingSide.King, false); }
            } else {
                if (from === 56) { this.castling.set(Color.Black, CastlingSide.Queen, false); }
                if (from === 63) { this.castling.set(Color.Black, CastlingSide.King, false); }
                if (to === 0) { this.castling.set(Color.White, CastlingSide.Queen, false); }
                if (to === 7) { this.castling.set(Color.White, CastlingSide.King, false); }
            }
        }

        // set the EPTarget square, if a pawn advanced two squares and an
        // enemy pawn is on a square where enpassant may be possible.
        this.EpTarget = ns;
        if (ptype === Piece.Pawn) {
            const fromRank = Square.rank(from);
            const toRank = Square.rank(to);
            const epLeft = Square.move(to, LEFT);
            const epRight = Square.move(to, LEFT);
            if ((fromRank === 1) &&
                (toRank === 3) &&
                (
                    (Square.isSquare(epLeft) && (this.brd[epLeft] === Piece.BPawn)) ||
                    (Square.isSquare(epRight) && (this.brd[epRight] === Piece.BPawn)))) {
                this.EpTarget = Square.move(from, UP);
            }
            if ((fromRank === 6) &&
                (toRank === 4) &&
                (
                    (Square.isSquare(epLeft) && (this.brd[epLeft] === Piece.WPawn)) ||
                    (Square.isSquare(epRight) && (this.brd[epRight] === Piece.WPawn)))) {
                this.EpTarget = Square.move(from, DOWN);
            }

            this.HalfMoveCount = 0; // 50-move clock resets on pawn moves.
        }

        this.wm = enemy;
        return;
    }

    /**
     * Take back a simple move that has been made with DoSimpleMove().
     * @param sm {SimpleMove}
     */
    public undoSimpleMove(sm: SimpleMove) {
        const from = Square.notEmpty(sm.from);
        const to = Square.notEmpty(sm.to);
        let piece = Piece.notEmpty(this.brd[to]);

        this.EpTarget = sm.epSquare;
        this.castling.Flag = sm.castleFlags;
        this.HalfMoveCount = sm.oldHalfMoveClock;
        this.plyCnt--;
        this.wm = Color.flip(this.wm);
        sm.pieceNum = this.listPos[to];

        // handle a capture: insert piece back into piece list.
        // this works for EP captures too, since the square of the captured
        // piece is in the "capturedSquare" field rather than assuming the
        // value of the "to" field. The only time these two fields are
        // different is for an enpassant move.
        if (Piece.isPiece(sm.capturedPiece) && Square.isSquare(sm.capturedSquare)) {
            const c = Color.flip(this.wm);
            this.listPos[this.list[c][sm.capturedNum]] = this.pieceCount[c];
            this.listPos[sm.capturedSquare] = sm.capturedNum;
            this.list[c][this.pieceCount[c]] = this.list[c][sm.capturedNum];
            this.list[c][sm.capturedNum] = sm.capturedSquare;
            this.material[sm.capturedPiece]++;
            this.pieceCount[c]++;
        }
        // handle promotion:
        if (sm.promote !== noPiece) {
            this.material[piece]--;
            this.removeFromBoard(piece, to);
            piece = Piece.create(this.wm, Piece.Pawn);
            this.material[piece]++;
            this.addToBoard(piece, to);
        }

        // now make the move:
        this.list[this.wm][sm.pieceNum] = from;
        this.listPos[from] = sm.pieceNum;
        this.removeFromBoard(piece, to);
        this.addToBoard(piece, from);
        if (Piece.isPiece(sm.capturedPiece) && Square.isSquare(sm.capturedSquare)) {
            this.addToBoard(sm.capturedPiece, sm.capturedSquare);
            delete this.capt[this.plyCnt + 1];
        }

        // handle Castling:
        if ((Piece.type(piece) === Piece.King) && Square.fyle(from) === 4
            && (Square.fyle(to) === 2 || Square.fyle(to) === 6)) {
            const rook = (this.wm === Color.White ? Piece.WRook : Piece.BRook);
            let rookfrom: Squares.Square;
            let rookto: Squares.Square;
            if (Square.fyle(to) === 2) {
                rookfrom = (to - 2) as Squares.Square; 
                rookto = (to + 1) as Squares.Square;
            } else {
                rookfrom = (to + 1) as Squares.Square; 
                rookto = (to - 1) as Squares.Square;
            }
            this.listPos[rookfrom] = this.listPos[rookto];
            this.list[this.wm][this.listPos[rookto]] = rookfrom;
            this.removeFromBoard(rook, rookto);
            this.addToBoard(rook, rookfrom);
        }
    }

    public makeSanString(sm: SimpleMove, flag: SanCheckLevel = SanCheckLevel.MateTest) {
        let san = "";
        const sFrom = Square.notEmpty(sm.from);
        sm.pieceNum = this.listPos[sFrom];
        const from = this.list[this.wm][sm.pieceNum];
        const piece = Piece.notEmpty(this.brd[from]);
        const p = Piece.type(piece);
        const to = Square.notEmpty(sm.to);
        let mlist: SimpleMove[];
        if (p === Piece.Pawn) {
            if (Square.fyle(from) !== Square.fyle(to)) {  // pawn capture
                san += Square.fyleChar(from);
                san += "x";
            }
            san += Square.fyleChar(to);
            san += Square.rankChar(to);
            if (((Square.rank(to) === 0) || (Square.rank(to) === 7)) && (sm.promote !== noPiece)) {
                san += "=";
                san += Piece.toChar(sm.promote);
            }
        } else if (p === Piece.King) {
            if (sm.from === ns) {
                san += "--";
            } else if ((Square.fyle(from) === 4) && (Square.fyle(to) === 6)) {
                san += Castling.K;
            } else if ((Square.fyle(from) === 4) && (Square.fyle(to) === 2)) {
                san += Castling.Q;
            } else {  // regular King move
                san += "K";
                if (this.brd[to] !== noPiece) {
                    san += "x";
                }

                san += Square.fyleChar(to);
                san += Square.rankChar(to);
            }
        } else {    // is Queen/Rook/Bishop/Knight
            san += Piece.toChar(p);
            // we only need to calculate legal moves to disambiguate if there
            // are more than one of this type of piece.
            if (this.material[Piece.notEmpty(this.brd[sFrom])] < 2) {
                if (this.brd[to] !== noPiece) {
                    san += "x";
                }

                san += Square.fyleChar(to);
                san += Square.rankChar(to);
            } else {
                let ambiguity: number = 0;
                const f = Square.fyleChar(from);
                const r = Square.rankChar(from);
                mlist = [];
                this.matchLegalMove(mlist, p, to);
                for (let i = 0; i < mlist.length; i++) {
                    const m2 = mlist[i];
                    const from2 = Square.notEmpty(m2.from);
                    const p2 = Piece.type(Piece.notEmpty(this.brd[from2]));
                    if ((to === m2.to) && (from !== from2) && (p2 === p)) {
                        /* we have an ambiguity */
                        const f2 = Square.fyleChar(from2);
                        const r2 = Square.rankChar(from2);
                        
                        // Ambiguity:
                        // 1 (0001) --> need from-file (preferred) or from-rank
                        // 3 (0011) --> need from-file
                        // 5 (0101) --> need from-rank
                        // 7 (0111) --> need both from-file and from-rank
                        ambiguity |= 1;
                        if (r === r2) {
                            ambiguity |= 2; // 0b0010
                        } else if (f === f2) {
                            ambiguity |= 4; // 0b0100
                        }
                    }
                }

                if (ambiguity) {
                    if (ambiguity != 5) {
                        san += f; // print from-fyle
                    }

                    if (ambiguity >= 5) {
                        san += r; // print from-rank
                    }
                }

                if (this.brd[to] !== noPiece) {
                    san += "x";
                }

                san += Square.fyleChar(to);
                san += Square.rankChar(to);
            }
        }

        // now do the check or mate symbol:
        if (flag > 0) {
            // now we make the move to test for check:
            this.doSimpleMove(sm);
            if (this.isKingInCheck()) {
                let ch = "+";
                if (flag > 1) {
                    mlist = this.generateMoves();
                    if (mlist.length === 0) {
                        ch = "#";
                    }
                }

                san += ch;
            }

            this.undoSimpleMove(sm);
        }

        return san;
    }

    /**
     * Generate the legal moves list. 
     * If the specified pieceType is not NOPIECE, then only legal moves for that type of piece 
     * are generated.
     */
    public generateMoves(pieceType?: Pieces.PieceType, genType: number = GenerateMode.All, maybeInCheck: boolean = true) {
        const genNonCaptures = (genType & GenerateMode.NonCaptures) !== 0;
        const capturesOnly = !genNonCaptures;

        let mask = 0;
        if (pieceType !== noPiece) {
            mask = 1 << pieceType;
        } else {
            mask = (1 << Piece.King) |
                (1 << Piece.Queen) |
                (1 << Piece.Rook) |
                (1 << Piece.Bishop) |
                (1 << Piece.Knight) |
                (1 << Piece.Pawn);
        }

        // use the objects own move list if none was provided:
        const mlist: SimpleMove[] = [];

        // compute which pieces of the side to move are this.pinned to the king:
        this.calcPins();

        // determine if the side to move is in check and find where the
        // checking pieces are, unless the caller has passed maybeInCheck=false
        // indicating it is CERTAIN the side to move is not in check here.
        let numChecks = 0;
        if (maybeInCheck) {
            const checkSquares: Squares.Square[] = [];
            numChecks = this.calcNumChecks(this.getKingSquare(this.wm), checkSquares);
            if (numChecks > 0) {
                // the side to move IS in check:
                this.genCheckEvasions(mlist, pieceType, genType, checkSquares);
                return mlist;
            }
        }

        // the side to move is NOT in check. Iterate over each non-king
        // piece, and then generate King moves last of all:
        const npieces = this.pieceCount[this.wm];

        for (let x = 1; x < npieces; x++) {
            const sq = this.list[this.wm][x];
            const p = Piece.notEmpty(this.brd[sq]);
            const ptype = Piece.type(p);


            if (!(mask & (1 << ptype))) { continue; }
            const _pinned = this.pinned[x];
            // if this.pinned[x] == dir (not NULL_DIR), x can ONLY move along
            // that direction or its opposite.

            if (_pinned !== NULL_DIR) {  // piece x is this.pinned to king
                if (ptype === Piece.Pawn) {
                    this.genPawnMoves(mlist, sq, _pinned, genType);
                } else if (ptype === Piece.Knight) {
                    // do nothing -- this.pinned knights cannot move
                } else {
                    // piece is a this.pinned Queen/Rook/Bishop. Only generate
                    // moves along the this.pinned direction and its opposite:
                    if ((ptype === Piece.Queen) ||
                        ((ptype === Piece.Rook) && !Direction.isDiagonal(_pinned)) ||
                        ((ptype === Piece.Bishop) && Direction.isDiagonal(_pinned))) {
                        this.genSliderMoves(mlist, this.wm, sq, _pinned, capturesOnly);
                        this.genSliderMoves(mlist, this.wm, sq, Direction.opposite(_pinned), capturesOnly);
                    }
                }
            } else {

                // this piece is free to move anywhere
                if (ptype === Piece.Pawn) {
                    this.genPawnMoves(mlist, sq, NULL_DIR, genType);
                } else {
                    // is Knight/Queen/Bishop/Rook:
                    this.genPieceMoves(mlist, sq, capturesOnly);
                }
            }
        }

        // lastly, king moves...
        if (mask & (1 << Piece.King)) {
            const castling = !numChecks;
            this.genKingMoves(mlist, genType, castling);
        }

        return mlist;
    }

    public isLegalMove(sm: SimpleMove): boolean {
        const from = sm.from;
        const to = sm.to;
        if (!Square.isSquare(from) || !Square.isSquare(to)) { return false; }
        
        if (from === to) { return false; }
        
        let mover = this.brd[from];
        const captured = this.brd[to];

        if (!Piece.isPiece(mover)) { return false; }

        if (Piece.color(mover) !== this.wm) { return false; }
        if (Piece.isPiece(captured) && Piece.color(captured) === this.wm) { return false; }
        if (sm.movingPiece !== mover) { return false; }
        mover = Piece.type(mover);
        if (sm.promote !== noPiece && mover !== Piece.Pawn) { return false; }

        const enemy = Color.flip(this.wm);

        if (mover === Piece.Pawn) {
            let rfrom = Square.rank(from);
            let rto = Square.rank(to);
            if (this.wm === Color.Black) { 
                rfrom = (7 - rfrom) as Squares.Rank; 
                rto = (7 - rto) as Squares.Rank; 
            }

            const rdiff = rto - rfrom;
            const fdiff = Square.fyle(to) - Square.fyle(from);
            if (rdiff < 1 || rdiff > 2) { return false; }
            if (fdiff < -1 || fdiff > 1) { return false; }
            if (fdiff === 0) {  // pawn push:
                if (captured !== noPiece) { return false; }
                if (rdiff === 2) {  // two-square push:
                    if (rfrom !== 1) { return false; }
                    // make sure the square in between is NOPIECE:
                    const midsquare = from + ((to - from) / 2);
                    if (this.brd[midsquare] !== noPiece) { return false; }
                }
            } else {  // pawn capture:
                if (rdiff !== 1) { return false; }
                if (captured === noPiece) {
                    // it must be enpassant, or illegal
                    if (to !== this.EpTarget) { return false; }
                }
            }

            // check the promotion piece:
            if (rto === 7) {
                const p = sm.promote;
                if (p !== Piece.Queen && p !== Piece.Rook && p !== Piece.Bishop && p !== Piece.Knight) {
                    return false;
                }
            } else {
                if (sm.promote !== noPiece) { return false; }
            }
        } else if (Piece.isSlider(mover)) {
            // make sure the direction is valid:
            const dir = Square.direction(from, to);
            if (dir === NULL_DIR) { return false; }
            if (mover === Piece.Rook && Direction.isDiagonal(dir)) { return false; }
            if (mover === Piece.Bishop && !Direction.isDiagonal(dir)) { return false; }
            const delta = Direction.delta(dir);
            // make sure all the in-between squares are NOPIECE:
            let dest = from + delta;
            while (dest !== to) {
                if (this.brd[dest] !== noPiece) { return false; }
                dest += delta;
            }
        } else if (mover === Piece.Knight) {
            if (!Square.isKnightHop(from, to)) { return false; }
        } else /* (mover == KING) */ {
            if (Square.adjacent(to, this.getKingSquare(enemy))) { return false; }
            if (!Square.adjacent(from, to)) {
                // the move must be castling, or illegal.
                if (this.isKingInCheck()) { return false; }
                const mlist: SimpleMove[] = [];
                this.genCastling(mlist);
                for (let i = 0; i < mlist.length; i++) {
                    if ((mlist[i].from === from) && (mlist[i].to === to)) {
                        return false;
                    }
                }

                return false;
            }
        }

        // the move looks good, but does it leave the king in check?
        const kingSq = (mover === Piece.King) ? to : this.getKingSquare(this.wm);
        this.doSimpleMove(sm);
        const nchecks = this.calcAttacks(enemy, kingSq);
        this.undoSimpleMove(sm);
        return (nchecks === 0);
    }

    /**
     * Добавить фигуру на доску
     * @param p
     * @param sq
     */
    private addToBoard(p: Pieces.Piece, sq: Squares.Square): void {
        this.brd[sq] = p;
        this.numOnRank[p][Square.rank(sq)]++;
        this.numOnFyle[p][Square.fyle(sq)]++;
        this.numOnLeftDiag[p][Square.leftDiag(sq)]++;
        this.numOnRightDiag[p][Square.rightDiag(sq)]++;
        this.numOnSquareColor[p][Square.color(sq)]++;
    }

    /**
     * Убрать фигуру с доски
     * @param p
     * @param sq
     */
    private removeFromBoard(p: Pieces.Piece, sq: Squares.Square): void {
        this.brd[sq] = noPiece;
        this.numOnRank[p][Square.rank(sq)]--;
        this.numOnFyle[p][Square.fyle(sq)]--;
        this.numOnLeftDiag[p][Square.leftDiag(sq)]--;
        this.numOnRightDiag[p][Square.rightDiag(sq)]--;
        this.numOnSquareColor[p][Square.color(sq)]--;
    }

    private fyleCount(p: Pieces.Piece, f: number): number {
        return this.numOnFyle[p][f];
    }

    private rankCount(p: Pieces.Piece, r: number): number {
        return this.numOnRank[p][r];
    }

    private leftDiagCount(p: Pieces.Piece, diag: number): number {
        return this.numOnLeftDiag[p][diag];
    }

    private rightDiagCount(p: Pieces.Piece, diag: number): number {
        return this.numOnRightDiag[p][diag];
    }

    private squareColorCount(p: Pieces.Piece, sqColor: number): number {
        return this.numOnSquareColor[p][sqColor];
    }

    /**
     * Клетка на которой находится король
     * @param c
     * @returns Number
     */
    private getKingSquare(c: Colors.BW = this.wm): Squares.Square {
        return this.list[c][0];
    }

    /**
     * Клетка на которой находится король противника
     * @param c
     * @returns Number
     */
    private getEnemyKingSquare(c: Colors.BW = this.wm): Squares.Square {
        return this.list[1 - c][0];
    }

    /**
     * Посчитать количество шахов
     */
    private calcNumChecks(kingSq: Squares.Square, checkSquares?: Squares.Square[]): number {
        kingSq = (kingSq) ? kingSq : this.getKingSquare();
        return this.calcAttacks(Color.flip(this.wm), kingSq, checkSquares);
    }

    /**
     * Король под шахом
     */
    public isKingInCheck(): boolean {
        return (this.calcNumChecks(this.getKingSquare()) > 0);
    }

    /**
     * Рассчитать количество атак для указанной стороны.
     * Эта функция также добавляет список атакующих клеток в параметре fromSqs, если он не undefined.
     */
    private calcAttacks(side: Colors.BW, target: Squares.Square, fromSqs?: Squares.Square[]): number {
        const fromSquares = (fromSqs !== undefined) ? fromSqs : [];
        let queen: Pieces.Piece;
        let rook: Pieces.Piece;
        let bishop: Pieces.Piece;
        let knight: Pieces.Piece;
        let delta: number;
        let dest: Squares.Square;
        let dirs: Directions.Direction[] = [];
        let dir: Directions.Direction;
        let last: Squares.Square | Squares.Empty;
        let p: Pieces.Piece | Pieces.Empty;
        let sq: Squares.Square | Squares.Empty;
        let i: number;

        // attacks Bishop/Queen/Rook: look at each of the 8 directions
        if (side === Color.White) {
            queen = Piece.WQueen;
            rook = Piece.WRook;
            bishop = Piece.WBishop;
            knight = Piece.WKnight;
        } else {
            queen = Piece.BQueen;
            rook = Piece.BRook;
            bishop = Piece.BBishop;
            knight = Piece.BKnight;
        }

        const numQueensRooks = this.material[queen] + this.material[rook];
        const numQueensBishops = this.material[queen] + this.material[bishop];

        // we only bother if there are any sliding pieces of each type:
        if (numQueensRooks > 0) {
            const fyle = Square.fyle(target);
            const rank = Square.rank(target);

            dirs = [];
            if (this.fyleCount(queen, fyle) + this.fyleCount(rook, fyle) > 0) {
                dirs.push(UP);
                dirs.push(DOWN);
            }
            if (this.rankCount(queen, rank) + this.rankCount(rook, rank) > 0) {
                dirs.push(LEFT);
                dirs.push(RIGHT);
            }

            for (i = 0; i < dirs.length; i++) {
                dir = dirs[i];
                delta = Direction.delta(dir);
                dest = target;
                last = Square.last(target, dir);
                while (dest !== last) {
                    dest = (dest + delta) as Squares.Square;
                    p = this.brd[dest];
                    if (p === noPiece) {
                        // square NOPIECE: keep searching
                        continue;
                    } else if (p === queen || p === rook) {
                        // found an attacking piece
                        fromSquares.push(dest);
                        break;
                    } else {
                        // found a piece, but not a queen or rook
                        break;
                    }
                }
            }
        }

        // now diagonal sliders: Queens/Bishops:
        if (numQueensBishops > 0) {
            const left = Square.leftDiag(target);
            const right = Square.rightDiag(target);
            dirs = [];
            if (this.leftDiagCount(queen, left) + this.leftDiagCount(bishop, left) > 0) {
                dirs.push(UP_LEFT);
                dirs.push(DOWN_RIGHT);
            }
            if (this.rightDiagCount(queen, right) + this.rightDiagCount(bishop, right) > 0) {
                dirs.push(UP_RIGHT);
                dirs.push(DOWN_LEFT);
            }

            for (i = 0; i < dirs.length; i++) {
                dir = dirs[i];
                delta = Direction.delta(dir);
                dest = target;
                last = Square.last(target, dir);
                while (dest !== last) {
                    dest = (dest + delta) as Squares.Square;
                    p = this.brd[dest];
                    if (p === noPiece) {
                        // square NOPIECE: keep searching
                        continue;
                    } else if (p === queen || p === bishop) {
                        // found an attacking piece
                        fromSquares.push(dest);
                        break;
                    } else {
                        // found a piece, but not an enemy queen or bishop
                        break;
                    }
                }
            }
        }

        // now knight checks: we only bother if there is a knight on the
        // opposite square color of the target square color.
        if ((this.material[knight] > 0) && (this.squareColorCount(knight, Color.flip(Square.color(target)))) > 0) {
            const dests = Square.knightAttacks(target);
            i = 0;
            while (i < 20) {
                const d = dests[i++];
                if (d === ns) { break; }
                if (this.brd[d] === knight) {
                    fromSquares.push(d);
                }
            }
        }

        // now pawn attacks:
        if (side === Color.White) {
            if (Square.rank(target) !== 0) {  // if (Material[WP] > 0) {
                sq = Square.move(target, DOWN_LEFT);
                if (Square.isSquare(sq) && (this.brd[sq] === Piece.WPawn)) {
                    fromSquares.push(sq);
                }

                sq = Square.move(target, DOWN_RIGHT);
                if (Square.isSquare(sq) && (this.brd[sq] === Piece.WPawn)) {
                    fromSquares.push(sq);
                }
            }
        } else {
            if (Square.rank(target) !== 7) {  // if (Material[BP] > 0) {
                sq = Square.move(target, UP_LEFT);
                if (Square.isSquare(sq) && (this.brd[sq] === Piece.BPawn)) {
                    fromSquares.push(sq);
                }
                sq = Square.move(target, UP_RIGHT);
                if (Square.isSquare(sq) && (this.brd[sq] === Piece.BPawn)) {
                    fromSquares.push(sq);
                }
            }
        }

        return fromSquares.length;
    }

    private calcPins(): void {
        for (let i = 0; i < 16; i++) {
            this.pinned[i] = NULL_DIR;
        }

        const kingSq = this.getKingSquare(this.wm);
        const enemy = Color.flip(this.wm);
        const enemyQueen = Piece.create(enemy, Piece.Queen);
        const enemyRook = Piece.create(enemy, Piece.Rook);
        const enemyBishop = Piece.create(enemy, Piece.Bishop);

        // pins and checks from Bishops/Queens/Rooks:
        const fyle = Square.fyle(kingSq);
        if (this.fyleCount(enemyQueen, fyle) + this.fyleCount(enemyRook, fyle) > 0) {
            this.calcPinsDir(UP, Piece.Rook);
            this.calcPinsDir(DOWN, Piece.Rook);
        }

        const rank = Square.rank(kingSq);
        if (this.rankCount(enemyQueen, rank) + this.rankCount(enemyRook, rank) > 0) {
            this.calcPinsDir(LEFT, Piece.Rook);
            this.calcPinsDir(RIGHT, Piece.Rook);
        }

        const ld = Square.leftDiag(kingSq);
        if (this.leftDiagCount(enemyQueen, ld) + this.leftDiagCount(enemyBishop, ld) > 0) {
            this.calcPinsDir(UP_LEFT, Piece.Bishop);
            this.calcPinsDir(DOWN_RIGHT, Piece.Bishop);
        }

        const rd = Square.rightDiag(kingSq);
        if (this.rightDiagCount(enemyQueen, rd) + this.rightDiagCount(enemyBishop, rd) > 0) {
            this.calcPinsDir(UP_RIGHT, Piece.Bishop);
            this.calcPinsDir(DOWN_LEFT, Piece.Bishop);
        }
    }

    private calcPinsDir(dir: Directions.Direction, attacker: number): void {
        // two pieces can pin along any path. A queen is always one,
        // the other is a bishop or rook. To save calculating it here, the
        // appropriate piece (BISHOP) or (ROOK) is passed along with the
        // direction.

        const king = this.getKingSquare(this.wm);
        let friendly: Squares.Square | Squares.Empty = ns;
        let x: Squares.Square = king;
        const last = Square.last(king, dir);
        const delta = Direction.delta(dir);

        while (x !== last) {
            x = (x + delta) as Squares.Square;
            const p = this.brd[x];
            if (p === noPiece) {
                // square NOPIECE, so keep searching.
                continue;
            } else if (Piece.color(p) === this.wm) {
                // found a friendly piece.
                if (friendly === ns) {
                    // found first friendly in this direction
                    friendly = x;
                } else {
                    // found second friendly in this direction, so stop.
                    return;
                }
            } else {
                // found an enemy piece
                if (friendly !== ns) {
                    // potential pin:
                    const ptype = Piece.type(p);
                    if (ptype === Piece.Queen || ptype === attacker) {
                        this.pinned[this.listPos[friendly]] = dir;
                    }
                }

                return; // found an enemy piece, so end search
            }
        }
    }

    /**
     * Add legal move 
     * 
     * @param mlist
     * @param from
     * @param to
     * @param promo
     * @returns
     */
    private addLegalMove(mlist: SimpleMove[], from: Squares.Square, to: Squares.Square, promo?: Pieces.PieceType) {
        const sm = new SimpleMove();
        // we do NOT set the pre-move castling/ep flags, or the captured
        // piece info, here since that is ONLY needed if the move is
        // going to be executed with DoSimpleMove() and then undone.
        sm.from = from;
        sm.to = to;
        sm.promote = promo;
        sm.movingPiece = this.brd[from];
        sm.capturedPiece = this.brd[to];
        mlist.push(sm);
    }

    /**
     * Generate slider moves along a direction, for a sliding
     * piece of the specified color from the specified square.
     * If sqset != undefined, moves must be to a square in sqset.
     * 
     * @param mlist
     * @param color
     * @param fromSq
     * @param dir
     * @param sqset
     * @param capturesOnly
     * @returns
     */
    private genSliderMoves(mlist: SimpleMove[], color: Colors.BW, fromSq: Squares.Square, dir: Directions.Direction, capturesOnly?: boolean, sqset?: Squares.Square[]) {
        capturesOnly = !!capturesOnly;
        let dest: Squares.Square = fromSq;
        const last = Square.last(fromSq, dir);
        const delta = Direction.delta(dir);
        while (dest !== last) {
            dest = (dest + delta) as Squares.Square;
            const p = this.brd[dest];
            if (p === noPiece) {
                if (!capturesOnly) {
                    if (is_valid_dest(dest, sqset)) {
                        this.addLegalMove(mlist, fromSq, dest, noPiece);
                    }
                }

                continue;
            }

            // we have reached a piece. Add the capture if it is an enemy.
            if (Piece.color(p) !== color) {
                if (is_valid_dest(dest, sqset)) {
                    this.addLegalMove(mlist, fromSq, dest, noPiece);
                }
            }
            break;
        }
    }

    /**
     * Generate knight moves.
     * If sqset != undefined, moves must be to a square in sqset.
     * 
     * @param mlist
     * @param color
     * @param fromSq
     * @param sqset
     * @param capturesOnly
     * @returns
     */
    private genKnightMoves(mlist: SimpleMove[], color: Colors.BW, fromSq: Squares.Square, sqset?: Squares.Square[], capturesOnly?: boolean): void {
        capturesOnly = !!capturesOnly;
        const destArr = Square.knightAttacks(fromSq);
        let i = 0;
        while (true) {
            const dest = destArr[i++];
            if (dest === ns) { break; }
            const p = this.brd[dest];
            if (capturesOnly && (p === noPiece)) { continue; }
            if ((p === noPiece) || (Piece.color(p) !== color)) {
                if (is_valid_dest(dest, sqset)) {
                    this.addLegalMove(mlist, fromSq, dest, noPiece);
                }
            }
        }
    }

    /**
     * Generate the legal castling moves.
     * Assumes the side to move is NOT in check, so the caller
     * should verify this first.
     * 
     * @param mlist
     * @returns
     */
    private genCastling(mlist: SimpleMove[]): void {
        const from = this.getKingSquare(this.wm);
        if (from !== (this.wm === Color.White ? 4 : 60)) { return; }
        const enemyKingSq = this.getEnemyKingSquare();
        let target: Squares.Square; 
        let skip: Squares.Square; 
        let rookSq: Squares.Square; 
        let rookPiece: Pieces.Piece;

        // queen side Castling:
        if (!this.strictCastling || this.castling.has(this.wm, CastlingSide.Queen)) {
            if (this.wm === Color.White) {
                target = 2; skip = 3; rookSq = 0; rookPiece = Piece.WRook;
            } else {
                target = 58; skip = 59; rookSq = 56; rookPiece = Piece.BRook;
            }

            if ((this.brd[target] === noPiece) && (this.brd[skip] === noPiece)
                && (this.brd[rookSq] === rookPiece)
                && (this.brd[target - 1] === noPiece) // squares B1 or B8 must be NOPIECE too!
                && (this.calcNumChecks(target) === 0)
                && (this.calcNumChecks(skip) === 0)
                && (!Square.adjacent(target, enemyKingSq))) {
                this.addLegalMove(mlist, from, target, noPiece);
            }
        }

        // king side Castling:
        if (!this.strictCastling || this.castling.has(this.wm, CastlingSide.King)) {
            if (this.wm === Color.White) {
                target = 6;
                skip = 5;
                rookSq = 7;
                rookPiece = Piece.WRook;
            } else {
                target = 62; skip = 61; rookSq = 63; rookPiece = Piece.BRook;
            }

            if (this.brd[target] === noPiece && this.brd[skip] === noPiece
                && (this.brd[rookSq] === rookPiece)
                && (this.calcNumChecks(target) === 0)
                && (this.calcNumChecks(skip) === 0)
                && (!Square.adjacent(target, enemyKingSq))) {
                this.addLegalMove(mlist, from, target, noPiece);
            }
        }
    }

    /**
     * Generate the legal King moves. Castling is generated as well, if
     * the specified flag is true.
     * 
     * @param mlist
     * @param genType
     * @param castling
     * @returns
     */
    private genKingMoves(mlist: SimpleMove[], genType: number, castling: boolean): void {
        const kingSq = this.getKingSquare();
        const enemyKingSq = this.getEnemyKingSquare();
        const enemy = Color.flip(this.wm);
        const king = Piece.create(this.wm, Piece.King);
        const genNonCaptures = ((genType & GenerateMode.NonCaptures) !== 0);

        const destArr = Square.kingAttacks(kingSq);
        let i = 0;
        let destSq: Squares.Square | Squares.Empty;
        while ((destSq = destArr[i++]) !== ns) {
            // try this move and see if it legal:
            let addThisMove = false;

            // only try this move if the target square has an enemy piece,
            // or if it is NOPIECE and non captures are to be generated:
            const captured = this.brd[destSq];
            if ((genNonCaptures && !Piece.isPiece(captured)) ||
                (Piece.isPiece(captured) && (Piece.color(captured) === enemy))) {
                // enemy piece or NOPIECE there, so try the move:
                this.brd[destSq] = king;
                this.brd[kingSq] = noPiece;
                // it is legal if the two kings will not be adjacent and the
                // moving king will not be in check on its new square:
                if (!Square.adjacent(destSq, enemyKingSq)) {
                    if (this.calcNumChecks(destSq) === 0) {
                        addThisMove = true;
                    }
                }

                this.brd[kingSq] = king;
                this.brd[destSq] = captured;
            }

            if (addThisMove) {
                this.addLegalMove(mlist, kingSq, destSq, noPiece);
            }
        }

        // now generate castling moves, if possible:
        if (genNonCaptures && castling) {
            this.genCastling(mlist);
        }
    }

    /**
     * Add promotion moves. 
     * Called by GenPawnMoves() when a pawn can be promoted.
     * 
     * @param mlist
     * @param from
     * @param dest
     * @returns
     */
    private addPromotions(mlist: SimpleMove[], from: Squares.Square, dest: Squares.Square): void {
        this.addLegalMove(mlist, from, dest, Piece.Queen);
        this.addLegalMove(mlist, from, dest, Piece.Rook);
        this.addLegalMove(mlist, from, dest, Piece.Bishop);
        this.addLegalMove(mlist, from, dest, Piece.Knight);
    }

    /**
     * Used to verify that an enpassant pawn capture is valid. 
     * This is needed because illegal enpassant captures can appear legal 
     * according to calculations of pinned pieces. 
     * For example, consider WK d5, WP e5, BP f5 (just moved there), 
     * BR h5 and the enpassant capture exf6 would be illegal.
     * 
     * @param from
     * @param to
     * @returns
     */
    private isValidEnPassant(from: Squares.Square, to: Squares.Square): boolean {
        // check that this enpassant capture is legal:
        const ownPawn = Piece.create(this.wm, Piece.Pawn);
        const enemyPawn = Piece.create(Color.flip(this.wm), Piece.Pawn);
        const enemyPawnSq = (this.wm === Color.White) ? to - 8 : to + 8;
        const toSqPiece = this.brd[to];

        if ((this.brd[from] !== ownPawn) || (this.brd[enemyPawnSq] !== enemyPawn)) {
            return false;
        }

        this.brd[from] = noPiece;
        this.brd[to] = ownPawn;
        this.brd[enemyPawnSq] = noPiece;
        const isValid = !this.isKingInCheck();
        this.brd[from] = ownPawn;
        this.brd[to] = toSqPiece;
        this.brd[enemyPawnSq] = enemyPawn;
        return isValid;
    }

    private isPossibleCapture(dest: Squares.Square, from: Squares.Square) {
        const p = this.brd[dest];
        return (
                    (
                        Piece.isPiece(p) && (Piece.color(p) === (Color.flip(this.wm)))
                    ) || (
                        (dest === this.EpTarget) && this.isValidEnPassant(from, dest)
                    )
                );
    }

    /**
     * Generate legal pawn moves. 
     * If dir != NULL_DIR, pawn MUST move in direction dir or its opposite. 
     * If sqset != undefined, pawn MUST move to a square in sqset. 
     * The dir and sq parameters are for pinned pawns and check evasions.
     * 
     * @param mlist
     * @param from
     * @param dir
     * @param sqset
     * @param genType
     * @returns
     */
    private genPawnMoves(mlist: SimpleMove[], from: Squares.Square, dir: Directions.Direction, genType: number = GenerateMode.All, sqset?: Squares.Square[]) {
        const genNonCaptures = ((genType & GenerateMode.NonCaptures) !== 0);
        const oppdir = Direction.opposite(dir);
        let forward: Directions.Direction;
        let promoRank: Squares.Rank;
        let secondRank: Squares.Rank;
        let dest: Squares.Square | Squares.Empty;
        
        if (this.wm === Color.White) {
            forward = Direction.Up;
            promoRank = 7;
            secondRank = 1;
        } else {
            forward = DOWN;
            promoRank = 0;
            secondRank = 6;
        }

        if (genNonCaptures && (dir === NULL_DIR || dir === forward || oppdir === forward)) {
            dest = Square.move(from, forward);
            if (Square.isSquare(dest) && (this.brd[dest] === noPiece) && (is_valid_dest(dest, sqset))) {
                if (Square.rank(dest) === promoRank) {
                    this.addPromotions(mlist, from, dest);
                } else {
                    this.addLegalMove(mlist, from, dest, noPiece);
                }
            }

            if ((Square.rank(from) === secondRank) && Square.isSquare(dest) && (this.brd[dest] === noPiece)) {
                dest = Square.move(dest, forward);
                if (Square.isSquare(dest) && (this.brd[dest] === noPiece) && is_valid_dest(dest, sqset)) {
                    this.addLegalMove(mlist, from, dest, noPiece);
                }
            }
        }

        // now do captures: left, then right
        // to be a possible capture, dest square must be EPTarget or hold
        // an enemy piece.
        let capdir: Directions.Direction = (forward | LEFT) as Directions.Direction;
        if (dir === NULL_DIR || dir === capdir || oppdir === capdir) {
            dest = Square.move(from, capdir);
            if (Square.isSquare(dest) && this.isPossibleCapture(dest, from) && is_valid_dest(dest, sqset)) {
                if (Square.rank(dest) === promoRank) {
                    this.addPromotions(mlist, from, dest);
                } else {
                    this.addLegalMove(mlist, from, dest, noPiece);
                }
            }
        }

        capdir = (forward | RIGHT) as Directions.Direction;
        if (dir === NULL_DIR || dir === capdir || oppdir === capdir) {
            dest = Square.move(from, capdir);
            if (Square.isSquare(dest) && this.isPossibleCapture(dest, from) && (is_valid_dest(dest, sqset))) {
                if (Square.rank(dest) === promoRank) {
                    this.addPromotions(mlist, from, dest);
                } else {
                    this.addLegalMove(mlist, from, dest, noPiece);
                }
            }
        }
    }

    /**
     * Generate legal moves for the side to move when the King is in check.
     * 
     * @param mlist
     * @param mask
     * @param genType
     * @param checkSquares
     * @returns
     */
    private genCheckEvasions(mlist: SimpleMove[], mask?: Pieces.PieceType, genType: number = GenerateMode.All, checkSquares: Squares.Square[] = []): void {
        const numChecks = checkSquares.length;
        const genNonCaptures = ((genType & GenerateMode.NonCaptures) !== 0);
        const capturesOnly = !genNonCaptures;

        const king = this.getKingSquare(this.wm);

        // if it's double check, we can ONLY move the king
        if (numChecks === 1) {
            // oк, it is NOT a double check
            // try to block piece/capture piece. Remember enpassant!
            // first, generate a list of targets: squares between the king
            // and attacker to block, and the attacker's square.

            const attackSq: Squares.Square = checkSquares[0];
            const dir: Directions.Direction = Square.direction(king, attackSq);
            const targets: Squares.Square[] = [];  // set of blocking/capturing squares.
            targets.push(attackSq);

            // now add squares we can might be able to block on.
            if (dir !== NULL_DIR) {
                let sq = Square.move(king, dir);
                while (Square.isSquare(sq) && (sq !== attackSq)) {
                    if (this.brd[sq] === noPiece) { targets.push(sq); }
                    sq = Square.move(sq, dir);
                }
            }

            // try each non-King piece in turn. If a piece is pinned to
            // the king, don't bother since it cannot possibly block or
            // capture the piece that is giving check!

            const numPieces = this.pieceCount[this.wm];
            for (let p2 = 1; p2 < numPieces; p2++) {
                const from = this.list[this.wm][p2];
                const p2piece = this.brd[from];
                const p2type = Piece.isPiece(p2piece) ? Piece.type(p2piece) : noPiece;
                if (this.pinned[p2] !== NULL_DIR) { continue; }
                if (mask === noPiece || mask === p2type) {
                    if (p2type === Piece.Pawn) {
                        this.genPawnMoves(mlist, from, NULL_DIR, genType, targets);
                        // capturing a pawn enpassant will only get out
                        // of check if the pawn that moved two squares
                        // is doing the checking. If it is not, that means
                        // a discovered check with the last pawn move so
                        // taking enpassant cannot get out of check.
                        if (Square.isSquare(this.EpTarget)) {
                            const pawnSq = (this.wm === Color.White ? this.EpTarget - 8 : this.EpTarget + 8);
                            if (pawnSq === attackSq) {
                                const epset: Squares.Square[] = [];
                                epset.push(this.EpTarget);
                                this.genPawnMoves(mlist, from, NULL_DIR, genType, epset);
                            }
                        }
                    } else {
                        this.genPieceMoves(mlist, from, capturesOnly, targets);
                    }
                }
            }  // end of search for captures/blocks
        }

        // now king moves -- just compute them normally:
        if (mask === noPiece || mask === Piece.King) {
            this.genKingMoves(mlist, genType, false);
        }
    }

    /**
     * Generates moves for a non pawn, non king piece. 
     * If sqset != undefined, moves must be to a square in sqset.
     */
    private genPieceMoves(mlist: SimpleMove[], fromSq: Squares.Square, capturesOnly: boolean, sqset?: Squares.Square[]) {
        const c = this.wm;
        const p = this.brd[fromSq];
        if (Piece.isPiece(p)) {
            const ptype = Piece.type(p);

            if (ptype === Piece.Knight) {
                this.genKnightMoves(mlist, c, fromSq, sqset, capturesOnly);
                return;
            }

            if (ptype !== Piece.Bishop) {
                this.genSliderMoves(mlist, c, fromSq, UP, capturesOnly, sqset);
                this.genSliderMoves(mlist, c, fromSq, DOWN, capturesOnly, sqset);
                this.genSliderMoves(mlist, c, fromSq, LEFT, capturesOnly, sqset);
                this.genSliderMoves(mlist, c, fromSq, RIGHT, capturesOnly, sqset);
            }

            if (ptype !== Piece.Rook) {
                this.genSliderMoves(mlist, c, fromSq, UP_LEFT, capturesOnly, sqset);
                this.genSliderMoves(mlist, c, fromSq, DOWN_LEFT, capturesOnly, sqset);
                this.genSliderMoves(mlist, c, fromSq, UP_RIGHT, capturesOnly, sqset);
                this.genSliderMoves(mlist, c, fromSq, DOWN_RIGHT, capturesOnly, sqset);
            }
        }
    }

    private matchLegalMove(mlist: SimpleMove[], mask: Pieces.PieceType, target: Squares.Square) {
        const total = this.material[Piece.create(this.wm, mask)];
        let _cnt = 0;
        let dir: Directions.Direction;
        let sq: Squares.Square | Squares.Empty;

        const kingSq = this.getKingSquare(this.wm);
        let tryMove: Boolean;

        // first, verify that the target square is NOPIECE or contains
        // an enemy piece:
        let p = this.brd[target];
        if (p !== noPiece && Piece.color(p) === this.wm) {
            return;
        }

        // loop through looking for pieces of type "mask". We start at 1
        // since the King is always the piece at position 0 in the list.
        for (let x = 1; x < this.pieceCount[this.wm] && _cnt < total; x++) {
            const sqPtr = this.list[this.wm][x];
            p = this.brd[sqPtr];
            const pt = Piece.isPiece(p) ? Piece.type(p) : noPiece;
            if (pt === mask) {
                // increment count so we stop when we've seen all the Material[p] pieces of this type.
                tryMove = false;
                _cnt++;

                switch (pt) {
                    case Piece.Knight:
                        if (Square.isKnightHop(sqPtr, target)) { 
                            tryMove = true; 
                        }
                        break;
                    case Piece.Rook:
                        dir = Square.direction(sqPtr, target);
                        if (dir !== NULL_DIR && !Direction.isDiagonal(dir)) {
                            sq = Square.move(sqPtr, dir);
                            tryMove = true;
                            while (Square.isSquare(sq) && (sq !== target)) {
                                if (this.brd[sq] !== noPiece) { // oops, piece in the way
                                    tryMove = false;
                                    break;
                                }

                                sq = Square.move(sq, dir);
                            }
                        }
                        break;
                    case Piece.Bishop:
                        dir = Square.direction(sqPtr, target);
                        if (Direction.isDiagonal(dir)) {
                            sq = Square.move(sqPtr, dir);
                            tryMove = true;
                            while (Square.isSquare(sq) && (sq !== target)) {
                                if (this.brd[sq] !== noPiece) { // oops, piece in the way
                                    tryMove = false;
                                    break;
                                }
                                sq = Square.move(sq, dir);
                            }
                        }
                        break;
                    case Piece.Queen:
                        dir = Square.direction(sqPtr, target);
                        if (dir !== NULL_DIR) {  // try the move!
                            sq = Square.move(sqPtr, dir);
                            tryMove = true;
                            while (Square.isSquare(sq) && (sq !== target)) {
                                if (this.brd[sq] !== noPiece) { // oops, piece in the way
                                    tryMove = false;
                                    break;
                                }
                                sq = Square.move(sq, dir);
                            }
                        }
                        break;
                    default:  // should never happen
                        break;
                }
                // now, if tryMove is 1, the piece can get to target. We need
                // to see if the move is legal or leaves the king in check.
                if (tryMove) {
                    const captured = this.brd[target];
                    this.brd[target] = p;
                    this.brd[sqPtr] = noPiece;
                    if (this.calcNumChecks(kingSq) > 0) { 
                        tryMove = false; 
                    }

                    this.brd[sqPtr] = p;
                    this.brd[target] = captured;
                    
                    if (tryMove) { 
                        this.addLegalMove(mlist, sqPtr, target, noPiece); 
                    }
                }
            }
        }
    }

    protected matchKingMove(mlist: SimpleMove[], target: Squares.Square): boolean {
        mlist = [];
        const kingSq = this.getKingSquare(this.wm);
        const diff = target - kingSq;

        // valid diffs are: -9, -8, -7, -2, -1, 1, 2, 7, 8, 9. (-2,2: Castling)
        if (diff < -9 || diff > 9) {
            return false;
        }

        if (diff > -7 && diff < -2) {
            return false;
        }

        if (diff > 2 && diff < 7) {
            return false;
        }

        if (diff === 0) {
            return false;
        }

        if (diff === 2) { // king side Castling
            if (kingSq !== (this.wm === Color.White ? 4 : 60)) {
                return false;
            }

            if (this.strictCastling && !this.castling.has(this.wm, CastlingSide.King)) {
                return false;
            }

            // we also need to verify that the target square does not
            // lie adjacent to the location of the enemy king!
            if (this.brd[kingSq + 1] !== noPiece || this.brd[kingSq + 2] !== noPiece
                || this.calcNumChecks(kingSq) > 0
                || this.calcNumChecks((kingSq + 1) as Squares.Square) > 0
                || this.calcNumChecks((kingSq + 2) as Squares.Square) > 0) {
                return false;
            }
            this.addLegalMove(mlist, kingSq, target, noPiece);
            return true;
        }

        if (diff === -2) { // queen side Castling
            if (kingSq !== (this.wm === Color.White ? 4 : 60)) {
                return false;
            }

            if (this.strictCastling && !this.castling.has(this.wm, CastlingSide.Queen)) {
                return false;
            }

            if (this.brd[kingSq - 1] !== noPiece || this.brd[kingSq - 2] !== noPiece
                || this.brd[kingSq - 3] !== noPiece
                || this.calcNumChecks(kingSq) > 0
                || this.calcNumChecks((kingSq - 1) as Squares.Square) > 0
                || this.calcNumChecks((kingSq - 2) as Squares.Square) > 0) {
                return false;
            }

            this.addLegalMove(mlist, kingSq, target, noPiece);
            return true;
        }

        const captured = this.brd[target];
        if (Piece.colorOrEmpty(captured) === this.wm) {
            // capturing a friendly piece!
            return false;
        }

        // now make the move on the Board and Material lists, and see if it
        // leaves the King in check:
        // мы должны также проверить для смежности со вражеским Королем!!

        this.brd[target] = Piece.create(this.wm, Piece.King);
        this.brd[kingSq] = noPiece;
        if (captured !== noPiece) {
            this.material[captured]--;
        }

        let legal = 0;
        if (this.calcNumChecks(target) === 0) {
            legal = 1;
        }

        if (captured !== noPiece) {
            this.material[captured]++;
        }

        this.brd[target] = captured;
        this.brd[kingSq] = Piece.create(this.wm, Piece.King);
        if (legal === 1) {
            this.addLegalMove(mlist, kingSq, target, noPiece);
            return true;
        }

        return false;
    }

    /**
     * 
     * Given a move in coordinate notation, e.g. "e2e4" or "g1f3", generates the legal move it represents.
     * If "reverse" is true, coordinates in reverse order are acceptable, e.g. "f3g1" for 1.Nf3.
     * @param str 
     * @param reverse 
     */
    public readCoord(str: string): Squares.FromTo | false {
        let promo: Pieces.PieceType | Pieces.Empty = noPiece;
        str = str.toLowerCase();
        
        if (str.length === 5) {
            promo = Piece.typeFromChar(str.charAt(4).toLowerCase());
        } else if (str.length !== 4) {
            return false;
        }

        const fromFyle = Square.fyleFromChar(str.charAt(0));
        const fromRank = Square.rankFromChar(str.charAt(1));
        if (Square.isFyle(fromFyle) && Square.isRank(fromRank)) {
            const from = Square.create(fromFyle, fromRank);
            const toFyle = Square.fyleFromChar(str.charAt(2));
            const toRank = Square.rankFromChar(str.charAt(3));
            if (Square.isFyle(toFyle) && Square.isRank(toRank)) {
                const to = Square.create(toFyle, toRank);
            
                return { from, to, promo};
            }
        }
        
        return false;
    }

    /**
     * 
     * Given a move in coordinate notation, e.g. "e2e4" or "g1f3", generates the legal move it represents.
     * If "reverse" is true, coordinates in reverse order are acceptable, e.g. "f3g1" for 1.Nf3.
     * If the coordinates are valid - look for them among the valid moves and return SimpleMove
     * @param str 
     * @param reverse 
     */
    public readCoordMove(str: string, reverse: boolean = false): SimpleMove | null {
        const coords = this.readCoord(str);
        if (coords !== false) {
            const {from, to, promo } = coords;

            const mlist = this.generateMoves();
                for (let i = 0; i < mlist.length; i++) {
                    const sm = mlist[i];
                    if (sm.promote === promo) {
                        if ((sm.from === from) && (sm.to === to)) {
                            return sm;
                        }

                        if (reverse && (sm.to == from) && (sm.from == to)) {
                            return sm;
                        }
                    }
                }
        }
        
        return null;
    }
}

export const ChessPositionStd = new Position(FenString.standartStart);
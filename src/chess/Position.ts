import cloneDeep from 'lodash-es/cloneDeep';
import indexOf from 'lodash-es/indexOf';
import repeat from 'lodash-es/repeat';
import { Hashtable } from 'onix-core/dist/Hashtable';
import { Color } from './Color';
import { Castle } from './Castle';
import { Direction } from './Direction';
import { Piece } from './Piece';
import { Square } from './Square';
import { SimpleMove } from './SimpleMove';
import { FenString } from './FenString';

/** Short aliases */
const ns = Square.NullSquare;
const noPiece = Piece.NoPiece;
const { 
    Null: NULL_DIR, Up: UP,  Down: DOWN, Left: LEFT, Right: RIGHT, 
    UpLeft: UP_LEFT, UpRight: UP_RIGHT, DownLeft: DOWN_LEFT, DownRight: DOWN_RIGHT } = Direction;

function is_valid_dest(dest: number, sqset: number[]) {
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
    private brd: number[] = [];
    private capt: number[] = [];
    private plyCnt: number = 0;
    private strictCastling: boolean = false;
    private pinned: number[] = [];
    private list: number[][] = [];
    private listPos: number[] = [];
    private pieceCount: number[] = [];
    private material: number[] = [];
    private numOnRank: number[][] = [];
    private numOnFyle: number[][] = [];
    private numOnLeftDiag: number[][] = [];
    private numOnRightDiag: number[][] = [];
    private numOnSquareColor: number[][] = [];
    private wm: number = Color.White;
    
    public Castling: number = 0;
    public EpTarget: number;
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
        this.Castling = 0;
        this.HalfMoveCount = 0;
        this.plyCnt = 0;

        this.pieceCount[Color.White] = 0;
        this.pieceCount[Color.Black] = 0;
        this.list[Color.White] = [];
        this.list[Color.Black] = [];
        this.listPos = [];

        var i: number;
        var j: number;

        for (i = 0; i <= 64; i++) {
            this.brd[i] = noPiece;
        }

        this.brd[ns] = 0;

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
        this.Castling = source.Castling;
    }

    /**
     * Clone position object
     * @returns {ChessPosition}
     */
    public clone() {
        var sp = new Position();
        sp.copyFrom(this);
        return sp;
    }

    public get WhoMove() {
        return this.wm;
    }

    public set WhoMove(value: number) {
        this.wm = value;
    }

    /**
     * Byte board
     */
    public get Board(): number[] {
        return this.brd;
    }

    public get Captured(): number[] {
        return this.capt;
    }

    /**
     * Get piece on square
     */
    getPiece = (sq: number): number => {
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
     * @returns {Boolean}
     */
    public addPiece(p: number, sq: number): boolean {
        var c = Piece.color(p);
        if (this.pieceCount[c] === 16) { return false; }

        if (Piece.type(p) === Piece.King) {
            // check there is not already a King:
            if (this.material[p] > 0) { return false; }

            // king is always at the start of the piece list, so move the piece
            // already at location 0 if there is one:
            if (this.pieceCount[c] > 0) {
                var oldsq = this.list[c][0];
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
     * @returns {Boolean}
     */
    public removePiece(p: number, sq: number): boolean {
        // TODO: check method
        var c = Piece.color(p);
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
     * Return castling is enabled.
     */
    public getCastling(c: number, dir: Castle): boolean {
        /* tslint:disable:no-bitwise */
        var b = (c === Color.White ? 1 : 4);
        if (dir === Castle.KSide) {
            b += b;
        }

        // now b == 1 or 2 (white flags), or 4 or 8 (black flags)
        if (this.Castling & b) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Set castling flag.
     */
    public setCastling(c: number, dir: Castle, flag: boolean): void {
        /* tslint:disable:no-bitwise */
        var b = (c === Color.White) ? 1 : 4;
        if (dir === Castle.KSide) {
            b += b;
        }

        // now b = 1 or 2 (white flags), or 4 or 8 (black flags)
        if (flag) {
            this.Castling |= b;
        } else {
            this.Castling &= (255 - b);
        }
    }

    /**
     * Return current halfmove humber
     */
    public get PlyCount(): number {
        return this.plyCnt;
    }

    /**
     * Get move number
     */
    public getMoveNo(): number {
        return ((this.plyCnt + 2) >> 1);
    }

    /**
     * Set move number
     */
    public setMoveNo(no: number): void {
        this.plyCnt = (no - 1) * 2;
        if (this.wm === Color.Black) {
            this.plyCnt++;
        }
    }

    /**
     * Make the move on the board and update all the necessary 
     * fields in the simpleMove structure so it can be undone.
     * @param sm {SimpleMove}
     */
    public doSimpleMove(sm: SimpleMove): void {
        var from = sm.From;
        var to = sm.To;
        var p = this.brd[from];
        var ptype = Piece.type(p);
        var enemy = Color.flip(this.wm);

        sm.PieceNum = this.listPos[from];
        sm.CapturedPiece = this.brd[to];
        sm.CapturedSquare = to;
        sm.CastleFlags = this.Castling;
        sm.EpSquare = this.EpTarget;
        sm.OldHalfMoveClock = this.HalfMoveCount;

        this.HalfMoveCount++;
        this.plyCnt++;

        // handle enpassant capture:
        if ((ptype === Piece.Pawn) &&
            (sm.CapturedPiece === noPiece) &&
            (Square.fyle(from) !== Square.fyle(to))) {
            // this was an EP capture. We do not need to check it was a capture
            // since if a pawn lands on EPTarget it must capture to get there.
            var enemyPawn = Piece.create(enemy, Piece.Pawn);
            sm.CapturedSquare = (this.wm === Color.White ? (to - 8) : (to + 8));
            sm.CapturedPiece = enemyPawn;
        }

        // handle captures:
        if (sm.CapturedPiece !== noPiece) {
            sm.CapturedNum = this.listPos[sm.CapturedSquare];
            // update opponents List of pieces
            this.pieceCount[enemy]--;
            this.listPos[this.list[enemy][this.pieceCount[enemy]]] = sm.CapturedNum;
            this.list[enemy][sm.CapturedNum] = this.list[enemy][this.pieceCount[enemy]];
            this.material[sm.CapturedPiece]--;
            this.HalfMoveCount = 0;
            this.removeFromBoard(sm.CapturedPiece, sm.CapturedSquare);
            this.capt[this.plyCnt] = sm.CapturedPiece;
        }

        // handle promotion:
        if (sm.Promote !== noPiece) {
            this.material[p]--;
            this.removeFromBoard(p, from);
            p = Piece.create(this.wm, sm.Promote);
            this.material[p]++;
            this.addToBoard(p, from);
        }

        // now make the move:
        this.list[this.wm][sm.PieceNum] = to;
        this.listPos[to] = sm.PieceNum;
        this.removeFromBoard(p, from);
        this.addToBoard(p, to);

        var rookfrom = 0;
        var rookto = 0;
        // handle Castling:
        if ((ptype === Piece.King) &&
            (Square.fyle(from) === 4) &&
            (Square.fyle(to) === 2 || Square.fyle(to) === 6)) {
            var rook = Piece.create(this.wm, Piece.Rook);
            if (Square.fyle(to) === 2) {
                rookfrom = to - 2;
                rookto = to + 1;
            } else {
                rookfrom = to + 1;
                rookto = to - 1;
            }

            this.listPos[rookto] = this.listPos[rookfrom];
            this.list[this.wm][this.listPos[rookto]] = rookto;
            this.removeFromBoard(rook, rookfrom);
            this.addToBoard(rook, rookto);
        }

        // handle clearing of castling flags:
        if (this.Castling) {
            if (ptype === Piece.King) {   // the king moved.
                this.setCastling(this.wm, Castle.QSide, false);
                this.setCastling(this.wm, Castle.KSide, false);
            }

            // see if a rook moved or was captured:
            if (this.wm === Color.White) {
                if (from === 0) { this.setCastling(Color.White, Castle.QSide, false); }
                if (from === 7) { this.setCastling(Color.White, Castle.KSide, false); }
                if (to === 56) { this.setCastling(Color.Black, Castle.QSide, false); }
                if (to === 63) { this.setCastling(Color.Black, Castle.KSide, false); }
            } else {
                if (from === 56) { this.setCastling(Color.Black, Castle.QSide, false); }
                if (from === 63) { this.setCastling(Color.Black, Castle.KSide, false); }
                if (to === 0) { this.setCastling(Color.White, Castle.QSide, false); }
                if (to === 7) { this.setCastling(Color.White, Castle.KSide, false); }
            }
        }

        // set the EPTarget square, if a pawn advanced two squares and an
        // enemy pawn is on a square where enpassant may be possible.
        this.EpTarget = ns;
        if (ptype === Piece.Pawn) {
            var fromRank = Square.rank(from);
            var toRank = Square.rank(to);
            if ((fromRank === 1) &&
                (toRank === 3) &&
                ((this.brd[Square.move(to, LEFT)] === Piece.BPawn) ||
                    (this.brd[Square.move(to, RIGHT)] === Piece.BPawn))) {
                this.EpTarget = Square.move(from, UP);
            }
            if ((fromRank === 6) &&
                (toRank === 4) &&
                ((this.brd[Square.move(to, LEFT)] === Piece.WPawn) ||
                    (this.brd[Square.move(to, RIGHT)] === Piece.WPawn))) {
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
        var from = sm.From;
        var to = sm.To;
        var p = this.brd[to];
        this.EpTarget = sm.EpSquare;
        this.Castling = sm.CastleFlags;
        this.HalfMoveCount = sm.OldHalfMoveClock;
        this.plyCnt--;
        this.wm = Color.flip(this.wm);
        sm.PieceNum = this.listPos[to];

        // handle a capture: insert piece back into piece list.
        // this works for EP captures too, since the square of the captured
        // piece is in the "capturedSquare" field rather than assuming the
        // value of the "to" field. The only time these two fields are
        // different is for an enpassant move.
        if (sm.CapturedPiece !== noPiece) {
            var c = Color.flip(this.wm);
            this.listPos[this.list[c][sm.CapturedNum]] = this.pieceCount[c];
            this.listPos[sm.CapturedSquare] = sm.CapturedNum;
            this.list[c][this.pieceCount[c]] = this.list[c][sm.CapturedNum];
            this.list[c][sm.CapturedNum] = sm.CapturedSquare;
            this.material[sm.CapturedPiece]++;
            this.pieceCount[c]++;
        }
        // handle promotion:
        if (sm.Promote !== noPiece) {
            this.material[p]--;
            this.removeFromBoard(p, to);
            p = Piece.create(this.wm, Piece.Pawn);
            this.material[p]++;
            this.addToBoard(p, to);
        }

        // now make the move:
        this.list[this.wm][sm.PieceNum] = from;
        this.listPos[from] = sm.PieceNum;
        this.removeFromBoard(p, to);
        this.addToBoard(p, from);
        if (sm.CapturedPiece !== noPiece) {
            this.addToBoard(sm.CapturedPiece, sm.CapturedSquare);
            delete this.capt[this.plyCnt + 1];
        }

        // handle Castling:
        if ((Piece.type(p) === Piece.King) && Square.fyle(from) === 4
            && (Square.fyle(to) === 2 || Square.fyle(to) === 6)) {
            var rook = (this.wm === Color.White ? Piece.WRook : Piece.BRook);
            var rookfrom: number;
            var rookto: number;
            if (Square.fyle(to) === 2) {
                rookfrom = to - 2; rookto = to + 1;
            } else {
                rookfrom = to + 1; rookto = to - 1;
            }
            this.listPos[rookfrom] = this.listPos[rookto];
            this.list[this.wm][this.listPos[rookto]] = rookfrom;
            this.removeFromBoard(rook, rookto);
            this.addToBoard(rook, rookfrom);
        }
    }

    public makeSanString(sm: SimpleMove, flag: SanCheckLevel) {
        var san = "";
        sm.PieceNum = this.listPos[sm.From];
        var from = this.list[this.wm][sm.PieceNum];
        var p = Piece.type(this.brd[from]);
        var to = sm.To;
        var mlist: SimpleMove[];
        if (p === Piece.Pawn) {
            var capture = false;
            if (Square.fyle(from) !== Square.fyle(to)) {  // pawn capture
                san += Square.fyleChar(from);
                san += "x";
                capture = true;
            }
            san += Square.fyleChar(to);
            san += Square.rankChar(to);
            if ((Square.rank(to) === 0) || (Square.rank(to) === 7)) {
                san += "=";
                san += Piece.toChar(sm.Promote);
            }

            if (capture && (to !== sm.CapturedSquare)) {
                san += " e.p.";
            }
        } else if (p === Piece.King) {
            if (sm.From === ns) {
                san += "--";
            } else if ((Square.fyle(from) === 4) && (Square.fyle(to) === 6)) {
                san += Castle.K;
            } else if ((Square.fyle(from) === 4) && (Square.fyle(to) === 2)) {
                san += Castle.Q;
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
            if (this.material[this.brd[sm.From]] < 2) {
                if (this.brd[to] !== noPiece) {
                    san += "x";
                }

                san += Square.fyleChar(to);
                san += Square.rankChar(to);
            } else {
                // disambiguate moves here:
                // sHOULD handle 3-way ambiguity!  Looks like it does OK.
                var ambiguous_fyle = false;
                var ambiguous_rank = false;
                var f = Square.fyleChar(from);
                var r = Square.rankChar(from);
                mlist = [];
                this.matchLegalMove(mlist, p, to);
                for (var i = 0; i < mlist.length; i++) {
                    var m2 = mlist[i];
                    var from2 = m2.From;
                    var p2 = Piece.type(this.brd[from2]);
                    if ((to === m2.To) && (from !== from2) && (p2 === p)) {
                        /* we have an ambiguity */
                        var f2 = Square.fyleChar(from2);
                        // var r2 = Square.Square_RankChar(from2);
                        if (f === f2) {  // ambiguous fyle, so print rank
                            ambiguous_fyle = true;
                        } else {        // ambiguous rank, so print fyle
                            ambiguous_rank = true;
                        }
                    }
                }
                if (ambiguous_rank) {
                    san += f;
                }

                if (ambiguous_fyle) {
                    san += r;
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
                var ch = "+";
                if (flag > 1) {
                    mlist = this.generateMoves(noPiece, GenerateMode.All, true);
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
    public generateMoves(pieceType: number, genType: number, maybeInCheck: boolean) {
        var genNonCaptures = (genType & GenerateMode.NonCaptures) !== 0;
        var capturesOnly = !genNonCaptures;

        var mask = 0;
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
        var mlist: SimpleMove[] = [];

        // compute which pieces of the side to move are this.pinned to the king:
        this.calcPins();

        // determine if the side to move is in check and find where the
        // checking pieces are, unless the caller has passed maybeInCheck=false
        // indicating it is CERTAIN the side to move is not in check here.
        var numChecks = 0;
        if (maybeInCheck) {
            var checkSquares: number[] = [];
            numChecks = this.calcNumChecks(this.getKingSquare(this.wm), checkSquares);
            if (numChecks > 0) {
                // the side to move IS in check:
                this.genCheckEvasions(mlist, pieceType, genType, checkSquares);
                return mlist;
            }
        }

        // the side to move is NOT in check. Iterate over each non-king
        // piece, and then generate King moves last of all:
        var npieces = this.pieceCount[this.wm];

        for (var x = 1; x < npieces; x++) {
            var sq = this.list[this.wm][x];
            var p = this.brd[sq];
            var ptype = Piece.type(p);


            if (!(mask & (1 << ptype))) { continue; }
            var _pinned = this.pinned[x];
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
            var castling = !numChecks;
            this.genKingMoves(mlist, genType, castling);
        }

        return mlist;
    }

    public isLegalMove(sm: SimpleMove): boolean {
        var from = sm.From;
        var to = sm.To;
        if (from > 63 || to > 63) { return false; }
        if (from === to) { return false; }
        var mover = this.brd[from];
        var captured = this.brd[to];

        if (Piece.color(mover) !== this.wm) { return false; }
        if (Piece.color(captured) === this.wm) { return false; }
        if (sm.MovingPiece !== mover) { return false; }
        mover = Piece.type(mover);
        if (sm.Promote !== noPiece && mover !== Piece.Pawn) { return false; }

        var enemy = Color.flip(this.wm);

        if (mover === Piece.Pawn) {
            var rfrom = Square.rank(from);
            var rto = Square.rank(to);
            if (this.wm === Color.Black) { rfrom = 7 - rfrom; rto = 7 - rto; }
            var rdiff = rto - rfrom;
            var fdiff = Square.fyle(to) - Square.fyle(from);
            if (rdiff < 1 || rdiff > 2) { return false; }
            if (fdiff < -1 || fdiff > 1) { return false; }
            if (fdiff === 0) {  // pawn push:
                if (captured !== noPiece) { return false; }
                if (rdiff === 2) {  // two-square push:
                    if (rfrom !== 1) { return false; }
                    // make sure the square in between is NOPIECE:
                    var midsquare = from + ((to - from) / 2);
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
                var p = sm.Promote;
                if (p !== Piece.Queen && p !== Piece.Rook && p !== Piece.Bishop && p !== Piece.Knight) {
                    return false;
                }
            } else {
                if (sm.Promote !== noPiece) { return false; }
            }
        } else if (Piece.isSlider(mover)) {
            // make sure the direction is valid:
            var dir = Square.direction(from, to);
            if (dir === NULL_DIR) { return false; }
            if (mover === Piece.Rook && Direction.isDiagonal(dir)) { return false; }
            if (mover === Piece.Bishop && !Direction.isDiagonal(dir)) { return false; }
            var delta = Direction.delta(dir);
            // make sure all the in-between squares are NOPIECE:
            var dest = from + delta;
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
                var mlist: SimpleMove[] = [];
                this.genCastling(mlist);
                for (var i = 0; i < mlist.length; i++) {
                    if ((mlist[i].From === from) && (mlist[i].To === to)) {
                        return false;
                    }
                }

                return false;
            }
        }

        // the move looks good, but does it leave the king in check?
        var kingSq = (mover === Piece.King) ? to : this.getKingSquare(this.wm);
        this.doSimpleMove(sm);
        var nchecks = this.calcAttacks(enemy, kingSq);
        this.undoSimpleMove(sm);
        return (nchecks === 0);
    }

    /**
     * Добавить фигуру на доску
     * @param p
     * @param sq
     */
    private addToBoard(p: number, sq: number): void {
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
    private removeFromBoard(p: number, sq: number): void {
        this.brd[sq] = noPiece;
        this.numOnRank[p][Square.rank(sq)]--;
        this.numOnFyle[p][Square.fyle(sq)]--;
        this.numOnLeftDiag[p][Square.leftDiag(sq)]--;
        this.numOnRightDiag[p][Square.rightDiag(sq)]--;
        this.numOnSquareColor[p][Square.color(sq)]--;
    }

    private fyleCount(p: number, f: number): number {
        return this.numOnFyle[p][f];
    }

    private rankCount(p: number, r: number): number {
        return this.numOnRank[p][r];
    }

    private leftDiagCount(p: number, diag: number): number {
        return this.numOnLeftDiag[p][diag];
    }

    private rightDiagCount(p: number, diag: number): number {
        return this.numOnRightDiag[p][diag];
    }

    private squareColorCount(p: number, sqColor: number): number {
        return this.numOnSquareColor[p][sqColor];
    }

    /**
     * Клетка на которой находится король
     * @param c
     * @returns {Number}
     */
    private getKingSquare(c: number = this.wm): number {
        return this.list[c][0];
    }

    /**
     * Клетка на которой находится король противника
     * @param c
     * @returns {Number}
     */
    private getEnemyKingSquare(c: number = this.wm): number {
        return this.list[1 - c][0];
    }

    /**
     * Посчитать количество шахов
     */
    private calcNumChecks(kingSq: number, checkSquares?: number[]): number {
        kingSq = (kingSq) ? kingSq : this.getKingSquare();
        return this.calcAttacks(1 - this.wm, kingSq, checkSquares);
    }

    /**
     * Король под шахом
     */
    public isKingInCheck(): boolean {
        return (this.calcNumChecks(this.getKingSquare(), undefined) > 0);
    }

    /**
     * Рассчитать количество атак для указанной стороны.
     * Эта функция также добавляет список атакующих клеток в параметре fromSqs, если он не undefined.
     */
    private calcAttacks(side: number, target: number, fromSqs?: number[]): number {
        var fromSquares = (fromSqs !== undefined) ? fromSqs : [];
        var queen: number;
        var rook: number;
        var bishop: number;
        var knight: number;
        var delta: number;
        var dest: number;
        var dirs: number[] = [];
        var dir: number;
        var last: number;
        var p: number;
        var sq: number;
        var i: number;

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

        var numQueensRooks = this.material[queen] + this.material[rook];
        var numQueensBishops = this.material[queen] + this.material[bishop];

        // we only bother if there are any sliding pieces of each type:
        if (numQueensRooks > 0) {
            var fyle = Square.fyle(target);
            var rank = Square.rank(target);

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
                    dest += delta;
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
            var left = Square.leftDiag(target);
            var right = Square.rightDiag(target);
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
                    dest += delta;
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
            var dests = Square.knightAttacks(target);
            i = 0;
            while (i < 20) {
                dest = dests[i++];
                if (dest === ns) { break; }
                if (this.brd[dest] === knight) {
                    fromSquares.push(dest);
                }
            }
        }

        // now pawn attacks:
        if (side === Color.White) {
            if (Square.rank(target) !== 0) {  // if (Material[WP] > 0) {
                sq = Square.move(target, DOWN_LEFT);
                if (this.brd[sq] === Piece.WPawn) {
                    fromSquares.push(sq);
                }
                sq = Square.move(target, DOWN_RIGHT);
                if (this.brd[sq] === Piece.WPawn) {
                    fromSquares.push(sq);
                }
            }
        } else {
            if (Square.rank(target) !== 7) {  // if (Material[BP] > 0) {
                sq = Square.move(target, UP_LEFT);
                if (this.brd[sq] === Piece.BPawn) {
                    fromSquares.push(sq);
                }
                sq = Square.move(target, UP_RIGHT);
                if (this.brd[sq] === Piece.BPawn) {
                    fromSquares.push(sq);
                }
            }
        }

        return fromSquares.length;
    }

    private calcPins(): void {
        for (var i = 0; i < 16; i++) {
            this.pinned[i] = NULL_DIR;
        }

        var kingSq = this.getKingSquare(this.wm);
        var enemy = Color.flip(this.wm);
        var enemyQueen = Piece.create(enemy, Piece.Queen);
        var enemyRook = Piece.create(enemy, Piece.Rook);
        var enemyBishop = Piece.create(enemy, Piece.Bishop);

        // pins and checks from Bishops/Queens/Rooks:
        var fyle = Square.fyle(kingSq);
        if (this.fyleCount(enemyQueen, fyle) + this.fyleCount(enemyRook, fyle) > 0) {
            this.calcPinsDir(UP, Piece.Rook);
            this.calcPinsDir(DOWN, Piece.Rook);
        }

        var rank = Square.rank(kingSq);
        if (this.rankCount(enemyQueen, rank) + this.rankCount(enemyRook, rank) > 0) {
            this.calcPinsDir(LEFT, Piece.Rook);
            this.calcPinsDir(RIGHT, Piece.Rook);
        }

        var ld = Square.leftDiag(kingSq);
        if (this.leftDiagCount(enemyQueen, ld) + this.leftDiagCount(enemyBishop, ld) > 0) {
            this.calcPinsDir(UP_LEFT, Piece.Bishop);
            this.calcPinsDir(DOWN_RIGHT, Piece.Bishop);
        }

        var rd = Square.rightDiag(kingSq);
        if (this.rightDiagCount(enemyQueen, rd) + this.rightDiagCount(enemyBishop, rd) > 0) {
            this.calcPinsDir(UP_RIGHT, Piece.Bishop);
            this.calcPinsDir(DOWN_LEFT, Piece.Bishop);
        }
    }

    private calcPinsDir(dir: number, attacker: number): void {
        // two pieces can pin along any path. A queen is always one,
        // the other is a bishop or rook. To save calculating it here, the
        // appropriate piece (BISHOP) or (ROOK) is passed along with the
        // direction.

        var king = this.getKingSquare(this.wm);
        var friendly = ns;
        var x = king;
        var last = Square.last(king, dir);
        var delta = Direction.delta(dir);

        while (x !== last) {
            x += delta;
            var p = this.brd[x];
            if (p === noPiece) {
                // square NOPIECE, so keep searching.
                continue;
            } else if (Piece.colorNotEmpty(p) === this.wm) {
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
                    var ptype = Piece.type(p);
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
    private addLegalMove(mlist: SimpleMove[], from: number, to: number, promo: number) {
        var sm = new SimpleMove();
        // we do NOT set the pre-move castling/ep flags, or the captured
        // piece info, here since that is ONLY needed if the move is
        // going to be executed with DoSimpleMove() and then undone.
        sm.From = from;
        sm.To = to;
        sm.Promote = promo;
        sm.MovingPiece = this.brd[from];
        sm.CapturedPiece = this.brd[to];
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
    private genSliderMoves(mlist: SimpleMove[], color: number, fromSq: number, dir: number, capturesOnly?: boolean, sqset?: number[]) {
        capturesOnly = !!capturesOnly;
        var dest = fromSq;
        var last = Square.last(fromSq, dir);
        var delta = Direction.delta(dir);
        while (dest !== last) {
            dest += delta;
            var p = this.brd[dest];
            if (p === noPiece) {
                if (!capturesOnly) {
                    if (is_valid_dest(dest, sqset)) {
                        this.addLegalMove(mlist, fromSq, dest, noPiece);
                    }
                }

                continue;
            }

            // we have reached a piece. Add the capture if it is an enemy.
            if (Piece.colorNotEmpty(p) !== color) {
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
    private genKnightMoves(mlist: SimpleMove[], color: number, fromSq: number, sqset?: number[], capturesOnly?: boolean): void {
        capturesOnly = !!capturesOnly;
        var destArr = Square.knightAttacks(fromSq);
        var i = 0;
        while (true) {
            var dest = destArr[i++];
            if (dest === ns) { break; }
            var p = this.brd[dest];
            if (capturesOnly && (p === noPiece)) { continue; }
            if (Piece.color(p) !== color) {
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
        var from = this.getKingSquare(this.wm);
        if (from !== (this.wm === Color.White ? 4 : 60)) { return; }
        var enemyKingSq = this.getEnemyKingSquare();
        var target: number; var skip: number; var rookSq: number; var rookPiece: number;
        // queen side Castling:
        if (!this.strictCastling || this.getCastling(this.wm, Castle.QSide)) {
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
        if (!this.strictCastling || this.getCastling(this.wm, Castle.KSide)) {
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
        var kingSq = this.getKingSquare();
        var enemyKingSq = this.getEnemyKingSquare();
        var enemy = Color.flip(this.wm);
        var king = Piece.create(this.wm, Piece.King);
        var genNonCaptures = ((genType & GenerateMode.NonCaptures) !== 0);

        var destArr = Square.kingAttacks(kingSq);
        var i = 0;
        var destSq: number;
        while ((destSq = destArr[i++]) !== ns) {
            // try this move and see if it legal:
            var addThisMove = false;

            // only try this move if the target square has an enemy piece,
            // or if it is NOPIECE and non captures are to be generated:
            if ((genNonCaptures && this.brd[destSq] === noPiece) ||
                (Piece.color(this.brd[destSq]) === enemy)) {
                // enemy piece or NOPIECE there, so try the move:
                var captured = this.brd[destSq];
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
    private addPromotions(mlist: SimpleMove[], from: number, dest: number): void {
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
    private isValidEnPassant(from: number, to: number): boolean {
        // check that this enpassant capture is legal:
        var ownPawn = Piece.create(this.wm, Piece.Pawn);
        var enemyPawn = Piece.create(Color.flip(this.wm), Piece.Pawn);
        var enemyPawnSq = (this.wm === Color.White) ? to - 8 : to + 8;
        var toSqPiece = this.brd[to];

        this.brd[from] = noPiece;
        this.brd[to] = ownPawn;
        this.brd[enemyPawnSq] = noPiece;
        var isValid = this.isKingInCheck();
        this.brd[from] = ownPawn;
        this.brd[to] = toSqPiece;
        this.brd[enemyPawnSq] = enemyPawn;
        return isValid;
    }

    private _POSSIBLE_CAPTURE(d: number, from: number) {
        return (
            (d !== ns) &&
            ((Piece.color(this.brd[d]) === (Color.flip(this.wm))) ||
                (d === this.EpTarget && this.isValidEnPassant(from, d))));
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
    private genPawnMoves(mlist: SimpleMove[], from: number, dir: number, genType: number, sqset?: number[]) {
        var genNonCaptures = ((genType & GenerateMode.NonCaptures) !== 0);
        var oppdir = Direction.opposite(dir);
        var forward: number,
            promoRank: number,
            secondRank: number,
            dest: number;
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
            if (this.brd[dest] === noPiece && (is_valid_dest(dest, sqset))) {
                if (Square.rank(dest) === promoRank) {
                    this.addPromotions(mlist, from, dest);
                } else {
                    this.addLegalMove(mlist, from, dest, noPiece);
                }
            }

            if (Square.rank(from) === secondRank && this.brd[dest] === noPiece) {
                dest = Square.move(dest, forward);
                if (this.brd[dest] === noPiece && (is_valid_dest(dest, sqset))) {
                    this.addLegalMove(mlist, from, dest, noPiece);
                }
            }
        }

        // now do captures: left, then right
        // to be a possible capture, dest square must be EPTarget or hold
        // an enemy piece.
        var capdir = forward | LEFT;
        if (dir === NULL_DIR || dir === capdir || oppdir === capdir) {
            dest = Square.move(from, capdir);
            if (this._POSSIBLE_CAPTURE(dest, from) && (is_valid_dest(dest, sqset))) {
                if (Square.rank(dest) === promoRank) {
                    this.addPromotions(mlist, from, dest);
                } else {
                    this.addLegalMove(mlist, from, dest, noPiece);
                }
            }
        }

        capdir = forward | RIGHT;
        if (dir === NULL_DIR || dir === capdir || oppdir === capdir) {
            dest = Square.move(from, capdir);
            if (this._POSSIBLE_CAPTURE(dest, from) && (is_valid_dest(dest, sqset))) {
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
    private genCheckEvasions(mlist: SimpleMove[], mask: number, genType: number, checkSquares: number[]): void {
        var numChecks = checkSquares.length;

        var genNonCaptures = ((genType & GenerateMode.NonCaptures) !== 0);
        var capturesOnly = !genNonCaptures;

        var king = this.getKingSquare(this.wm);

        // if it's double check, we can ONLY move the king
        if (numChecks === 1) {
            // oк, it is NOT a double check
            // try to block piece/capture piece. Remember enpassant!
            // first, generate a list of targets: squares between the king
            // and attacker to block, and the attacker's square.

            var attackSq: number = checkSquares[0];
            var dir: number = Square.direction(king, attackSq);
            var targets: number[] = [];  // set of blocking/capturing squares.
            targets.push(attackSq);

            // now add squares we can might be able to block on.
            if (dir !== NULL_DIR) {
                var sq = Square.move(king, dir);
                while (sq !== attackSq) {
                    if (this.brd[sq] === noPiece) { targets.push(sq); }
                    sq = Square.move(sq, dir);
                }
            }

            // try each non-King piece in turn. If a piece is pinned to
            // the king, don't bother since it cannot possibly block or
            // capture the piece that is giving check!

            var numPieces = this.pieceCount[this.wm];
            for (var p2 = 1; p2 < numPieces; p2++) {
                var from = this.list[this.wm][p2];
                var p2piece = this.brd[from];
                if (this.pinned[p2] !== NULL_DIR) { continue; }
                if (mask === noPiece || mask === Piece.type(p2piece)) {
                    if (Piece.type(p2piece) === Piece.Pawn) {
                        this.genPawnMoves(mlist, from, NULL_DIR, genType, targets);
                        // capturing a pawn enpassant will only get out
                        // of check if the pawn that moved two squares
                        // is doing the checking. If it is not, that means
                        // a discovered check with the last pawn move so
                        // taking enpassant cannot get out of check.
                        if (this.EpTarget !== ns) {
                            var pawnSq = (this.wm === Color.White ? this.EpTarget - 8 : this.EpTarget + 8);
                            if (pawnSq === attackSq) {
                                var epset: number[] = [];
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
    private genPieceMoves(mlist: SimpleMove[], fromSq: number, capturesOnly: boolean, sqset?: number[]) {
        var c = this.wm;
        var p = this.brd[fromSq];
        var ptype = Piece.type(p);

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

    private matchLegalMove(mlist: SimpleMove[], mask: number, target: number) {
        var total = this.material[Piece.create(this.wm, mask)];
        var _cnt = 0;
        var dir: number;
        var sq: number;

        var kingSq = this.getKingSquare(this.wm);
        var tryMove = 0;

        // first, verify that the target square is NOPIECE or contains
        // an enemy piece:
        var p = this.brd[target];
        if (p !== noPiece && Piece.color(p) === this.wm) {
            return;
        }

        // loop through looking for pieces of type "mask". We start at 1
        // since the King is always the piece at position 0 in the list.
        for (var x = 1; x < this.pieceCount[this.wm] && _cnt < total; x++) {
            var sqPtr = this.list[this.wm][x];
            p = this.brd[sqPtr];
            var pt = Piece.type(p);
            if (pt === mask) {
                // increment count so we stop when we've seen all the Material[p] pieces of this type.
                tryMove = 0;
                _cnt++;

                switch (pt) {
                    case Piece.Knight:
                        if (Square.isKnightHop(sqPtr, target)) { tryMove = 1; }
                        break;
                    case Piece.Rook:
                        dir = Square.direction(sqPtr, target);
                        if (dir !== NULL_DIR && !Direction.isDiagonal(dir)) {
                            sq = Square.move(sqPtr, dir);
                            tryMove = 1;
                            while (sq !== target) {
                                if (this.brd[sq] !== noPiece) { // oops, piece in the way
                                    tryMove = 0;
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
                            tryMove = 1;
                            while (sq !== target) {
                                if (this.brd[sq] !== noPiece) { // oops, piece in the way
                                    tryMove = 0;
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
                            tryMove = 1;
                            while (sq !== target) {
                                if (this.brd[sq] !== noPiece) { // oops, piece in the way
                                    tryMove = 0;
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
                if (tryMove === 1) {
                    var captured = this.brd[target];
                    this.brd[target] = p;
                    this.brd[sqPtr] = noPiece;
                    if (this.calcNumChecks(kingSq) > 0) { tryMove = 0; }
                    this.brd[sqPtr] = p;
                    this.brd[target] = captured;
                    if (tryMove === 1) { this.addLegalMove(mlist, sqPtr, target, noPiece); }
                }
            }
        }
    }

    protected matchKingMove(mlist: SimpleMove[], target: number) {
        mlist = [];
        var kingSq = this.getKingSquare(this.wm);
        var diff = target - kingSq;

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

            if (this.strictCastling && !this.getCastling(this.wm, Castle.QSide)) {
                return false;
            }

            // we also need to verify that the target square does not
            // lie adjacent to the location of the enemy king!
            if (this.brd[kingSq + 1] !== noPiece || this.brd[kingSq + 2] !== noPiece
                || this.calcNumChecks(kingSq) > 0
                || this.calcNumChecks(kingSq + 1) > 0
                || this.calcNumChecks(kingSq + 2) > 0) {
                return false;
            }
            this.addLegalMove(mlist, kingSq, target, noPiece);
            return true;
        }

        if (diff === -2) { // queen side Castling
            if (kingSq !== (this.wm === Color.White ? 4 : 60)) {
                return false;
            }

            if (this.strictCastling && !this.getCastling(this.wm, Castle.QSide)) {
                return false;
            }

            if (this.brd[kingSq - 1] !== noPiece || this.brd[kingSq - 2] !== noPiece
                || this.brd[kingSq - 3] !== noPiece
                || this.calcNumChecks(kingSq) > 0
                || this.calcNumChecks(kingSq - 1) > 0
                || this.calcNumChecks(kingSq - 2) > 0) {
                return false;
            }

            this.addLegalMove(mlist, kingSq, target, noPiece);
            return true;
        }

        var captured = this.brd[target];
        if (Piece.color(captured) === this.wm) {
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

        var legal = 0;
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
}

export const ChessPositionStd = new Position(FenString.fenStandartStart);
import * as shortid from 'shortid';
import { Color } from './Color';
import { Piece } from './Piece';
import { Square } from './Square';
import { SimpleMove } from './SimpleMove';

/**
 * Move in position
 */
export class Move {
    private vars: Move[] = [];
    private varNo: number = 0;
    private ply: number;
    private from: number;
    private to: number;
    private color: number;
    private capturedSquare: number;
    private capturedPiece: number;
    private promote: number;
    private piece_num: number;
    private permanent: boolean;
    private legal_moves: SimpleMove[];
    private parent: Move | null = null;
    
    private prev_move: Move | null;
    private next_move: Move | null;
    
    public START_MARKER: boolean;
    public END_MARKER: boolean;

    public uid: string;
    public id: number = 0;
    public moveData: SimpleMove | null;
    public Name: string;
    public WhoMove: number;
    public Comments: string;
    public Fen: string | undefined;

    /**
     * @constructor
     */
    constructor() {
        this.uid = shortid.generate();
        this.Name = "";
        this.moveData = null;
        this.from = Square.NullSquare;
        this.to = Square.NullSquare;
        this.color = Color.NoColor;
        this.capturedSquare = Square.NullSquare;
        this.capturedPiece = Piece.NoPiece;
        this.promote = Piece.NoPiece;
        this.piece_num = 0;
        this.WhoMove = Color.White;
        this.ply = 0;
        this.Comments = "";
        this.permanent = true;
        this.START_MARKER = false;
        this.END_MARKER = false;
        this.prev_move = null;
        this.next_move = null;
        this.legal_moves = [];
    }

    public static init(fen?: string, parent?: Move | null): Move {
        const firstMove = new Move();
        firstMove.Name = "FirstMove";
        firstMove.Fen = fen;
        firstMove.ply = 0;
        firstMove.START_MARKER = true;
        firstMove.END_MARKER = false;

        firstMove.next_move = new Move();
        firstMove.next_move.Name = "LastMove";
        firstMove.next_move.ply = 0;
        firstMove.next_move.START_MARKER = false;
        firstMove.next_move.END_MARKER = true;
        firstMove.next_move.prev_move = firstMove;

        if (parent) {
            firstMove.parent = parent;
            firstMove.ply = parent.ply;
            firstMove.varNo = parent.numVars + 1;
            firstMove.next_move.parent = parent;
            firstMove.next_move.ply = parent.ply;
            firstMove.next_move.varNo = parent.numVars + 1;
        }

        return firstMove.next_move;
    }

    public isFirst() {
        return this.START_MARKER || (this.prev_move && this.prev_move.START_MARKER);
    }

    public isBegin() {
        return this.START_MARKER;
    }

    public get First() : Move {
        let move: Move = this;
        while (move.prev_move) {
            move = move.prev_move;
        }

        return move;
    }

    public get Prev(): Move | null {
        return this.prev_move;
    }

    public get Next(): Move | null {
        return this.next_move;
    }

    public isLast() {
        return this.END_MARKER || (this.next_move && this.next_move.END_MARKER);
    }

    public isEnd() {
        return this.END_MARKER;
    }

    public get Last() {
        let move: Move = this;
        while (move.next_move) {
            move = move.next_move;
        }

        return move;
    }

    get PlyCount() {
        return this.ply;
    }

    get numVars(): number {
        return this.vars.length;
    }

    /**
     * Add and enter variation
     */
    public addVariation(): Move | null {
        let varRoot: Move | null = null;
        if (!this.START_MARKER) {
            const prev = this.Prev;
            if (prev) {
                varRoot = Move.init(prev.Fen, prev);
                prev.vars.push(varRoot);
            }
        }
        
        return varRoot;
    }

    /**
     * Enter variation
     */
    public moveIntoVariation(no: number): Move | null {
        let varRoot: Move | null = null;
        if ((no > 0) && (no <= this.numVars)) {
            varRoot = this.vars[no].Next;
        }

        return varRoot;
    }

    /**
     * Exit variation
     */
    public exitVariation() {
        if (this.parent) {
            return parent;
        }

        return this;
    }

    public truncate() {
        this.vars = [];
        this.END_MARKER = true;
    }

    public append(sm: SimpleMove) {
        const newMove = new Move();

        newMove.parent = this.parent;
        newMove.varNo = this.varNo;
        newMove.moveData = sm;
        newMove.Name = sm.San ? sm.San : sm.PlyCount.toString();
        newMove.ply = sm.PlyCount;

        newMove.next_move = this;
        newMove.prev_move = this.prev_move;

        if (this.prev_move) {
            this.prev_move.next_move = newMove;
            this.prev_move = newMove;
        }
        
        newMove.next_move.ply = newMove.ply;

        return newMove;
    }

    public get moveKey(): string {
        const pmk = this.parentMoveKey;
        if (pmk) {
            return pmk + "!" + this.varNo.toString() + "-" + this.ply.toString();
        } else {
            return this.ply.toString();
        }
    }

    private get parentMoveKey(): string {
        return (this.parent) ? this.parent.moveKey : "";
    }
}
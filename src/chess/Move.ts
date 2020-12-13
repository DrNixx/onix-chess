import * as shortid from 'shortid';
import { Color } from './Color';
import { Piece } from './Piece';
import { Square } from './Square';
import { SimpleMove } from './SimpleMove';
import { Squares, Colors, Pieces } from '../types/Types';
import { ITreePart, IMovePart, IEval, IJudgment, IGlyph } from '../types/Interfaces';
import { Position } from './Position';

/**
 * Move in position
 */
export class Move {
    private vars: Move[] = [];
    private varNo: number = 0;
    private ply: number;
    private parent: Move | null = null;
    
    private prev_move: Move | null;
    private next_move: Move | null;
    
    public START_MARKER: boolean;
    public END_MARKER: boolean;

    public uid: string;
    public id: string;
    public name: string;
    public whoMove: Colors.BW;
    public comments: string;
    public fen: string;

    public sm: SimpleMove | null;
    public data?: ITreePart | IMovePart;

    /**
     * @constructor
     */
    constructor() {
        this.id = "0";
        this.uid = shortid.generate();
        this.name = "";
        this.fen = "";
        this.sm = null;
        this.whoMove = Color.White;
        this.ply = 0;
        this.comments = "";
        this.START_MARKER = false;
        this.END_MARKER = false;
        this.prev_move = null;
        this.next_move = null;
    }

    public static init(fen: string, parentOrPos: Move | Position): Move {
        const firstMove = new Move();
        firstMove.name = "FirstMove";
        firstMove.fen = fen;
        firstMove.ply = 0;
        firstMove.sm = new SimpleMove();
        firstMove.START_MARKER = true;
        firstMove.END_MARKER = false;

        firstMove.next_move = new Move();
        firstMove.next_move.name = "LastMove";
        firstMove.next_move.ply = 0;
        firstMove.next_move.sm = new SimpleMove();
        firstMove.next_move.START_MARKER = false;
        firstMove.next_move.END_MARKER = true;
        firstMove.next_move.prev_move = firstMove;

        if (parentOrPos instanceof Position) {
            firstMove.ply = parentOrPos.PlyCount;
            firstMove.next_move.ply = parentOrPos.PlyCount;
        }

        if (parentOrPos instanceof Move) {
            firstMove.parent = parentOrPos;
            firstMove.ply = parentOrPos.ply;
            firstMove.varNo = parentOrPos.numVars + 1;
            firstMove.next_move.parent = parentOrPos;
            firstMove.next_move.ply = parentOrPos.ply;
            firstMove.next_move.varNo = parentOrPos.numVars + 1;
        }

        return firstMove.next_move;
    }

    public isBegin() {
        return this.START_MARKER;
    }

    public isFirst() {
        return this.START_MARKER || ((this.prev_move !== null) && this.prev_move.START_MARKER);
    }

    public isLast() {
        return this.END_MARKER || ((this.next_move !== null) && this.next_move.END_MARKER);
    }

    public isEnd() {
        return this.END_MARKER;
    }

    public get Begin() : Move {
        let move: Move = this;
        while (move.prev_move) {
            move = move.prev_move;
        }

        return move;
    }

    public get First() : Move {
        return this.Begin.Next!;
    }

    public get Prev(): Move {
        return (!this.isBegin()) ? this.prev_move! : this;
    }

    public get Next(): Move {
        return (!this.isEnd()) ? this.next_move! : this;
    }

    public get Last(): Move {
        return this.End.Prev!;
    }

    public get End() {
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
                varRoot = Move.init(prev.fen, prev);
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
            return this.parent;
        }

        return this;
    }

    /**
     * Is position inside variation
     */
    public inVariation() {
        return !!this.parent;
    }

    public truncate() {
        this.vars = [];
        this.END_MARKER = true;
    }

    public append(sm: SimpleMove) {
        const newMove = new Move();

        newMove.parent = this.parent;
        newMove.varNo = this.varNo;
        newMove.sm = sm;
        newMove.name = sm.san ? sm.san : sm.ply.toString();
        newMove.ply = sm.ply;

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
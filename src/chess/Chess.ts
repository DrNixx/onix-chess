import toSafeInteger from 'lodash-es/toSafeInteger';
import isNumber from 'lodash-es/isNumber';
import indexOf from 'lodash-es/indexOf';

import { Hashtable } from 'onix-core';
import { Color } from './Color';
import { Piece } from './Piece';
import { Square } from './Square';
import { Position, ChessPositionStd, SanCheckLevel, GenerateMode } from './Position';
import { Move } from './Move';
import { SimpleMove } from './SimpleMove';
import { IChessUser } from '../app/IChessUser';
import { FenString } from './FenString';
import { Squares, Colors } from './Types';

export enum ChessRatingType {
    None = 0,
    Elo = 1,
    Internal = 2,
    Rapid = 3,
    Iccf = 4
}

const ChessRatingNames: string[] = ["Unknown", "Elo", "Rating", "Rapid", "ICCF"];

function chessRatingParseType(value: string | number): ChessRatingType {
    return (isNumber(value)) ? value : toSafeInteger(value);
}

function chessRatingParseValue(value: string | number): number {
    return (isNumber(value)) ? value : toSafeInteger(value);
}

const stdTags: string[] = [
    "gameid",
    "gtype_id",
    "white",
    "white_id",
    "black",
    "black_id",
    "event",
    "event_id",
    "site",
    "site_id",
    "round",
    "game_date",
    "event_date",
    "result_id"
];

const addTags: string[] = [
    "whiteratingtype",
    "whiterating",
    "blackratingtype",
    "blackrating",
    "ecocode",
    "fen",
    "setup"
];

export class ChessTags {
    private tags: Hashtable<string> = {};

    /**
     * constructor
     */
    constructor(private owner: Chess) {
    }

    public clear() {
        this.tags = { };
    }

    public add(name: string, value: any) {
        if (name) {
            name = name.toLowerCase();
            if (indexOf(stdTags, name) === -1) {
                if (indexOf(addTags, name) !== -1) {
                    switch (name) {
                        case "whiteratingtype":
                            this.owner.WhiteRatingType = chessRatingParseType(value);
                            break;
                        case "whiterating":
                            this.owner.WhiteElo = chessRatingParseValue(value);
                            break;
                        case "blackratingtype":
                            this.owner.BlackRatingType = chessRatingParseType(value);
                            break;
                        case "blackrating":
                            this.owner.BlackElo = chessRatingParseValue(value);
                            break;
                        case "ecocode":
                            this.owner.EcoCode = value;
                            break;
                        case "fen":
                            this.owner.StartFen = value;
                            break;
                        case "setup":
                            break;
                    }
                } else {
                    this.tags[name] = value;
                }
            }
        }
    }
}

export enum ChessResultColor {
    None = 0,
    White = 1,
    Black = 2,
    Draw = 3
}

enum ChessResultType {
    None = 0,
    Win = 1,
    Lose = 2,
    Draw = 3
}

const OppositeColor: ChessResultColor[] = [
    ChessResultColor.None,
    ChessResultColor.Black,
    ChessResultColor.White,
    ChessResultColor.Draw
];

const OppositeType: ChessResultType[] = [
    ChessResultType.None,
    ChessResultType.Lose,
    ChessResultType.Win,
    ChessResultType.Draw
];

const score: number[] = [ 0, 1, 0, 0.5 ];

const resultChar: string[] = [ "*", "1", "0", "=" ];

const resultShortString: string[] = [ "*", "1-0", "0-1", "=-=" ];

const resultLongStr: string[] = [ "*", "1-0", "0-1", "1/2-1/2" ];

const resultHtmlStr: string[] = ["*", "1&ndash;0", "0&ndash;1", "&frac12;&ndash;&frac12;"];

export class ChessGameState {
    public InCheckMate: boolean = false;
    public InStaleMate: boolean = false;
    public IsNoMaterialWhite: boolean = false;
    public IsNoMaterialBlack: boolean = false;
    public IsPosRepeation: boolean = false;
    public Is50MovesRule: boolean = false;
}

export interface IChessSettings {
    id?: number,
    my_color?: string,
    white?: IChessUser,
    black?: IChessUser,
    fen?: string,
    moves?: any[]
}

type encodedMoves = [number, string, number, number, string, string];

export class Chess {
    private settings: IChessSettings;
    private savedMove: Move | null = null;
    private savedPos: Position | null = null;
    private savedPlyCount: number = 0;
    private pgnLastMovePos: number;
    private pgnNextMovePos: number;
    private varDepth: number = 0;
    private supressEvents = false;
    private moveList: { [index: string]: Move } = {};
    private currentMove!: Move;
    private currentPos!: Position;
    private startPos: Position;
    private startFen: string = FenString.standartStart;

    /**
     * Side to move in starting position
     */
    public ToMove: Colors.BW = Color.White;
    public NumHalfMoves: number = 0;
    public CurrentPlyCount: number = 0;
    public StartPlyCount: number = 0;    
    
    public Altered: boolean;
    public InPromotion: boolean = false;

    public Fen?: string;
    
    
    /// <summary>
    /// True if game has a promotion to R/B/N.
    /// </summary>
    public NoQueenPromotion: boolean = false;
    public Tags: ChessTags;
    public GameId: number;
    public White?: IChessUser;
    public Black?: IChessUser;
    public Event?: string;
    public Site?: string;
    public GameDate?: string;
    public EventDate?: string;
    public Round?: string;
    public WhiteElo?: number;
    public WhiteRatingType?: ChessRatingType;
    public BlackElo?: number;
    public BlackRatingType?: ChessRatingType;
    public EcoCode?: string;
    public Result: ChessResultColor = ChessResultColor.None;

    /**
     * @constructor 
     */
    constructor(settings?: IChessSettings) {
        this.settings = settings || {};

        this.Tags = new ChessTags(this);
        this.Altered = false;
        this.pgnLastMovePos = this.pgnNextMovePos = 0;

        if (this.settings.fen && (this.settings.fen != FenString.standartStart)) {
            this.startFen = this.settings.fen;
            this.startPos = new Position(this.settings.fen);
        } else {
            this.startPos = ChessPositionStd;
        }

        this.clear();

        this.GameId = this.settings.id || 0;
        
        this.positionChanged();
    }

    public get CurrentMove() {
        return this.currentMove;
    }

    public get CurrentPos() {
        return this.currentPos;
    }

    public set StartFen(value: string) {
        this.startFen = value;
    }

    public get NonStandardStart(): boolean {
        return this.startFen !== FenString.standartStart;
    }

    private clear() {
        this.GameId = 0;

        // CommentsFlag = NagsFlag = VarsFlag = 0;
        this.InPromotion = false;
        this.NoQueenPromotion = false;

        this.clearStandardTags();
        this.clearExtraTags();
        this.clearMoves();
    }

    /// <summary>
    /// Clears all of the standard tags.
    /// </summary>
    private clearStandardTags () {
        this.White = { userId: 0, name: "?"};
        this.Black = { userId: 0, name: "?"};
        this.Event = "?";
        this.Site = "?";
        this.Round = "?";
        this.GameDate = "????.??.??";
        this.EventDate = "????.??.??";
        this.EcoCode = "A00";
        this.Result = ChessResultColor.None;
        this.WhiteElo = this.BlackElo = 0;
        this.WhiteRatingType = this.BlackRatingType = ChessRatingType.Elo;
    }

    /// <summary>
    /// clear any nonstandard tags.
    /// </summary>
    private clearExtraTags () {
        this.Tags.clear();
    }

    /// <summary>
    /// clear all moves.
    /// </summary>
    private clearMoves () {
        this.moveList = {};
        this.NumHalfMoves = 0;
        this.CurrentPlyCount = 0;
        this.InPromotion = false;
        this.NoQueenPromotion = false;

        this.savedMove = null;
        this.savedPlyCount = 0;
        this.savedPos = null;

        this.currentMove = Move.init(this.startFen);

        // Set up start
        this.currentPos = new Position();
        this.currentPos.copyFrom(this.startPos);
        this.StartPlyCount = this.currentPos.PlyCount;
        
        const { moves } = this.settings;
        if (moves) {
            this.supressEvents = true;
            this.decodeMoves(moves);
            this.supressEvents = false;
        }

        this.ToMove = this.currentPos.WhoMove;
    }

    private decodeMoves(moves: encodedMoves[]) {
        for (let i = 0; i < moves.length; i++) {
            // 0 - from/to/color
            // 1 - san
            // 2 - captured
            // 3 - promote
            // 4 - comments
            // 5 - nag
            // 6 - variations
            const mv = moves[i];

            const sm = new SimpleMove();
            sm.PlyCount = this.CurrentPos.PlyCount + 1;
            const from = mv[0] & 63;
            const to = (mv[0] >> 6) & 63;
            const color = (mv[0] >> 12) & 63;
            const capturedPiece = mv[2] & 63;
            const capturedSquare = (mv[2] >> 6) & 63;

            sm.From = Square.isSquare(from) ? from : Square.NullSquare;
            sm.To = Square.isSquare(to) ? to : Square.NullSquare;;
            sm.Color = Color.isColor(color) ? color : Color.None;
            sm.CapturedPiece = Piece.isPiece(capturedPiece) ? capturedPiece : Piece.None;
            sm.CapturedSquare = Square.isSquare(capturedSquare) ? capturedSquare : Square.NullSquare;
            sm.San = mv[1];
            sm.Promote = Piece.isPieceType(mv[3]) ? mv[3] : Piece.None;
            sm.Comments = mv[4];
            sm.Nag = mv[5];
            sm.Permanent = true;

            const move = this.addMove(sm, sm.San);
            this.moveList[move.moveKey] = move;
        }
    }

    private positionChanged() {
        if (!this.supressEvents) {
            if (!this.currentMove.Fen) {
                this.currentMove.Fen = FenString.fromPosition(this.currentPos);
            }

            this.Fen = this.currentMove.Fen;
        }
    }

    public checkGameState(): ChessGameState {
        const state = new ChessGameState();

        const mlist = this.currentPos.generateMoves(Piece.None, GenerateMode.All, true);

        if (mlist.length === 0) {
            if (this.currentPos.isKingInCheck()) {
                state.InCheckMate = true;
            } else {
                state.InStaleMate = true;
            }
        }

        if ((!this.currentPos.hasPiece(Piece.WPawn)) &&
            (!this.currentPos.hasPiece(Piece.WQueen)) &&
            (!this.currentPos.hasPiece(Piece.WRook))) {
            if ((!this.currentPos.hasPiece(Piece.WKnight)) && (!this.currentPos.hasPiece(Piece.WBishop))) {
                // King only
                state.IsNoMaterialWhite = true;
            } else if ((!this.currentPos.hasPiece(Piece.WKnight)) && (this.currentPos.getPieceCount(Piece.WBishop) === 1)) {
                // King and bishop
                state.IsNoMaterialWhite = true;
            } else if ((this.currentPos.getPieceCount(Piece.WKnight) === 1) && (!this.currentPos.hasPiece(Piece.WBishop))) {
                // King and knight
                state.IsNoMaterialWhite = true;
            }
        }

        if ((!this.currentPos.hasPiece(Piece.BPawn)) &&
            (!this.currentPos.hasPiece(Piece.BQueen)) &&
            (!this.currentPos.hasPiece(Piece.BRook))) {
            if ((!this.currentPos.hasPiece(Piece.BKnight)) && (!this.currentPos.hasPiece(Piece.BBishop))) {
                // King only
                state.IsNoMaterialBlack = true;
            } else if ((!this.currentPos.hasPiece(Piece.BKnight)) && (this.currentPos.getPieceCount(Piece.BBishop) === 1)) {
                // King and bishop
                state.IsNoMaterialBlack = true;
            } else if ((this.currentPos.getPieceCount(Piece.BKnight) === 1) && (!this.currentPos.hasPiece(Piece.BBishop))) {
                // King and knight
                state.IsNoMaterialBlack = true;
            }
        }

        const move = this.currentMove.Prev!;
        const thisFen = move.Fen;
        let rc = 1;
        while (!move.START_MARKER) {
            if (thisFen === move.Fen) { 
                rc++; 
            }
        }

        state.IsPosRepeation = rc >= 3;
        state.Is50MovesRule = this.currentPos.HalfMoveCount > 100;

        return state;
    }

    public makeMove(fr: Squares.Square, to: Squares.Square, promote?: string) {
        const { currentPos } = this;
        const sm = new SimpleMove();
        sm.PieceNum = currentPos.getPieceNum(fr);
        sm.MovingPiece = currentPos.getPiece(fr);
        if (!Piece.isPiece(sm.MovingPiece)) {
            return;
        }

        sm.Color = Piece.color(sm.MovingPiece);
        sm.From = fr;
        sm.To = to;
        sm.CapturedPiece = currentPos.getPiece(to);
        sm.CapturedSquare = to;
        sm.CastleFlags = currentPos.Castling.Flag;
        sm.EpSquare = currentPos.EpTarget;
        sm.Promote = Piece.None;
        
        const piece = sm.MovingPiece;
        const ptype = Piece.type(piece);
        const enemy = Color.flip(currentPos.WhoMove);

        // handle promotion:
        const promoteRank = (currentPos.WhoMove === Color.White ? 7 : 0);
        if ((ptype == Piece.Pawn) && (Square.rank(to) == promoteRank)) {
            if (!promote) {
                this.InPromotion = true;
                return sm;
            } else {
                sm.Promote = Piece.typeFromChar(promote);
            }
        }

        // Handle en passant capture:
        if (ptype == Piece.Pawn && (sm.CapturedPiece == Piece.None) && (Square.fyle(fr) != Square.fyle(to))) {
            const enemyPawn = Piece.create(enemy, Piece.Pawn);
            sm.CapturedSquare = (this.currentPos.WhoMove === Color.White ? (to - 8) as Squares.Square : (to + 8) as Squares.Square);
            sm.CapturedPiece = enemyPawn;
        }

        return sm;
    }

    /**
    * Add a move at current position and do it. The parameter 'san' can be NULL. If it is provided, it is stored with the move to speed up PGN printing.
    * @param sm SimpleMove
    * @param san String
    */
    public addMove(sm: SimpleMove, san?: string) {
        const { currentPos } = this;

        // We must be at the end of a game/variation to add a move:
        if (!this.currentMove.END_MARKER) {
            // truncate the game!
            this.currentMove.truncate();
        }

        if (!sm.San) {
            if (!san || (san == undefined)) {
                sm.San = this.currentPos.makeSanString(sm, SanCheckLevel.MateTest);
            } else {
                sm.San = san;
            }
        }

        const newMove = this.currentMove.append(sm);

        this.currentPos.doSimpleMove(sm);
        newMove.Fen = FenString.fromPosition(currentPos);
        this.CurrentPlyCount++;

        if (!this.varDepth) {
            this.NumHalfMoves = this.CurrentPlyCount;
        }

        this.positionChanged();

        return newMove;
    }

    /**
    * Переместиться на указанную позицию в главной линии партии
    * @param hmNumber
    */
    public moveToPly(hmNumber: number) {
        this.supressEvents = true;
        if (hmNumber > this.CurrentPlyCount) {
            while (!this.CurrentMove.END_MARKER && (hmNumber > this.CurrentPlyCount)) {
                if (!this.moveForward()) {
                    break;
                }
            }

            this.supressEvents = false;    
            this.positionChanged();
        } else if (hmNumber < this.CurrentPlyCount) {
            while (!this.CurrentMove.START_MARKER && (hmNumber < this.CurrentPlyCount)) {
                if (!this.moveBackward()) {
                    break;
                }
            }

            this.supressEvents = false;
            this.positionChanged();
        }

        this.supressEvents = false;
    }

    public moveToKey(key: string) {
        this.supressEvents = true;
        if (this.moveList[key]) {
            this.currentMove = this.moveList[key];
            this.currentPos = new Position(this.currentMove.Fen);
            this.CurrentPlyCount = this.currentPos.PlyCount; 
            this.currentMove = this.currentMove.Next!;
        }

        this.supressEvents = false;
    }

    /**
    * Переместить текущую позицию на 1 вперед
    * @returns Boolean
    */
    public moveForward() {
        if (this.currentMove.END_MARKER) {
            return false;
        }

        this.currentPos.doSimpleMove(this.currentMove.moveData!);
        this.currentMove = this.currentMove.Next!;
        this.CurrentPlyCount++;
        this.positionChanged();
        
        return true;
    }

    /**
    * Move to 1 turn back
    * @returns Boolean
    */
    public moveBackward() {
        const prev = this.currentMove.Prev!;
        if (prev.START_MARKER) {
            return false;
        }

        this.currentMove = prev;
        this.currentPos.undoSimpleMove(this.currentMove.moveData!);
        this.CurrentPlyCount--;
        this.positionChanged();

        return true;
    }

    /**
    * Move to first move
    */
    public moveFirst() {
        this.moveToPly(0);
    }

    /**
    * Move to last move
    */
    public moveLast() {
        this.moveToPly(9999);
    }

    public getResultName(mode: 'char' | 'short' | 'long' | 'html'): string {
        if (mode === "char") {
            return resultChar[this.Result];
        } else if (mode === "short") {
            return resultShortString[this.Result];
        } else if (mode === "long") {
            return resultLongStr[this.Result];
        } else if (mode === "html") {
            return resultHtmlStr[this.Result];
        }

        return "?";
    }

    public static plyToTurn(ply: number, startPly?: number) {
        startPly = startPly || 0;
        return toSafeInteger(1 + ((ply + startPly) - 1) / 2);
    }

    public static plyToColor(ply: number, startPly?: number) {
        startPly = startPly || 0;
        return (((ply + startPly) % 2) == 1) ? Color.White : Color.Black;
    }

    public static turnToPly(turn: number, color?: number) {
        color = color || Color.White;
        let ply = (((turn - 1) * 2) + color + 1);
    }
}
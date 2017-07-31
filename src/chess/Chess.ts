import { Hashtable } from 'onix-core/built/Hashtable';
import { inArray } from 'onix-core/built/fn/array/InArray';
import { intVal } from 'onix-core/built/fn/number/IntVal';
import { Color } from './Color';
import { Piece } from './Piece';
import { Square } from './Square';
import { Position, FenStandartStart, ChessPositionStd, SanCheckLevel, GenerateMode } from './Position';
import { Move } from './Move';
import { SimpleMove } from './SimpleMove';
import { IChessUser } from '../app/IChessUser';

export enum ChessRatingType {
    None = 0,
    Elo = 1,
    Internal = 2,
    Rapid = 3,
    Iccf = 4
}

const ChessRatingNames: string[] = ["Unknown", "Elo", "Rating", "Rapid", "ICCF"];

function chessRatingParseType(value: string | number): ChessRatingType {
    return (typeof value === "string") ? intVal(value) : value;
}

function chessRatingParseValue(value: string | number): number {
    return (typeof value === "string") ? intVal(value) : value;
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
            if (!inArray(name, stdTags)) {
                if (inArray(name, addTags)) {
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
                            this.owner.EcoCode = intVal(value);
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

var OppositeColor: ChessResultColor[] = [
    ChessResultColor.None,
    ChessResultColor.Black,
    ChessResultColor.White,
    ChessResultColor.Draw
];

var OppositeType: ChessResultType[] = [
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
    public InCheckMate: boolean;
    public InStaleMate: boolean;
    public IsNoMaterialWhite: boolean;
    public IsNoMaterialBlack: boolean;
    public IsPosRepeation: boolean;
    public Is50MovesRule: boolean;
}

export interface IChessSettings {
    id?: number,
    my_color?: string,
    white?: IChessUser,
    black?: IChessUser,
    fen?: string,
    moves?: any[]
}

export class Chess {
    private settings: IChessSettings;
    private savedMove: Move;
    private savedPos: Position;
    private savedPlyCount: number;
    private pgnLastMovePos: number;
    private pgnNextMovePos: number;
    private varDepth: number = 0;
    private supressEvents = false;
    private moveList: { [index: string]: Move } = {};
    private currentMove: Move;
    private currentPos: Position;
    private startPos: Position;
    private startFen: string = FenStandartStart;

    /**
     * Side to move in starting position
     */
    public ToMove: number;
    public NumHalfMoves: number;
    public CurrentPlyCount: number;
    public StartPlyCount: number;    
    
    public Altered: boolean;
    public InPromotion: boolean;

    public Fen: string;
    
    
    /// <summary>
    /// True if game has a promotion to R/B/N.
    /// </summary>
    public NoQueenPromotion: boolean;
    public Tags: ChessTags;
    public GameId: number;
    public White: IChessUser;
    public Black: IChessUser;
    public Event: string;
    public Site: string;
    public GameDate: string;
    public EventDate: string;
    public Round: string;
    public WhiteElo: number;
    public WhiteRatingType: ChessRatingType;
    public BlackElo: number;
    public BlackRatingType: ChessRatingType;
    public EcoCode: number;
    public Result: ChessResultColor;

    /**
     * @constructor 
     */
    constructor(settings?: IChessSettings) {
        this.settings = settings || {};

        this.Tags = new ChessTags(this);
        this.Altered = false;
        this.pgnLastMovePos = this.pgnNextMovePos = 0;

        if (this.settings.fen && (this.settings.fen != FenStandartStart)) {
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
        return this.startFen !== FenStandartStart;
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
        this.White = { id: 0, name: "?"};
        this.Black = { id: 0, name: "?"};
        this.Event = "?";
        this.Site = "?";
        this.Round = "?";
        this.GameDate = "????.??.??";
        this.EventDate = "????.??.??";
        this.EcoCode = 0;
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

    private decodeMoves(moves: any[]) {
        for (let i = 0; i < moves.length; i++) {
            // 0 - from/to/color
            // 1 - san
            // 2 - captured
            // 3 - promote
            // 4 - comments
            // 5 - nag
            // 6 - variations
            var mv = moves[i];

            var sm = new SimpleMove();
            sm.PlyCount = this.CurrentPos.PlyCount + 1;
            sm.From = mv[0] & 63;
            sm.To = (mv[0] >> 6) & 63;
            sm.Color = (mv[0] >> 12) & 63;
            sm.CapturedPiece = mv[2] & 63;
            sm.CapturedSquare = (mv[2] >> 6) & 63;
            sm.San = mv[1];
            sm.Promote = mv[3];
            sm.Comments = mv[4];
            sm.Nag = mv[5];
            sm.Permanent = true;

            var move = this.addMove(sm, sm.San);
            this.moveList[move.moveKey] = move;
        }
    }

    private positionChanged() {
        if (!this.supressEvents) {
            if (!this.CurrentMove.Fen) {
                this.CurrentMove.Fen = this.currentPos.writeFEN();
            }

            this.Fen = this.CurrentMove.Fen;
        }
    }

    public checkGameState(): ChessGameState {
        var state = new ChessGameState();

        var mlist = this.currentPos.generateMoves(Piece.NoPiece, GenerateMode.All, true);

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

        var move = this.CurrentMove.Prev;
        var thisFen = move.Fen;
        var rc = 1;
        while (!move.START_MARKER) {
            if (thisFen === move.Fen) { 
                rc++; 
            }
        }

        state.IsPosRepeation = rc >= 3;
        state.Is50MovesRule = this.currentPos.HalfMoveCount > 100;

        return state;
    }

    public makeMove(fr: number, to: number, promote?: string) {
        const { currentPos } = this;
        var sm = new SimpleMove();
        sm.PieceNum = currentPos.getPieceNum(fr);
        sm.MovingPiece = currentPos.getPiece(fr);
        sm.Color = Piece.color(sm.MovingPiece);
        sm.From = fr;
        sm.To = to;
        sm.CapturedPiece = currentPos.getPiece(to);
        sm.CapturedSquare = to;
        sm.CastleFlags = currentPos.Castling;
        sm.EpSquare = currentPos.EpTarget;
        sm.Promote = Piece.NoPiece;
        
        var piece = sm.MovingPiece;
        var ptype = Piece.type(piece);
        var enemy = Color.flip(currentPos.WhoMove);

        // handle promotion:
        var promoteRank = (currentPos.WhoMove === Color.White ? 7 : 0);
        if ((ptype == Piece.Pawn) && (Square.rank(to) == promoteRank)) {
            if (!promote) {
                this.InPromotion = true;
                return sm;
            } else {
                sm.Promote = Piece.typeFromChar(promote);
            }
        }

        // Handle en passant capture:
        if (ptype == Piece.Pawn && (sm.CapturedPiece == Piece.NoPiece) && (Square.fyle(fr) != Square.fyle(to))) {
            var enemyPawn = Piece.create(enemy, Piece.Pawn);
            sm.CapturedSquare = (this.currentPos.WhoMove === Color.White ? (to - 8) : (to + 8));
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
        newMove.Fen = currentPos.writeFEN()
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
            this.currentMove = this.currentMove.Next;
        }

        this.supressEvents = false;
    }

    /**
    * Переместить текущую позицию на 1 вперед
    * @returns {Boolean}
    */
    public moveForward() {
        if (this.currentMove.END_MARKER) {
            return false;
        }

        this.currentPos.doSimpleMove(this.currentMove.moveData);
        this.currentMove = this.currentMove.Next;
        this.CurrentPlyCount++;
        this.positionChanged();
        
        return true;
    }

    /**
    * Move to 1 turn back
    * @returns {Boolean}
    */
    public moveBackward() {
        const prev = this.currentMove.Prev;
        if (prev.START_MARKER) {
            return false;
        }

        this.currentMove = prev;
        this.currentPos.undoSimpleMove(this.currentMove.moveData);
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
}
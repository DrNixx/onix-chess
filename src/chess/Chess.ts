import toSafeInteger from 'lodash/toSafeInteger';
import * as shortid from 'shortid';
import isNumber from 'lodash/isNumber';
import indexOf from 'lodash/indexOf';

import { Squares, Colors } from '../types/Types';
import { Color } from './Color';
import { GameResult } from './GameResult';
import { Piece } from './Piece';
import { Square } from './Square';
import { Position, ChessPositionStd, SanCheckLevel, GenerateMode } from './Position';
import { Move } from './Move';
import { SimpleMove } from './SimpleMove';
import { IGameData, IMovePart, ITreePart, IChessPlayer, IChessOpening, IGameAnalysis } from '../types/Interfaces';
import { FenString } from './FenString';
import { plyToColor, plyToTurn, turnToPly } from './Common';
import { EvalItem } from '../analysis/EvalItem';

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
    private tags: Map<string, string> = new Map<string, string>();

    /**
     * constructor
     */
    constructor(private owner: Chess) {
    }

    public clear() {
        this.tags.clear();
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
                            this.owner.Eco = {
                                code: value
                            }
                            break;
                        case "fen":
                            this.owner.StartFen = value;
                            break;
                        case "setup":
                            break;
                    }
                } else {
                    this.tags.set(name, value);
                }
            }
        }
    }
}

export class ChessGameState {
    public InCheckMate: boolean = false;
    public InStaleMate: boolean = false;
    public IsNoMaterialWhite: boolean = false;
    public IsNoMaterialBlack: boolean = false;
    public IsPosRepeation: boolean = false;
    public Is50MovesRule: boolean = false;
}

type encodedMoves = [number, string, number, number, string, string];

const defaultGameData: IGameData = {
    game: {
        id: 0,
        load: false,
        insite: false,
        variant: {
            key: "standard",
            name: "Standard",
            shortName: "Std"
        },
        speed: "correspondence",
        rated: false,
        initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        player: "white",
        turns: 0,
        startedAtTurn: 0,
        status: {
            name: "noStart"
        },
    },
    
    orientation: "white"
};

export class Chess {
    private data: IGameData;
    private savedMove: Move | null = null;
    private savedPos: Position | null = null;
    private savedPlyCount: number = 0;
    private pgnLastMovePos: number;
    private pgnNextMovePos: number;
    private varDepth: number = 0;
    private supressEvents = false;
    private moveList: Map<string, Move> = new Map<string, Move>();
    
    private currentMove!: Move;
    private curPos!: Position;
    private startPos: Position;
    private startFen: string = FenString.standartStart;

    public Altered: boolean;
    public InPromotion: boolean = false;

    public Fen?: string;
    
    
    /// <summary>
    /// True if game has a promotion to R/B/N.
    /// </summary>
    public NoQueenPromotion: boolean = false;
    public Tags: ChessTags;
    public GameId?: number | string = undefined;
    public White?: IChessPlayer;
    public Black?: IChessPlayer;
    public Event?: string;
    public Site?: string;
    public GameDate?: string;
    public EventDate?: string;
    public Round?: string;
    public WhiteElo?: number;
    public WhiteRatingType?: ChessRatingType;
    public BlackElo?: number;
    public BlackRatingType?: ChessRatingType;
    public Eco?: IChessOpening;
    public Result: GameResult.Color = GameResult.Color.None;

    public get RawData(): Readonly<IGameData> {
        return this.data;
    }

    public get ToMove() {
        return this.CurrentPos.WhoMove;
    }

    public get CurrentPlyCount() {
        return this.CurrentMove.PlyCount;
    }

    public get StartPlyCount() {
        return (this.startPos) ? this.startPos.PlyCount + 1 : 1;
    }

    public get CurrentMove(): Move {
        return this.currentMove;
    }

    public get CurrentPos(): Position {
        return this.curPos;
    }

    public set StartFen(value: string) {
        this.startFen = value;
    }

    public get NonStandardStart(): boolean {
        return this.startFen !== FenString.standartStart;
    }

    public Analysis: IGameAnalysis = {};
    
    /**
     * @constructor 
     */
    constructor(data?: IGameData) {
        this.data = data || defaultGameData;
        
        this.Tags = new ChessTags(this);
        this.Altered = false;
        this.pgnLastMovePos = this.pgnNextMovePos = 0;

        this.startPos = ChessPositionStd;

        if (this.data.game?.initialFen) {
            if (this.data.game?.initialFen != FenString.standartStart) {
                this.startFen = this.data.game?.initialFen;
                this.startPos = new Position(this.startFen);
            }
        }
        
        this.clear();
        this.init();
        this.positionChanged();
    }

    private clear() {
        this.GameId = 0;

        // CommentsFlag = NagsFlag = VarsFlag = 0;
        this.InPromotion = false;
        this.NoQueenPromotion = false;

        this.Analysis = {};

        this.clearStandardTags();
        this.clearExtraTags();
        this.clearMoves();
    }

    /// <summary>
    /// Clears all of the standard tags.
    /// </summary>
    private clearStandardTags () {
        this.White = { 
            color: "white",
            name: "?",
            user: { 
                id: 0, 
                name: "?" 
            } 
        };
        
        this.Black = { 
            color: "black",
            name: "?",
            user: { 
                id: 0, 
                name: "?" 
            } 
        };

        this.Event = "?";
        this.Site = "?";
        this.Round = "?";
        this.GameDate = "????.??.??";
        this.EventDate = "????.??.??";
        this.Eco = {
            code: "A00"
        };
        this.Result = GameResult.Color.None;
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
        this.moveList.clear();
        this.InPromotion = false;
        this.NoQueenPromotion = false;

        this.savedMove = null;
        this.savedPlyCount = 0;
        this.savedPos = null;

        this.currentMove = Move.init(this.startFen, this.startPos);
        this.moveList.set(this.currentMove.Prev.moveKey, this.currentMove.Prev);

        // Set up start
        this.curPos = new Position();
        this.curPos.copyFrom(this.startPos);
    }

    public init() {
        const { game, player, opponent, analysis, steps, treeParts } = this.data;
        if (game) {
            this.GameId = game.id;
            this.Event = game.event;

            if (game.status.result) {
                this.Result = game.status.result;
            }

            if (game.opening) {
                this.Eco = game.opening;
            }
        }

        this.assignPlayer(player);
        this.assignPlayer(opponent);

        if (analysis) {
            this.Analysis.state = analysis.state ?? "empty";
            if ((this.Analysis.state == "inprogress") && (analysis.completed)) {
                this.Analysis.completed = analysis.completed;
            }

            if (analysis.white) {
                this.Analysis.white = {
                    blunder: toSafeInteger(analysis.white.blunder),
                    mistake: toSafeInteger(analysis.white.mistake),
                    inaccuracy: toSafeInteger(analysis.white.inaccuracy),
                    acpl: toSafeInteger(analysis.white.acpl)
                }
            }

            if (analysis.black) {
                this.Analysis.black = {
                    blunder: toSafeInteger(analysis.black.blunder),
                    mistake: toSafeInteger(analysis.black.mistake),
                    inaccuracy: toSafeInteger(analysis.black.inaccuracy),
                    acpl: toSafeInteger(analysis.black.acpl)
                }
            }
        }

        const moves = treeParts ?? steps;
        if (moves) {
            this.supressEvents = true;
            this.decodeMoves(moves);
            if (treeParts) {
                let move = this.CurrentMove.Begin;
                while (!move.END_MARKER) {
                    if (!move.START_MARKER && move.sm?.eval && move.Prev.sm?.eval) {
                        move.sm.eval.normalize(move.Prev.sm!.eval!)
                    }

                    move = move.Next;
                };

                move = this.CurrentMove.Begin;
                while (!move.END_MARKER) {
                    if (!move.isLast() && move.sm?.eval && move.Next.sm?.eval) {
                        move.sm!.eval!.extend(move.Next.sm!.eval!)
                    }

                    move = move.Next;
                };
            }

            if (game?.moveCentis) {
                const times = (<number[]>[]).concat(game?.moveCentis);
                let move = this.CurrentMove.First;
                while (!move.END_MARKER && times.length) {
                    const time = times.shift();
                    if (move.sm) {
                        move.sm.time = toSafeInteger(time);
                    }

                    move = move.Next;
                };
            }

            this.supressEvents = false;
        }
    }

    private assignPlayer(player?: IChessPlayer) {
        if (player) {
            if (player.color === "black") {
                this.Black = player;
            } else {
                this.White = player;
            }
        }
    }

    private isInstanceOfTreePart(object: IMovePart|ITreePart): object is ITreePart {
        return 'eval' in object;
    }

    public decodeMove(mv: IMovePart|ITreePart) {
        if (mv.uci === undefined) {
            if (this.isInstanceOfTreePart(mv)) {
                const move = this.CurrentMove.Begin;
                if (move && move.sm) {
                    move.sm.eval = new EvalItem(mv.eval);
                    move.sm.judgments = mv.comments;
                    move.sm.glyphs = mv.glyphs;
                }
            }
            return;
        }

        const sm = this.curPos.readCoordMove(mv.uci);
        if (sm !== null) {
            sm.ply = this.CurrentPos.PlyCount + 1;
            sm.permanent = true;
            sm.san = mv.san;
            sm.color = this.CurrentPos.WhoMove;
            if (this.isInstanceOfTreePart(mv)) {
                sm.eval = new EvalItem(mv.eval);
                sm.judgments = mv.comments;
                sm.glyphs = mv.glyphs;
            }
            
            const move = this.addMove(sm, sm.san, mv.fen);
            move.id = mv.id || shortid.generate();
            this.moveList.set(move.moveKey, move);
        }
    }

    private decodeMoves(moves: IMovePart[]|ITreePart[]) {
        for (let i = 0; i < moves.length; i++) {
            const mv = moves[i];

            this.decodeMove(mv);
        }
    }

    private positionChanged() {
        if (!this.supressEvents) {
            if (!this.currentMove.fen) {
                this.currentMove.fen = FenString.fromPosition(this.curPos);
            }

            this.Fen = this.currentMove.fen;
        }
    }

    public checkGameState(): ChessGameState {
        const state = new ChessGameState();

        const mlist = this.curPos.generateMoves(Piece.None, GenerateMode.All, true);

        if (mlist.length === 0) {
            if (this.curPos.isKingInCheck()) {
                state.InCheckMate = true;
            } else {
                state.InStaleMate = true;
            }
        }

        if ((!this.curPos.hasPiece(Piece.WPawn)) &&
            (!this.curPos.hasPiece(Piece.WQueen)) &&
            (!this.curPos.hasPiece(Piece.WRook))) {
            if ((!this.curPos.hasPiece(Piece.WKnight)) && (!this.curPos.hasPiece(Piece.WBishop))) {
                // King only
                state.IsNoMaterialWhite = true;
            } else if ((!this.curPos.hasPiece(Piece.WKnight)) && (this.curPos.getPieceCount(Piece.WBishop) === 1)) {
                // King and bishop
                state.IsNoMaterialWhite = true;
            } else if ((this.curPos.getPieceCount(Piece.WKnight) === 1) && (!this.curPos.hasPiece(Piece.WBishop))) {
                // King and knight
                state.IsNoMaterialWhite = true;
            }
        }

        if ((!this.curPos.hasPiece(Piece.BPawn)) &&
            (!this.curPos.hasPiece(Piece.BQueen)) &&
            (!this.curPos.hasPiece(Piece.BRook))) {
            if ((!this.curPos.hasPiece(Piece.BKnight)) && (!this.curPos.hasPiece(Piece.BBishop))) {
                // King only
                state.IsNoMaterialBlack = true;
            } else if ((!this.curPos.hasPiece(Piece.BKnight)) && (this.curPos.getPieceCount(Piece.BBishop) === 1)) {
                // King and bishop
                state.IsNoMaterialBlack = true;
            } else if ((this.curPos.getPieceCount(Piece.BKnight) === 1) && (!this.curPos.hasPiece(Piece.BBishop))) {
                // King and knight
                state.IsNoMaterialBlack = true;
            }
        }

        const move = this.currentMove.Prev;
        const thisFen = move.fen;
        let rc = 1;
        while (!move.START_MARKER) {
            if (thisFen === move.fen) { 
                rc++; 
            }
        }

        state.IsPosRepeation = rc >= 3;
        state.Is50MovesRule = this.curPos.HalfMoveCount > 100;

        return state;
    }

    public makeMove(fr: Squares.Square, to: Squares.Square, promote?: string) {
        const { curPos: currentPos } = this;
        const sm = new SimpleMove();
        sm.pieceNum = currentPos.getPieceNum(fr);
        sm.movingPiece = currentPos.getPiece(fr);
        if (!Piece.isPiece(sm.movingPiece)) {
            return;
        }

        sm.color = Piece.color(sm.movingPiece);
        sm.from = fr;
        sm.to = to;
        sm.capturedPiece = currentPos.getPiece(to);
        sm.capturedSquare = to;
        sm.castleFlags = currentPos.Castling.Flag;
        sm.epSquare = currentPos.EpTarget;
        sm.promote = Piece.None;
        
        const piece = sm.movingPiece;
        const ptype = Piece.type(piece);
        const enemy = Color.flip(currentPos.WhoMove);

        // handle promotion:
        const promoteRank = (currentPos.WhoMove === Color.White ? 7 : 0);
        if ((ptype == Piece.Pawn) && (Square.rank(to) == promoteRank)) {
            if (!promote) {
                this.InPromotion = true;
                return sm;
            } else {
                sm.promote = Piece.typeFromChar(promote);
            }
        }

        // Handle en passant capture:
        if (ptype == Piece.Pawn && (sm.capturedPiece == Piece.None) && (Square.fyle(fr) != Square.fyle(to))) {
            const enemyPawn = Piece.create(enemy, Piece.Pawn);
            sm.capturedSquare = (this.curPos.WhoMove === Color.White ? (to - 8) as Squares.Square : (to + 8) as Squares.Square);
            sm.capturedPiece = enemyPawn;
        }

        return sm;
    }

    /**
    * Add a move at current position and do it. The parameter 'san' can be NULL. If it is provided, it is stored with the move to speed up PGN printing.
    * @param sm SimpleMove
    * @param san String
    */
    public addMove(sm: SimpleMove, san?: string, fen?: string) {
        const { curPos: currentPos } = this;

        // We must be at the end of a game/variation to add a move:
        if (!this.currentMove.END_MARKER) {
            // truncate the game!
            this.currentMove.truncate();
        }

        if (!sm.san) {
            if (!san || (san == undefined)) {
                sm.san = this.curPos.makeSanString(sm, SanCheckLevel.MateTest);
            } else {
                sm.san = san;
            }
        }

        const newMove = this.currentMove.append(sm);

        this.curPos.doSimpleMove(sm);
        if (!fen) {
            fen = FenString.fromPosition(currentPos);
        }
        newMove.fen = fen;
        this.currentMove.fen = fen;

        this.positionChanged();

        return newMove;
    }

    public moveToKey(key: string) {
        const targetMove = this.moveList.get(key);
        if (targetMove) {
            if (!targetMove.inVariation()) {
                this.moveToPly(targetMove.PlyCount);
            } else {
                // TODO: Move in variation
                this.supressEvents = true;
                
                this.currentMove = targetMove;
                if (!this.currentMove.isBegin()) {
                    this.curPos = new Position(this.currentMove.Prev.fen);
                } else {
                    this.curPos.copyFrom(this.startPos);
                }

                this.supressEvents = false;
                this.positionChanged();
            }
        }
    }

    /**
    * Move to begin game
    */
    public moveBegin() {
        this.currentMove = this.CurrentMove.Begin;
        this.curPos.copyFrom(this.startPos);
        // this.currentPos = new Position(this.currentMove.fen);
    }

    /**
    * Move to first move
    */
    public moveFirst() {
        this.moveBegin();
        this.moveForward();
    }

    /**
    * Move to last move
    */
    public moveLast() {
        this.moveEnd();
        this.moveBackward();
    }

    /**
    * Move to end position
    */
   public moveEnd() {
    this.moveToPly(9999);
}

    /**
    * Переместить текущую позицию на 1 вперед
    * @returns Boolean
    */
    public moveForward() {
        if (this.currentMove.END_MARKER) {
            return false;
        }

        this.currentMove = this.currentMove.Next!;
        if (!this.currentMove.END_MARKER) {
            this.curPos.doSimpleMove(this.currentMove.sm!);
        }
        
        this.positionChanged();
        
        return true;
    }

    /**
    * Move to 1 turn back
    * @returns Boolean
    */
    public moveBackward() {
        if (this.currentMove.START_MARKER) {
            return false;
        }

        if (this.currentMove.Prev.START_MARKER) {
            if (this.currentMove.inVariation()) {
                this.curPos.undoSimpleMove(this.currentMove.sm!);
                this.currentMove = this.currentMove.exitVariation();
                this.positionChanged();
                return true;
            }

            this.curPos.copyFrom(this.startPos);
        } else if (!this.currentMove.END_MARKER) {
            this.curPos.undoSimpleMove(this.currentMove.sm!);
        }

        this.currentMove = this.currentMove.Prev;
        
        this.positionChanged();

        return true;
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

    public findNextMistake(color: Colors.BW, ply: number, type: "blunder" | "mistake" | "inaccuracy"): number | undefined {
        if (!this.currentMove.inVariation()) {
            const judgments = Array.from(this.moveList.values()).filter((value) => {
                const sm = value.sm;
                return ((sm.color === color) && (sm.judgments) && (sm.judgments.length) && (type === sm.judgments[0].name.toLowerCase()));
            });

            if (judgments.length > 0) {
                const right = judgments.filter((value) => { return value.sm.ply > ply});
                if (right.length > 0) {
                    return right[0].PlyCount;
                }

                const left = judgments.filter((value) => { return value.sm.ply < ply});
                if (left.length > 0) {
                    return left[0].PlyCount;
                }
            }
        }
        
        return undefined;
    }

    public getResultName(mode: 'char' | 'short' | 'long' | 'html'): string {
        if (mode === "char") {
            return GameResult.resultChar[this.Result];
        } else if (mode === "short") {
            return GameResult.resultShortString[this.Result];
        } else if (mode === "long") {
            return GameResult.resultLongStr[this.Result];
        } else if (mode === "html") {
            return GameResult.resultHtmlStr[this.Result];
        }

        return "?";
    }

    public static plyToTurn(ply: number) {
        return plyToTurn(ply);
    }

    public static plyToColor(ply: number) {
        return plyToColor(ply);
    }

    public static turnToPly(turn: number, color?: Colors.BW) {
        return turnToPly(turn, color);
    }
}
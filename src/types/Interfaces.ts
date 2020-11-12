import { IUser } from 'onix-core/dist/app/IUser';
import { Colors } from './Types';

export interface IChessPref {
    games?: number;
    rating: number;
    avg?: number;
    rd?: number;
    prog?: number;
    prov?: boolean;
}

export type VariantNameType = 'chess960' | 'crazyhouse' | 'antichess' | 'horde' | 'kingOfTheHill' | 'racingKings' | 'threeCheck';

export type SpeedNameType = 'blitz' | 'bullet' | 'rapid' | 'ultraBullet';

export interface IChessVariant {
    key: 'standard' | 'fromPosition' | VariantNameType;
    name: string;
    shortName: string;
}

export type StatusName = 'created' | 'new' | 'wait' | 'started' | 'aborted' | 
                         'mate' | 'resign' | 'stalemate' | 'timeout' | 'draw' | 
                         'outoftime' | 'noStart' | 'cheat' | 'variantEnd' | 'paused';

export interface IGameStatus {
    name: StatusName;
    result?: number;
    result_name?: string;
}

export type PerfNameType = 
    'main' | 'maina' | 'classic' | 'classia' | SpeedNameType | VariantNameType;

export type IChessPerfs = { 
    [name in PerfNameType]?: IChessPref;
}

export interface IChessOpening {
    code: string;
    name: string;
}

export interface IChessGame {
    id: number;
    load: boolean;
    insite: boolean;
    variant: IChessVariant;
    speed: 'correspondence' | 'classical' | SpeedNameType;
    perf?: PerfNameType;
    rated?: boolean;
    initialFen: string;
    fen?: string;
    player: Colors.Name;
    turns: number;
    startedAtTurn: number;
    status: IGameStatus;
    event?: string;
    tournamentId?: number;
    createdAt?: number;
    createdBy?: number | string;
    private?: boolean;
    advance?: boolean;
    winner?: Colors.Name;
    lastMove?: string;
    check?: string;
    moveCentis?: number[];
    opening?: IChessOpening;
}

export interface ITournamentRanks {
    white: number;
    black: number;
}

export interface IChessTournament {
    id: number;
    name: string;
    running: boolean;
    berserkable?: boolean;
    ranks?: ITournamentRanks;
    nbSecondsForFirstMove?: number;
}

export interface IChessTitle {
    id: string,
    name: string
}

export interface IChessUser extends IUser {
    aurl?: string | string[];
    icon?: string,
    title?: IChessTitle |string;
    perfs?: IChessPerfs;
}

export interface IChessPlayer {
    color: Colors.Name;
    name: string;
    user: IChessUser;
    rating?: number;
    ratingDiff?: number;
}

export interface IClockPart {
    per: 'game' | 'move';
    initial: number;
    increment: number;
    min: number;
    interval: number;
    max: number;
}

export interface IBlitzClock {
    running: boolean;
    initial: number;
    increment: number;
}

export interface ICorrespondenceClock {
    daysPerTurn: number;
    increment: number;
    white: number;
    black: number;
}

export interface IAdvanceClock {
    limit: string;
    can_pause: boolean;
    parts: IClockPart[];
    white: number;
    black: number;
    totalTime: number;
    lastMoveAt?: number;
}

export interface IUserAnalysis {
    blunder: number;
    inaccuracy: number;
    mistake: number;
    acpl: number;
}

export interface IGameAnalysis {
    state?: string;
    completed?: number;
    by?: string;
    white: IUserAnalysis;
    black: IUserAnalysis;
}

export interface IMovePart {
    ply: number;
    fen: string;
    san?: string;
    uci?: string;
    id?: string;
}

export interface IGlyph {    
    name: string;
    symbol: string;
}

export interface IJudgment {
    name: string;
    comment: string;
}

export interface IEval {
    cp?: number;
    mate?: number;
    best?: string;
    variation?: string;
    depth?: number;
    time?: number;
    by?: string;
}

export interface ITreePart extends IMovePart {
    eval?: IEval;
    comments?: IJudgment[];
    glyphs?: IGlyph[];
}

export interface IGameData {
    game?: IChessGame;
    tournament?: IChessTournament;
    clock?: IBlitzClock;
    correspondence?: ICorrespondenceClock | IAdvanceClock;
    player?: IChessPlayer;
    opponent?: IChessPlayer; 
    orientation: Colors.Name;
    analysis?: IGameAnalysis;
    treeParts?: ITreePart[];
    steps?: IMovePart[];
    finalFen?: string;
    pgn?: string;
}

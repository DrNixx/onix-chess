"use strict";

const expect = require('chai').expect;
const { Chess } = require("../dist/chess/Chess");

const dataAnalyse = {
    "game": {
        "id": 7782247,
        "load": false,
        "insite": true,
        "variant": {
            "key": "standard",
            "name": "Standard",
            "shortName": "Std"
        },
        "speed": "correspondence",
        "perf": "maina",
        "rated": true,
        "initialFen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -",
        "fen": "8/8/p7/6Rk/8/5p1r/3B1K2/8 b - - 0 64",
        "player": "black",
        "turns": 125,
        "startedAtTurn": 0,
        "status": {
            "name": "draw",
            "result": 3,
            "result_name": "ничья принята"
        },
        "event": "\"Личный чемпионат сайта по адвансу - 2018\", финал",
        "tournamentId": 24184,
        "createdAt": 1554204125948,
        "private": false,
        "advance": true,
        "winner": "none",
        "lastMove": "e5g5",
        "check": "h5",
        "moveCentis": [
            0,
            0,
            1068681,
            84011568,
            6250737,
            34051340,
            741769589,
            179926605,
            83242312,
            7672019,
            249791940,
            207407681,
            54075665,
            383499997,
            299070662,
            146885838,
            721837791,
            82122390,
            613324038,
            485553529,
            2704196334,
            948548650,
            699867445,
            283675361,
            636527924,
            102507741,
            415271515,
            295777499,
            309494816,
            711305044,
            359418166,
            321281085,
            183227347,
            130574501,
            131315169,
            234063816,
            377338337,
            154001487,
            320522673,
            509138207,
            130397340,
            48950584,
            15739757,
            82941611,
            28050884,
            149505556,
            267942807,
            61011128,
            386448728,
            129283302,
            193504899,
            240755604,
            47235773,
            99706105,
            296460702,
            342222863,
            196463708,
            365752370,
            123796672,
            88499184,
            92012751,
            80334006,
            180088851,
            513092150,
            100150006,
            160326379,
            295953364,
            347543403,
            129376898,
            348035139,
            33218964,
            259127541,
            329290350,
            276558055,
            263703460,
            79924789,
            57996513,
            299327494,
            214138284,
            37536999,
            134092558,
            41277975,
            987460,
            240755134,
            19641708,
            411164023,
            194467845,
            134869570,
            42677013,
            80332563,
            43720283,
            183653247,
            516756143,
            84481415,
            38431902,
            87132784,
            5229072,
            348996339,
            75557263,
            211417929,
            172030496,
            69149332,
            14926342,
            221989458,
            86148065,
            121985444,
            9648431,
            81295767,
            2305394,
            308448618,
            3199938,
            54737697,
            20575915,
            187687530,
            41231626,
            118617908,
            967884,
            267235126,
            34912072,
            40799081,
            4487264,
            304138622,
            5196465,
            208541430,
            36614027,
            5375631,
            0
        ],
        "opening": {
            "code": "A05",
            "name": "Reti: KIA"
        }
    },
    "tournament": {
        "id": 24184,
        "name": "\"Личный чемпионат сайта по адвансу - 2018\", финал",
        "running": false
    },
    "clock": {
        "limit": "Адванс 10+2/21",
        "can_pause": true,
        "parts": [
            {
                "per": "game",
                "initial": 864000000,
                "increment": 172800000,
                "min": 0,
                "interval": 1,
                "max": 1814400000
            }
        ],
        "white": 0,
        "black": 0,
        "totalTime": 27122872000,
        "lastMoveAt": 1581326997619
    },
    "player": {
        "color": "white",
        "name": "AHDPEI",
        "user": {
            "id": 32141,
            "username": "AHDPEI",
            "displayName": "Андрей",
            "online": "3d",
            "perfs": {
                "maina": {
                    "games": 247,
                    "rating": "1650.94",
                    "avg": 1644
                }
            },
            "language": "ru-RU",
            "profile": {
                "country": "UA"
            },
            "patron": "bronze"
        },
        "rating": "1652.57",
        "ratingDiff": "-1.63"
    },
    "opponent": {
        "color": "black",
        "name": "Sheldon",
        "user": {
            "id": 82031,
            "username": "Sheldon",
            "displayName": "Станислав",
            "online": "now",
            "perfs": {
                "maina": {
                    "games": 402,
                    "rating": "1583.87",
                    "avg": 1598
                }
            },
            "language": "ru-RU",
            "profile": {
                "country": "KZ"
            },
            "patron": "bronze"
        },
        "rating": "1598.38",
        "ratingDiff": "1.63"
    },
    "orientation": "white",
    "analysis": {
        "state": "ready",
        "white": {
            "blunder": 0,
            "inaccuracy": 0,
            "mistake": 0,
            "acpl": 6
        },
        "black": {
            "blunder": 0,
            "inaccuracy": 2,
            "mistake": 0,
            "acpl": 9
        }
    },
    "treeParts": [
        {
            "ply": 0,
            "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            "eval": {
                "cp": 19
            }
        },
        {
            "ply": 1,
            "fen": "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1",
            "id": "FhrqNZ6P",
            "uci": "g1f3",
            "san": "Nf3",
            "eval": {
                "cp": 19,
                "best": "e4",
                "variation": "e4 c5 Nc3 Nc6 Nf3 e6 Bb5 Nge7 d4 cxd4 Nxd4 a6 Be2 Nxd4"
            }
        },
        {
            "ply": 2,
            "fen": "rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 2 2",
            "id": "h8KlOSPB",
            "uci": "g8f6",
            "san": "Nf6",
            "eval": {
                "cp": 22
            }
        },
        {
            "ply": 3,
            "fen": "rnbqkb1r/pppppppp/5n2/8/8/5NP1/PPPPPP1P/RNBQKB1R b KQkq - 0 2",
            "id": "rsZX9RUX",
            "uci": "g2g3",
            "san": "g3",
            "eval": {
                "cp": 9,
                "best": "d4",
                "variation": "d4 e6 c4 b6 a3 Bb7 Bf4 Be7 Nc3 O-O d5 Nh5 Be3 d6"
            }
        },
        {
            "ply": 4,
            "fen": "rnbqkb1r/ppp1pppp/5n2/3p4/8/5NP1/PPPPPP1P/RNBQKB1R w KQkq - 0 3",
            "id": "QnufbrG8",
            "uci": "d7d5",
            "san": "d5",
            "eval": {
                "cp": 20
            }
        },
        {
            "ply": 5,
            "fen": "rnbqkb1r/ppp1pppp/5n2/3p4/8/5NP1/PPPPPPBP/RNBQK2R b KQkq - 1 3",
            "id": "EC0QT0Y6",
            "uci": "f1g2",
            "san": "Bg2",
            "eval": {
                "cp": -20
            }
        },
        {
            "ply": 6,
            "fen": "rnbqkb1r/pp2pppp/5n2/2pp4/8/5NP1/PPPPPPBP/RNBQK2R w KQkq - 0 4",
            "id": "ue4LS8wA",
            "uci": "c7c5",
            "san": "c5",
            "eval": {
                "cp": -15
            }
        },
        {
            "ply": 7,
            "fen": "rnbqkb1r/pp2pppp/5n2/2pp4/8/5NP1/PPPPPPBP/RNBQ1RK1 b kq - 1 4",
            "id": "lRZpRsbc",
            "uci": "e1g1",
            "san": "O-O",
            "eval": {
                "cp": 10
            }
        },
        {
            "ply": 8,
            "fen": "rnbqkb1r/1p2pppp/p4n2/2pp4/8/5NP1/PPPPPPBP/RNBQ1RK1 w kq - 0 5",
            "id": "J7MQkhQ0",
            "uci": "a7a6",
            "san": "a6",
            "eval": {
                "cp": 17,
                "best": "h6",
                "variation": "h6 c3 e6 d4 Be7 c4 Nc6 cxd5 exd5 dxc5 Bxc5 a3 a5 Nc3"
            }
        },
        {
            "ply": 9,
            "fen": "rnbqkb1r/1p2pppp/p4n2/2pp4/2P5/5NP1/PP1PPPBP/RNBQ1RK1 b kq - 0 5",
            "id": "RyQmJLyY",
            "uci": "c2c4",
            "san": "c4",
            "eval": {
                "cp": 28,
                "best": "d3",
                "variation": "d3 e6"
            }
        },
        {
            "ply": 10,
            "fen": "rnbqkb1r/1p2pppp/p4n2/2p5/2p5/5NP1/PP1PPPBP/RNBQ1RK1 w kq - 0 6",
            "id": "gncUl0bY",
            "uci": "d5c4",
            "san": "dxc4",
            "eval": {
                "cp": 33
            }
        },
        {
            "ply": 11,
            "fen": "rnbqkb1r/1p2pppp/p4n2/2p1N3/2p5/6P1/PP1PPPBP/RNBQ1RK1 b kq - 1 6",
            "id": "OWrkhSjl",
            "uci": "f3e5",
            "san": "Ne5",
            "eval": {
                "cp": 42
            }
        },
        {
            "ply": 12,
            "fen": "1nbqkb1r/rp2pppp/p4n2/2p1N3/2p5/6P1/PP1PPPBP/RNBQ1RK1 w k - 2 7",
            "id": "SBzZPUKX",
            "uci": "a8a7",
            "san": "Ra7",
            "eval": {
                "best": "Qd4",
                "variation": "Qd4 Nf3 Qd8 Ne5"
            },
            "comments": [
                {
                    "name": "Inaccuracy",
                    "comment": "Mistake. Best mowe was Qd4"
                }
            ],
            "glyphs": [
                {
                    "name": "Mistake",
                    "symbol": "?"
                }
            ]
        },
        {
            "ply": 13,
            "fen": "1nbqkb1r/rp2pppp/p4n2/2p1N3/P1p5/6P1/1P1PPPBP/RNBQ1RK1 b k - 0 7",
            "id": "U5kiZVCW",
            "uci": "a2a4",
            "san": "a4",
            "eval": {
                "cp": 63
            }
        },
        {
            "ply": 14,
            "fen": "1nb1kb1r/rp2pppp/p4n2/2p1N3/P1pq4/6P1/1P1PPPBP/RNBQ1RK1 w k - 1 8",
            "id": "AGvBF/kT",
            "uci": "d8d4",
            "san": "Qd4",
            "eval": {
                "cp": 60
            }
        },
        {
            "ply": 15,
            "fen": "1nb1kb1r/rp2pppp/p4n2/2p5/P1pq4/5NP1/1P1PPPBP/RNBQ1RK1 b k - 2 8",
            "id": "WsUjaWO0",
            "uci": "e5f3",
            "san": "Nf3",
            "eval": {
                "cp": 72
            }
        },
        {
            "ply": 16,
            "fen": "1nbqkb1r/rp2pppp/p4n2/2p5/P1p5/5NP1/1P1PPPBP/RNBQ1RK1 w k - 3 9",
            "id": "zcNLQUDk",
            "uci": "d4d8",
            "san": "Qd8",
            "eval": {
                "cp": 66,
                "best": "Qd5",
                "variation": "Qd5 Nc3 Qd8 Ne5 Qd4 d3 Qxe5 Bf4 Qd4 Bxb8 Ra8 Bf4 cxd3 exd3"
            }
        },
        {
            "ply": 17,
            "fen": "1nbqkb1r/rp2pppp/p4n2/2p5/P1p5/N4NP1/1P1PPPBP/R1BQ1RK1 b k - 4 9",
            "id": "ZEEzWRpY",
            "uci": "b1a3",
            "san": "Na3",
            "eval": {
                "cp": 74
            }
        },
        {
            "ply": 18,
            "fen": "1n1qkb1r/rp2pppp/p3bn2/2p5/P1p5/N4NP1/1P1PPPBP/R1BQ1RK1 w k - 5 10",
            "id": "8wW6hDUs",
            "uci": "c8e6",
            "san": "Be6",
            "eval": {
                "cp": 101
            }
        },
        {
            "ply": 19,
            "fen": "1n1qkb1r/rp2pppp/p3bn2/2p1N3/P1p5/N5P1/1P1PPPBP/R1BQ1RK1 b k - 6 10",
            "id": "JvzrWnGw",
            "uci": "f3e5",
            "san": "Ne5",
            "eval": {
                "cp": 92
            }
        },
        {
            "ply": 20,
            "fen": "1n2kb1r/rp2pppp/p3bn2/2p1N3/P1pq4/N5P1/1P1PPPBP/R1BQ1RK1 w k - 7 11",
            "id": "mQ3+/1nX",
            "uci": "d8d4",
            "san": "Qd4",
            "eval": {
                "cp": 90
            }
        },
        {
            "ply": 21,
            "fen": "1n2kb1r/rp2pppp/p3bn2/2p5/P1pq4/N4NP1/1P1PPPBP/R1BQ1RK1 b k - 8 11",
            "id": "1qICDWFW",
            "uci": "e5f3",
            "san": "Nf3",
            "eval": {
                "cp": 71
            }
        },
        {
            "ply": 22,
            "fen": "1n1qkb1r/rp2pppp/p3bn2/2p5/P1p5/N4NP1/1P1PPPBP/R1BQ1RK1 w k - 9 12",
            "id": "EM8C3ga/",
            "uci": "d4d8",
            "san": "Qd8",
            "eval": {
                "cp": 85
            }
        },
        {
            "ply": 23,
            "fen": "1n1qkb1r/rp2pppp/p3bn2/P1p5/2p5/N4NP1/1P1PPPBP/R1BQ1RK1 b k - 0 12",
            "id": "Pi8RkPar",
            "uci": "a4a5",
            "san": "a5",
            "eval": {
                "cp": 92,
                "best": "Ne5",
                "variation": "Ne5 Qd4 Nf3 Qd8 Qc2 b5 d3 cxd3 exd3 Rb7 axb5 axb5 Be3 Bd5"
            }
        },
        {
            "ply": 24,
            "fen": "1n1qkb1r/rp2pppp/p4n2/P1pb4/2p5/N4NP1/1P1PPPBP/R1BQ1RK1 w k - 1 13",
            "id": "4plRCIqO",
            "uci": "e6d5",
            "san": "Bd5",
            "eval": {
                "cp": 102,
                "best": "Qxa5",
                "variation": "Qxa5 d3 Nc6 Ng5 Bd7 Bf4 cxd3 Nc4 Qb4 exd3 h6 Bd2 Qb5 Bxc6"
            }
        },
        {
            "ply": 25,
            "fen": "1n1qkb1r/rp2pppp/p4n2/P1pb4/Q1p5/N4NP1/1P1PPPBP/R1B2RK1 b k - 2 13",
            "id": "kFC3Lo/j",
            "uci": "d1a4",
            "san": "Qa4+",
            "eval": {
                "cp": 76
            }
        },
        {
            "ply": 26,
            "fen": "1n1qkb1r/rp2pppp/p1b2n2/P1p5/Q1p5/N4NP1/1P1PPPBP/R1B2RK1 w k - 3 14",
            "id": "JMrZeL6R",
            "uci": "d5c6",
            "san": "Bc6",
            "eval": {
                "cp": 90
            }
        },
        {
            "ply": 27,
            "fen": "1n1qkb1r/rp2pppp/p1b2n2/P1p5/2Q5/N4NP1/1P1PPPBP/R1B2RK1 b k - 0 14",
            "id": "brd0BFDF",
            "uci": "a4c4",
            "san": "Qxc4",
            "eval": {
                "cp": 79
            }
        },
        {
            "ply": 28,
            "fen": "1n1qkb1r/rp3ppp/p1b1pn2/P1p5/2Q5/N4NP1/1P1PPPBP/R1B2RK1 w k - 0 15",
            "id": "xvHps8B9",
            "uci": "e7e6",
            "san": "e6",
            "eval": {
                "cp": 98
            }
        },
        {
            "ply": 29,
            "fen": "1n1qkb1r/rp3ppp/p1b1pn2/P1p5/2QP4/N4NP1/1P2PPBP/R1B2RK1 b k - 0 15",
            "id": "aaxkFWrL",
            "uci": "d2d4",
            "san": "d4",
            "eval": {
                "cp": 81
            }
        },
        {
            "ply": 30,
            "fen": "3qkb1r/rp1n1ppp/p1b1pn2/P1p5/2QP4/N4NP1/1P2PPBP/R1B2RK1 w k - 1 16",
            "id": "dnkXSICt",
            "uci": "b8d7",
            "san": "Nbd7",
            "eval": {
                "cp": 82,
                "best": "Qxa5",
                "variation": "Qxa5 dxc5"
            }
        },
        {
            "ply": 31,
            "fen": "3qkb1r/rp1n1ppp/p1b1pn2/P1p1N3/2QP4/N5P1/1P2PPBP/R1B2RK1 b k - 2 16",
            "id": "8XJu5VbT",
            "uci": "f3e5",
            "san": "Ne5",
            "eval": {
                "cp": 74
            }
        },
        {
            "ply": 32,
            "fen": "3qkb1r/rp1n1ppp/p3pn2/P1p1N3/2QP4/N5P1/1P2PPbP/R1B2RK1 w k - 0 17",
            "id": "Ys6D/vx3",
            "uci": "c6g2",
            "san": "Bxg2",
            "eval": {
                "cp": 95
            }
        },
        {
            "ply": 33,
            "fen": "3qkb1r/rp1n1ppp/p3pn2/P1p1N3/2QP4/N5P1/1P2PPKP/R1B2R2 b k - 0 17",
            "id": "xATgNcpo",
            "uci": "g1g2",
            "san": "Kxg2",
            "eval": {
                "cp": 80
            }
        },
        {
            "ply": 34,
            "fen": "3qkb1r/rp1n1ppp/p3pn2/P3N3/2Qp4/N5P1/1P2PPKP/R1B2R2 w k - 0 18",
            "id": "+m5yZja5",
            "uci": "c5d4",
            "san": "cxd4",
            "eval": {
                "cp": 85
            }
        },
        {
            "ply": 35,
            "fen": "3qkb1r/rp1n1ppp/p3pn2/P3N3/2Qp1B2/N5P1/1P2PPKP/R4R2 b k - 1 18",
            "id": "gp03TqEk",
            "uci": "c1f4",
            "san": "Bf4",
            "eval": {
                "cp": 85
            }
        },
        {
            "ply": 36,
            "fen": "r2qkb1r/1p1n1ppp/p3pn2/P3N3/2Qp1B2/N5P1/1P2PPKP/R4R2 w k - 2 19",
            "id": "qELLs3Ph",
            "uci": "a7a8",
            "san": "Ra8",
            "eval": {
                "cp": 91
            }
        },
        {
            "ply": 37,
            "fen": "r2qkb1r/1p1n1ppp/p3pn2/P3N3/2Qp1B2/N5P1/1P2PPKP/R2R4 b k - 3 19",
            "id": "Odh0o7xz",
            "uci": "f1d1",
            "san": "Rfd1",
            "eval": {
                "cp": 77
            }
        },
        {
            "ply": 38,
            "fen": "r2qk2r/1p1n1ppp/p3pn2/P1b1N3/2Qp1B2/N5P1/1P2PPKP/R2R4 w k - 4 20",
            "id": "m36kQUj0",
            "uci": "f8c5",
            "san": "Bc5",
            "eval": {
                "cp": 68
            }
        },
        {
            "ply": 39,
            "fen": "r2qk2r/1p1n1ppp/p3pn2/P1b1N3/2Qp1B2/6P1/1PN1PPKP/R2R4 b k - 5 20",
            "id": "11LtUnDU",
            "uci": "a3c2",
            "san": "Nc2",
            "eval": {
                "cp": 84
            }
        },
        {
            "ply": 40,
            "fen": "r2q1rk1/1p1n1ppp/p3pn2/P1b1N3/2Qp1B2/6P1/1PN1PPKP/R2R4 w - - 6 21",
            "id": "wUL6G65W",
            "uci": "e8g8",
            "san": "O-O",
            "eval": {
                "cp": 49,
                "best": "b5",
                "variation": "b5"
            }
        },
        {
            "ply": 41,
            "fen": "r2q1rk1/1p1N1ppp/p3pn2/P1b5/2Qp1B2/6P1/1PN1PPKP/R2R4 b - - 0 21",
            "id": "deZcT2Lr",
            "uci": "e5d7",
            "san": "Nxd7",
            "eval": {
                "cp": 84,
                "best": "Nxd4",
                "variation": "Nxd4 b5"
            }
        },
        {
            "ply": 42,
            "fen": "r4rk1/1p1q1ppp/p3pn2/P1b5/2Qp1B2/6P1/1PN1PPKP/R2R4 w - - 0 22",
            "id": "Rak8YI/C",
            "uci": "d8d7",
            "san": "Qxd7",
            "eval": {
                "cp": 65,
                "best": "Nxd7",
                "variation": "Nxd7 Nxd4 b5 axb6 Qxb6 Nb3 Qb7+ f3 Bb6 Qb4 Nf6 e4 Rfc8 Na5"
            }
        },
        {
            "ply": 43,
            "fen": "r4rk1/1p1q1ppp/p3pn2/P1Q5/3p1B2/6P1/1PN1PPKP/R2R4 b - - 0 22",
            "id": "mTa+8ckN",
            "uci": "c4c5",
            "san": "Qxc5",
            "eval": {
                "cp": 84
            }
        },
        {
            "ply": 44,
            "fen": "r1r3k1/1p1q1ppp/p3pn2/P1Q5/3p1B2/6P1/1PN1PPKP/R2R4 w - - 1 23",
            "id": "dFv0KdYs",
            "uci": "f8c8",
            "san": "Rfc8",
            "eval": {
                "cp": 81
            }
        },
        {
            "ply": 45,
            "fen": "r1r3k1/1p1q1ppp/p3pn2/P7/3Q1B2/6P1/1PN1PPKP/R2R4 b - - 0 23",
            "id": "ajFw9EdU",
            "uci": "c5d4",
            "san": "Qxd4",
            "eval": {
                "cp": 92
            }
        },
        {
            "ply": 46,
            "fen": "r1r3k1/1p3ppp/p1q1pn2/P7/3Q1B2/6P1/1PN1PPKP/R2R4 w - - 1 24",
            "id": "A0chHGvO",
            "uci": "d7c6",
            "san": "Qc6+",
            "eval": {
                "cp": 80
            }
        },
        {
            "ply": 47,
            "fen": "r1r3k1/1p3ppp/p1q1pn2/P7/3Q1B2/5PP1/1PN1P1KP/R2R4 b - - 0 24",
            "id": "Ob/OgcrG",
            "uci": "f2f3",
            "san": "f3",
            "eval": {
                "cp": 62
            }
        },
        {
            "ply": 48,
            "fen": "r1r3k1/1p3ppp/p3pn2/P7/3Q1B2/5PP1/1Pq1P1KP/R2R4 w - - 0 25",
            "id": "Eu6OCL4Y",
            "uci": "c6c2",
            "san": "Qxc2",
            "eval": {
                "cp": 72
            }
        },
        {
            "ply": 49,
            "fen": "r1r3k1/1p3ppp/p3pn2/P7/3Q1B2/5PP1/1PqRP1KP/R7 b - - 1 25",
            "id": "ZYqzel7Q",
            "uci": "d1d2",
            "san": "Rd2",
            "eval": {
                "cp": 87
            }
        },
        {
            "ply": 50,
            "fen": "r1r3k1/1p3ppp/p3pn2/P7/2qQ1B2/5PP1/1P1RP1KP/R7 w - - 2 26",
            "id": "T8T3Yu1t",
            "uci": "c2c4",
            "san": "Qc4",
            "eval": {
                "cp": 75,
                "best": "Qc5",
                "variation": "Qc5 Be5"
            }
        },
        {
            "ply": 51,
            "fen": "r1r3k1/1p3ppp/p3pn2/P7/2Q2B2/5PP1/1P1RP1KP/R7 b - - 0 26",
            "id": "RBea6ygo",
            "uci": "d4c4",
            "san": "Qxc4",
            "eval": {
                "cp": 82,
                "best": "Be5",
                "variation": "Be5 Qxd4 Bxd4 Rc7 Rad1 Rd8 Kf2 Rcd7 Ke1 Ne8 Bf2 Rxd2 Rxd2 Rxd2"
            }
        },
        {
            "ply": 52,
            "fen": "r5k1/1p3ppp/p3pn2/P7/2r2B2/5PP1/1P1RP1KP/R7 w - - 0 27",
            "id": "114KKNMe",
            "uci": "c8c4",
            "san": "Rxc4",
            "eval": {
                "cp": 81
            }
        },
        {
            "ply": 53,
            "fen": "r5k1/1p3ppp/p3pn2/P7/2r1PB2/5PP1/1P1R2KP/R7 b - - 0 27",
            "id": "A8HDAPoT",
            "uci": "e2e4",
            "san": "e4",
            "eval": {
                "cp": 64
            }
        },
        {
            "ply": 54,
            "fen": "2r3k1/1p3ppp/p3pn2/P7/2r1PB2/5PP1/1P1R2KP/R7 w - - 1 28",
            "id": "OhHxoVVH",
            "uci": "a8c8",
            "san": "Rac8",
            "eval": {
                "cp": 79
            }
        },
        {
            "ply": 55,
            "fen": "2r3k1/1p3ppp/p3pn2/P3B3/2r1P3/5PP1/1P1R2KP/R7 b - - 2 28",
            "id": "QZYF/FjC",
            "uci": "f4e5",
            "san": "Be5",
            "eval": {
                "cp": 63,
                "best": "Kf2",
                "variation": "Kf2 Rc2 Rd1 Kf8 Ke3 Rxd2 Rxd2 Ke7 Bd6+ Ke8 Be5 Rc5 Bc3 Nd7"
            }
        },
        {
            "ply": 56,
            "fen": "2r2k2/1p3ppp/p3pn2/P3B3/2r1P3/5PP1/1P1R2KP/R7 w - - 3 29",
            "id": "ZzRwHh1R",
            "uci": "g8f8",
            "san": "Kf8",
            "eval": {
                "cp": 63
            }
        },
        {
            "ply": 57,
            "fen": "2r2k2/1p3ppp/p3pn2/P3B3/2r1P3/5PP1/1P1R2KP/3R4 b - - 4 29",
            "id": "VZJj8nFU",
            "uci": "a1d1",
            "san": "Rad1",
            "eval": {
                "cp": 77,
                "best": "Bc3",
                "variation": "Bc3 h5 Kf2 Ke7 Ra3 R8c5 Rb3 Rb5 Rxb5 axb5 Ke3 Ne8 Rd4 Rxd4"
            }
        },
        {
            "ply": 58,
            "fen": "2r1k3/1p3ppp/p3pn2/P3B3/2r1P3/5PP1/1P1R2KP/3R4 w - - 5 30",
            "id": "HrrdNfMK",
            "uci": "f8e8",
            "san": "Ke8",
            "eval": {
                "cp": 64
            }
        },
        {
            "ply": 59,
            "fen": "2r1k3/1p3ppp/p3pn2/P7/2r1P3/2B2PP1/1P1R2KP/3R4 b - - 6 30",
            "id": "RVlLXdYo",
            "uci": "e5c3",
            "san": "Bc3",
            "eval": {
                "cp": 74
            }
        },
        {
            "ply": 60,
            "fen": "2r1k3/1p3ppp/p3pn2/P1r5/4P3/2B2PP1/1P1R2KP/3R4 w - - 7 31",
            "id": "6kszwuYl",
            "uci": "c4c5",
            "san": "R4c5",
            "eval": {
                "cp": 60
            }
        },
        {
            "ply": 61,
            "fen": "2r1k3/1p3ppp/p3pn2/P1r5/4P3/2B2PP1/1P1R1K1P/3R4 b - - 8 31",
            "id": "UO9LR6H1",
            "uci": "g2f2",
            "san": "Kf2",
            "eval": {
                "cp": 60,
                "best": "h3",
                "variation": "h3 Rb5 Kf2 Ke7 Rd4 e5 Rb4 Rxb4 Bxb4+ Ke8 Bc3 Nd7 Ke3 f6"
            }
        },
        {
            "ply": 62,
            "fen": "2r1k3/1p3ppp/p3pn2/Pr6/4P3/2B2PP1/1P1R1K1P/3R4 w - - 9 32",
            "id": "gHV1PjZ9",
            "uci": "c5b5",
            "san": "Rb5",
            "eval": {
                "cp": 65
            }
        },
        {
            "ply": 63,
            "fen": "2r1k3/1p3ppp/p3pn2/Pr6/4P3/2B1KPP1/1P1R3P/3R4 b - - 10 32",
            "id": "BWh/0tdT",
            "uci": "f2e3",
            "san": "Ke3",
            "eval": {
                "cp": 68,
                "best": "h3",
                "variation": "h3 Ke7"
            }
        },
        {
            "ply": 64,
            "fen": "2r5/1p2kppp/p3pn2/Pr6/4P3/2B1KPP1/1P1R3P/3R4 w - - 11 33",
            "id": "o+5tlGAX",
            "uci": "e8e7",
            "san": "Ke7",
            "eval": {
                "cp": 50
            }
        },
        {
            "ply": 65,
            "fen": "2r5/1p2kppp/p3pn2/Pr6/3RP3/2B1KPP1/1P5P/3R4 b - - 12 33",
            "id": "qMXgUJFm",
            "uci": "d2d4",
            "san": "Rd4",
            "eval": {
                "cp": 61,
                "best": "h4",
                "variation": "h4 h5 Rd4 Ke8 R1d2 g6 Ke2 Ke7 Rd1 Ke8 R1d3 Ke7 Ke3 Ke8"
            }
        },
        {
            "ply": 66,
            "fen": "2r5/1p2kp1p/p3pnp1/Pr6/3RP3/2B1KPP1/1P5P/3R4 w - - 0 34",
            "id": "LveUZHX7",
            "uci": "g7g6",
            "san": "g6",
            "eval": {
                "cp": 48,
                "best": "e5",
                "variation": "e5 Rb4 Rcc5 f4 Ng4+ Ke2 Ke8 Rxb5 Rxb5 h3 Nf6 Kf3 exf4 Kxf4"
            }
        },
        {
            "ply": 67,
            "fen": "2r5/1p2kp1p/p3pnp1/Pr6/3RP1P1/2B1KP2/1P5P/3R4 b - - 0 34",
            "id": "/YPNRzp3",
            "uci": "g3g4",
            "san": "g4",
            "eval": {
                "cp": 69
            }
        },
        {
            "ply": 68,
            "fen": "2r5/1p2kp2/p3pnp1/Pr5p/3RP1P1/2B1KP2/1P5P/3R4 w - - 0 35",
            "id": "qEt3+iV6",
            "uci": "h7h5",
            "san": "h5",
            "eval": {
                "cp": 75,
                "best": "e5",
                "variation": "e5"
            }
        },
        {
            "ply": 69,
            "fen": "2r5/1p2kp2/p3pnp1/Pr5P/3RP3/2B1KP2/1P5P/3R4 b - - 0 35",
            "id": "iOkGK3rU",
            "uci": "g4h5",
            "san": "gxh5",
            "eval": {
                "cp": 81
            }
        },
        {
            "ply": 70,
            "fen": "2r5/1p2kp2/p3pnp1/P6r/3RP3/2B1KP2/1P5P/3R4 w - - 0 36",
            "id": "oYQBmPVo",
            "uci": "b5h5",
            "san": "Rxh5",
            "eval": {
                "cp": 65
            }
        },
        {
            "ply": 71,
            "fen": "2r5/1p2kp2/p3pnp1/P6r/1R2P3/2B1KP2/1P5P/3R4 b - - 1 36",
            "id": "EDKUbk6j",
            "uci": "d4b4",
            "san": "Rb4",
            "eval": {
                "cp": 64
            }
        },
        {
            "ply": 72,
            "fen": "8/1pr1kp2/p3pnp1/P6r/1R2P3/2B1KP2/1P5P/3R4 w - - 2 37",
            "id": "21OtVeQK",
            "uci": "c8c7",
            "san": "Rc7",
            "eval": {
                "cp": 90
            }
        },
        {
            "ply": 73,
            "fen": "8/1pr1kp2/p3pnp1/P6r/4P3/1RB1KP2/1P5P/3R4 b - - 3 37",
            "id": "5GGD/6Sp",
            "uci": "b4b3",
            "san": "Rb3",
            "eval": {
                "cp": 64
            }
        },
        {
            "ply": 74,
            "fen": "8/1pr1kp2/p3pnp1/P7/4P3/1RB1KP1r/1P5P/3R4 w - - 4 38",
            "id": "MIcPS0xc",
            "uci": "h5h3",
            "san": "Rh3",
            "eval": {
                "cp": 35
            }
        },
        {
            "ply": 75,
            "fen": "8/1pr1kp2/p3pnp1/P7/4PK2/1RB2P1r/1P5P/3R4 b - - 5 38",
            "id": "5ZPIoSzR",
            "uci": "e3f4",
            "san": "Kf4",
            "eval": {
                "cp": 75
            }
        },
        {
            "ply": 76,
            "fen": "8/1prnkp2/p3p1p1/P7/4PK2/1RB2P1r/1P5P/3R4 w - - 6 39",
            "id": "tW+2w93R",
            "uci": "f6d7",
            "san": "Nd7",
            "eval": {
                "cp": 77
            }
        },
        {
            "ply": 77,
            "fen": "8/1prnkp2/p3p1p1/P7/1B2PK2/1R3P1r/1P5P/3R4 b - - 7 39",
            "id": "zpkIZGbr",
            "uci": "c3b4",
            "san": "Bb4+",
            "eval": {
                "cp": 35
            }
        },
        {
            "ply": 78,
            "fen": "8/1prn1p2/p3pkp1/P7/1B2PK2/1R3P1r/1P5P/3R4 w - - 8 40",
            "id": "urAchMhF",
            "uci": "e7f6",
            "san": "Kf6",
            "eval": {
                "cp": 36
            }
        },
        {
            "ply": 79,
            "fen": "8/1prn1p2/p2Bpkp1/P7/4PK2/1R3P1r/1P5P/3R4 b - - 9 40",
            "id": "E3vpgMUC",
            "uci": "b4d6",
            "san": "Bd6",
            "eval": {
                "cp": 35
            }
        },
        {
            "ply": 80,
            "fen": "8/1prn1p2/p2Bpk2/P5p1/4PK2/1R3P1r/1P5P/3R4 w - - 0 41",
            "id": "1/U8cjh1",
            "uci": "g6g5",
            "san": "g5+",
            "eval": {
                "cp": 35
            }
        },
        {
            "ply": 81,
            "fen": "8/1prn1p2/p2Bpk2/P5p1/4P1K1/1R3P1r/1P5P/3R4 b - - 1 41",
            "id": "ydAA0/bQ",
            "uci": "f4g4",
            "san": "Kg4",
            "eval": {
                "cp": 51
            }
        },
        {
            "ply": 82,
            "fen": "8/1prn1p2/p2Bpk2/P5p1/4P1Kr/1R3P2/1P5P/3R4 w - - 2 42",
            "id": "m2a7UY0N",
            "uci": "h3h4",
            "san": "Rh4+",
            "eval": {
                "cp": 51
            }
        },
        {
            "ply": 83,
            "fen": "8/1prn1p2/p2Bpk2/P5p1/4P2r/1R3PK1/1P5P/3R4 b - - 3 42",
            "id": "rOIBWg5K",
            "uci": "g4g3",
            "san": "Kg3",
            "eval": {
                "cp": 60
            }
        },
        {
            "ply": 84,
            "fen": "8/1p1n1p2/p2Bpk2/P5p1/4P2r/1R3PK1/1Pr4P/3R4 w - - 4 43",
            "id": "LD+xmU0I",
            "uci": "c7c2",
            "san": "Rc2",
            "eval": {
                "cp": 45
            }
        },
        {
            "ply": 85,
            "fen": "8/1p1n1p2/p2Bpk2/P5p1/4P2r/1R3PKP/1Pr5/3R4 b - - 0 43",
            "id": "lBbvjwVX",
            "uci": "h2h3",
            "san": "h3",
            "eval": {
                "cp": 76
            }
        },
        {
            "ply": 86,
            "fen": "8/1p1n1p2/p2Bp1k1/P5p1/4P2r/1R3PKP/1Pr5/3R4 w - - 1 44",
            "id": "DOkxCPb+",
            "uci": "f6g6",
            "san": "Kg6",
            "eval": {
                "cp": 32
            }
        },
        {
            "ply": 87,
            "fen": "8/1p1nBp2/p3p1k1/P5p1/4P2r/1R3PKP/1Pr5/3R4 b - - 2 44",
            "id": "n/YVZq+H",
            "uci": "d6e7",
            "san": "Be7",
            "eval": {
                "cp": 32
            }
        },
        {
            "ply": 88,
            "fen": "8/1p2Bp2/p3p1k1/P3n1p1/4P2r/1R3PKP/1Pr5/3R4 w - - 3 45",
            "id": "irsnZRsb",
            "uci": "d7e5",
            "san": "Ne5",
            "eval": {
                "cp": 30
            }
        },
        {
            "ply": 89,
            "fen": "3R4/1p2Bp2/p3p1k1/P3n1p1/4P2r/1R3PKP/1Pr5/8 b - - 4 45",
            "id": "X9jXeK2N",
            "uci": "d1d8",
            "san": "Rd8",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 90,
            "fen": "3R4/1p2B3/p3ppk1/P3n1p1/4P2r/1R3PKP/1Pr5/8 w - - 0 46",
            "id": "4aVqIA+W",
            "uci": "f7f6",
            "san": "f6",
            "eval": {
                "cp": 35
            }
        },
        {
            "ply": 91,
            "fen": "3R4/1R2B3/p3ppk1/P3n1p1/4P2r/5PKP/1Pr5/8 b - - 0 46",
            "id": "155R5Nf8",
            "uci": "b3b7",
            "san": "Rxb7",
            "eval": {
                "cp": 76,
                "best": "Bd6",
                "variation": "Bd6 Nc6 Rg8+ Kh7 Rf8 Nxa5 Rb6 Rc6 Rxc6 Nxc6 Rxf6 Kg7 Rf8 Rh7"
            }
        },
        {
            "ply": 92,
            "fen": "3R4/1R2B3/p3ppk1/P3n1p1/4Pr2/5PKP/1Pr5/8 w - - 1 47",
            "id": "cedsHvqB",
            "uci": "h4f4",
            "san": "Rf4",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 93,
            "fen": "3R4/4B3/p3ppk1/P3n1p1/4Pr2/1R3PKP/1Pr5/8 b - - 2 47",
            "id": "1JTGKS4A",
            "uci": "b7b3",
            "san": "Rb3",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 94,
            "fen": "3R4/4B3/p1n1ppk1/P5p1/4Pr2/1R3PKP/1Pr5/8 w - - 3 48",
            "id": "QE0KV16S",
            "uci": "e5c6",
            "san": "Nc6",
            "eval": {
                "cp": 30
            }
        },
        {
            "ply": 95,
            "fen": "2R5/4B3/p1n1ppk1/P5p1/4Pr2/1R3PKP/1Pr5/8 b - - 4 48",
            "id": "QXxSlHvE",
            "uci": "d8c8",
            "san": "Rc8",
            "eval": {
                "cp": 30
            }
        },
        {
            "ply": 96,
            "fen": "2R5/4B3/p3ppk1/n5p1/4Pr2/1R3PKP/1Pr5/8 w - - 0 49",
            "id": "/1W4lqVw",
            "uci": "c6a5",
            "san": "Nxa5",
            "eval": {
                "cp": 30
            }
        },
        {
            "ply": 97,
            "fen": "2R5/4B3/p3ppk1/n5p1/4Pr2/2R2PKP/1Pr5/8 b - - 1 49",
            "id": "FrlsD8+w",
            "uci": "b3c3",
            "san": "Rbc3",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 98,
            "fen": "2R5/4B3/p3ppk1/n5p1/4Pr2/2R2PKP/1r6/8 w - - 0 50",
            "id": "dCkX+CkM",
            "uci": "c2b2",
            "san": "Rxb2",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 99,
            "fen": "2R5/8/p2Bppk1/n5p1/4Pr2/2R2PKP/1r6/8 b - - 1 50",
            "id": "iAWzotli",
            "uci": "e7d6",
            "san": "Bd6",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 100,
            "fen": "2R5/8/p2B1pk1/n3p1p1/4Pr2/2R2PKP/1r6/8 w - - 0 51",
            "id": "Y6LTmv+c",
            "uci": "e6e5",
            "san": "e5",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 101,
            "fen": "2R5/2R5/p2B1pk1/n3p1p1/4Pr2/5PKP/1r6/8 b - - 1 51",
            "id": "xMlLD7tP",
            "uci": "c3c7",
            "san": "R3c7",
            "eval": {
                "cp": 46
            }
        },
        {
            "ply": 102,
            "fen": "2R5/1rR5/p2B1pk1/n3p1p1/4Pr2/5PKP/8/8 w - - 2 52",
            "id": "RUxV5/6s",
            "uci": "b2b7",
            "san": "Rb7",
            "eval": {
                "cp": 61
            }
        },
        {
            "ply": 103,
            "fen": "2R5/1R6/p2B1pk1/n3p1p1/4Pr2/5PKP/8/8 b - - 0 52",
            "id": "ldKVq6VU",
            "uci": "c7b7",
            "san": "Rxb7",
            "eval": {
                "cp": 51
            }
        },
        {
            "ply": 104,
            "fen": "2R5/1n6/p2B1pk1/4p1p1/4Pr2/5PKP/8/8 w - - 0 53",
            "id": "3Xdno92i",
            "uci": "a5b7",
            "san": "Nxb7",
            "eval": {
                "cp": 63
            }
        },
        {
            "ply": 105,
            "fen": "2R5/1n2B3/p4pk1/4p1p1/4Pr2/5PKP/8/8 b - - 1 53",
            "id": "is4HkH38",
            "uci": "d6e7",
            "san": "Be7",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 106,
            "fen": "2R5/4B3/p4pk1/n3p1p1/4Pr2/5PKP/8/8 w - - 2 54",
            "id": "/ai5d20u",
            "uci": "b7a5",
            "san": "Na5",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 107,
            "fen": "8/4B3/p4pk1/n3p1p1/4Pr2/2R2PKP/8/8 b - - 3 54",
            "id": "GztOJPhC",
            "uci": "c8c3",
            "san": "Rc3",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 108,
            "fen": "8/4B3/p4p2/n3p1pk/4Pr2/2R2PKP/8/8 w - - 4 55",
            "id": "2OdeB3No",
            "uci": "g6h5",
            "san": "Kh5",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 109,
            "fen": "8/4B3/p4p2/n3p1pk/4Pr2/2R2P1P/6K1/8 b - - 5 55",
            "id": "Qo60OEUR",
            "uci": "g3g2",
            "san": "Kg2",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 110,
            "fen": "8/4B3/p7/n3pppk/4Pr2/2R2P1P/6K1/8 w - - 0 56",
            "id": "7s0O9fj+",
            "uci": "f6f5",
            "san": "f5",
            "eval": {
                "cp": 29
            }
        },
        {
            "ply": 111,
            "fen": "8/8/p7/n3pppk/1B2Pr2/2R2P1P/6K1/8 b - - 1 56",
            "id": "SwmdLuKO",
            "uci": "e7b4",
            "san": "Bb4",
            "eval": {
                "cp": 30
            }
        },
        {
            "ply": 112,
            "fen": "8/1n6/p7/4pppk/1B2Pr2/2R2P1P/6K1/8 w - - 2 57",
            "id": "Luzi42VP",
            "uci": "a5b7",
            "san": "Nb7",
            "eval": {
                "cp": 30
            }
        },
        {
            "ply": 113,
            "fen": "8/1nR5/p7/4pppk/1B2Pr2/5P1P/6K1/8 b - - 3 57",
            "id": "gXM04Nqx",
            "uci": "c3c7",
            "san": "Rc7",
            "eval": {
                "cp": 30
            }
        },
        {
            "ply": 114,
            "fen": "3n4/2R5/p7/4pppk/1B2Pr2/5P1P/6K1/8 w - - 4 58",
            "id": "iRhsRlbx",
            "uci": "b7d8",
            "san": "Nd8",
            "eval": {
                "cp": 30
            }
        },
        {
            "ply": 115,
            "fen": "3n4/2R5/p7/4pppk/4Pr2/5P1P/3B2K1/8 b - - 5 58",
            "id": "ETY6KuCp",
            "uci": "b4d2",
            "san": "Bd2",
            "eval": {
                "cp": 30
            }
        },
        {
            "ply": 116,
            "fen": "8/2R5/p3n3/4pppk/4Pr2/5P1P/3B2K1/8 w - - 6 59",
            "id": "FZFpGhTY",
            "uci": "d8e6",
            "san": "Ne6",
            "eval": {
                "cp": 30,
                "best": "fxe4",
                "variation": "fxe4 Bxf4 exf3+ Kxf3 exf4 Re7 Nc6 Rh7+ Kg6 Rc7 Ne5+ Ke4 Nf7 Rc6+"
            },
            "comments": [
                {
                    "name": "Inaccuracy",
                    "comment": "Mistake. Best mowe was fxe4"
                }
            ],
            "glyphs": [
                {
                    "name": "Mistake",
                    "symbol": "?"
                }
            ]
        },
        {
            "ply": 117,
            "fen": "8/4R3/p3n3/4pppk/4Pr2/5P1P/3B2K1/8 b - - 7 59",
            "id": "vamugBsF",
            "uci": "c7e7",
            "san": "Re7",
            "eval": {
                "cp": 94
            }
        },
        {
            "ply": 118,
            "fen": "8/4R3/p3n3/4p1pk/4pr2/5P1P/3B2K1/8 w - - 0 60",
            "id": "LQYcCT5v",
            "uci": "f5e4",
            "san": "fxe4",
            "eval": {
                "cp": 92
            }
        },
        {
            "ply": 119,
            "fen": "8/8/p3R3/4p1pk/4pr2/5P1P/3B2K1/8 b - - 0 60",
            "id": "x8OqvMSo",
            "uci": "e7e6",
            "san": "Rxe6",
            "eval": {
                "cp": 84
            }
        },
        {
            "ply": 120,
            "fen": "8/8/p3R3/4p1pk/5r2/5p1P/3B2K1/8 w - - 0 61",
            "id": "kBwl6Tfd",
            "uci": "e4f3",
            "san": "exf3+",
            "eval": {
                "cp": 84
            }
        },
        {
            "ply": 121,
            "fen": "8/8/p3R3/4p1pk/5r2/5p1P/3B1K2/8 b - - 1 61",
            "id": "vzLZeOsq",
            "uci": "g2f2",
            "san": "Kf2",
            "eval": {
                "cp": 84
            }
        },
        {
            "ply": 122,
            "fen": "8/8/p3R3/4p1pk/7r/5p1P/3B1K2/8 w - - 2 62",
            "id": "+HZzoMoo",
            "uci": "f4h4",
            "san": "Rh4",
            "eval": {
                "cp": 84
            }
        },
        {
            "ply": 123,
            "fen": "8/8/p7/4R1pk/7r/5p1P/3B1K2/8 b - - 0 62",
            "id": "IrbptgNn",
            "uci": "e6e5",
            "san": "Rxe5",
            "eval": {
                "cp": 84
            }
        },
        {
            "ply": 124,
            "fen": "8/8/p7/4R1pk/8/5p1r/3B1K2/8 w - - 0 63",
            "id": "/kKoBe88",
            "uci": "h4h3",
            "san": "Rxh3",
            "eval": {
                "cp": 84
            }
        },
        {
            "ply": 125,
            "fen": "8/8/p7/6Rk/8/5p1r/3B1K2/8 b - - 0 63",
            "id": "LiTu9jXP",
            "uci": "e5g5",
            "san": "Rxg5+",
            "eval": {
                "cp": 91
            }
        }
    ],
    "finalFen": "8/8/p7/6Rk/8/5p1r/3B1K2/8 b - - 0 64",
    "pgn": "[Event \"'Личный чемпионат сайта по адвансу - 2018', финал\"]\n[Site \"https://www.chess-online.com/7782247\"]\n[Date \"2020.02.10\"]\n[Round \"?\"]\n[White \"AHDPEI\"]\n[Black \"Sheldon\"]\n[Result \"1/2-1/2\"]\n[WhiteUSCF \"1652\"]\n[BlackUSCF \"1598\"]\n[ECO \"A05\"]\n[EventDate \"2019.04.02\"]\n[Termination \"normal\"]\n\n1. Nf3 Nf6 2. g3 d5 3. Bg2 c5 4. O-O a6 5. c4 dxc4 6. Ne5 Ra7 7. a4 Qd4 8. Nf3\nQd8 9. Na3 Be6 10. Ne5 Qd4 11. Nf3 Qd8 12. a5 Bd5 13. Qa4+ Bc6 14. Qxc4 e6 15.\nd4 Nbd7 16. Ne5 Bxg2 17. Kxg2 cxd4 18. Bf4 Ra8 19. Rfd1 Bc5 20. Nc2 O-O 21. Nxd7\nQxd7 22. Qxc5 Rfc8 23. Qxd4 Qc6+ 24. f3 Qxc2 25. Rd2 Qc4 26. Qxc4 Rxc4 27. e4\nRac8 28. Be5 Kf8 29. Rad1 Ke8 30. Bc3 R4c5 31. Kf2 Rb5 32. Ke3 Ke7 33. Rd4 g6\n34. g4 h5 35. gxh5 Rxh5 36. Rb4 Rc7 37. Rb3 Rh3 38. Kf4 Nd7 39. Bb4+ Kf6 40. Bd6\ng5+ 41. Kg4 Rh4+ 42. Kg3 Rc2 43. h3 Kg6 44. Be7 Ne5 45. Rd8 f6 46. Rxb7 Rf4 47.\nRb3 Nc6 48. Rc8 Nxa5 49. Rbc3 Rxb2 50. Bd6 e5 51. R3c7 Rb7 52. Rxb7 Nxb7 53. Be7\nNa5 54. Rc3 Kh5 55. Kg2 f5 56. Bb4 Nb7 57. Rc7 Nd8 58. Bd2 Ne6 59. Re7 fxe4 60.\nRxe6 exf3+ 61. Kf2 Rh4 62. Rxe5 Rxh3 63. Rxg5+ 1/2-1/2\n"
};
    
const dataWatch = {
    "game": {
        "id": 7814781,
        "load": false,
        "insite": true,
        "variant": {
            "key": "standard",
            "name": "Standard",
            "shortName": "Std"
        },
        "speed": "correspondence",
        "perf": "main",
        "rated": true,
        "initialFen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -",
        "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P3P/7K/6q1 w - - 11 36",
        "player": "white",
        "turns": 70,
        "startedAtTurn": 0,
        "status": {
            "name": "mate",
            "result": 2,
            "result_name": "мат королю"
        },
        "event": "Серия #24910",
        "tournamentId": 24910,
        "createdAt": 1585334678679,
        "private": false,
        "advance": false,
        "winner": "black",
        "lastMove": "f1g1",
        "check": "h2",
        "opening": {
            "code": "A05",
            "name": "Reti: 1...Nf6"
        }
    },
    "tournament": {
        "id": 24910,
        "name": "Серия #24910",
        "running": false
    },
    "clock": {
        "limit": "3 дня/ход",
        "can_pause": true,
        "parts": [
            {
                "per": "move",
                "initial": 259200000,
                "increment": 0,
                "min": 259200000
            }
        ],
        "white": 0,
        "black": 0,
        "totalTime": 592291000,
        "lastMoveAt": 1585926969254
    },
    "player": {
        "color": "white",
        "name": "jum_jumangulov_ravil",
        "user": {
            "id": 153806,
            "username": "jum_jumangulov_ravil",
            "displayName": "Игорь Владимирович Кургузов",
            "online": "12h",
            "perfs": {
                "main": {
                    "games": 1710,
                    "rating": "1075.75",
                    "avg": 1220
                }
            },
            "language": "ru-RU",
            "profile": {
                "country": "TR"
            },
            "patron": "base"
        },
        "rating": "1269.05",
        "ratingDiff": "-23.53"
    },
    "opponent": {
        "color": "black",
        "name": "milena",
        "user": {
            "id": 35530,
            "username": "milena",
            "displayName": "Павлов Стаматов Яне",
            "online": "now",
            "perfs": {
                "main": {
                    "games": 15268,
                    "rating": "1030.68",
                    "avg": 1035
                }
            },
            "language": "ru-RU",
            "profile": {
                "country": "BG"
            },
            "patron": "gold"
        },
        "rating": "947.32",
        "ratingDiff": "23.53"
    },
    "orientation": "white",
    "steps": [
        {
            "ply": 0,
            "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        },
        {
            "ply": 1,
            "uci": "g1f3",
            "san": "Nf3",
            "fen": "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1",
            "id": "LxpVgb+s"
        },
        {
            "ply": 2,
            "uci": "g8f6",
            "san": "Nf6",
            "fen": "rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 2 2",
            "id": "WODi+Qq4"
        },
        {
            "ply": 3,
            "uci": "e2e4",
            "san": "e4",
            "fen": "rnbqkb1r/pppppppp/5n2/8/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 0 2",
            "id": "oBQ9erY"
        },
        {
            "ply": 4,
            "uci": "e7e5",
            "san": "e5",
            "fen": "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
            "id": "xrjs0YXQ"
        },
        {
            "ply": 5,
            "uci": "b1c3",
            "san": "Nc3",
            "fen": "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R b KQkq - 1 3",
            "id": "87jBatcK"
        },
        {
            "ply": 6,
            "uci": "b8c6",
            "san": "Nc6",
            "fen": "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 2 4",
            "id": "65K5UkiV"
        },
        {
            "ply": 7,
            "uci": "f1c4",
            "san": "Bc4",
            "fen": "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 3 4",
            "id": "UVqw/AJD"
        },
        {
            "ply": 8,
            "uci": "f8b4",
            "san": "Bb4",
            "fen": "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5",
            "id": "YtESVFaX"
        },
        {
            "ply": 9,
            "uci": "e1g1",
            "san": "O-O",
            "fen": "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQ1RK1 b kq - 5 5",
            "id": "IGFwRV2v"
        },
        {
            "ply": 10,
            "uci": "e8g8",
            "san": "O-O",
            "fen": "r1bq1rk1/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 6 6",
            "id": "kiORj4G9"
        },
        {
            "ply": 11,
            "uci": "d2d3",
            "san": "d3",
            "fen": "r1bq1rk1/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b - - 0 6",
            "id": "a3C7gkUJ"
        },
        {
            "ply": 12,
            "uci": "d7d6",
            "san": "d6",
            "fen": "r1bq1rk1/ppp2ppp/2np1n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7",
            "id": "3njbC3Jv"
        },
        {
            "ply": 13,
            "uci": "c3d5",
            "san": "Nd5",
            "fen": "r1bq1rk1/ppp2ppp/2np1n2/3Np3/1bB1P3/3P1N2/PPP2PPP/R1BQ1RK1 b - - 1 7",
            "id": "TgsErmXE"
        },
        {
            "ply": 14,
            "uci": "f6d5",
            "san": "Nxd5",
            "fen": "r1bq1rk1/ppp2ppp/2np4/3np3/1bB1P3/3P1N2/PPP2PPP/R1BQ1RK1 w - - 0 8",
            "id": "UlFU93dF"
        },
        {
            "ply": 15,
            "uci": "c4d5",
            "san": "Bxd5",
            "fen": "r1bq1rk1/ppp2ppp/2np4/3Bp3/1b2P3/3P1N2/PPP2PPP/R1BQ1RK1 b - - 0 8",
            "id": "ddWOdJ1C"
        },
        {
            "ply": 16,
            "uci": "c8d7",
            "san": "Bd7",
            "fen": "r2q1rk1/pppb1ppp/2np4/3Bp3/1b2P3/3P1N2/PPP2PPP/R1BQ1RK1 w - - 1 9",
            "id": "PlUBeR89"
        },
        {
            "ply": 17,
            "uci": "c1g5",
            "san": "Bg5",
            "fen": "r2q1rk1/pppb1ppp/2np4/3Bp1B1/1b2P3/3P1N2/PPP2PPP/R2Q1RK1 b - - 2 9",
            "id": "e8juaLR0"
        },
        {
            "ply": 18,
            "uci": "d8e8",
            "san": "Qe8",
            "fen": "r3qrk1/pppb1ppp/2np4/3Bp1B1/1b2P3/3P1N2/PPP2PPP/R2Q1RK1 w - - 3 10",
            "id": "czpSHLg9"
        },
        {
            "ply": 19,
            "uci": "a2a4",
            "san": "a4",
            "fen": "r3qrk1/pppb1ppp/2np4/3Bp1B1/Pb2P3/3P1N2/1PP2PPP/R2Q1RK1 b - - 0 10",
            "id": "I0x1OGzX"
        },
        {
            "ply": 20,
            "uci": "h7h6",
            "san": "h6",
            "fen": "r3qrk1/pppb1pp1/2np3p/3Bp1B1/Pb2P3/3P1N2/1PP2PPP/R2Q1RK1 w - - 0 11",
            "id": "3pAsmBAa"
        },
        {
            "ply": 21,
            "uci": "g5h4",
            "san": "Bh4",
            "fen": "r3qrk1/pppb1pp1/2np3p/3Bp3/Pb2P2B/3P1N2/1PP2PPP/R2Q1RK1 b - - 1 11",
            "id": "r/XgGBh7"
        },
        {
            "ply": 22,
            "uci": "d7e6",
            "san": "Be6",
            "fen": "r3qrk1/ppp2pp1/2npb2p/3Bp3/Pb2P2B/3P1N2/1PP2PPP/R2Q1RK1 w - - 2 12",
            "id": "BhyRcoDa"
        },
        {
            "ply": 23,
            "uci": "c2c4",
            "san": "c4",
            "fen": "r3qrk1/ppp2pp1/2npb2p/3Bp3/PbP1P2B/3P1N2/1P3PPP/R2Q1RK1 b - - 0 12",
            "id": "oFJn/YTt"
        },
        {
            "ply": 24,
            "uci": "e6d5",
            "san": "Bxd5",
            "fen": "r3qrk1/ppp2pp1/2np3p/3bp3/PbP1P2B/3P1N2/1P3PPP/R2Q1RK1 w - - 0 13",
            "id": "adSqf36F"
        },
        {
            "ply": 25,
            "uci": "c4d5",
            "san": "cxd5",
            "fen": "r3qrk1/ppp2pp1/2np3p/3Pp3/Pb2P2B/3P1N2/1P3PPP/R2Q1RK1 b - - 0 13",
            "id": "6ty/Uf4J"
        },
        {
            "ply": 26,
            "uci": "c6d4",
            "san": "Nd4",
            "fen": "r3qrk1/ppp2pp1/3p3p/3Pp3/Pb1nP2B/3P1N2/1P3PPP/R2Q1RK1 w - - 1 14",
            "id": "av4m76WY"
        },
        {
            "ply": 27,
            "uci": "b2b3",
            "san": "b3",
            "fen": "r3qrk1/ppp2pp1/3p3p/3Pp3/Pb1nP2B/1P1P1N2/5PPP/R2Q1RK1 b - - 0 14",
            "id": "wtx7SYxO"
        },
        {
            "ply": 28,
            "uci": "d4f3",
            "san": "Nxf3+",
            "fen": "r3qrk1/ppp2pp1/3p3p/3Pp3/Pb2P2B/1P1P1n2/5PPP/R2Q1RK1 w - - 0 15",
            "id": "sMKKWnGk"
        },
        {
            "ply": 29,
            "uci": "d1f3",
            "san": "Qxf3",
            "fen": "r3qrk1/ppp2pp1/3p3p/3Pp3/Pb2P2B/1P1P1Q2/5PPP/R4RK1 b - - 0 15",
            "id": "2nQ1WuQL"
        },
        {
            "ply": 30,
            "uci": "a8c8",
            "san": "Rc8",
            "fen": "2r1qrk1/ppp2pp1/3p3p/3Pp3/Pb2P2B/1P1P1Q2/5PPP/R4RK1 w - - 1 16",
            "id": "liqqub44"
        },
        {
            "ply": 31,
            "uci": "a1a2",
            "san": "Ra2",
            "fen": "2r1qrk1/ppp2pp1/3p3p/3Pp3/Pb2P2B/1P1P1Q2/R4PPP/5RK1 b - - 2 16",
            "id": "ygBl/ePP"
        },
        {
            "ply": 32,
            "uci": "c7c6",
            "san": "c6",
            "fen": "2r1qrk1/pp3pp1/2pp3p/3Pp3/Pb2P2B/1P1P1Q2/R4PPP/5RK1 w - - 0 17",
            "id": "A34PIyM+"
        },
        {
            "ply": 33,
            "uci": "d5c6",
            "san": "dxc6",
            "fen": "2r1qrk1/pp3pp1/2Pp3p/4p3/Pb2P2B/1P1P1Q2/R4PPP/5RK1 b - - 0 17",
            "id": "mGP/wjfC"
        },
        {
            "ply": 34,
            "uci": "b7c6",
            "san": "bxc6",
            "fen": "2r1qrk1/p4pp1/2pp3p/4p3/Pb2P2B/1P1P1Q2/R4PPP/5RK1 w - - 0 18",
            "id": "bunOYnsm"
        },
        {
            "ply": 35,
            "uci": "f3g3",
            "san": "Qg3",
            "fen": "2r1qrk1/p4pp1/2pp3p/4p3/Pb2P2B/1P1P2Q1/R4PPP/5RK1 b - - 1 18",
            "id": "AcPC5lcu"
        },
        {
            "ply": 36,
            "uci": "g8h7",
            "san": "Kh7",
            "fen": "2r1qr2/p4ppk/2pp3p/4p3/Pb2P2B/1P1P2Q1/R4PPP/5RK1 w - - 2 19",
            "id": "k0slEL2B"
        },
        {
            "ply": 37,
            "uci": "f2f4",
            "san": "f4",
            "fen": "2r1qr2/p4ppk/2pp3p/4p3/Pb2PP1B/1P1P2Q1/R5PP/5RK1 b - - 0 19",
            "id": "idH1xxko"
        },
        {
            "ply": 38,
            "uci": "b4c3",
            "san": "Bc3",
            "fen": "2r1qr2/p4ppk/2pp3p/4p3/P3PP1B/1PbP2Q1/R5PP/5RK1 w - - 1 20",
            "id": "9Cyixqx9"
        },
        {
            "ply": 39,
            "uci": "f4f5",
            "san": "f5",
            "fen": "2r1qr2/p4ppk/2pp3p/4pP2/P3P2B/1PbP2Q1/R5PP/5RK1 b - - 0 20",
            "id": "S1k706ZG"
        },
        {
            "ply": 40,
            "uci": "c3d4",
            "san": "Bd4+",
            "fen": "2r1qr2/p4ppk/2pp3p/4pP2/P2bP2B/1P1P2Q1/R5PP/5RK1 w - - 1 21",
            "id": "qKNnZzT"
        },
        {
            "ply": 41,
            "uci": "g1h1",
            "san": "Kh1",
            "fen": "2r1qr2/p4ppk/2pp3p/4pP2/P2bP2B/1P1P2Q1/R5PP/5R1K b - - 2 21",
            "id": "QKlo6coH"
        },
        {
            "ply": 42,
            "uci": "c8b8",
            "san": "Rb8",
            "fen": "1r2qr2/p4ppk/2pp3p/4pP2/P2bP2B/1P1P2Q1/R5PP/5R1K w - - 3 22",
            "id": "92M9f+Xr"
        },
        {
            "ply": 43,
            "uci": "f5f6",
            "san": "f6",
            "fen": "1r2qr2/p4ppk/2pp1P1p/4p3/P2bP2B/1P1P2Q1/R5PP/5R1K b - - 0 22",
            "id": "BMujkZHi"
        },
        {
            "ply": 44,
            "uci": "g7g6",
            "san": "g6",
            "fen": "1r2qr2/p4p1k/2pp1Ppp/4p3/P2bP2B/1P1P2Q1/R5PP/5R1K w - - 0 23",
            "id": "Fb5bvY84"
        },
        {
            "ply": 45,
            "uci": "h4g5",
            "san": "Bg5",
            "fen": "1r2qr2/p4p1k/2pp1Ppp/4p1B1/P2bP3/1P1P2Q1/R5PP/5R1K b - - 1 23",
            "id": "5QFpwY3b"
        },
        {
            "ply": 46,
            "uci": "h6h5",
            "san": "h5",
            "fen": "1r2qr2/p4p1k/2pp1Pp1/4p1Bp/P2bP3/1P1P2Q1/R5PP/5R1K w - - 0 24",
            "id": "axwzlhVQ"
        },
        {
            "ply": 47,
            "uci": "g3h4",
            "san": "Qh4",
            "fen": "1r2qr2/p4p1k/2pp1Pp1/4p1Bp/P2bP2Q/1P1P4/R5PP/5R1K b - - 1 24",
            "id": "16EmBKrF"
        },
        {
            "ply": 48,
            "uci": "f8h8",
            "san": "Rh8",
            "fen": "1r2q2r/p4p1k/2pp1Pp1/4p1Bp/P2bP2Q/1P1P4/R5PP/5R1K w - - 2 25",
            "id": "5DRRfYph"
        },
        {
            "ply": 49,
            "uci": "f1b1",
            "san": "Rb1",
            "fen": "1r2q2r/p4p1k/2pp1Pp1/4p1Bp/P2bP2Q/1P1P4/R5PP/1R5K b - - 3 25",
            "id": "e5uUmS++"
        },
        {
            "ply": 50,
            "uci": "e8d7",
            "san": "Qd7",
            "fen": "1r5r/p2q1p1k/2pp1Pp1/4p1Bp/P2bP2Q/1P1P4/R5PP/1R5K w - - 4 26",
            "id": "pD83gI37"
        },
        {
            "ply": 51,
            "uci": "h2h3",
            "san": "h3",
            "fen": "1r5r/p2q1p1k/2pp1Pp1/4p1Bp/P2bP2Q/1P1P3P/R5P1/1R5K b - - 0 26",
            "id": "NHDhl88a"
        },
        {
            "ply": 52,
            "uci": "h7g8",
            "san": "Kg8",
            "fen": "1r4kr/p2q1p2/2pp1Pp1/4p1Bp/P2bP2Q/1P1P3P/R5P1/1R5K w - - 1 27",
            "id": "bwNqi9Mo"
        },
        {
            "ply": 53,
            "uci": "a2c2",
            "san": "Rc2",
            "fen": "1r4kr/p2q1p2/2pp1Pp1/4p1Bp/P2bP2Q/1P1P3P/2R3P1/1R5K b - - 2 27",
            "id": "Wt1TPcOe"
        },
        {
            "ply": 54,
            "uci": "d7e6",
            "san": "Qe6",
            "fen": "1r4kr/p4p2/2ppqPp1/4p1Bp/P2bP2Q/1P1P3P/2R3P1/1R5K w - - 3 28",
            "id": "k6pnrq5Y"
        },
        {
            "ply": 55,
            "uci": "c2c6",
            "san": "Rxc6",
            "fen": "1r4kr/p4p2/2RpqPp1/4p1Bp/P2bP2Q/1P1P3P/6P1/1R5K b - - 0 28",
            "id": "L5SdHRfx"
        },
        {
            "ply": 56,
            "uci": "b8b3",
            "san": "Rxb3",
            "fen": "6kr/p4p2/2RpqPp1/4p1Bp/P2bP2Q/1r1P3P/6P1/1R5K w - - 0 29",
            "id": "SJoZtPrh"
        },
        {
            "ply": 57,
            "uci": "b1b3",
            "san": "Rxb3",
            "fen": "6kr/p4p2/2RpqPp1/4p1Bp/P2bP2Q/1R1P3P/6P1/7K b - - 0 29",
            "id": "Lt355K76"
        },
        {
            "ply": 58,
            "uci": "e6b3",
            "san": "Qxb3",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP2Q/1q1P3P/6P1/7K w - - 0 30",
            "id": "Aopjhgk/"
        },
        {
            "ply": 59,
            "uci": "g2g4",
            "san": "g4",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/1q1P3P/8/7K b - - 0 30",
            "id": "63b56Qab"
        },
        {
            "ply": 60,
            "uci": "b3d1",
            "san": "Qd1+",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P3P/8/3q3K w - - 1 31",
            "id": "Pvn6OXaE"
        },
        {
            "ply": 61,
            "uci": "h1g2",
            "san": "Kg2",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P3P/6K1/3q4 b - - 2 31",
            "id": "AlRys2yo"
        },
        {
            "ply": 62,
            "uci": "d1g1",
            "san": "Qg1+",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P3P/6K1/6q1 w - - 3 32",
            "id": "CKcNvC27"
        },
        {
            "ply": 63,
            "uci": "g2f3",
            "san": "Kf3",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P1K1P/8/6q1 b - - 4 32",
            "id": "oi4yVwv6"
        },
        {
            "ply": 64,
            "uci": "g1d1",
            "san": "Qd1+",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P1K1P/8/3q4 w - - 5 33",
            "id": "sWdfwBNa"
        },
        {
            "ply": 65,
            "uci": "f3g2",
            "san": "Kg2",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P3P/6K1/3q4 b - - 6 33",
            "id": "L5ORNe29"
        },
        {
            "ply": 66,
            "uci": "d1e2",
            "san": "Qe2+",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P3P/4q1K1/8 w - - 7 34",
            "id": "6mQtzC+Z"
        },
        {
            "ply": 67,
            "uci": "g2h1",
            "san": "Kh1",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P3P/4q3/7K b - - 8 34",
            "id": "eVnh6X9e"
        },
        {
            "ply": 68,
            "uci": "e2f1",
            "san": "Qf1+",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P3P/8/5q1K w - - 9 35",
            "id": "UjC/T4US"
        },
        {
            "ply": 69,
            "uci": "h1h2",
            "san": "Kh2",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P3P/7K/5q2 b - - 10 35",
            "id": "Xr2f+opt"
        },
        {
            "ply": 70,
            "uci": "f1g1",
            "san": "Qg1#",
            "fen": "6kr/p4p2/2Rp1Pp1/4p1Bp/P2bP1PQ/3P3P/7K/6q1 w - - 11 36",
            "id": "Qc2vHU1z"
        }
    ]
}

const fenStdStart = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

describe('Chess', function() {
    describe('constructor()', function() {
        it('test construct without params', function() {
            const game = new Chess();
            expect(game.startFen).to.equal(fenStdStart);
            
            game.moveLast();
            expect(game.CurrentPlyCount).to.equal(0);
        });

        it('test construct with watch data', function() {
            const game = new Chess(dataWatch);
            game.moveLast();
            expect(game.CurrentPlyCount).to.equal(70);
        });

        it('test construct with analysis data', function() {
            const game = new Chess(dataAnalyse);
            game.moveLast();
            expect(game.CurrentPlyCount).to.equal(125);
        });
    });
});
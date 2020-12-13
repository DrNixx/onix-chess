"use strict";

const expect = require('chai').expect;
const { Chess } = require("../dist/chess/Chess");
const { isBlitzClock, isCorrespondenceClock, isAdvanceClock } = require("../dist/types/Interfaces");

const dataAnalyse = {
    game: {
        id: 7782247,
        load: false,
        insite: true,
        variant: {
            key: "standard",
            name: "Standard",
            shortName: "Std"
        },
        speed: "correspondence",
        perf: "maina",
        rated: true,
        initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -",
        fen: "8/8/p7/6Rk/8/5p1r/3B1K2/8 b - - 0 64",
        player: "black",
        turns: 125,
        startedAtTurn: 0,
        status: {
            name: "draw",
            result: 3,
            result_name: "ничья принята"
        },
        event: "Личный чемпионат сайта по адвансу - 2018, финал",
        tournamentId: 24184,
        createdAt: 1554204125948,
        createdBy: 4,
        private: false,
        advance: true,
        lastMove: "e5g5",
        check: "h5",
        moveCentis: [
            192602477,
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
            5375631
        ],
        opening: {
            code: "A05",
            name: "Reti: KIA"
        }
    },
    tournament: {
        id: 24184,
        name: "Личный чемпионат сайта по адвансу - 2018, финал",
        running: false
    },
    correspondence: {
        limit: "Адванс 10+2/21",
        can_pause: true,
        parts: [
            {
                per: "game",
                initial: 864000000,
                increment: 172800000,
                min: 0,
                interval: 1,
                max: 1814400000
            }
        ],
        white: 0,
        black: 0,
        totalTime: 27122872000,
        lastMoveAt: 1581326997619,
        serverNow: 1607893802294
    },
    player: {
        color: "white",
        name: "AHDPEI",
        user: {
            id: 32141,
            name: "AHDPEI",
            display: "Андрей",
            online: "12h",
            perfs: {
                maina: {
                    games: 256,
                    rating: 1610,
                    avg: 1619
                }
            },
            language: "ru-RU",
            profile: {
                country: "UA"
            },
            patron: "bronze",
            status: "bronze",
            title: ""
        },
        rating: 1653,
        ratingDiff: -1.63
    },
    opponent: {
        color: "black",
        name: "Sheldon",
        user: {
            id: 82031,
            name: "Sheldon",
            display: "Станислав",
            online: "12h",
            perfs: {
                maina: {
                    games: 410,
                    rating: 1539,
                    avg: 1557
                }
            },
            language: "ru-RU",
            profile: {
                country: "KZ"
            },
            patron: "bronze",
            status: "bronze",
            title: ""
        },
        rating: 1598,
        ratingDiff: 1.63
    },
    orientation: "white",
    analysis: {
        state: "ready",
        white: {
            blunder: 0,
            inaccuracy: 0,
            mistake: 0,
            acpl: 6
        },
        black: {
            blunder: 0,
            inaccuracy: 2,
            mistake: 0,
            acpl: 9
        }
    },
    treeParts: [
        {
            ply: 0,
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            eval: {
                cp: 13
            }
        },
        {
            ply: 1,
            fen: "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1",
            id: "I0e2/DzK",
            uci: "g1f3",
            san: "Nf3",
            eval: {
                cp: 13,
                best: "c4",
                variation: "c4 e6 Nc3 d5 d4 Nf6 Nf3 c6 cxd5 exd5 Bf4 Be7 Qc2 Nh5",
                depth: 39,
                time: 191840,
                by: "deep"
            }
        },
        {
            ply: 2,
            fen: "rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 2 2",
            id: "tDeH/NTj",
            uci: "g8f6",
            san: "Nf6",
            eval: {
                cp: 19,
                depth: 39,
                time: 209000,
                by: "deep"
            }
        },
        {
            ply: 3,
            fen: "rnbqkb1r/pppppppp/5n2/8/8/5NP1/PPPPPP1P/RNBQKB1R b KQkq - 0 2",
            id: "cx9msWD6",
            uci: "g2g3",
            san: "g3",
            eval: {
                cp: 22,
                best: "d4",
                variation: "d4 e6",
                depth: 38,
                time: 210573,
                by: "deep"
            }
        },
        {
            ply: 4,
            fen: "rnbqkb1r/ppp1pppp/5n2/3p4/8/5NP1/PPPPPP1P/RNBQKB1R w KQkq - 0 3",
            id: "N8lU9PCx",
            uci: "d7d5",
            san: "d5",
            eval: {
                depth: 36,
                time: 209260,
                by: "deep"
            }
        },
        {
            ply: 5,
            fen: "rnbqkb1r/ppp1pppp/5n2/3p4/8/5NP1/PPPPPPBP/RNBQK2R b KQkq - 1 3",
            id: "ubAEH3no",
            uci: "f1g2",
            san: "Bg2",
            eval: {
                cp: -20,
                depth: 25,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 6,
            fen: "rnbqkb1r/pp2pppp/5n2/2pp4/8/5NP1/PPPPPPBP/RNBQK2R w KQkq - 0 4",
            id: "SUZuJTBB",
            uci: "c7c5",
            san: "c5",
            eval: {
                cp: -15,
                depth: 20,
                time: 1522,
                by: "deep"
            }
        },
        {
            ply: 7,
            fen: "rnbqkb1r/pp2pppp/5n2/2pp4/8/5NP1/PPPPPPBP/RNBQ1RK1 b kq - 1 4",
            id: "PCZZj7MS",
            uci: "e1g1",
            san: "O-O",
            eval: {
                cp: 10,
                depth: 24,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 8,
            fen: "rnbqkb1r/1p2pppp/p4n2/2pp4/8/5NP1/PPPPPPBP/RNBQ1RK1 w kq - 0 5",
            id: "MlOTz679",
            uci: "a7a6",
            san: "a6",
            eval: {
                cp: 17,
                best: "h6",
                variation: "h6 c3 e6 d4 Be7 c4 Nc6 cxd5 exd5 dxc5 Bxc5 a3 a5 Nc3",
                depth: 21,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 9,
            fen: "rnbqkb1r/1p2pppp/p4n2/2pp4/2P5/5NP1/PP1PPPBP/RNBQ1RK1 b kq - 0 5",
            id: "UvsldDfH",
            uci: "c2c4",
            san: "c4",
            eval: {
                cp: 28,
                best: "d3",
                variation: "d3 e6",
                depth: 19,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 10,
            fen: "rnbqkb1r/1p2pppp/p4n2/2p5/2p5/5NP1/PP1PPPBP/RNBQ1RK1 w kq - 0 6",
            id: "niOu6JDw",
            uci: "d5c4",
            san: "dxc4",
            eval: {
                cp: 33,
                depth: 22,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 11,
            fen: "rnbqkb1r/1p2pppp/p4n2/2p1N3/2p5/6P1/PP1PPPBP/RNBQ1RK1 b kq - 1 6",
            id: "wMCAURWY",
            uci: "f3e5",
            san: "Ne5",
            eval: {
                cp: 42,
                depth: 23,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 12,
            fen: "1nbqkb1r/rp2pppp/p4n2/2p1N3/2p5/6P1/PP1PPPBP/RNBQ1RK1 w k - 2 7",
            id: "ZwAG861m",
            uci: "a8a7",
            san: "Ra7",
            eval: {
                best: "Qd4",
                variation: "Qd4 Nf3 Qd8 Ne5",
                depth: 23,
                time: 4001,
                by: "offline"
            },
            comments: [
                {
                    name: "Inaccuracy",
                    comment: "Mistake. Best mowe was Qd4"
                }
            ],
            glyphs: [
                {
                    name: "Mistake",
                    symbol: "?"
                }
            ]
        },
        {
            ply: 13,
            fen: "1nbqkb1r/rp2pppp/p4n2/2p1N3/P1p5/6P1/1P1PPPBP/RNBQ1RK1 b k - 0 7",
            id: "WiKQhgfX",
            uci: "a2a4",
            san: "a4",
            eval: {
                cp: 63,
                depth: 23,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 14,
            fen: "1nb1kb1r/rp2pppp/p4n2/2p1N3/P1pq4/6P1/1P1PPPBP/RNBQ1RK1 w k - 1 8",
            id: "mX5Ksoni",
            uci: "d8d4",
            san: "Qd4",
            eval: {
                cp: 60,
                depth: 22,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 15,
            fen: "1nb1kb1r/rp2pppp/p4n2/2p5/P1pq4/5NP1/1P1PPPBP/RNBQ1RK1 b k - 2 8",
            id: "7DdyHMJs",
            uci: "e5f3",
            san: "Nf3",
            eval: {
                cp: 72,
                depth: 24,
                time: 4004,
                by: "offline"
            }
        },
        {
            ply: 16,
            fen: "1nbqkb1r/rp2pppp/p4n2/2p5/P1p5/5NP1/1P1PPPBP/RNBQ1RK1 w k - 3 9",
            id: "CAKCX9ib",
            uci: "d4d8",
            san: "Qd8",
            eval: {
                cp: 66,
                best: "Qd5",
                variation: "Qd5 Nc3 Qd8 Ne5 Qd4 d3 Qxe5 Bf4 Qd4 Bxb8 Ra8 Bf4 cxd3 exd3",
                depth: 21,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 17,
            fen: "1nbqkb1r/rp2pppp/p4n2/2p5/P1p5/N4NP1/1P1PPPBP/R1BQ1RK1 b k - 4 9",
            id: "djt5oj04",
            uci: "b1a3",
            san: "Na3",
            eval: {
                cp: 74,
                depth: 23,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 18,
            fen: "1n1qkb1r/rp2pppp/p3bn2/2p5/P1p5/N4NP1/1P1PPPBP/R1BQ1RK1 w k - 5 10",
            id: "Nx4uQ/0d",
            uci: "c8e6",
            san: "Be6",
            eval: {
                cp: 101,
                depth: 22,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 19,
            fen: "1n1qkb1r/rp2pppp/p3bn2/2p1N3/P1p5/N5P1/1P1PPPBP/R1BQ1RK1 b k - 6 10",
            id: "5ujbf+U",
            uci: "f3e5",
            san: "Ne5",
            eval: {
                cp: 92,
                depth: 23,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 20,
            fen: "1n2kb1r/rp2pppp/p3bn2/2p1N3/P1pq4/N5P1/1P1PPPBP/R1BQ1RK1 w k - 7 11",
            id: "sk+q9D3M",
            uci: "d8d4",
            san: "Qd4",
            eval: {
                cp: 90,
                depth: 23,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 21,
            fen: "1n2kb1r/rp2pppp/p3bn2/2p5/P1pq4/N4NP1/1P1PPPBP/R1BQ1RK1 b k - 8 11",
            id: "yysF7/Iq",
            uci: "e5f3",
            san: "Nf3",
            eval: {
                cp: 71,
                depth: 24,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 22,
            fen: "1n1qkb1r/rp2pppp/p3bn2/2p5/P1p5/N4NP1/1P1PPPBP/R1BQ1RK1 w k - 9 12",
            id: "ll23XFtG",
            uci: "d4d8",
            san: "Qd8",
            eval: {
                cp: 85,
                depth: 22,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 23,
            fen: "1n1qkb1r/rp2pppp/p3bn2/P1p5/2p5/N4NP1/1P1PPPBP/R1BQ1RK1 b k - 0 12",
            id: "m2cRXO51",
            uci: "a4a5",
            san: "a5",
            eval: {
                cp: 92,
                best: "Ne5",
                variation: "Ne5 Qd4 Nf3 Qd8 Qc2 b5 d3 cxd3 exd3 Rb7 axb5 axb5 Be3 Bd5",
                depth: 23,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 24,
            fen: "1n1qkb1r/rp2pppp/p4n2/P1pb4/2p5/N4NP1/1P1PPPBP/R1BQ1RK1 w k - 1 13",
            id: "IagFy2PP",
            uci: "e6d5",
            san: "Bd5",
            eval: {
                cp: 102,
                best: "Qxa5",
                variation: "Qxa5 d3 Nc6 Ng5 Bd7 Bf4 cxd3 Nc4 Qb4 exd3 h6 Bd2 Qb5 Bxc6",
                depth: 21,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 25,
            fen: "1n1qkb1r/rp2pppp/p4n2/P1pb4/Q1p5/N4NP1/1P1PPPBP/R1B2RK1 b k - 2 13",
            id: "NQoaKm4k",
            uci: "d1a4",
            san: "Qa4+",
            eval: {
                cp: 76,
                depth: 23,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 26,
            fen: "1n1qkb1r/rp2pppp/p1b2n2/P1p5/Q1p5/N4NP1/1P1PPPBP/R1B2RK1 w k - 3 14",
            id: "OHu0Twuh",
            uci: "d5c6",
            san: "Bc6",
            eval: {
                cp: 90,
                depth: 24,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 27,
            fen: "1n1qkb1r/rp2pppp/p1b2n2/P1p5/2Q5/N4NP1/1P1PPPBP/R1B2RK1 b k - 0 14",
            id: "ZxVy9R77",
            uci: "a4c4",
            san: "Qxc4",
            eval: {
                cp: 79,
                depth: 25,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 28,
            fen: "1n1qkb1r/rp3ppp/p1b1pn2/P1p5/2Q5/N4NP1/1P1PPPBP/R1B2RK1 w k - 0 15",
            id: "183GOm0L",
            uci: "e7e6",
            san: "e6",
            eval: {
                cp: 98,
                depth: 24,
                time: 4012,
                by: "offline"
            }
        },
        {
            ply: 29,
            fen: "1n1qkb1r/rp3ppp/p1b1pn2/P1p5/2QP4/N4NP1/1P2PPBP/R1B2RK1 b k - 0 15",
            id: "AJPhiiqb",
            uci: "d2d4",
            san: "d4",
            eval: {
                cp: 81,
                depth: 23,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 30,
            fen: "3qkb1r/rp1n1ppp/p1b1pn2/P1p5/2QP4/N4NP1/1P2PPBP/R1B2RK1 w k - 1 16",
            id: "MGbhU8D9",
            uci: "b8d7",
            san: "Nbd7",
            eval: {
                cp: 82,
                best: "Qxa5",
                variation: "Qxa5 dxc5",
                depth: 20,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 31,
            fen: "3qkb1r/rp1n1ppp/p1b1pn2/P1p1N3/2QP4/N5P1/1P2PPBP/R1B2RK1 b k - 2 16",
            id: "gmZG/Ue+",
            uci: "f3e5",
            san: "Ne5",
            eval: {
                cp: 74,
                depth: 20,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 32,
            fen: "3qkb1r/rp1n1ppp/p3pn2/P1p1N3/2QP4/N5P1/1P2PPbP/R1B2RK1 w k - 0 17",
            id: "VELmFCbC",
            uci: "c6g2",
            san: "Bxg2",
            eval: {
                cp: 95,
                depth: 23,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 33,
            fen: "3qkb1r/rp1n1ppp/p3pn2/P1p1N3/2QP4/N5P1/1P2PPKP/R1B2R2 b k - 0 17",
            id: "K7vIyzrq",
            uci: "g1g2",
            san: "Kxg2",
            eval: {
                cp: 80,
                depth: 26,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 34,
            fen: "3qkb1r/rp1n1ppp/p3pn2/P3N3/2Qp4/N5P1/1P2PPKP/R1B2R2 w k - 0 18",
            id: "cpqIA7FR",
            uci: "c5d4",
            san: "cxd4",
            eval: {
                cp: 85,
                depth: 24,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 35,
            fen: "3qkb1r/rp1n1ppp/p3pn2/P3N3/2Qp1B2/N5P1/1P2PPKP/R4R2 b k - 1 18",
            id: "5TQDTk08",
            uci: "c1f4",
            san: "Bf4",
            eval: {
                cp: 85,
                depth: 23,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 36,
            fen: "r2qkb1r/1p1n1ppp/p3pn2/P3N3/2Qp1B2/N5P1/1P2PPKP/R4R2 w k - 2 19",
            id: "bjRYoLh8",
            uci: "a7a8",
            san: "Ra8",
            eval: {
                cp: 91,
                depth: 23,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 37,
            fen: "r2qkb1r/1p1n1ppp/p3pn2/P3N3/2Qp1B2/N5P1/1P2PPKP/R2R4 b k - 3 19",
            id: "uplzjBea",
            uci: "f1d1",
            san: "Rfd1",
            eval: {
                cp: 77,
                depth: 24,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 38,
            fen: "r2qk2r/1p1n1ppp/p3pn2/P1b1N3/2Qp1B2/N5P1/1P2PPKP/R2R4 w k - 4 20",
            id: "h8wH/w6K",
            uci: "f8c5",
            san: "Bc5",
            eval: {
                cp: 68,
                depth: 24,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 39,
            fen: "r2qk2r/1p1n1ppp/p3pn2/P1b1N3/2Qp1B2/6P1/1PN1PPKP/R2R4 b k - 5 20",
            id: "iiGYM1LZ",
            uci: "a3c2",
            san: "Nc2",
            eval: {
                cp: 84,
                depth: 25,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 40,
            fen: "r2q1rk1/1p1n1ppp/p3pn2/P1b1N3/2Qp1B2/6P1/1PN1PPKP/R2R4 w - - 6 21",
            id: "P/MIs5FC",
            uci: "e8g8",
            san: "O-O",
            eval: {
                cp: 49,
                best: "b5",
                variation: "b5",
                depth: 24,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 41,
            fen: "r2q1rk1/1p1N1ppp/p3pn2/P1b5/2Qp1B2/6P1/1PN1PPKP/R2R4 b - - 0 21",
            id: "PB70pb6p",
            uci: "e5d7",
            san: "Nxd7",
            eval: {
                cp: 84,
                best: "Nxd4",
                variation: "Nxd4 b5",
                depth: 25,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 42,
            fen: "r4rk1/1p1q1ppp/p3pn2/P1b5/2Qp1B2/6P1/1PN1PPKP/R2R4 w - - 0 22",
            id: "df6SU4HM",
            uci: "d8d7",
            san: "Qxd7",
            eval: {
                cp: 65,
                best: "Nxd7",
                variation: "Nxd7 Nxd4 b5 axb6 Qxb6 Nb3 Qb7+ f3 Bb6 Qb4 Nf6 e4 Rfc8 Na5",
                depth: 23,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 43,
            fen: "r4rk1/1p1q1ppp/p3pn2/P1Q5/3p1B2/6P1/1PN1PPKP/R2R4 b - - 0 22",
            id: "hg0yCXIb",
            uci: "c4c5",
            san: "Qxc5",
            eval: {
                cp: 84,
                depth: 27,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 44,
            fen: "r1r3k1/1p1q1ppp/p3pn2/P1Q5/3p1B2/6P1/1PN1PPKP/R2R4 w - - 1 23",
            id: "nty92SJ+",
            uci: "f8c8",
            san: "Rfc8",
            eval: {
                cp: 81,
                depth: 26,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 45,
            fen: "r1r3k1/1p1q1ppp/p3pn2/P7/3Q1B2/6P1/1PN1PPKP/R2R4 b - - 0 23",
            id: "gOpc5nhL",
            uci: "c5d4",
            san: "Qxd4",
            eval: {
                cp: 92,
                depth: 26,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 46,
            fen: "r1r3k1/1p3ppp/p1q1pn2/P7/3Q1B2/6P1/1PN1PPKP/R2R4 w - - 1 24",
            id: "k/RUvcy7",
            uci: "d7c6",
            san: "Qc6+",
            eval: {
                cp: 80,
                depth: 24,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 47,
            fen: "r1r3k1/1p3ppp/p1q1pn2/P7/3Q1B2/5PP1/1PN1P1KP/R2R4 b - - 0 24",
            id: "USeb39YF",
            uci: "f2f3",
            san: "f3",
            eval: {
                cp: 62,
                depth: 25,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 48,
            fen: "r1r3k1/1p3ppp/p3pn2/P7/3Q1B2/5PP1/1Pq1P1KP/R2R4 w - - 0 25",
            id: "b97J6b7X",
            uci: "c6c2",
            san: "Qxc2",
            eval: {
                cp: 72,
                depth: 26,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 49,
            fen: "r1r3k1/1p3ppp/p3pn2/P7/3Q1B2/5PP1/1PqRP1KP/R7 b - - 1 25",
            id: "WPjfO/vK",
            uci: "d1d2",
            san: "Rd2",
            eval: {
                cp: 87,
                depth: 24,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 50,
            fen: "r1r3k1/1p3ppp/p3pn2/P7/2qQ1B2/5PP1/1P1RP1KP/R7 w - - 2 26",
            id: "b7JCh2G/",
            uci: "c2c4",
            san: "Qc4",
            eval: {
                cp: 75,
                best: "Qc5",
                variation: "Qc5 Be5",
                depth: 22,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 51,
            fen: "r1r3k1/1p3ppp/p3pn2/P7/2Q2B2/5PP1/1P1RP1KP/R7 b - - 0 26",
            id: "ZBfl5f2i",
            uci: "d4c4",
            san: "Qxc4",
            eval: {
                cp: 82,
                best: "Be5",
                variation: "Be5 Qxd4 Bxd4 Rc7 Rad1 Rd8 Kf2 Rcd7 Ke1 Ne8 Bf2 Rxd2 Rxd2 Rxd2",
                depth: 25,
                time: 4005,
                by: "offline"
            }
        },
        {
            ply: 52,
            fen: "r5k1/1p3ppp/p3pn2/P7/2r2B2/5PP1/1P1RP1KP/R7 w - - 0 27",
            id: "zLnYHHCn",
            uci: "c8c4",
            san: "Rxc4",
            eval: {
                cp: 81,
                depth: 28,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 53,
            fen: "r5k1/1p3ppp/p3pn2/P7/2r1PB2/5PP1/1P1R2KP/R7 b - - 0 27",
            id: "5pA7HSDX",
            uci: "e2e4",
            san: "e4",
            eval: {
                cp: 64,
                depth: 27,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 54,
            fen: "2r3k1/1p3ppp/p3pn2/P7/2r1PB2/5PP1/1P1R2KP/R7 w - - 1 28",
            id: "8eYcI7VP",
            uci: "a8c8",
            san: "Rac8",
            eval: {
                cp: 79,
                depth: 24,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 55,
            fen: "2r3k1/1p3ppp/p3pn2/P3B3/2r1P3/5PP1/1P1R2KP/R7 b - - 2 28",
            id: "2NWSWj79",
            uci: "f4e5",
            san: "Be5",
            eval: {
                cp: 63,
                best: "Kf2",
                variation: "Kf2 Rc2 Rd1 Kf8 Ke3 Rxd2 Rxd2 Ke7 Bd6+ Ke8 Be5 Rc5 Bc3 Nd7",
                depth: 21,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 56,
            fen: "2r2k2/1p3ppp/p3pn2/P3B3/2r1P3/5PP1/1P1R2KP/R7 w - - 3 29",
            id: "QOLAtmVo",
            uci: "g8f8",
            san: "Kf8",
            eval: {
                cp: 63,
                depth: 24,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 57,
            fen: "2r2k2/1p3ppp/p3pn2/P3B3/2r1P3/5PP1/1P1R2KP/3R4 b - - 4 29",
            id: "KHn1/yGg",
            uci: "a1d1",
            san: "Rad1",
            eval: {
                cp: 77,
                best: "Bc3",
                variation: "Bc3 h5 Kf2 Ke7 Ra3 R8c5 Rb3 Rb5 Rxb5 axb5 Ke3 Ne8 Rd4 Rxd4",
                depth: 23,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 58,
            fen: "2r1k3/1p3ppp/p3pn2/P3B3/2r1P3/5PP1/1P1R2KP/3R4 w - - 5 30",
            id: "VAijyjow",
            uci: "f8e8",
            san: "Ke8",
            eval: {
                cp: 64,
                depth: 25,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 59,
            fen: "2r1k3/1p3ppp/p3pn2/P7/2r1P3/2B2PP1/1P1R2KP/3R4 b - - 6 30",
            id: "ld9YrS30",
            uci: "e5c3",
            san: "Bc3",
            eval: {
                cp: 74,
                depth: 28,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 60,
            fen: "2r1k3/1p3ppp/p3pn2/P1r5/4P3/2B2PP1/1P1R2KP/3R4 w - - 7 31",
            id: "NOpANQdk",
            uci: "c4c5",
            san: "R4c5",
            eval: {
                cp: 60,
                depth: 28,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 61,
            fen: "2r1k3/1p3ppp/p3pn2/P1r5/4P3/2B2PP1/1P1R1K1P/3R4 b - - 8 31",
            id: "jO9QlPEz",
            uci: "g2f2",
            san: "Kf2",
            eval: {
                cp: 60,
                best: "h3",
                variation: "h3 Rb5 Kf2 Ke7 Rd4 e5 Rb4 Rxb4 Bxb4+ Ke8 Bc3 Nd7 Ke3 f6",
                depth: 26,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 62,
            fen: "2r1k3/1p3ppp/p3pn2/Pr6/4P3/2B2PP1/1P1R1K1P/3R4 w - - 9 32",
            id: "lIjO8U86",
            uci: "c5b5",
            san: "Rb5",
            eval: {
                cp: 65,
                depth: 24,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 63,
            fen: "2r1k3/1p3ppp/p3pn2/Pr6/4P3/2B1KPP1/1P1R3P/3R4 b - - 10 32",
            id: "JCwk0TrA",
            uci: "f2e3",
            san: "Ke3",
            eval: {
                cp: 68,
                best: "h3",
                variation: "h3 Ke7",
                depth: 23,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 64,
            fen: "2r5/1p2kppp/p3pn2/Pr6/4P3/2B1KPP1/1P1R3P/3R4 w - - 11 33",
            id: "oDdky3G3",
            uci: "e8e7",
            san: "Ke7",
            eval: {
                cp: 50,
                depth: 24,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 65,
            fen: "2r5/1p2kppp/p3pn2/Pr6/3RP3/2B1KPP1/1P5P/3R4 b - - 12 33",
            id: "f3Czq5kv",
            uci: "d2d4",
            san: "Rd4",
            eval: {
                cp: 61,
                best: "h4",
                variation: "h4 h5 Rd4 Ke8 R1d2 g6 Ke2 Ke7 Rd1 Ke8 R1d3 Ke7 Ke3 Ke8",
                depth: 22,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 66,
            fen: "2r5/1p2kp1p/p3pnp1/Pr6/3RP3/2B1KPP1/1P5P/3R4 w - - 0 34",
            id: "c+sDeJTT",
            uci: "g7g6",
            san: "g6",
            eval: {
                cp: 48,
                best: "e5",
                variation: "e5 Rb4 Rcc5 f4 Ng4+ Ke2 Ke8 Rxb5 Rxb5 h3 Nf6 Kf3 exf4 Kxf4",
                depth: 21,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 67,
            fen: "2r5/1p2kp1p/p3pnp1/Pr6/3RP1P1/2B1KP2/1P5P/3R4 b - - 0 34",
            id: "NTSfLNQr",
            uci: "g3g4",
            san: "g4",
            eval: {
                cp: 69,
                depth: 21,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 68,
            fen: "2r5/1p2kp2/p3pnp1/Pr5p/3RP1P1/2B1KP2/1P5P/3R4 w - - 0 35",
            id: "jBnVFDlS",
            uci: "h7h5",
            san: "h5",
            eval: {
                cp: 75,
                best: "e5",
                variation: "e5",
                depth: 23,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 69,
            fen: "2r5/1p2kp2/p3pnp1/Pr5P/3RP3/2B1KP2/1P5P/3R4 b - - 0 35",
            id: "gN07DBNE",
            uci: "g4h5",
            san: "gxh5",
            eval: {
                cp: 81,
                depth: 26,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 70,
            fen: "2r5/1p2kp2/p3pnp1/P6r/3RP3/2B1KP2/1P5P/3R4 w - - 0 36",
            id: "mGwGxc8b",
            uci: "b5h5",
            san: "Rxh5",
            eval: {
                cp: 65,
                depth: 27,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 71,
            fen: "2r5/1p2kp2/p3pnp1/P6r/1R2P3/2B1KP2/1P5P/3R4 b - - 1 36",
            id: "2fc80kUY",
            uci: "d4b4",
            san: "Rb4",
            eval: {
                cp: 64,
                depth: 25,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 72,
            fen: "8/1pr1kp2/p3pnp1/P6r/1R2P3/2B1KP2/1P5P/3R4 w - - 2 37",
            id: "sikj1P3",
            uci: "c8c7",
            san: "Rc7",
            eval: {
                cp: 90,
                depth: 26,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 73,
            fen: "8/1pr1kp2/p3pnp1/P6r/4P3/1RB1KP2/1P5P/3R4 b - - 3 37",
            id: "l01zJzN8",
            uci: "b4b3",
            san: "Rb3",
            eval: {
                cp: 64,
                depth: 25,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 74,
            fen: "8/1pr1kp2/p3pnp1/P7/4P3/1RB1KP1r/1P5P/3R4 w - - 4 38",
            id: "6IJS1AG4",
            uci: "h5h3",
            san: "Rh3",
            eval: {
                cp: 35,
                depth: 24,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 75,
            fen: "8/1pr1kp2/p3pnp1/P7/4PK2/1RB2P1r/1P5P/3R4 b - - 5 38",
            id: "1TBMo7UT",
            uci: "e3f4",
            san: "Kf4",
            eval: {
                cp: 75,
                depth: 29,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 76,
            fen: "8/1prnkp2/p3p1p1/P7/4PK2/1RB2P1r/1P5P/3R4 w - - 6 39",
            id: "9xIrYng9",
            uci: "f6d7",
            san: "Nd7",
            eval: {
                cp: 77,
                depth: 27,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 77,
            fen: "8/1prnkp2/p3p1p1/P7/1B2PK2/1R3P1r/1P5P/3R4 b - - 7 39",
            id: "gf25jGrB",
            uci: "c3b4",
            san: "Bb4+",
            eval: {
                cp: 35,
                depth: 30,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 78,
            fen: "8/1prn1p2/p3pkp1/P7/1B2PK2/1R3P1r/1P5P/3R4 w - - 8 40",
            id: "VhBdAe+w",
            uci: "e7f6",
            san: "Kf6",
            eval: {
                cp: 36,
                depth: 31,
                time: 4007,
                by: "offline"
            }
        },
        {
            ply: 79,
            fen: "8/1prn1p2/p2Bpkp1/P7/4PK2/1R3P1r/1P5P/3R4 b - - 9 40",
            id: "vQ01iL5Y",
            uci: "b4d6",
            san: "Bd6",
            eval: {
                cp: 35,
                depth: 32,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 80,
            fen: "8/1prn1p2/p2Bpk2/P5p1/4PK2/1R3P1r/1P5P/3R4 w - - 0 41",
            id: "tWuUP47S",
            uci: "g6g5",
            san: "g5+",
            eval: {
                cp: 35,
                depth: 29,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 81,
            fen: "8/1prn1p2/p2Bpk2/P5p1/4P1K1/1R3P1r/1P5P/3R4 b - - 1 41",
            id: "6GxB9OOd",
            uci: "f4g4",
            san: "Kg4",
            eval: {
                cp: 51,
                depth: 31,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 82,
            fen: "8/1prn1p2/p2Bpk2/P5p1/4P1Kr/1R3P2/1P5P/3R4 w - - 2 42",
            id: "DN10JO62",
            uci: "h3h4",
            san: "Rh4+",
            eval: {
                cp: 51,
                depth: 30,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 83,
            fen: "8/1prn1p2/p2Bpk2/P5p1/4P2r/1R3PK1/1P5P/3R4 b - - 3 42",
            id: "MvYxthkm",
            uci: "g4g3",
            san: "Kg3",
            eval: {
                cp: 60,
                depth: 31,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 84,
            fen: "8/1p1n1p2/p2Bpk2/P5p1/4P2r/1R3PK1/1Pr4P/3R4 w - - 4 43",
            id: "F4WOLBce",
            uci: "c7c2",
            san: "Rc2",
            eval: {
                cp: 45,
                depth: 30,
                time: 4015,
                by: "offline"
            }
        },
        {
            ply: 85,
            fen: "8/1p1n1p2/p2Bpk2/P5p1/4P2r/1R3PKP/1Pr5/3R4 b - - 0 43",
            id: "IGm4zoNf",
            uci: "h2h3",
            san: "h3",
            eval: {
                cp: 76,
                depth: 29,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 86,
            fen: "8/1p1n1p2/p2Bp1k1/P5p1/4P2r/1R3PKP/1Pr5/3R4 w - - 1 44",
            id: "NGOBfN9j",
            uci: "f6g6",
            san: "Kg6",
            eval: {
                cp: 32,
                depth: 32,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 87,
            fen: "8/1p1nBp2/p3p1k1/P5p1/4P2r/1R3PKP/1Pr5/3R4 b - - 2 44",
            id: "x3e74lPU",
            uci: "d6e7",
            san: "Be7",
            eval: {
                cp: 32,
                depth: 30,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 88,
            fen: "8/1p2Bp2/p3p1k1/P3n1p1/4P2r/1R3PKP/1Pr5/3R4 w - - 3 45",
            id: "QlyBCTx8",
            uci: "d7e5",
            san: "Ne5",
            eval: {
                cp: 30,
                depth: 31,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 89,
            fen: "3R4/1p2Bp2/p3p1k1/P3n1p1/4P2r/1R3PKP/1Pr5/8 b - - 4 45",
            id: "vCUfCIfD",
            uci: "d1d8",
            san: "Rd8",
            eval: {
                cp: 29,
                depth: 30,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 90,
            fen: "3R4/1p2B3/p3ppk1/P3n1p1/4P2r/1R3PKP/1Pr5/8 w - - 0 46",
            id: "o/Y+z2GP",
            uci: "f7f6",
            san: "f6",
            eval: {
                cp: 35,
                depth: 29,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 91,
            fen: "3R4/1R2B3/p3ppk1/P3n1p1/4P2r/5PKP/1Pr5/8 b - - 0 46",
            id: "bxbRnkBm",
            uci: "b3b7",
            san: "Rxb7",
            eval: {
                cp: 76,
                best: "Bd6",
                variation: "Bd6 Nc6 Rg8+ Kh7 Rf8 Nxa5 Rb6 Rc6 Rxc6 Nxc6 Rxf6 Kg7 Rf8 Rh7",
                depth: 25,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 92,
            fen: "3R4/1R2B3/p3ppk1/P3n1p1/4Pr2/5PKP/1Pr5/8 w - - 1 47",
            id: "fpUxt/ss",
            uci: "h4f4",
            san: "Rf4",
            eval: {
                cp: 29,
                depth: 33,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 93,
            fen: "3R4/4B3/p3ppk1/P3n1p1/4Pr2/1R3PKP/1Pr5/8 b - - 2 47",
            id: "B8VGlJC6",
            uci: "b7b3",
            san: "Rb3",
            eval: {
                cp: 29,
                depth: 35,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 94,
            fen: "3R4/4B3/p1n1ppk1/P5p1/4Pr2/1R3PKP/1Pr5/8 w - - 3 48",
            id: "v6XywWwf",
            uci: "e5c6",
            san: "Nc6",
            eval: {
                cp: 30,
                depth: 34,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 95,
            fen: "2R5/4B3/p1n1ppk1/P5p1/4Pr2/1R3PKP/1Pr5/8 b - - 4 48",
            id: "bsr01usN",
            uci: "d8c8",
            san: "Rc8",
            eval: {
                cp: 30,
                depth: 34,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 96,
            fen: "2R5/4B3/p3ppk1/n5p1/4Pr2/1R3PKP/1Pr5/8 w - - 0 49",
            id: "I4rUfYq2",
            uci: "c6a5",
            san: "Nxa5",
            eval: {
                cp: 30,
                depth: 35,
                time: 4029,
                by: "offline"
            }
        },
        {
            ply: 97,
            fen: "2R5/4B3/p3ppk1/n5p1/4Pr2/2R2PKP/1Pr5/8 b - - 1 49",
            id: "dqVNlFQ4",
            uci: "b3c3",
            san: "Rbc3",
            eval: {
                cp: 29,
                depth: 33,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 98,
            fen: "2R5/4B3/p3ppk1/n5p1/4Pr2/2R2PKP/1r6/8 w - - 0 50",
            id: "3vpL8jUF",
            uci: "c2b2",
            san: "Rxb2",
            eval: {
                cp: 29,
                depth: 33,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 99,
            fen: "2R5/8/p2Bppk1/n5p1/4Pr2/2R2PKP/1r6/8 b - - 1 50",
            id: "irRxyeuR",
            uci: "e7d6",
            san: "Bd6",
            eval: {
                cp: 29,
                depth: 31,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 100,
            fen: "2R5/8/p2B1pk1/n3p1p1/4Pr2/2R2PKP/1r6/8 w - - 0 51",
            id: "DzGqBJXa",
            uci: "e6e5",
            san: "e5",
            eval: {
                cp: 29,
                depth: 31,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 101,
            fen: "2R5/2R5/p2B1pk1/n3p1p1/4Pr2/5PKP/1r6/8 b - - 1 51",
            id: "TvOx9pQ/",
            uci: "c3c7",
            san: "R3c7",
            eval: {
                cp: 46,
                depth: 30,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 102,
            fen: "2R5/1rR5/p2B1pk1/n3p1p1/4Pr2/5PKP/8/8 w - - 2 52",
            id: "vzwBMuho",
            uci: "b2b7",
            san: "Rb7",
            eval: {
                cp: 61,
                depth: 31,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 103,
            fen: "2R5/1R6/p2B1pk1/n3p1p1/4Pr2/5PKP/8/8 b - - 0 52",
            id: "KGZr2rCc",
            uci: "c7b7",
            san: "Rxb7",
            eval: {
                cp: 51,
                depth: 30,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 104,
            fen: "2R5/1n6/p2B1pk1/4p1p1/4Pr2/5PKP/8/8 w - - 0 53",
            id: "F+n1aNL",
            uci: "a5b7",
            san: "Nxb7",
            eval: {
                cp: 63,
                depth: 34,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 105,
            fen: "2R5/1n2B3/p4pk1/4p1p1/4Pr2/5PKP/8/8 b - - 1 53",
            id: "TKofnRSc",
            uci: "d6e7",
            san: "Be7",
            eval: {
                cp: 29,
                depth: 31,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 106,
            fen: "2R5/4B3/p4pk1/n3p1p1/4Pr2/5PKP/8/8 w - - 2 54",
            id: "KIo9xb4H",
            uci: "b7a5",
            san: "Na5",
            eval: {
                cp: 29,
                depth: 33,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 107,
            fen: "8/4B3/p4pk1/n3p1p1/4Pr2/2R2PKP/8/8 b - - 3 54",
            id: "1EnENSsZ",
            uci: "c8c3",
            san: "Rc3",
            eval: {
                cp: 29,
                depth: 33,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 108,
            fen: "8/4B3/p4p2/n3p1pk/4Pr2/2R2PKP/8/8 w - - 4 55",
            id: "VW9RkfZY",
            uci: "g6h5",
            san: "Kh5",
            eval: {
                cp: 29,
                depth: 32,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 109,
            fen: "8/4B3/p4p2/n3p1pk/4Pr2/2R2P1P/6K1/8 b - - 5 55",
            id: "fkRGC/9h",
            uci: "g3g2",
            san: "Kg2",
            eval: {
                cp: 29,
                depth: 30,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 110,
            fen: "8/4B3/p7/n3pppk/4Pr2/2R2P1P/6K1/8 w - - 0 56",
            id: "Jnvvj7HL",
            uci: "f6f5",
            san: "f5",
            eval: {
                cp: 29,
                depth: 32,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 111,
            fen: "8/8/p7/n3pppk/1B2Pr2/2R2P1P/6K1/8 b - - 1 56",
            id: "I11VJ7UM",
            uci: "e7b4",
            san: "Bb4",
            eval: {
                cp: 30,
                depth: 35,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 112,
            fen: "8/1n6/p7/4pppk/1B2Pr2/2R2P1P/6K1/8 w - - 2 57",
            id: "bCZpB13Y",
            uci: "a5b7",
            san: "Nb7",
            eval: {
                cp: 30,
                depth: 34,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 113,
            fen: "8/1nR5/p7/4pppk/1B2Pr2/5P1P/6K1/8 b - - 3 57",
            id: "Zi8l8+/M",
            uci: "c3c7",
            san: "Rc7",
            eval: {
                cp: 30,
                depth: 34,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 114,
            fen: "3n4/2R5/p7/4pppk/1B2Pr2/5P1P/6K1/8 w - - 4 58",
            id: "1udDGST1",
            uci: "b7d8",
            san: "Nd8",
            eval: {
                cp: 30,
                depth: 32,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 115,
            fen: "3n4/2R5/p7/4pppk/4Pr2/5P1P/3B2K1/8 b - - 5 58",
            id: "jpoY+gm4",
            uci: "b4d2",
            san: "Bd2",
            eval: {
                cp: 30,
                depth: 31,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 116,
            fen: "8/2R5/p3n3/4pppk/4Pr2/5P1P/3B2K1/8 w - - 6 59",
            id: "OMMxnBrI",
            uci: "d8e6",
            san: "Ne6",
            eval: {
                cp: 30,
                best: "fxe4",
                variation: "fxe4 Bxf4 exf3+ Kxf3 exf4 Re7 Nc6 Rh7+ Kg6 Rc7 Ne5+ Ke4 Nf7 Rc6+",
                depth: 29,
                time: 4002,
                by: "offline"
            },
            comments: [
                {
                    name: "Inaccuracy",
                    comment: "Mistake. Best mowe was fxe4"
                }
            ],
            glyphs: [
                {
                    name: "Mistake",
                    symbol: "?"
                }
            ]
        },
        {
            ply: 117,
            fen: "8/4R3/p3n3/4pppk/4Pr2/5P1P/3B2K1/8 b - - 7 59",
            id: "7VvbtkWC",
            uci: "c7e7",
            san: "Re7",
            eval: {
                cp: 94,
                depth: 36,
                time: 4003,
                by: "offline"
            }
        },
        {
            ply: 118,
            fen: "8/4R3/p3n3/4p1pk/4pr2/5P1P/3B2K1/8 w - - 0 60",
            id: "EWHJ8HxQ",
            uci: "f5e4",
            san: "fxe4",
            eval: {
                cp: 92,
                depth: 40,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 119,
            fen: "8/8/p3R3/4p1pk/4pr2/5P1P/3B2K1/8 b - - 0 60",
            id: "b0uYMGmo",
            uci: "e7e6",
            san: "Rxe6",
            eval: {
                cp: 84,
                depth: 41,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 120,
            fen: "8/8/p3R3/4p1pk/5r2/5p1P/3B2K1/8 w - - 0 61",
            id: "Yg79fTdt",
            uci: "e4f3",
            san: "exf3+",
            eval: {
                cp: 84,
                depth: 41,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 121,
            fen: "8/8/p3R3/4p1pk/5r2/5p1P/3B1K2/8 b - - 1 61",
            id: "dXjjGQZu",
            uci: "g2f2",
            san: "Kf2",
            eval: {
                cp: 84,
                depth: 39,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 122,
            fen: "8/8/p3R3/4p1pk/7r/5p1P/3B1K2/8 w - - 2 62",
            id: "npU0VrtT",
            uci: "f4h4",
            san: "Rh4",
            eval: {
                cp: 84,
                depth: 37,
                time: 4002,
                by: "offline"
            }
        },
        {
            ply: 123,
            fen: "8/8/p7/4R1pk/7r/5p1P/3B1K2/8 b - - 0 62",
            id: "KYzBaWpq",
            uci: "e6e5",
            san: "Rxe5",
            eval: {
                cp: 84,
                depth: 35,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 124,
            fen: "8/8/p7/4R1pk/8/5p1r/3B1K2/8 w - - 0 63",
            id: "iBkVUVh4",
            uci: "h4h3",
            san: "Rxh3",
            eval: {
                cp: 84,
                depth: 36,
                time: 4001,
                by: "offline"
            }
        },
        {
            ply: 125,
            fen: "8/8/p7/6Rk/8/5p1r/3B1K2/8 b - - 0 63",
            id: "qcwRmlod",
            uci: "e5g5",
            san: "Rxg5+",
            eval: {
                cp: 91,
                depth: 30,
                time: 4002,
                by: "offline"
            }
        }
    ],
    finalFen: "8/8/p7/6Rk/8/5p1r/3B1K2/8 b - - 0 64",
    pgn: "[Event \"'Личный чемпионат сайта по адвансу - 2018', финал\"]\n[Site \"https://www.chess-online.com/7782247\"]\n[Date \"2020.02.10\"]\n[Round \"?\"]\n[White \"AHDPEI\"]\n[Black \"Sheldon\"]\n[Result \"1/2-1/2\"]\n[WhiteUSCF \"1653\"]\n[BlackUSCF \"1598\"]\n[ECO \"A05\"]\n[EventDate \"2019.04.02\"]\n[Termination \"normal\"]\n\n1. Nf3 Nf6 2. g3 d5 3. Bg2 c5 4. O-O a6 5. c4 dxc4 6. Ne5 Ra7 7. a4 Qd4 8. Nf3\nQd8 9. Na3 Be6 10. Ne5 Qd4 11. Nf3 Qd8 12. a5 Bd5 13. Qa4+ Bc6 14. Qxc4 e6 15.\nd4 Nbd7 16. Ne5 Bxg2 17. Kxg2 cxd4 18. Bf4 Ra8 19. Rfd1 Bc5 20. Nc2 O-O 21. Nxd7\nQxd7 22. Qxc5 Rfc8 23. Qxd4 Qc6+ 24. f3 Qxc2 25. Rd2 Qc4 26. Qxc4 Rxc4 27. e4\nRac8 28. Be5 Kf8 29. Rad1 Ke8 30. Bc3 R4c5 31. Kf2 Rb5 32. Ke3 Ke7 33. Rd4 g6\n34. g4 h5 35. gxh5 Rxh5 36. Rb4 Rc7 37. Rb3 Rh3 38. Kf4 Nd7 39. Bb4+ Kf6 40. Bd6\ng5+ 41. Kg4 Rh4+ 42. Kg3 Rc2 43. h3 Kg6 44. Be7 Ne5 45. Rd8 f6 46. Rxb7 Rf4 47.\nRb3 Nc6 48. Rc8 Nxa5 49. Rbc3 Rxb2 50. Bd6 e5 51. R3c7 Rb7 52. Rxb7 Nxb7 53. Be7\nNa5 54. Rc3 Kh5 55. Kg2 f5 56. Bb4 Nb7 57. Rc7 Nd8 58. Bd2 Ne6 59. Re7 fxe4 60.\nRxe6 exf3+ 61. Kf2 Rh4 62. Rxe5 Rxh3 63. Rxg5+ 1/2-1/2\n"
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
    "correspondence": {
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

const dataWatchNonStdWhite = {
    game: {
        id: 7826579,
        load: false,
        insite: true,
        variant: {
            key: "standard",
            name: "Standard",
            shortName: "Std"
        },
        speed: "correspondence",
        perf: "main",
        rated: true,
        initialFen: "r1bqkb1r/pp3ppp/2np1n2/4p3/3NP3/2N5/PPP1BPPP/R1BQK2R w KQkq - 0 7",
        fen: "r1bqkb1r/pp3ppp/2np1n2/4p3/3NP3/2N5/PPP1BPPP/R1BQK2R w KQkq - 0 7",
        player: "white",
        turns: 0,
        startedAtTurn: 12,
        status: {
            name: "resign",
            result: 1,
            result_name: "соперник сдался"
        },
        event: "Шахматные звёзды. Андерсен vs Шахматные звёзды. Болеславский",
        tournamentId: 25240,
        createdAt: 1599569419403,
        createdBy: 4,
        private: false,
        advance: false,
        winner: "white",
        lastMove: "c6d7",
        moveCentis: [
            0,
            0,
            4379439,
            69009223,
            539483,
            115139,
            161931,
            801005,
            354031,
            1990788,
            1535211,
            1523073,
            468133,
            2460409,
            16585806,
            2005157,
            3160544,
            421093,
            296238,
            18701394,
            26116213,
            8829273,
            213939,
            458434,
            3019467,
            2639381,
            209382,
            16356115,
            2593851,
            1171596,
            324925,
            1523065,
            2305655,
            16423678,
            30543705,
            8021638,
            1343839,
            328527,
            321344,
            88050762,
            14759698,
            16746379,
            481797,
            14848653,
            24925134,
            9095001,
            270214,
            169240,
            580571,
            13118435,
            464798,
            2069264,
            1843177,
            32589495,
            26778571,
            5500894,
            1062224,
            2622197,
            2380919,
            735237,
            798056,
            166592,
            168336,
            377494,
            14237,
            29477,
            110244,
            304950,
            454923,
            2331925,
            607960,
            908260,
            810149,
            1937319,
            146311,
            78802,
            728677,
            101816,
            232173,
            914132,
            2188006,
            776617,
            704943,
            1966166,
            22000251,
            172673,
            244860,
            82876,
            47159,
            83006,
            131385,
            74047,
            58369,
            221351,
            100235,
            167421,
            259777,
            202876,
            38151,
            66495,
            29755,
            28341,
            28752,
            11353,
            7996,
            9950,
            25706,
            11935,
            34371,
            7995,
            50816,
            5687,
            9875,
            5253,
            6936,
            15196,
            6508,
            4866,
            12701,
            9029,
            17507,
            20667,
            0
        ],
        opening: {
            code: "A00",
            name: "Start position"
        }
    },
    tournament: {
        id: 25240,
        name: "Шахматные звёзды. Андерсен vs Шахматные звёзды. Болеславский",
        running: false
    },
    correspondence: {
        limit: "24 дня/партия б/о",
        can_pause: false,
        parts: [
            {
                per: "game",
                initial: 1036800000,
                increment: 0,
                min: 0
            }
        ],
        white: 0,
        black: 0,
        totalTime: 550208000,
        lastMoveAt: 1600119627979,
        serverNow: 1607449388731
    },
    player: {
        color: "white",
        name: "serg652008",
        user: {
            id: 55407,
            name: "serg652008",
            display: "Sergej_Semenov",
            online: "12h",
            perfs: {
                main: {
                    games: 407,
                    rating: 1621,
                    avg: 1633
                }
            },
            language: "ru-RU",
            profile: {
                country: "RU"
            },
            patron: "base",
            status: "base",
            title: ""
        },
        rating: 1639,
        ratingDiff: 15.15
    },
    opponent: {
        color: "black",
        name: "Alexandr2011",
        user: {
            id: 197518,
            name: "Alexandr2011",
            display: "Гусев Александр",
            online: "12h",
            perfs: {
                main: {
                    games: 991,
                    rating: 1528,
                    avg: 1587
                }
            },
            language: "ru-RU",
            profile: {
                country: "RU"
            },
            patron: "bronze",
            status: "bronze",
            title: ""
        },
        rating: 1621,
        ratingDiff: -15.15
    },
    orientation: "white",
    analysis: {
        state: "unanalysed"
    },
    treeParts: [
        {
            ply: 12,
            fen: "r1bqkb1r/pp3ppp/2np1n2/4p3/3NP3/2N5/PPP1BPPP/R1BQK2R w KQkq -"
        },
        {
            ply: 13,
            fen: "r1bqkb1r/pp3ppp/2np1n2/4pN2/4P3/2N5/PPP1BPPP/R1BQK2R b KQkq - 1 7",
            id: "BzMYYqD4",
            uci: "d4f5",
            san: "Nf5"
        },
        {
            ply: 14,
            fen: "r1bqkb1r/pp3ppp/2np4/4pN2/4n3/2N5/PPP1BPPP/R1BQK2R w KQkq - 0 8",
            id: "yw8+ApCe",
            uci: "f6e4",
            san: "Nxe4"
        },
        {
            ply: 15,
            fen: "r1bqkb1r/pp3pNp/2np4/4p3/4n3/2N5/PPP1BPPP/R1BQK2R b KQkq - 0 8",
            id: "VWUv0CTk",
            uci: "f5g7",
            san: "Nxg7+"
        },
        {
            ply: 16,
            fen: "r1bqk2r/pp3pbp/2np4/4p3/4n3/2N5/PPP1BPPP/R1BQK2R w KQkq - 0 9",
            id: "3Qe+vU5G",
            uci: "f8g7",
            san: "Bxg7"
        },
        {
            ply: 17,
            fen: "r1bqk2r/pp3pbp/2np4/4p3/4N3/8/PPP1BPPP/R1BQK2R b KQkq - 0 9",
            id: "+O5YmD//",
            uci: "c3e4",
            san: "Nxe4"
        },
        {
            ply: 18,
            fen: "r1bqk2r/pp3pbp/2n5/3pp3/4N3/8/PPP1BPPP/R1BQK2R w KQkq - 0 10",
            id: "UlY54es5",
            uci: "d6d5",
            san: "d5"
        },
        {
            ply: 19,
            fen: "r1bqk2r/pp3pbp/2n5/3pp3/8/2N5/PPP1BPPP/R1BQK2R b KQkq - 1 10",
            id: "Zc7aok9L",
            uci: "e4c3",
            san: "Nc3"
        },
        {
            ply: 20,
            fen: "r1bqk2r/pp3pbp/2n5/4p3/3p4/2N5/PPP1BPPP/R1BQK2R w KQkq - 0 11",
            id: "v5pBBPjc",
            uci: "d5d4",
            san: "d4"
        },
        {
            ply: 21,
            fen: "r1bqk2r/pp3pbp/2n5/4p3/3pN3/8/PPP1BPPP/R1BQK2R b KQkq - 1 11",
            id: "IHJATZmj",
            uci: "c3e4",
            san: "Ne4"
        },
        {
            ply: 22,
            fen: "r2qk2r/pp3pbp/2n5/4pb2/3pN3/8/PPP1BPPP/R1BQK2R w KQkq - 2 12",
            id: "akq0Lybt",
            uci: "c8f5",
            san: "Bf5"
        },
        {
            ply: 23,
            fen: "r2qk2r/pp3pbp/2n5/4pb2/3pN3/3B4/PPP2PPP/R1BQK2R b KQkq - 3 12",
            id: "3zJp0AgL",
            uci: "e2d3",
            san: "Bd3"
        },
        {
            ply: 24,
            fen: "r2qk2r/pp3pbp/2n3b1/4p3/3pN3/3B4/PPP2PPP/R1BQK2R w KQkq - 4 13",
            id: "dPW3FwiP",
            uci: "f5g6",
            san: "Bg6"
        },
        {
            ply: 25,
            fen: "r2qk2r/pp3pbp/2n3b1/4p3/3pN3/3B4/PPP2PPP/R1BQ1RK1 b kq - 5 13",
            id: "MgX4U3/v",
            uci: "e1g1",
            san: "O-O"
        },
        {
            ply: 26,
            fen: "r3k2r/pp3pbp/2n3b1/3qp3/3pN3/3B4/PPP2PPP/R1BQ1RK1 w kq - 6 14",
            id: "IUbQmxvp",
            uci: "d8d5",
            san: "Qd5"
        },
        {
            ply: 27,
            fen: "r3k2r/pp3pbp/2n3b1/3qp3/3pN3/3B4/PPP2PPP/R1BQR1K1 b kq - 7 14",
            id: "ltysqC77",
            uci: "f1e1",
            san: "Re1"
        },
        {
            ply: 28,
            fen: "r3k2r/pp4bp/2n3b1/3qpp2/3pN3/3B4/PPP2PPP/R1BQR1K1 w kq - 0 15",
            id: "jHuJsoy4",
            uci: "f7f5",
            san: "f5"
        },
        {
            ply: 29,
            fen: "r3k2r/pp4bp/2n3b1/3qpp2/3p4/3B2N1/PPP2PPP/R1BQR1K1 b kq - 1 15",
            id: "nSkjPIud",
            uci: "e4g3",
            san: "Ng3"
        },
        {
            ply: 30,
            fen: "r3k2r/pp4bp/2n3b1/3q1p2/3pp3/3B2N1/PPP2PPP/R1BQR1K1 w kq - 0 16",
            id: "iQY4G6Mc",
            uci: "e5e4",
            san: "e4"
        },
        {
            ply: 31,
            fen: "r3k2r/pp4bp/2n3b1/3q1p2/3pp3/1P1B2N1/P1P2PPP/R1BQR1K1 b kq - 0 16",
            id: "lT+yfM37",
            uci: "b2b3",
            san: "b3"
        },
        {
            ply: 32,
            fen: "2kr3r/pp4bp/2n3b1/3q1p2/3pp3/1P1B2N1/P1P2PPP/R1BQR1K1 w - - 1 17",
            id: "p5YN2/64",
            uci: "e8c8",
            san: "O-O-O"
        },
        {
            ply: 33,
            fen: "2kr3r/pp4bp/2n3b1/3q1p2/2Bpp3/1P4N1/P1P2PPP/R1BQR1K1 b - - 2 17",
            id: "GvtA8xIt",
            uci: "d3c4",
            san: "Bc4"
        },
        {
            ply: 34,
            fen: "2kr3r/pp4bp/2nq2b1/5p2/2Bpp3/1P4N1/P1P2PPP/R1BQR1K1 w - - 3 18",
            id: "/f1pw8qJ",
            uci: "d5d6",
            san: "Qd6"
        },
        {
            ply: 35,
            fen: "2kr3r/pp4bp/2nq2b1/5p2/2Bpp3/1P4N1/PBP2PPP/R2QR1K1 b - - 4 18",
            id: "fu/imfxH",
            uci: "c1b2",
            san: "Bb2"
        },
        {
            ply: 36,
            fen: "2kr3r/pp4b1/2nq2b1/5p1p/2Bpp3/1P4N1/PBP2PPP/R2QR1K1 w - - 0 19",
            id: "4w3dnEJY",
            uci: "h7h5",
            san: "h5"
        },
        {
            ply: 37,
            fen: "2kr3r/pp4b1/2nq2b1/5p1p/2Bpp3/1P6/PBP1NPPP/R2QR1K1 b - - 1 19",
            id: "Vs6PViRv",
            uci: "g3e2",
            san: "Ne2"
        },
        {
            ply: 38,
            fen: "2kr3r/pp4b1/2nq2b1/7p/2Bppp2/1P6/PBP1NPPP/R2QR1K1 w - - 0 20",
            id: "YTbYEmug",
            uci: "f5f4",
            san: "f4"
        },
        {
            ply: 39,
            fen: "2kr3r/pp4b1/2nq2b1/7p/P1Bppp2/1P6/1BP1NPPP/R2QR1K1 b - - 0 20",
            id: "d9McSli4",
            uci: "a2a4",
            san: "a4"
        },
        {
            ply: 40,
            fen: "2kr3r/pp4b1/2nq2b1/8/P1Bppp1p/1P6/1BP1NPPP/R2QR1K1 w - - 0 21",
            id: "xkG9bucU",
            uci: "h5h4",
            san: "h4"
        },
        {
            ply: 41,
            fen: "2kr3r/pp4b1/2nq2b1/8/P1Bppp1p/1P6/1BP2PPP/R1NQR1K1 b - - 1 21",
            id: "AOPzvD1z",
            uci: "e2c1",
            san: "Nc1"
        },
        {
            ply: 42,
            fen: "2kr3r/pp4b1/2nq2b1/8/P1Bppp2/1P5p/1BP2PPP/R1NQR1K1 w - - 0 22",
            id: "dqb2bbmw",
            uci: "h4h3",
            san: "h3"
        },
        {
            ply: 43,
            fen: "2kr3r/pp4b1/2nq2b1/8/P1Bppp2/BP5p/2P2PPP/R1NQR1K1 b - - 1 22",
            id: "h8avKARH",
            uci: "b2a3",
            san: "Ba3"
        },
        {
            ply: 44,
            fen: "2kr3r/pp4b1/2n2qb1/8/P1Bppp2/BP5p/2P2PPP/R1NQR1K1 w - - 2 23",
            id: "qIoLz2jl",
            uci: "d6f6",
            san: "Qf6"
        },
        {
            ply: 45,
            fen: "2kr3r/pp4b1/2n2qb1/8/P1BpppQ1/BP5p/2P2PPP/R1N1R1K1 b - - 3 23",
            id: "51YIGou8",
            uci: "d1g4",
            san: "Qg4+"
        },
        {
            ply: 46,
            fen: "1k1r3r/pp4b1/2n2qb1/8/P1BpppQ1/BP5p/2P2PPP/R1N1R1K1 w - - 4 24",
            id: "E7lCIXKV",
            uci: "c8b8",
            san: "Kb8"
        },
        {
            ply: 47,
            fen: "1k1r3r/pp4b1/2n2qb1/8/P1BpppQ1/BP5p/2P1NPPP/R3R1K1 b - - 5 24",
            id: "FwH5ZN3N",
            uci: "c1e2",
            san: "Ne2"
        },
        {
            ply: 48,
            fen: "1k1r3r/pp4b1/2n2qb1/8/P1Bpp1Q1/BP3p1p/2P1NPPP/R3R1K1 w - - 0 25",
            id: "NegJ+6cw",
            uci: "f4f3",
            san: "f3"
        },
        {
            ply: 49,
            fen: "1k1r3r/pp4b1/2n2qb1/8/P1Bpp1Q1/BP3P1p/2P1NP1P/R3R1K1 b - - 0 25",
            id: "P3P7vazk",
            uci: "g2f3",
            san: "gxf3"
        },
        {
            ply: 50,
            fen: "1k1r3r/pp4b1/5qb1/4n3/P1Bpp1Q1/BP3P1p/2P1NP1P/R3R1K1 w - - 1 26",
            id: "WfqgT9nT",
            uci: "c6e5",
            san: "Ne5"
        },
        {
            ply: 51,
            fen: "1k1r3r/pp4b1/5qb1/4n3/P1BppQ2/BP3P1p/2P1NP1P/R3R1K1 b - - 2 26",
            id: "P96mBNLa",
            uci: "g4f4",
            san: "Qf4"
        },
        {
            ply: 52,
            fen: "1k1r3r/pp4b1/6b1/4n3/P1Bppq2/BP3P1p/2P1NP1P/R3R1K1 w - - 0 27",
            id: "4vvnLUba",
            uci: "f6f4",
            san: "Qxf4"
        },
        {
            ply: 53,
            fen: "1k1r3r/pp4b1/6b1/4n3/P1BppN2/BP3P1p/2P2P1P/R3R1K1 b - - 0 27",
            id: "6nLu4FTP",
            uci: "e2f4",
            san: "Nxf4"
        },
        {
            ply: 54,
            fen: "1k1r3r/pp4b1/6b1/8/P1BppN2/BP3n1p/2P2P1P/R3R1K1 w - - 0 28",
            id: "Trpbj2eW",
            uci: "e5f3",
            san: "Nxf3+"
        },
        {
            ply: 55,
            fen: "1k1r3r/pp4b1/6b1/8/P1BppN2/BP3n1p/2P2P1P/R3R2K b - - 1 28",
            id: "Tt4HdMvV",
            uci: "g1h1",
            san: "Kh1"
        },
        {
            ply: 56,
            fen: "1k1r3r/pp4b1/6b1/8/P1BppN2/BP5p/2P2P1P/R3n2K w - - 0 29",
            id: "AF4rGtZh",
            uci: "f3e1",
            san: "Nxe1"
        },
        {
            ply: 57,
            fen: "1k1r3r/pp4b1/6b1/8/P1BppN2/BP5p/2P2P1P/4R2K b - - 0 29",
            id: "kLdEYrz7",
            uci: "a1e1",
            san: "Rxe1"
        },
        {
            ply: 58,
            fen: "1k1r3r/pp4b1/8/5b2/P1BppN2/BP5p/2P2P1P/4R2K w - - 1 30",
            id: "mfoeangh",
            uci: "g6f5",
            san: "Bf5"
        },
        {
            ply: 59,
            fen: "1k1r3r/pp4b1/4N3/5b2/P1Bpp3/BP5p/2P2P1P/4R2K b - - 2 30",
            id: "ba9QNLjC",
            uci: "f4e6",
            san: "Ne6"
        },
        {
            ply: 60,
            fen: "1k1r3r/pp4b1/4b3/8/P1Bpp3/BP5p/2P2P1P/4R2K w - - 0 31",
            id: "DVpiZRyg",
            uci: "f5e6",
            san: "Bxe6"
        },
        {
            ply: 61,
            fen: "1k1r3r/pp4b1/4B3/8/P2pp3/BP5p/2P2P1P/4R2K b - - 0 31",
            id: "O6NpppeD",
            uci: "c4e6",
            san: "Bxe6"
        },
        {
            ply: 62,
            fen: "1k1r3r/pp4b1/4B3/8/P2p4/BP2p2p/2P2P1P/4R2K w - - 0 32",
            id: "LEazAJnQ",
            uci: "e4e3",
            san: "e3"
        },
        {
            ply: 63,
            fen: "1k1r3r/pp4b1/4B3/8/P2p4/BP2p2p/2P2P1P/4R1K1 b - - 1 32",
            id: "A6b2KlMV",
            uci: "h1g1",
            san: "Kg1"
        },
        {
            ply: 64,
            fen: "1k1r3r/pp4b1/4B3/8/P2p4/BP5p/2P2p1P/4R1K1 w - - 0 33",
            id: "Xu3plocF",
            uci: "e3f2",
            san: "exf2+"
        },
        {
            ply: 65,
            fen: "1k1r3r/pp4b1/4B3/8/P2p4/BP5p/2P2K1P/4R3 b - - 0 33",
            id: "ssaf2/ZQ",
            uci: "g1f2",
            san: "Kxf2"
        },
        {
            ply: 66,
            fen: "1k1r1b1r/pp6/4B3/8/P2p4/BP5p/2P2K1P/4R3 w - - 1 34",
            id: "/X1ucCwA",
            uci: "g7f8",
            san: "Bf8"
        },
        {
            ply: 67,
            fen: "1k1r1B1r/pp6/4B3/8/P2p4/1P5p/2P2K1P/4R3 b - - 0 34",
            id: "Rj129M41",
            uci: "a3f8",
            san: "Bxf8"
        },
        {
            ply: 68,
            fen: "1k3r1r/pp6/4B3/8/P2p4/1P5p/2P2K1P/4R3 w - - 0 35",
            id: "kMddZgh1",
            uci: "d8f8",
            san: "Rdxf8+"
        },
        {
            ply: 69,
            fen: "1k3r1r/pp6/4B3/8/P2p4/1P4Kp/2P4P/4R3 b - - 1 35",
            id: "WPEDT2Jq",
            uci: "f2g3",
            san: "Kg3"
        },
        {
            ply: 70,
            fen: "1k2r2r/pp6/4B3/8/P2p4/1P4Kp/2P4P/4R3 w - - 2 36",
            id: "9CFHr3if",
            uci: "f8e8",
            san: "Re8"
        },
        {
            ply: 71,
            fen: "1k2r2r/pp6/4B3/8/P2p4/1P4Kp/2P1R2P/8 b - - 3 36",
            id: "zJo/ZYDF",
            uci: "e1e2",
            san: "Re2"
        },
        {
            ply: 72,
            fen: "4r2r/ppk5/4B3/8/P2p4/1P4Kp/2P1R2P/8 w - - 4 37",
            id: "JWjGNY3l",
            uci: "b8c7",
            san: "Kc7"
        },
        {
            ply: 73,
            fen: "4r2r/ppk5/8/8/P2p2B1/1P4Kp/2P1R2P/8 b - - 5 37",
            id: "hPjXfhNJ",
            uci: "e6g4",
            san: "Bg4"
        },
        {
            ply: 74,
            fen: "7r/ppk5/8/8/P2p2B1/1P4Kp/2P1r2P/8 w - - 0 38",
            id: "/xpA7PO5",
            uci: "e8e2",
            san: "Rxe2"
        },
        {
            ply: 75,
            fen: "7r/ppk5/8/8/P2p4/1P4Kp/2P1B2P/8 b - - 0 38",
            id: "u/ewJ6Mp",
            uci: "g4e2",
            san: "Bxe2"
        },
        {
            ply: 76,
            fen: "7r/1pk5/8/p7/P2p4/1P4Kp/2P1B2P/8 w - - 0 39",
            id: "XGzQEgi9",
            uci: "a7a5",
            san: "a5"
        },
        {
            ply: 77,
            fen: "7r/1pk5/8/p7/P2p2B1/1P4Kp/2P4P/8 b - - 1 39",
            id: "8hQC/LRR",
            uci: "e2g4",
            san: "Bg4"
        },
        {
            ply: 78,
            fen: "7r/1p6/3k4/p7/P2p2B1/1P4Kp/2P4P/8 w - - 2 40",
            id: "9H/rZhe+",
            uci: "c7d6",
            san: "Kd6"
        },
        {
            ply: 79,
            fen: "7r/1p6/3k4/p7/P2p4/1P4KB/2P4P/8 b - - 0 40",
            id: "dTxOFWVf",
            uci: "g4h3",
            san: "Bxh3"
        },
        {
            ply: 80,
            fen: "7r/1p6/8/p1k5/P2p4/1P4KB/2P4P/8 w - - 1 41",
            id: "3/3rlddK",
            uci: "d6c5",
            san: "Kc5"
        },
        {
            ply: 81,
            fen: "7r/1p6/8/p1k2B2/P2p4/1P4K1/2P4P/8 b - - 2 41",
            id: "f42sjvkI",
            uci: "h3f5",
            san: "Bf5"
        },
        {
            ply: 82,
            fen: "6r1/1p6/8/p1k2B2/P2p4/1P4K1/2P4P/8 w - - 3 42",
            id: "WYvZvrvt",
            uci: "h8g8",
            san: "Rg8+"
        },
        {
            ply: 83,
            fen: "6r1/1p6/8/p1k2B2/P2p4/1P3K2/2P4P/8 b - - 4 42",
            id: "I28Qn6Eu",
            uci: "g3f3",
            san: "Kf3"
        },
        {
            ply: 84,
            fen: "6r1/1p6/8/p4B2/Pk1p4/1P3K2/2P4P/8 w - - 5 43",
            id: "NP1ttJJa",
            uci: "c5b4",
            san: "Kb4"
        },
        {
            ply: 85,
            fen: "6r1/1p6/8/p7/Pk1pB3/1P3K2/2P4P/8 b - - 6 43",
            id: "6iBy+SHR",
            uci: "f5e4",
            san: "Be4"
        },
        {
            ply: 86,
            fen: "6r1/8/1p6/p7/Pk1pB3/1P3K2/2P4P/8 w - - 0 44",
            id: "7PUNyKd9",
            uci: "b7b6",
            san: "b6"
        },
        {
            ply: 87,
            fen: "6r1/8/1p6/p7/Pk1pB2P/1P3K2/2P5/8 b - - 0 44",
            id: "SvXuxFSM",
            uci: "h2h4",
            san: "h4"
        },
        {
            ply: 88,
            fen: "6r1/8/8/pp6/Pk1pB2P/1P3K2/2P5/8 w - - 0 45",
            id: "NfhKksiW",
            uci: "b6b5",
            san: "b5"
        },
        {
            ply: 89,
            fen: "6r1/8/8/pP6/1k1pB2P/1P3K2/2P5/8 b - - 0 45",
            id: "UB8erK1v",
            uci: "a4b5",
            san: "axb5"
        },
        {
            ply: 90,
            fen: "6r1/8/8/pk6/3pB2P/1P3K2/2P5/8 w - - 0 46",
            id: "1S4xXkKy",
            uci: "b4b5",
            san: "Kxb5"
        },
        {
            ply: 91,
            fen: "6r1/8/8/pk5P/3pB3/1P3K2/2P5/8 b - - 0 46",
            id: "mw7/lz+w",
            uci: "h4h5",
            san: "h5"
        },
        {
            ply: 92,
            fen: "7r/8/8/pk5P/3pB3/1P3K2/2P5/8 w - - 1 47",
            id: "LR2G74No",
            uci: "g8h8",
            san: "Rh8"
        },
        {
            ply: 93,
            fen: "7r/8/8/pk5P/3pB1K1/1P6/2P5/8 b - - 2 47",
            id: "20fmf7fk",
            uci: "f3g4",
            san: "Kg4"
        },
        {
            ply: 94,
            fen: "6r1/8/8/pk5P/3pB1K1/1P6/2P5/8 w - - 3 48",
            id: "+UBRFU3I",
            uci: "h8g8",
            san: "Rg8+"
        },
        {
            ply: 95,
            fen: "6r1/8/8/pk3K1P/3pB3/1P6/2P5/8 b - - 4 48",
            id: "WCdHH1Lz",
            uci: "g4f5",
            san: "Kf5"
        },
        {
            ply: 96,
            fen: "6r1/8/8/p1k2K1P/3pB3/1P6/2P5/8 w - - 5 49",
            id: "tBVJrsI/",
            uci: "b5c5",
            san: "Kc5"
        },
        {
            ply: 97,
            fen: "6r1/8/7P/p1k2K2/3pB3/1P6/2P5/8 b - - 0 49",
            id: "JHyerwGt",
            uci: "h5h6",
            san: "h6"
        },
        {
            ply: 98,
            fen: "6r1/8/3k3P/p4K2/3pB3/1P6/2P5/8 w - - 1 50",
            id: "9Kel6GRy",
            uci: "c5d6",
            san: "Kd6"
        },
        {
            ply: 99,
            fen: "6r1/7P/3k4/p4K2/3pB3/1P6/2P5/8 b - - 0 50",
            id: "UFIt6+m+",
            uci: "h6h7",
            san: "h7"
        },
        {
            ply: 100,
            fen: "5r2/7P/3k4/p4K2/3pB3/1P6/2P5/8 w - - 1 51",
            id: "kPOHnTwE",
            uci: "g8f8",
            san: "Rf8+"
        },
        {
            ply: 101,
            fen: "5r2/7P/3k2K1/p7/3pB3/1P6/2P5/8 b - - 2 51",
            id: "LQEQW8mW",
            uci: "f5g6",
            san: "Kg6"
        },
        {
            ply: 102,
            fen: "5r2/4k2P/6K1/p7/3pB3/1P6/2P5/8 w - - 3 52",
            id: "HsaifRP/",
            uci: "d6e7",
            san: "Ke7"
        },
        {
            ply: 103,
            fen: "5r2/4k2P/6K1/p2B4/3p4/1P6/2P5/8 b - - 4 52",
            id: "gJ14p1qC",
            uci: "e4d5",
            san: "Bd5"
        },
        {
            ply: 104,
            fen: "8/4k2P/5rK1/p2B4/3p4/1P6/2P5/8 w - - 5 53",
            id: "vmk5Kkmc",
            uci: "f8f6",
            san: "Rf6+"
        },
        {
            ply: 105,
            fen: "8/4k1KP/5r2/p2B4/3p4/1P6/2P5/8 b - - 6 53",
            id: "eTPQVSnu",
            uci: "g6g7",
            san: "Kg7"
        },
        {
            ply: 106,
            fen: "8/4k1KP/8/p2B4/3p1r2/1P6/2P5/8 w - - 7 54",
            id: "EpVCgXxW",
            uci: "f6f4",
            san: "Rf4"
        },
        {
            ply: 107,
            fen: "7Q/4k1K1/8/p2B4/3p1r2/1P6/2P5/8 b - - 0 54",
            id: "hbcJUjg3",
            uci: "h7h82",
            san: "h8=Q"
        },
        {
            ply: 108,
            fen: "7Q/4k1K1/8/p2B4/3p2r1/1P6/2P5/8 w - - 1 55",
            id: "7wB1hipq",
            uci: "f4g4",
            san: "Rg4+"
        },
        {
            ply: 109,
            fen: "7Q/4k2K/8/p2B4/3p2r1/1P6/2P5/8 b - - 2 55",
            id: "HvpOe2e4",
            uci: "g7h7",
            san: "Kh7"
        },
        {
            ply: 110,
            fen: "7Q/4k2K/8/p2B4/3p3r/1P6/2P5/8 w - - 3 56",
            id: "zzaSkATs",
            uci: "g4h4",
            san: "Rh4+"
        },
        {
            ply: 111,
            fen: "6KQ/4k3/8/p2B4/3p3r/1P6/2P5/8 b - - 4 56",
            id: "yZZLhqin",
            uci: "h7g8",
            san: "Kg8"
        },
        {
            ply: 112,
            fen: "6Kr/4k3/8/p2B4/3p4/1P6/2P5/8 w - - 0 57",
            id: "pT/TigpB",
            uci: "h4h8",
            san: "Rxh8+"
        },
        {
            ply: 113,
            fen: "7K/4k3/8/p2B4/3p4/1P6/2P5/8 b - - 0 57",
            id: "qsj82xxL",
            uci: "g8h8",
            san: "Kxh8"
        },
        {
            ply: 114,
            fen: "7K/8/3k4/p2B4/3p4/1P6/2P5/8 w - - 1 58",
            id: "s0gB44ni",
            uci: "e7d6",
            san: "Kd6"
        },
        {
            ply: 115,
            fen: "7K/8/3k4/p7/3pB3/1P6/2P5/8 b - - 2 58",
            id: "U8gtlIDe",
            uci: "d5e4",
            san: "Be4"
        },
        {
            ply: 116,
            fen: "7K/8/8/p1k5/3pB3/1P6/2P5/8 w - - 3 59",
            id: "WzzwTvWx",
            uci: "d6c5",
            san: "Kc5"
        },
        {
            ply: 117,
            fen: "8/6K1/8/p1k5/3pB3/1P6/2P5/8 b - - 4 59",
            id: "eED8JZ9y",
            uci: "h8g7",
            san: "Kg7"
        },
        {
            ply: 118,
            fen: "8/6K1/8/p7/1k1pB3/1P6/2P5/8 w - - 5 60",
            id: "5Wz6m2eB",
            uci: "c5b4",
            san: "Kb4"
        },
        {
            ply: 119,
            fen: "8/8/5K2/p7/1k1pB3/1P6/2P5/8 b - - 6 60",
            id: "TWz/bDMn",
            uci: "g7f6",
            san: "Kf6"
        },
        {
            ply: 120,
            fen: "8/8/5K2/8/pk1pB3/1P6/2P5/8 w - - 0 61",
            id: "4b5ZVFEp",
            uci: "a5a4",
            san: "a4"
        },
        {
            ply: 121,
            fen: "8/8/5K2/8/Pk1pB3/8/2P5/8 b - - 0 61",
            id: "dkYViO52",
            uci: "b3a4",
            san: "bxa4"
        },
        {
            ply: 122,
            fen: "8/8/5K2/8/k2pB3/8/2P5/8 w - - 0 62",
            id: "xce+ZgbQ",
            uci: "b4a4",
            san: "Kxa4"
        },
        {
            ply: 123,
            fen: "8/8/8/4K3/k2pB3/8/2P5/8 b - - 1 62",
            id: "DnmcmxUS",
            uci: "f6e5",
            san: "Ke5"
        },
        {
            ply: 124,
            fen: "8/8/8/1k2K3/3pB3/8/2P5/8 w - - 2 63",
            id: "w11Kegvj",
            uci: "a4b5",
            san: "Kb5"
        },
        {
            ply: 125,
            fen: "8/8/8/1k6/3KB3/8/2P5/8 b - - 0 63",
            id: "eFjz562k",
            uci: "e5d4",
            san: "Kxd4"
        },
        {
            ply: 126,
            fen: "8/8/1k6/8/3KB3/8/2P5/8 w - - 1 64",
            id: "sOw5Ao5M",
            uci: "b5b6",
            san: "Kb6"
        },
        {
            ply: 127,
            fen: "8/8/1k6/8/2PKB3/8/8/8 b - - 0 64",
            id: "jC5n1jIu",
            uci: "c2c4",
            san: "c4"
        },
        {
            ply: 128,
            fen: "8/2k5/8/8/2PKB3/8/8/8 w - - 1 65",
            id: "okmQqB+S",
            uci: "b6c7",
            san: "Kc7"
        },
        {
            ply: 129,
            fen: "8/2k5/8/2K5/2P1B3/8/8/8 b - - 2 65",
            id: "aAAWE93a",
            uci: "d4c5",
            san: "Kc5"
        },
        {
            ply: 130,
            fen: "2k5/8/8/2K5/2P1B3/8/8/8 w - - 3 66",
            id: "XxH0qGD/",
            uci: "c7c8",
            san: "Kc8"
        },
        {
            ply: 131,
            fen: "2k5/8/2K5/8/2P1B3/8/8/8 b - - 4 66",
            id: "XwkJz7eO",
            uci: "c5c6",
            san: "Kc6"
        },
        {
            ply: 132,
            fen: "1k6/8/2K5/8/2P1B3/8/8/8 w - - 5 67",
            id: "10/Rzc01",
            uci: "c8b8",
            san: "Kb8"
        },
        {
            ply: 133,
            fen: "1k6/3K4/8/8/2P1B3/8/8/8 b - - 6 67",
            id: "fZdAh/h7",
            uci: "c6d7",
            san: "Kd7"
        }
    ],
    finalFen: "1k6/3K4/8/8/2P1B3/8/8/8 b - - 6 68",
};

const dataWatchNonStdBlack = {
    game: {
        id: 7827390,
        load: false,
        insite: true,
        variant: {
            key: "standard",
            name: "Standard",
            shortName: "Std"
        },
        speed: "correspondence",
        perf: "main",
        rated: true,
        initialFen: "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/P4N2/1P2PPPP/RNBQKB1R b KQkq - 0 4",
        fen: "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/P4N2/1P2PPPP/RNBQKB1R b KQkq - 0 5",
        player: "black",
        turns: 0,
        startedAtTurn: 7,
        status: {
            name: "resign",
            result: 1,
            result_name: "соперник сдался"
        },
        event: "Шахматные звёзды. Котов vs Шахматные звёзды. Морфи",
        tournamentId: 25259,
        createdAt: 1600682165728,
        createdBy: 4,
        private: false,
        advance: false,
        winner: "white",
        lastMove: "e2f3",
        moveCentis: [],
        opening: {
            code: "A00",
            name: "Start position"
        }
    },
    tournament: {
        id: 25259,
        name: "Шахматные звёзды. Котов vs Шахматные звёзды. Морфи",
        running: false
    },
    correspondence: {
        limit: "24 дня/партия б/о",
        can_pause: false,
        parts: [
            {
                per: "game",
                initial: 1036800000,
                increment: 0,
                min: 0
            }
        ],
        white: 0,
        black: 0,
        totalTime: 862108000,
        lastMoveAt: 1601544273045,
        serverNow: 1607448565794
    },
    player: {
        color: "white",
        name: "ГреМ",
        user: {
            id: 6121,
            name: "ГреМ",
            display: "Грешных Михаил",
            online: "12h",
            perfs: {
                main: {
                    games: 560,
                    rating: 1904,
                    avg: 1931
                }
            },
            language: "ru-RU",
            profile: {
                country: "RU"
            },
            patron: "bronze",
            status: "bronze",
            title: ""
        },
        rating: 1952,
        ratingDiff: 3.8
    },
    opponent: {
        color: "black",
        name: "GolovkoN",
        user: {
            id: 324955,
            name: "GolovkoN",
            display: "GolovkoN",
            online: "30m",
            perfs: {
                main: {
                    games: 566,
                    rating: 1747,
                    avg: 1714
                }
            },
            language: "ru-RU",
            patron: "base",
            status: "base",
            title: ""
        },
        rating: 1700,
        ratingDiff: -3.8
    },
    orientation: "white",
    analysis: {
        state: "unanalysed"
    },
    treeParts: [
        {
            ply: 7,
            fen: "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/P4N2/1P2PPPP/RNBQKB1R b KQkq -"
        },
        {
            ply: 8,
            fen: "rn1qkb1r/pbpp1ppp/1p2pn2/8/2PP4/P4N2/1P2PPPP/RNBQKB1R w KQkq - 1 5",
            id: "WnczRlhx",
            uci: "c8b7",
            san: "Bb7"
        },
        {
            ply: 9,
            fen: "rn1qkb1r/pbpp1ppp/1p2pn2/8/2PP4/P1N2N2/1P2PPPP/R1BQKB1R b KQkq - 2 5",
            id: "mTZ8QoPe",
            uci: "b1c3",
            san: "Nc3"
        },
        {
            ply: 10,
            fen: "rn1qkb1r/pbp2ppp/1p2pn2/3p4/2PP4/P1N2N2/1P2PPPP/R1BQKB1R w KQkq - 0 6",
            id: "ncbyHGoj",
            uci: "d7d5",
            san: "d5"
        },
        {
            ply: 11,
            fen: "rn1qkb1r/pbp2ppp/1p2pn2/3p2B1/2PP4/P1N2N2/1P2PPPP/R2QKB1R b KQkq - 1 6",
            id: "lz6Y8FUt",
            uci: "c1g5",
            san: "Bg5"
        },
        {
            ply: 12,
            fen: "rn1qk2r/pbp1bppp/1p2pn2/3p2B1/2PP4/P1N2N2/1P2PPPP/R2QKB1R w KQkq - 2 7",
            id: "v3HRc1lO",
            uci: "f8e7",
            san: "Be7"
        },
        {
            ply: 13,
            fen: "rn1qk2r/pbp1bppp/1p2pn2/3p2B1/2PP4/P1N1PN2/1P3PPP/R2QKB1R b KQkq - 0 7",
            id: "kPBFvHmp",
            uci: "e2e3",
            san: "e3"
        },
        {
            ply: 14,
            fen: "r2qk2r/pbpnbppp/1p2pn2/3p2B1/2PP4/P1N1PN2/1P3PPP/R2QKB1R w KQkq - 1 8",
            id: "PzQq4Iyi",
            uci: "b8d7",
            san: "Nbd7"
        },
        {
            ply: 15,
            fen: "r2qk2r/pbpnbppp/1p2pn2/3p2B1/2PP4/P1N1PN2/1P3PPP/2RQKB1R b Kkq - 2 8",
            id: "wsLh7W8d",
            uci: "a1c1",
            san: "Rc1"
        },
        {
            ply: 16,
            fen: "r2qk2r/pb1nbppp/1p2pn2/2pp2B1/2PP4/P1N1PN2/1P3PPP/2RQKB1R w Kkq - 0 9",
            id: "B4WhXira",
            uci: "c7c5",
            san: "c5"
        },
        {
            ply: 17,
            fen: "r2qk2r/pb1nbppp/1p2pn2/2pP2B1/3P4/P1N1PN2/1P3PPP/2RQKB1R b Kkq - 0 9",
            id: "kBww0I",
            uci: "c4d5",
            san: "cxd5"
        },
        {
            ply: 18,
            fen: "r2qk2r/pb1nbppp/1p2p3/2pn2B1/3P4/P1N1PN2/1P3PPP/2RQKB1R w Kkq - 0 10",
            id: "6wVrNEDm",
            uci: "f6d5",
            san: "Nxd5"
        },
        {
            ply: 19,
            fen: "r2qk2r/pb1nBppp/1p2p3/2pn4/3P4/P1N1PN2/1P3PPP/2RQKB1R b Kkq - 0 10",
            id: "xaGTSaLg",
            uci: "g5e7",
            san: "Bxe7"
        },
        {
            ply: 20,
            fen: "r3k2r/pb1nqppp/1p2p3/2pn4/3P4/P1N1PN2/1P3PPP/2RQKB1R w Kkq - 0 11",
            id: "na8auiMk",
            uci: "d8e7",
            san: "Qxe7"
        },
        {
            ply: 21,
            fen: "r3k2r/pb1nqppp/1p2p3/2Pn4/8/P1N1PN2/1P3PPP/2RQKB1R b Kkq - 0 11",
            id: "8Gygn6SU",
            uci: "d4c5",
            san: "dxc5"
        },
        {
            ply: 22,
            fen: "r3k2r/pb2qppp/1p2p3/2nn4/8/P1N1PN2/1P3PPP/2RQKB1R w Kkq - 0 12",
            id: "OF3Dq9W8",
            uci: "d7c5",
            san: "Nxc5"
        },
        {
            ply: 23,
            fen: "r3k2r/pb2qppp/1p2p3/1Bnn4/8/P1N1PN2/1P3PPP/2RQK2R b Kkq - 1 12",
            id: "uxy1t1KR",
            uci: "f1b5",
            san: "Bb5+"
        },
        {
            ply: 24,
            fen: "r4k1r/pb2qppp/1p2p3/1Bnn4/8/P1N1PN2/1P3PPP/2RQK2R w K - 2 13",
            id: "cQTyx1nQ",
            uci: "e8f8",
            san: "Kf8"
        },
        {
            ply: 25,
            fen: "r4k1r/pb2qppp/1p2p3/1BnN4/8/P3PN2/1P3PPP/2RQK2R b K - 0 13",
            id: "RXKy7YP",
            uci: "c3d5",
            san: "Nxd5"
        },
        {
            ply: 26,
            fen: "r4k1r/p3qppp/1p2p3/1Bnb4/8/P3PN2/1P3PPP/2RQK2R w K - 0 14",
            id: "yrhNpOZH",
            uci: "b7d5",
            san: "Bxd5"
        },
        {
            ply: 27,
            fen: "r4k1r/p3qppp/1p2p3/1Bnb4/1P6/P3PN2/5PPP/2RQK2R b K - 0 14",
            id: "xTGwRV+1",
            uci: "b2b4",
            san: "b4"
        },
        {
            ply: 28,
            fen: "r4k1r/pn2qppp/1p2p3/1B1b4/1P6/P3PN2/5PPP/2RQK2R w K - 1 15",
            id: "t6LM3QhL",
            uci: "c5b7",
            san: "Nb7"
        },
        {
            ply: 29,
            fen: "r4k1r/pn2qppp/1pB1p3/3b4/1P6/P3PN2/5PPP/2RQK2R b K - 2 15",
            id: "5eH2nMPw",
            uci: "b5c6",
            san: "Bc6"
        },
        {
            ply: 30,
            fen: "r4k1r/pn2qppp/1pb1p3/8/1P6/P3PN2/5PPP/2RQK2R w K - 0 16",
            id: "ZyVJzxRF",
            uci: "d5c6",
            san: "Bxc6"
        },
        {
            ply: 31,
            fen: "r4k1r/pn2qppp/1pR1p3/8/1P6/P3PN2/5PPP/3QK2R b K - 0 16",
            id: "iThL/d6A",
            uci: "c1c6",
            san: "Rxc6"
        },
        {
            ply: 32,
            fen: "r2n1k1r/p3qppp/1pR1p3/8/1P6/P3PN2/5PPP/3QK2R w K - 1 17",
            id: "1JMOpzxB",
            uci: "b7d8",
            san: "Nd8"
        },
        {
            ply: 33,
            fen: "r2n1k1r/p3qppp/1p2p3/8/1P6/P1R1PN2/5PPP/3QK2R b K - 2 17",
            id: "lMLU/d/",
            uci: "c6c3",
            san: "Rc3"
        },
        {
            ply: 34,
            fen: "r2n1k1r/p3qpp1/1p2p3/7p/1P6/P1R1PN2/5PPP/3QK2R w K - 0 18",
            id: "M/OI1OT6",
            uci: "h7h5",
            san: "h5"
        },
        {
            ply: 35,
            fen: "r2n1k1r/p3qpp1/1p2p3/4N2p/1P6/P1R1P3/5PPP/3QK2R b K - 1 18",
            id: "rR3H+vcc",
            uci: "f3e5",
            san: "Ne5"
        },
        {
            ply: 36,
            fen: "r2n1k2/p3qpp1/1p2p2r/4N2p/1P6/P1R1P3/5PPP/3QK2R w K - 2 19",
            id: "+qJ9jR+I",
            uci: "h8h6",
            san: "Rh6"
        },
        {
            ply: 37,
            fen: "r2n1k2/p3qpp1/1p2p2r/4N2p/1P6/P1R1P3/2Q2PPP/4K2R b K - 3 19",
            id: "hwuyFeES",
            uci: "d1c2",
            san: "Qc2"
        },
        {
            ply: 38,
            fen: "r2n2k1/p3qpp1/1p2p2r/4N2p/1P6/P1R1P3/2Q2PPP/4K2R w K - 4 20",
            id: "tRMLDimM",
            uci: "f8g8",
            san: "Kg8"
        },
        {
            ply: 39,
            fen: "r2n2k1/p3qpp1/1p2p2r/4N2p/1P6/P1R1P3/2Q2PPP/5RK1 b - - 5 20",
            id: "l1EYXpmw",
            uci: "e1g1",
            san: "O-O"
        },
        {
            ply: 40,
            fen: "r2n2k1/p4pp1/1p2pq1r/4N2p/1P6/P1R1P3/2Q2PPP/5RK1 w - - 6 21",
            id: "dz+0SFXg",
            uci: "e7f6",
            san: "Qf6"
        },
        {
            ply: 41,
            fen: "r2n2k1/p4pp1/1p2pq1r/4N2p/1P3P2/P1R1P3/2Q3PP/5RK1 b - - 0 21",
            id: "zJbSO2fV",
            uci: "f2f4",
            san: "f4"
        },
        {
            ply: 42,
            fen: "r2n2k1/p4pp1/1p2p2r/4Nq1p/1P3P2/P1R1P3/2Q3PP/5RK1 w - - 1 22",
            id: "Xt9LjEoe",
            uci: "f6f5",
            san: "Qf5"
        },
        {
            ply: 43,
            fen: "r2n2k1/p4pp1/1p2p2r/4Nq1p/1P3P2/P1R1P3/4Q1PP/5RK1 b - - 2 22",
            id: "Sgp9pn3Z",
            uci: "c2e2",
            san: "Qe2"
        },
        {
            ply: 44,
            fen: "r2n2k1/p4pp1/1p2p2r/4N2p/1P2qP2/P1R1P3/4Q1PP/5RK1 w - - 3 23",
            id: "z7lIi3JJ",
            uci: "f5e4",
            san: "Qe4"
        },
        {
            ply: 45,
            fen: "r2n2k1/p4pp1/1p2p2r/4N2p/1P2qP2/P1R1P3/4Q1PP/3R2K1 b - - 4 23",
            id: "scMZkkz",
            uci: "f1d1",
            san: "Rd1"
        },
        {
            ply: 46,
            fen: "r2n2k1/p5p1/1p2pp1r/4N2p/1P2qP2/P1R1P3/4Q1PP/3R2K1 w - - 0 24",
            id: "dOQWZS17",
            uci: "f7f6",
            san: "f6"
        },
        {
            ply: 47,
            fen: "r2n2k1/p5p1/1p2pp1r/4N2p/1PR1qP2/P3P3/4Q1PP/3R2K1 b - - 1 24",
            id: "Fl+JYSUD",
            uci: "c3c4",
            san: "Rc4"
        },
        {
            ply: 48,
            fen: "r2n2k1/p5p1/1p2pp1r/4Nq1p/1PR2P2/P3P3/4Q1PP/3R2K1 w - - 2 25",
            id: "ut6KEdjR",
            uci: "e4f5",
            san: "Qf5"
        },
        {
            ply: 49,
            fen: "r2n2k1/p5p1/1p2pp1r/4Nq1p/1PR2P2/P3PQ2/6PP/3R2K1 b - - 3 25",
            id: "KgsRegmF",
            uci: "e2f3",
            san: "Qf3"
        }
    ],
    finalFen: "r2n2k1/p5p1/1p2pp1r/4Nq1p/1PR2P2/P3PQ2/6PP/3R2K1 b - - 3 26",
};

const fenStdStart = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

describe('Chess', function() {
    describe('constructor()', function() {
        it('test construct without params', function() {
            const game = new Chess();
            expect(game.startFen).to.equal(fenStdStart);
            
            game.moveLast();
            expect(game.StartPlyCount).to.equal(1);
            expect(game.CurrentPlyCount).to.equal(0);
        });

        it('test construct with watch data', function() {
            const game = new Chess(dataWatch);
            game.moveLast();
            expect(game.CurrentPlyCount).to.equal(70);
        });

        it('test moves', function() {
            const game = new Chess(dataWatch);

            game.moveBegin();
            expect(game.CurrentMove.isBegin()).to.equal(true);
            expect(game.CurrentMove.isFirst()).to.equal(true);
            expect(game.CurrentMove.ply).to.equal(0);
            
            game.moveForward();
            expect(game.CurrentMove.isBegin()).to.equal(false);
            expect(game.CurrentMove.isFirst()).to.equal(true);
            expect(game.CurrentMove.ply).to.equal(1);

            game.moveFirst();
            expect(game.CurrentMove.isBegin()).to.equal(false);
            expect(game.CurrentMove.isFirst()).to.equal(true);
            expect(game.CurrentMove.sm.color).to.equal(0);
            expect(game.CurrentMove.ply).to.equal(1);

            game.moveForward();
            expect(game.CurrentMove.isBegin()).to.equal(false);
            expect(game.CurrentMove.isFirst()).to.equal(false);
            expect(game.CurrentMove.sm.color).to.equal(1);
            expect(game.CurrentMove.ply).to.equal(2);

            game.moveForward();
            expect(game.CurrentMove.isBegin()).to.equal(false);
            expect(game.CurrentMove.isFirst()).to.equal(false);
            expect(game.CurrentMove.sm.color).to.equal(0);
            expect(game.CurrentMove.ply).to.equal(3);

            game.moveBackward();
            expect(game.CurrentMove.ply).to.equal(2);

            game.moveBackward();
            expect(game.CurrentMove.ply).to.equal(1);
            expect(game.CurrentMove.isBegin()).to.equal(false);
            expect(game.CurrentMove.isFirst()).to.equal(true);

            game.moveBackward();
            expect(game.CurrentMove.ply).to.equal(0);
            expect(game.CurrentMove.isBegin()).to.equal(true);
            expect(game.CurrentMove.isFirst()).to.equal(true);

            game.moveEnd();
            expect(game.CurrentMove.isEnd()).to.equal(true);
            expect(game.CurrentMove.isLast()).to.equal(true);

            game.moveBackward();
            expect(game.CurrentMove.isEnd()).to.equal(false);
            expect(game.CurrentMove.isLast()).to.equal(true);

            game.moveBegin();
            game.moveLast();
            expect(game.CurrentMove.isEnd()).to.equal(false);
            expect(game.CurrentMove.isLast()).to.equal(true);

            game.moveToPly(12);
            expect(game.CurrentMove.ply).to.equal(12);            

            game.moveToPly(60);
            expect(game.CurrentMove.ply).to.equal(60);

            game.moveToKey("3");
            expect(game.CurrentMove.ply).to.equal(3);

            game.moveToKey("1");
            expect(game.CurrentMove.ply).to.equal(1);
        });

        it('test clock', function() {
            const game = new Chess(dataWatch);

            const raw = game.RawData;
            expect(isBlitzClock(game.RawData.correspondence)).to.equal(false);
            expect(isCorrespondenceClock(game.RawData.correspondence)).to.equal(false);
            expect(isAdvanceClock(game.RawData.correspondence)).to.equal(true);
        });

        it('test construct with analysis data', function() {
            const game = new Chess(dataAnalyse);
            game.moveLast();
            expect(game.CurrentPlyCount).to.equal(125);
        });

        it('test construct with not std start white', function() {
            const game = new Chess(dataWatchNonStdWhite);
            game.moveBegin();
            expect(game.StartPlyCount).to.equal(13);
            game.moveFirst();
            expect(game.StartPlyCount).to.equal(13);
            expect(game.CurrentPlyCount).to.equal(13);
            game.moveForward();
            var cm = game.CurrentMove;
            expect(game.CurrentPlyCount).to.equal(14);
        });

        it('test construct with not std start black', function() {
            const game = new Chess(dataWatchNonStdBlack);
            game.moveBegin();
            expect(game.StartPlyCount).to.equal(8);
            game.moveFirst();
            expect(game.StartPlyCount).to.equal(8);
            expect(game.CurrentPlyCount).to.equal(8);
            game.moveForward();
            expect(game.CurrentPlyCount).to.equal(9);
        });

        it('test plyToTurn', function() {
                let turn = Chess.plyToTurn(0);
                expect(turn).to.equal(0);

                turn = Chess.plyToTurn(1);
                expect(turn).to.equal(1);

                turn = Chess.plyToTurn(2);
                expect(turn).to.equal(1);

                turn = Chess.plyToTurn(3);
                expect(turn).to.equal(2);

                turn = Chess.plyToTurn(4);
                expect(turn).to.equal(2);
        });

        it('test plyToColor', function() {
            let turn = Chess.plyToColor(0);
            expect(turn).to.equal(0);

            turn = Chess.plyToColor(1);
            expect(turn).to.equal(0);

            turn = Chess.plyToColor(2);
            expect(turn).to.equal(1);

            turn = Chess.plyToColor(3);
            expect(turn).to.equal(0);

            turn = Chess.plyToColor(4);
            expect(turn).to.equal(1);
        });

        it('test turnToPly', function() {
            let turn = Chess.turnToPly(0, 0);
            expect(turn).to.equal(0);

            turn = Chess.turnToPly(0, 1);
            expect(turn).to.equal(0);

            turn = Chess.turnToPly(1, 0);
            expect(turn).to.equal(1);

            turn = Chess.turnToPly(1, 1);
            expect(turn).to.equal(2);

            turn = Chess.turnToPly(2, 0);
            expect(turn).to.equal(3);

            turn = Chess.turnToPly(2, 1);
            expect(turn).to.equal(4);
        });

    });
});
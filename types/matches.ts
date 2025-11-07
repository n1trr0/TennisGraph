export interface Matches {
    match_id: string;                      // ID único del partido
    winner_id: string;                     // ID del jugador ganador
    winner_seed: number | null;            // Cabeza de serie del ganador
    winner_entry: string | null;           // Tipo de entrada del ganador (WC, Q, LL, etc.)
    winner_rank: number | null;            // Ranking del ganador en el momento del partido
    winner_rank_points: number | null;     // Puntos de ranking del ganador
    loser_id: string;                      // ID del jugador perdedor
    loser_seed: number | null;             // Cabeza de serie del perdedor
    loser_entry: string | null;            // Tipo de entrada del perdedor (WC, Q, LL, etc.)
    loser_rank: number | null;             // Ranking del perdedor en el momento del partido
    loser_rank_points: number | null;      // Puntos de ranking del perdedor
    score: string;                         // Resultado del partido (ej: "6-4 6-3")
    best_of: number;                       // Formato del partido (3 o 5 sets)
    round: string;                         // Ronda del torneo (F, SF, QF, R16, etc.)
    minutes: number | null;                // Duración del partido en minutos
    w_ace: number | null;                  // Aces del ganador
    w_df: number | null;                   // Dobles faltas del ganador
    w_svpt: number | null;                 // Puntos de saque del ganador (serve points)
    w_1stIn: number | null;                // Primeros saques dentro del ganador
    w_1stWon: number | null;               // Puntos ganados con primer saque del ganador
    w_2ndWon: number | null;               // Puntos ganados con segundo saque del ganador
    w_bpSaved: number | null;              // Break points salvados del ganador
    w_bpFaced: number | null;              // Break points enfrentados del ganador
    w_SvGms: number | null;                // Juegos de servicio del ganador (service games)
    l_ace: number | null;                  // Aces del perdedor
    l_df: number | null;                   // Dobles faltas del perdedor
    l_svpt: number | null;                 // Puntos de saque del perdedor (serve points)
    l_1stIn: number | null;                // Primeros saques dentro del perdedor
    l_1stWon: number | null;               // Puntos ganados con primer saque del perdedor
    l_2ndWon: number | null;               // Puntos ganados con segundo saque del perdedor
    l_bpSaved: number | null;              // Break points salvados del perdedor
    l_bpFaced: number | null;              // Break points enfrentados del perdedor
    l_SvGms: number | null;                // Juegos de servicio del perdedor (service games)
}

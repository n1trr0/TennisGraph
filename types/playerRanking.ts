export interface PlayerRanking {
    player_id: string;
    best_rank: number | null;
    weeks_top_1: number;
    weeks_top_10: number;
    weeks_top_25: number;
    weeks_top_50: number;
    weeks_top_100: number;
}
